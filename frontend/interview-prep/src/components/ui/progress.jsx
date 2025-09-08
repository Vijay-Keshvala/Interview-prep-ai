import React from "react";

// Progress Bar Component
export const Progress = ({ value = 0, max = 100, className = "" }) => {
    const percentage = Math.min(Math.max(value, 0), max);

    return (
        <div className={`w-full bg-gray-200 rounded-full h-4 ${className}`}>
            <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(percentage / max) * 100}%` }}
            />
        </div>
    );
};
