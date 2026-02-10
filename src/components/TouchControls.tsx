import React, { useEffect, useState } from "react";
import { MovementState } from "./types";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface TouchControlsProps {
    setMovement: React.Dispatch<React.SetStateAction<MovementState>>;
}

export default function TouchControls({ setMovement }: TouchControlsProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Check for touch capability OR small screen
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth < 1024;
            setIsMobile(isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isMobile) return null;

    const btnStyle: React.CSSProperties = {
        width: '80px',
        height: '80px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        pointerEvents: 'auto',
        touchAction: 'none',
        backdropFilter: 'blur(4px)',
        cursor: 'pointer',
    };

    const bind = (action: keyof MovementState) => ({
        onPointerDown: (e: React.PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setMovement((m) => ({ ...m, [action]: true }));
        },
        onPointerUp: (e: React.PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setMovement((m) => ({ ...m, [action]: false }));
        },
        onPointerLeave: (e: React.PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setMovement((m) => ({ ...m, [action]: false }));
        },
    });

    return (
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', zIndex: 1001, pointerEvents: 'none' }}>
            <div style={btnStyle} {...bind('rotateLeft')}>
                <ChevronLeft size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={btnStyle} {...bind('moveForward')}>
                    <ChevronUp size={24} />
                </div>
                <div style={btnStyle} {...bind('moveBackward')}>
                    <ChevronDown size={24} />
                </div>
            </div>
            <div style={btnStyle} {...bind('rotateRight')}>
                <ChevronRight size={24} />
            </div>
        </div>
    );
}
