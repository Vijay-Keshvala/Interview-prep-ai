import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const modelName = "gemini-1.5-flash";

// Retry wrapper
const withRetry = async (taskFn, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await taskFn(model);
            return result;
        } catch (error) {
            const isRetryable = error?.message?.includes("503") || error?.toString().includes("overloaded");
            console.warn(`Gemini error (attempt ${i + 1}):`, error.message);

            if (!isRetryable || i === retries - 1) throw error;
            await new Promise((res) => setTimeout(res, 2000));
        }
    }
};

// Generate interview questions
export async function askAIQuestion(role, experience, topics, numberOfQuestions = 10) {
    const prompt = `
Generate ${numberOfQuestions} technical interview questions for a ${experience} ${role}.
Focus on: ${topics}.
Return each question on a new line without explanations or markdown.
    `;

    try {
        const result = await withRetry((model) =>
            model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
        );

        const text = result.response.text().trim();

        return text
            .split('\n')
            .map(q => q.replace(/^\d+[\.\)]\s*/, '').trim())
            .filter(q => q.length > 0);

    } catch (error) {
        console.error("❌ Failed to generate interview questions:", error.message);
        return [];
    }
}

// Evaluate single answer
export const evaluateAnswer = async (question, answer) => {
    try {
        const prompt = `
You are an AI interview evaluator.
Question: ${question}
Candidate's Answer: ${answer}

Evaluate and respond ONLY in valid JSON with this structure:
{
  "score": <integer between 0 and 10>,
  "feedback": "<constructive feedback>",
  "correctAnswer": "<short model answer or key points>",
  "topic": "<short topic name>"
}
        `;

        const result = await withRetry((model) =>
            model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
        );

        let responseText = result.response.text().trim();

        responseText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let evaluation;
        try {
            evaluation = JSON.parse(responseText);
        } catch (err) {
            console.error("❌ Failed to parse AI JSON after cleaning:", responseText);
            evaluation = {
                score: 0,
                feedback: "Error parsing evaluation result.",
                correctAnswer: "",
                topic: ""
            };
        }

        return evaluation;

    } catch (error) {
        console.error("❌ Gemini evaluation error:", error);
        return {
            score: 0,
            feedback: "Error during AI evaluation. Please try again.",
            correctAnswer: "",
            topic: ""
        };
    }
};


// Analyze overall performance with fallback defaults
export const analyzePerformance = async (results) => {
    const formatted = results
        .map((r, i) => `Q${i + 1}: ${r.question}\nA: ${r.answer}\nScore: ${r.score}`)
        .join("\n\n");

    const prompt = `
You are a senior technical interviewer. Here's the candidate's interview performance:

${formatted}

Analyze and respond ONLY in valid JSON with this exact structure:
{
  "strengths": ["string1", "string2", ...],
  "suggestedFocusAreas": ["string1", "string2", ...],
  "aiRecommendations": ["string1", "string2", ...],
  "growthStage": "Beginner" | "Intermediate" | "Advanced",
  "feedbackSummary": "string (under 120 words)"
}

Rules:
- Return arrays with at least 2 items each.
- growthStage must be one of Beginner, Intermediate, or Advanced.
- feedbackSummary must be short, clear, and motivational.
- Do not include extra text outside JSON.
    `;

    const safeParseJSON = (text) => {
        let cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        try {
            return JSON.parse(cleaned);
        } catch (err) {
            console.error("❌ JSON parse error. Raw AI output:", cleaned);
            return null;
        }
    };

    let analysis = null;
    let attempts = 0;

    while (!analysis && attempts < 3) {
        attempts++;
        try {
            const result = await withRetry((model) =>
                model.generateContent({
                    contents: [{ role: "user", parts: [{ text: prompt }] }]
                })
            );

            const responseText = result.response.text();
            analysis = safeParseJSON(responseText);

            if (!analysis) {
                console.warn(`⚠️ AI returned invalid JSON on attempt ${attempts}, retrying...`);
            }

        } catch (error) {
            console.error(`❌ Attempt ${attempts} failed:`, error.message);
        }
    }

    // ✅ Always return non-empty arrays and a growthStage
    if (!analysis) analysis = {};

    if (!Array.isArray(analysis.strengths) || analysis.strengths.length < 2) {
        analysis.strengths = ["Good participation", "Consistent effort"];
    }

    if (!Array.isArray(analysis.suggestedFocusAreas) || analysis.suggestedFocusAreas.length < 2) {
        analysis.suggestedFocusAreas = ["Provide more detail in answers", "Revise core concepts"];
    }

    if (!Array.isArray(analysis.aiRecommendations) || analysis.aiRecommendations.length < 2) {
        analysis.aiRecommendations = ["Practice time management", "Review key topics"];
    }

    if (!analysis.feedbackSummary || typeof analysis.feedbackSummary !== "string") {
        analysis.feedbackSummary =
            "You showed good engagement during the interview. With more detail and focus on fundamentals, your performance will improve.";
    }

    if (!analysis.growthStage) {
        analysis.growthStage = "Beginner";
    }

    return analysis;
};

