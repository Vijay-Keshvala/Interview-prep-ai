import React from "react";

// Badge Component
export const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
        default: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
        info: "bg-cyan-100 text-cyan-800",
    };

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};
