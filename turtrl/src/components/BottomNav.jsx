import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from '../utils/hooks';

export default function BottomNav() {
    const { isMobile } = useDevice();
    const location = useLocation();
    const navigate = useNavigate();

    if (!isMobile) return null;

    const tabs = [
        { path: '/stages', icon: '🗺', label: 'Stages' },
        { path: '/news', icon: '📰', label: 'News' },
        { path: '/analysis', icon: '📊', label: 'Analysis' },
        { path: '/profile', icon: '👤', label: 'Profile' }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '430px',
            height: '64px',
            paddingBottom: 'env(safe-area-inset-bottom)',
            background: 'rgba(13,17,23,0.92)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid var(--border)',
            zIndex: 100,
            display: 'flex'
        }}>
            {tabs.map((tab) => {
                const isActive = location.pathname.startsWith(tab.path);

                return (
                    <div
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            color: isActive ? 'var(--green)' : 'var(--muted)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <div style={{
                            fontSize: '22px',
                            transition: 'transform 0.2s',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                            filter: isActive ? 'none' : 'grayscale(1) opacity(0.7)'
                        }}>
                            {tab.icon}
                        </div>
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px'
                        }}>
                            {tab.label}
                            {isActive && (
                                <div style={{
                                    width: '4px',
                                    height: '4px',
                                    background: 'var(--green)',
                                    borderRadius: '50%'
                                }} />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
