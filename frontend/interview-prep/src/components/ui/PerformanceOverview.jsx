import React from 'react';
import { Progress, Chip } from "@heroui/react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const performanceData = [
    { topic: 'JSX in React', score: 0 },
    { topic: 'React Hooks', score: 0 },
    { topic: 'React Event Handling', score: 80 },
    { topic: 'React Keys', score: 90 },
    { topic: 'React Lifecycle Methods', score: 90 },
    { topic: 'Props Drilling in React', score: 90 },
    { topic: 'React Data Passing', score: 90 },
    { topic: 'React Conditional Rendering', score: 90 },
    { topic: 'React Fragments', score: 90 },
    { topic: 'Virtual DOM in React', score: 80 },
];

export const PerformanceOverview = () => {
    const totalScore = Math.round(
        performanceData.reduce((acc, d) => acc + d.score, 0) / performanceData.length
    );
    const growthStage = totalScore > 85 ? "Advanced" : totalScore > 50 ? "Intermediate" : "Beginner";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Overall Performance</h3>
                    <Chip color="primary" variant="flat">{growthStage}</Chip>
                </div>
                <div className="text-right">
                    <p className="text-small text-default-500">Total Score</p>
                    <p className="text-2xl font-bold">{totalScore}%</p>
                </div>
            </div>

            <Progress
                aria-label="Overall Progress"
                value={totalScore}
                className="max-w-md"
                color="primary"
            />

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="topic"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            tickFormatter={(topic) => topic.split(" ")[0]}
                        />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => [`${value}%`, "Score"]}
                            labelFormatter={(topic) => `Topic: ${topic}`}
                        />
                        <Line type="monotone" dataKey="score" stroke="#006FEE" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
