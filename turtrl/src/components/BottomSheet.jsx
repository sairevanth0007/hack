import React from 'react';
import { useDevice } from '../utils/hooks';

export default function BottomSheet({ isOpen, onClose, title, children }) {
    const { isDesktop } = useDevice();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: 200
                }}
            />

            {/* Sheet Panel */}
            <div style={isDesktop ? {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '480px',
                maxHeight: '85vh',
                background: 'var(--card)',
                borderRadius: '24px',
                padding: '24px',
                overflowY: 'auto',
                zIndex: 201,
                animation: 'modalIn 0.25s ease forwards',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            } : {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '85vh',
                background: 'var(--card)',
                borderRadius: '24px 24px 0 0',
                padding: '20px',
                overflowY: 'auto',
                zIndex: 201,
                animation: 'slideUp 0.3s ease forwards'
            }}>
                {/* Drag Handle (Mobile only) */}
                {!isDesktop && (
                    <div style={{
                        width: '40px',
                        height: '4px',
                        background: 'var(--border)',
                        borderRadius: '2px',
                        margin: '0 auto 16px'
                    }} />
                )}

                {/* Top bar */}
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: isDesktop ? '24px' : '20px'
                }}>
                    {title && (
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '18px',
                            fontWeight: 700,
                            margin: 0
                        }}>
                            {title}
                        </h2>
                    )}

                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--card2)',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text)',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                {children}
            </div>

            <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes modalIn {
          from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
        </>
    );
}
