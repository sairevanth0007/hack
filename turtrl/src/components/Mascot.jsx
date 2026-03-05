import React from 'react';
import mascotImg from '../images/mascot.png';

export default function Mascot({ size = 100, animation = 'float', speech, style = {} }) {
    const baseStyle = {
        animation: animation !== 'none' ? `${animation} 3s infinite ease-in-out` : 'none',
        width: size,
        height: 'auto',
        ...style
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={mascotImg} alt="Turtrl Mascot" style={baseStyle} />

            {speech && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-120px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px 16px 16px 4px',
                        padding: '10px 14px',
                        fontSize: '13px',
                        maxWidth: '180px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        whiteSpace: 'normal',
                        lineHeight: 1.4,
                        zIndex: 10
                    }}
                >
                    {speech}
                    {/* Small triangle pointer */}
                    <div style={{
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '-6px',
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderRight: '6px solid var(--card)',
                        borderBottom: '6px solid var(--card)',
                        borderLeft: '6px solid transparent',
                        zIndex: -1
                    }}></div>
                </div>
            )}
        </div>
    );
}
