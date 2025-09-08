import React, { useState } from "react";

export const Select = ({ onValueChange, children }) => {
    return <div className="relative inline-block w-full">{children}</div>;
};

export const SelectTrigger = ({ children }) => {
    return (
        <button className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-left">
            {children}
        </button>
    );
};

export const SelectValue = ({ placeholder }) => {
    return <span className="text-gray-500">{placeholder}</span>;
};

export const SelectContent = ({ children }) => {
    return (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded shadow z-10 w-full">
            {children}
        </div>
    );
};

export const SelectItem = ({ value, onClick, children }) => {
    return (
        <div
            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            onClick={() => onClick?.(value)}
        >
            {children}
        </div>
    );
};
