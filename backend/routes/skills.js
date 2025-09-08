const express = require("express");
const Interview = require("../models/Interview");
const router = express.Router();

// Helper function: map subtopics -> main skills dynamically
function getMainSkill(topic) {
    const lower = topic.toLowerCase();

    if (lower.includes("react") || lower.includes("jsx") || lower.includes("hook") || lower.includes("lifecycle")) {
        return "React";
    }
    if (lower.includes("javascript") || lower.includes("es6") || lower.includes("closure") || lower.includes("async") || lower.includes("promise")) {
        return "JavaScript";
    }
    if (lower.includes("node") || lower.includes("event loop") || lower.includes("stream")) {
        return "Node.js";
    }
    if (lower.includes("express") || lower.includes("routing") || lower.includes("middleware")) {
        return "Express";
    }
    if (lower.includes("mongo") || lower.includes("schema") || lower.includes("index") || lower.includes("aggregation")) {
        return "MongoDB";
    }

    return null; // skip unknown topics
}

// GET /api/skills/:userId
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const interviews = await Interview.find({ user: userId });

        // aggregate into MAIN SKILLS
        const aggregated = {};
        interviews.forEach(interview => {
            const perf = interview.performanceTrend || {};
            for (const topic in perf) {
                const mainSkill = getMainSkill(topic);
                if (!mainSkill) continue; // skip subtopics we can't classify

                if (!aggregated[mainSkill]) {
                    aggregated[mainSkill] = { total: 0, count: 0 };
                }
                aggregated[mainSkill].total += perf[topic];
                aggregated[mainSkill].count += 1;
            }
        });

        // compute average progress per main skill
        const skillsWithAvg = Object.entries(aggregated).map(([skill, { total, count }]) => ({
            skill,
            progress: Math.round(total / count),
        }));

        // sort by performance (best → average)
        const topSkills = skillsWithAvg
            .sort((a, b) => b.progress - a.progress)
            .slice(0, 5);

        // color palette
        const colors = [
            "bg-blue-500",
            "bg-yellow-500",
            "bg-green-500",
            "bg-red-500",
            "bg-purple-500",
        ];

        // attach colors
        const skills = topSkills.map((s, index) => ({
            ...s,
            color: colors[index % colors.length],
        }));

        res.json(skills);
    } catch (err) {
        console.error("Error fetching skills:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
