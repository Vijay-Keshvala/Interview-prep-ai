const express = require('express');
const router = express.Router();
const Interview = require("../models/Interview"); // ✅ Import model

const { protect } = require('../middlewares/authMiddleware');
const interviewController = require('../controllers/interviewController');

// Route to save interview
router.post('/save', protect, interviewController.saveInterview);


router.get("/stats", protect, async (req, res) => {
    try {
        const userId = req.user.id; // ✅ assuming you're using JWT auth middleware

        const interviews = await Interview.find({ user: userId });

        if (!interviews.length) {
            return res.json({
                totalSessions: 0,
                avgScore: 0,
                avgTimePerQuestion: 0,
                totalTimeSpent: 0,
                questionsAnswered: 0,
                latestSession: null,
                bestScore: 0,
                worstScore: 0,
            });
        }

        const totalSessions = interviews.length;

        const totalScore = interviews.reduce(
            (sum, i) => sum + (i.totalScore || 0),
            0
        );
        const avgScore = totalScore / totalSessions;

        const totalAvgTime = interviews.reduce(
            (sum, i) => sum + (i.averageTimePerQuestion || 0),
            0
        );
        const avgTimePerQuestion = totalAvgTime / totalSessions;

        const totalTimeSpent = interviews.reduce(
            (sum, i) => sum + (i.timeSpent || 0),
            0
        );

        const questionsAnswered = interviews.reduce(
            (sum, i) => sum + (i.results?.length || 0),
            0
        );

        const bestScore = Math.max(...interviews.map((i) => i.totalScore || 0));
        const worstScore = Math.min(...interviews.map((i) => i.totalScore || 0));

        // ✅ sort by date for latest session
        const latestSession = interviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        res.json({
            totalSessions,
            avgScore: avgScore.toFixed(1),
            avgTimePerQuestion: avgTimePerQuestion.toFixed(1),
            totalTimeSpent,
            questionsAnswered,
            bestScore,
            worstScore,
            latestSession: latestSession
                ? {
                    score: latestSession.totalScore,
                    timeSpent: latestSession.timeSpent,
                    questions: latestSession.results?.length || 0,
                    date: latestSession.createdAt,
                }
                : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});



module.exports = router;
