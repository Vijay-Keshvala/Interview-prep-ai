const Interview = require('../models/Interview');

exports.saveInterview = async (req, res) => {
    try {
        const { role, experience, topics, results } = req.body;
        const userId = req.user.id; // ✅ Extract from JWT middleware

        const totalScore = results.reduce((acc, curr) => acc + (curr.score || 0), 0);
        const timeSpent = results.reduce((acc, curr) => acc + (curr.timeTaken || 0), 0);
        const averageTimePerQuestion = timeSpent / (results.length || 1);

        // ⬇️ Topic-wise performance
        const topicScores = {};
        const topicCounts = {};

        results.forEach(({ topic, score }) => {
            if (!topic) return;
            topicScores[topic] = (topicScores[topic] || 0) + score;
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });

        const performanceTrend = {};
        for (const topic in topicScores) {
            performanceTrend[topic] = (topicScores[topic] / (topicCounts[topic] * 10)) * 100; // % score
        }

        // 🎯 Weak topics < 60%
        const suggestedFocusAreas = Object.keys(performanceTrend).filter(t => performanceTrend[t] < 60);

        // ✅ Strong topics > 80%
        const strengths = Object.keys(performanceTrend).filter(t => performanceTrend[t] > 80);

        // 🌱 Growth stage
        let growthStage = 'Beginner';
        const avgScore = totalScore / (results.length || 1);
        if (avgScore > 7) growthStage = 'Advanced';
        else if (avgScore > 4) growthStage = 'Intermediate';

        // 📋 Feedback summary placeholder (optional: generate with GPT later)
        const feedbackSummary = `You performed well in ${strengths.join(', ') || 'no strong areas yet'}. 
    Consider focusing more on ${suggestedFocusAreas.join(', ') || 'reinforcement overall'}.`;

        // 📚 AI Recommendations (placeholder logic)
        const aiRecommendations = suggestedFocusAreas.map(topic => `Improve your skills in ${topic} by practicing mock interviews and reading official docs.`);

        const interview = new Interview({
            user: userId,
            role,
            experience,
            topics,
            totalScore,
            averageTimePerQuestion,
            timeSpent,
            results,
            performanceTrend,
            suggestedFocusAreas,
            strengths,
            aiRecommendations,
            growthStage,
            feedbackSummary,
        });

        await interview.save();

        res.status(201).json({ success: true, message: 'Interview saved', interview });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error saving interview' });
    }
};


