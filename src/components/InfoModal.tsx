"use client";

import { useEffect, useState } from "react";

interface InfoModalProps {
    title: string;
    description: string;
    url?: string;
    onClose: () => void;
}

export default function InfoModal({ title, description, url, onClose }: InfoModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        setIsVisible(true);

        // Lock pointer logic is handled by the scene (pointer lock controls),
        // but we might need to ensure the cursor is visible. 
        // Typically, when a modal opens, we want to unlock the pointer if it's locked.
        // The parent component should handle unlocking before showing this modal,
        // or we can try to unlock here.
        document.exitPointerLock();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative bg-[#111] border border-white/10 p-8 max-w-2xl w-full mx-4 shadow-2xl transform transition-all duration-300 ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={`flex flex-col ${url ? 'md:flex-row' : ''} gap-8`}>
                    {/* Image Preview - Only if URL is present */}
                    {url && (
                        <div className="w-full md:w-1/2 aspect-square bg-black/50 relative overflow-hidden border border-white/5">
                            <img
                                src={url}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Text Content */}
                    <div className={`w-full ${url ? 'md:w-1/2' : ''} flex flex-col justify-center`}>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter">{title}</h2>
                        <div className="h-1 w-12 bg-indigo-500 mb-6" />
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
