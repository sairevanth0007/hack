import React, { useEffect, useState, useMemo } from 'react';

export default function ConfettiEffect({ active }) {
    const [show, setShow] = useState(active);

    useEffect(() => {
        if (active) {
            setShow(true);
        } else {
            setTimeout(() => setShow(false), 3000); // Allow animation to finish
        }
    }, [active]);

    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (active) {
            const colors = ['#2ECC71', '#F4C430', '#7C3AED', '#FF6B35', '#E74C3C', '#FFFFFF'];
            setParticles(Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 1.5,
                duration: 1.5 + Math.random() * 1.5,
                color: colors[Math.floor(Math.random() * colors.length)]
            })));
        }
    }, [active]);

    if (!show && !active) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 300,
            overflow: 'hidden'
        }}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: `${p.left}%`,
                        width: '8px',
                        height: '8px',
                        borderRadius: '2px',
                        backgroundColor: p.color,
                        animation: `confettiFall ${p.duration}s linear ${p.delay}s forwards`
                    }}
                />
            ))}
        </div>
    );
}
