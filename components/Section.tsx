
import React, { useState } from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

const ToggleIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);


export const Section: React.FC<SectionProps> = ({ title, children, defaultOpen = false, className = '' }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
            <div
                className="flex justify-between items-center p-4 cursor-pointer border-b-2 border-primary"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-xl font-bold text-primary">{title}</h2>
                <button
                    className="p-1 rounded-full text-primary bg-primary/10 hover:bg-primary/20 transition"
                    aria-label={isOpen ? 'إخفاء' : 'إظهار'}
                >
                    <ToggleIcon isOpen={isOpen} />
                </button>
            </div>
            {isOpen && (
                <div className="p-4">
                    {children}
                </div>
            )}
        </div>
    );
};
