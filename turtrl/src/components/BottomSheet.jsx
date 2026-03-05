import React, { useEffect, useState } from 'react';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
    const [render, setRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setRender(true);
            // Prevent body scroll when open
            document.body.style.overflow = 'hidden';
        } else {
            // Small delay to allow transform animation to finish before unmounting
            const timer = setTimeout(() => {
                setRender(false);
                document.body.style.overflow = 'auto';
            }, 300);
            return () => clearTimeout(timer);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!render) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pointerEvents: isOpen ? 'auto' : 'none',
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    backdropFilter: 'blur(4px)'
                }}
            />

            {/* Sheet */}
            <div style={{
                backgroundColor: 'var(--card)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '24px',
                paddingBottom: '48px', // Safe area
                position: 'relative',
                zIndex: 1001,
                transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                borderTop: '1px solid var(--border)',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
            }}>
                {/* Handle */}
                <div style={{
                    width: '40px',
                    height: '4px',
                    backgroundColor: 'var(--muted)',
                    borderRadius: '4px',
                    margin: '0 auto 20px',
                    opacity: 0.5
                }} />

                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h2>
                    <button onClick={onClose} style={{
                        color: 'var(--muted)',
                        padding: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--card2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;
