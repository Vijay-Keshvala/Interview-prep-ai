const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    score: { type: Number, required: true },
    feedback: { type: String, required: true },
    correctAnswer: { type: String }, // ✅ Optionally provide correct answer for training
    topic: { type: String },         // 🎯 Helps in topic-wise breakdown
    timeTaken: { type: Number },     // ⏱️ Seconds to answer, for speed analysis
    usedVoiceInput: { type: Boolean } // 🎙️ Track if voice input was used
}, { _id: false });


const InterviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: String,
    experience: String,
    topics: [String],
    totalScore: Number,
    averageTimePerQuestion: Number,     // 🕒 Speed feedback
    timeSpent: Number,                  // 🧭 Total duration in seconds
    results: [AnswerSchema],
    performanceTrend: {
        type: Object,
        default: {} // { topic1: score%, topic2: score%, ... }
    },
    suggestedFocusAreas: [String],      // 🧠 AI-determined weak topics
    strengths: [String],                // ✅ Strong topics
    aiRecommendations: [String],        // 📚 Courses, docs, projects
    growthStage: { type: String },      // 🌱 Beginner / Intermediate / Advanced
    feedbackSummary: String,            // 📋 Final review by AI
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Interview', InterviewSchema);
