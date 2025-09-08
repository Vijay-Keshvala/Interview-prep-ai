import React from 'react';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip
} from 'recharts';

const topicData = [
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

export const TopicBreakdown = () => {
    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="topic" tick={{ fontSize: 12, fill: '#333' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#006FEE"
                        fill="#006FEE"
                        fillOpacity={0.6}
                    />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
