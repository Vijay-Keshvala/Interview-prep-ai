import React from "react";

export const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children }) => {
    return <div className="px-6 py-4 border-b">{children}</div>;
};

export const CardTitle = ({ children }) => {
    return <h2 className="text-lg font-semibold text-gray-800">{children}</h2>;
};

export const CardDescription = ({ children }) => {
    return <p className="text-sm text-gray-500 mt-1">{children}</p>;
};

export const CardContent = ({ children }) => {
    return <div className="p-6">{children}</div>;
};
