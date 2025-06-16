const { GoogleGenerativeAI } = require("@google/generative-ai");
const {questionAnswerPrompt, conceptExplainPrompt} = require("../utils/prompts")

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc Generate interview questions and answer using Gemini
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        // More robust cleaning of the response
        let cleanedText = rawText.trim();
        
        // Remove markdown code block notation if present
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.slice(7); // Remove ```json
        } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.slice(3); // Remove ```
        }
        
        if (cleanedText.endsWith('```')) {
            cleanedText = cleanedText.slice(0, -3); // Remove trailing ```
        }
        
        cleanedText = cleanedText.trim();

        // Parse the cleaned text
        const data = JSON.parse(cleanedText);

        // Return just the data without the success wrapper
        res.status(200).json(data);

    } catch (error) {
        console.error('Error details:', {
            error: error.message,
            rawText: rawText, // This will help you see what the API actually returned
            stack: error.stack
        });
        res.status(500).json({ 
            message: "Failed to generate questions", 
            error: error.message,
            hint: "The API response might not be valid JSON. Check the raw response for formatting issues."
        });
    }
};
  


// @desc Generate explains a interview question
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Please provide a question" });
        }

        const prompt = conceptExplainPrompt(question);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        // Clean the response and parse JSON
        let cleanedText = rawText.trim();
        cleanedText = cleanedText.replace(/^```(json)?/, "").replace(/```$/, "").trim();

        // Parse the JSON response
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanedText);
        } catch (e) {
            // If parsing fails, return the raw text as the answer
            return res.status(200).json({
                title: question,
                answer: cleanedText
            });
        }

        // Format the response as {title, answer}
        const formattedResponse = {
            title: parsedResponse.title || question,
            answer: parsedResponse.explanation || cleanedText
        };

        // Remove any remaining JSON formatting in the answer
        formattedResponse.answer = formattedResponse.answer
            .replace(/\\n/g, '\n')  // Convert escaped newlines to actual newlines
            .replace(/\\"/g, '"')    // Remove escape characters from quotes
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold formatting
            .replace(/```[a-z]*/g, ''); // Remove code block markers

        res.status(200).json(formattedResponse);

    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ 
            message: "Failed to generate explanation", 
            error: error.message
        });
    }
};

module.exports = {generateInterviewQuestions, generateConceptExplanation}