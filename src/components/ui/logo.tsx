import React from "react";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M3.5 18L9 6L13.5 16L19.5 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
            />
            <path
                d="M20.5 4L22 20H2L3.5 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary/40"
            />
            <defs>
                <linearGradient id="logo-gradient" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0.5" />
                </linearGradient>
            </defs>
        </svg>
    );
};
