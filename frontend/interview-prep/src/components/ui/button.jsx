import React from "react";

// Utility function to combine class names
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

// Button component
export const Button = ({
    children,
    className,
    variant = "default",
    size = "md",
    disabled = false,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        link: "text-blue-600 hover:underline",
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
