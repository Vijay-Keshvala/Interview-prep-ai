import React, { useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';

export default function MockInterviewForm({ onStart }) {
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [topics, setTopics] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({ role, experience, topics });
    };

    return (
        <DashboardLayout>
            <div className="max-w-md mx-auto p-6 space-y-4">
                <h2 className="text-xl font-bold">📝 Setup Your Interview</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Role (e.g., Frontend Developer)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Experience (e.g., Junior)"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Topics to Focus (e.g., React, JavaScript)"
                        value={topics}
                        onChange={(e) => setTopics(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button type="submit" className="btn btn-primary w-full">🎙️ Start Interview</button>
                </form>
            </div>
        </DashboardLayout>
    );
}
