import React from "react";

export const ChartContainer = ({ children }) => {
    return <div className="w-full h-64">{children}</div>;
};

export const ChartTooltip = ({ children }) => {
    return (
        <div className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
            {children}
        </div>
    );
};

export const ChartTooltipContent = ({ label, value }) => {
    return (
        <div>
            <div>{label}</div>
            <div className="font-bold">{value}</div>
        </div>
    );
};
