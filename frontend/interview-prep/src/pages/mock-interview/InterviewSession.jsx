import React, { useEffect, useState } from 'react';
import { analyzePerformance, askAIQuestion, evaluateAnswer } from '../../utils/genai';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import Summary from './Summary';

export default function InterviewSession({ config, onExit }) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [listening, setListening] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(null);
    const [usedVoiceInput, setUsedVoiceInput] = useState(false);
    const [voices, setVoices] = useState([]);
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Voices might load asynchronously
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);


    // 🔹 Load available voices for speech
    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    useEffect(() => {
        const loadQuestions = async () => {
            setLoading(true);
            const { role, experience, topics } = config;
            const qns = await askAIQuestion(role, experience, topics, 10);
            setQuestions(qns);
            setLoading(false);
            if (qns.length > 0) {
                speak(qns[0]);
                estimateTime(qns[0]);
                setQuestionStartTime(Date.now());
            }
        };
        loadQuestions();
    }, [config]);

    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft === 0) {
            (async () => {
                await handleSubmit();
                handleNext(true);
            })();
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (showSummary) saveInterviewToBackend();
    }, [showSummary]);

    const estimateTime = (text) => {
        const seconds = Math.min(Math.max(Math.floor(text.length / 10), 30), 90);
        setTimeLeft(seconds);
    };

    const speak = (text) => {
        if (!text) return;

        window.speechSynthesis.cancel(); // stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);

        // Pick a nice English Google voice if available
        const selectedVoice =
            voices.find(v => v.lang.includes('en') && v.name.includes('Google')) ||
            voices[0];

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    };


    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser does not support voice input");
            return;
        }
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setListening(true);
            setUsedVoiceInput(true);
        };
        recognition.onend = () => setListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAnswer(transcript);
        };
        recognition.start();
    };

    const handleSubmit = async () => {
        const question = questions[currentIndex];
        const trimmedAnswer = answer.trim();
        let result;
        try {
            if (!trimmedAnswer) {
                result = { score: 0, feedback: "No answer was provided." };
            } else {
                result = await evaluateAnswer(question, trimmedAnswer);
            }
        } catch {
            result = { score: 0, feedback: "AI evaluation unavailable." };
        }

        const timeTaken = questionStartTime
            ? Math.floor((Date.now() - questionStartTime) / 1000)
            : 0;

        const entry = {
            question,
            answer: trimmedAnswer || 'No Answer',
            score: result.score,
            feedback: result.feedback,
            correctAnswer: result.correctAnswer || '',
            topic: result.topic || '',
            timeTaken,
            usedVoiceInput
        };

        setResults(prev => [...prev, entry]);
        setFeedback(result.feedback);
        setScore(result.score);
    };

    const handleNext = (auto = false) => {
        if (!auto && score === null) return;
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
            setAnswer('');
            setScore(null);
            setFeedback('');
            setUsedVoiceInput(false);
            speak(questions[nextIndex]);
            estimateTime(questions[nextIndex]);
            setQuestionStartTime(Date.now());
        } else {
            setShowSummary(true);
        }
    };

    const saveInterviewToBackend = async () => {
        try {
            const token = localStorage.getItem('token');
            const cleanedResults = results.map(r => ({
                question: r.question,
                answer: r.answer || 'No Answer',
                score: r.answer && r.answer.trim() !== '' ? r.score : 0,
                feedback: r.feedback || '',
                correctAnswer: r.correctAnswer || '',
                topic: r.topic || '',
                timeTaken: r.timeTaken || 0,
                usedVoiceInput: r.usedVoiceInput || false
            }));

            const totalTime = cleanedResults.reduce((sum, r) => sum + (r.timeTaken || 0), 0);
            const averageTime = cleanedResults.length ? totalTime / cleanedResults.length : 0;

            let analysis;
            try {
                analysis = await analyzePerformance(cleanedResults);
            } catch {
                analysis = {
                    strengths: ["AI unavailable"],
                    suggestedFocusAreas: ["AI unavailable"],
                    aiRecommendations: ["AI unavailable"],
                    growthStage: "Unknown",
                    feedbackSummary: "AI analysis unavailable."
                };
            }

            const payload = {
                role: config.role,
                experience: config.experience,
                topics: config.topics,
                results: cleanedResults,
                strengths: analysis.strengths,
                suggestedFocusAreas: analysis.suggestedFocusAreas,
                aiRecommendations: analysis.aiRecommendations,
                growthStage: analysis.growthStage,
                feedbackSummary: analysis.feedbackSummary,
                averageTimePerQuestion: averageTime,
                timeSpent: totalTime
            };

            await fetch('http://localhost:8000/api/interview/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            console.log("✅ Interview + AI analysis saved successfully");
        } catch (err) {
            console.error("❌ Error in saveInterviewToBackend:", err.message);
        }
    };

    const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

    if (loading) return <div className="text-center mt-10">Loading questions...</div>;
    if (showSummary) return <Summary results={results} onRestart={onExit} />;

    return (
        <DashboardLayout>
            <div className="p-6 max-w-xl mx-auto space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">🧠 Question {currentIndex + 1} / {questions.length}</h2>
                    <button onClick={onExit} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        ⏹ End Interview
                    </button>
                </div>

                <div className="text-sm flex justify-between items-center">
                    <span className={`px-3 py-1 rounded font-semibold ${timeLeft <= 10
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-yellow-300 text-black'}`}>
                        ⏱ Time left: {formatTime(timeLeft)}
                    </span>
                    {listening && <span className="text-green-600 animate-pulse">🎤 Listening...</span>}
                </div>

                <p className="font-medium text-gray-800">{questions[currentIndex]}</p>

                <textarea
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                    rows="4"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer..."
                />

                <div className="flex gap-3 mt-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        ✅ Submit Answer
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={startListening}>
                        🎙️ Voice Input
                    </button>
                </div>

                {score !== null && (
                    <div className="bg-gray-100 p-4 rounded mt-4 shadow-md">
                        <h3 className="font-semibold text-lg mb-1">📝 Feedback</h3>
                        <p className="text-gray-800">{feedback}</p>
                        <p className="font-bold text-green-600 mt-2">Score: {score} / 10</p>
                        <button onClick={() => handleNext(false)} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-3">
                            ➡️ Next Question
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
