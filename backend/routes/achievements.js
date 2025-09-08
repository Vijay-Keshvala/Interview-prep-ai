// routes/achievements.js
const express = require("express");
const Interview = require("../models/Interview");
const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const interviews = await Interview.find({ user: userId });

        if (!interviews.length) {
            return res.json([]);
        }

        const achievements = [];
        const totalSessions = interviews.length;

        // First interview
        if (totalSessions >= 1) {
            achievements.push({
                title: "First Interview Completed",
                date: interviews[0].createdAt.toDateString(),
                icon: "Award",
                color: "text-yellow-600",
            });
        }

        // 10 sessions
        if (totalSessions >= 10) {
            achievements.push({
                title: "10 Sessions Milestone",
                date: new Date().toDateString(),
                icon: "Target",
                color: "text-blue-600",
            });
        }

        // High score
        if (interviews.some((i) => i.totalScore >= 80)) {
            achievements.push({
                title: "High Score Achieved",
                date: new Date().toDateString(),
                icon: "Trophy",
                color: "text-green-600",
            });
        }

        // Topic mastery
        interviews.forEach((i) => {
            if (i.performanceTrend) {
                Object.entries(i.performanceTrend).forEach(([topic, score]) => {
                    if (score >= 90) {
                        achievements.push({
                            title: `Mastered ${topic}`,
                            date: i.createdAt.toDateString(),
                            icon: "BookOpen",
                            color: "text-purple-600",
                        });
                    }
                });
            }
        });

        res.json(achievements);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch achievements" });
    }
});

module.exports = router;
