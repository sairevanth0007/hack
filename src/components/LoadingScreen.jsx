import React, { useEffect, useState } from 'react';
import loadingImg from '../images/4. Turtle on road.png';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fill the progress bar over 2000ms
        const startTime = Date.now();
        const duration = 2000;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percent = Math.min((elapsed / duration) * 100, 100);
            setProgress(percent);

            if (elapsed >= duration) {
                clearInterval(interval);
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 100); // Small buffer before firing completion
            }
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#0D1117',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img
                src={loadingImg}
                alt="Turtrl Loading"
                style={{
                    width: 240,
                    height: 'auto',
                    animation: 'pulse 3s infinite ease-in-out'
                }}
            />

            <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '36px',
                fontWeight: 800,
                color: 'var(--green)',
                marginTop: '24px'
            }}>
                Turtrl<span style={{ color: 'var(--gold)' }}>.</span>
            </h1>

            <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'var(--muted)',
                marginTop: '8px',
                fontSize: '15px'
            }}>
                Loading your journey...
            </p>

            <div style={{
                marginTop: '32px',
                width: '200px',
                height: '4px',
                background: 'var(--card2)',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'var(--green)',
                    transition: 'width 0.1s linear'
                }}></div>
            </div>
        </div>
    );
}
