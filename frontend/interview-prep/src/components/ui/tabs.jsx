import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
    const [active, setActive] = useState(defaultValue);

    return React.Children.map(children, child => {
        return React.cloneElement(child, { active, setActive });
    });
};

export const TabsList = ({ children }) => {
    return <div className="flex space-x-2 border-b">{children}</div>;
};

export const TabsTrigger = ({ value, active, setActive, children }) => {
    const isActive = active === value;

    return (
        <button
            onClick={() => setActive(value)}
            className={`px-4 py-2 border-b-2 ${isActive ? "border-blue-600 text-blue-600 font-medium" : "border-transparent text-gray-500"
                } transition-colors`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ value, active, children }) => {
    if (active !== value) return null;
    return <div className="pt-4">{children}</div>;
};
