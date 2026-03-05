import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from '../utils/hooks';
import { getUser, logout } from '../utils/auth';

export default function Sidebar() {
    const { isMobile, isTablet, isDesktop } = useDevice();
    const location = useLocation();
    const navigate = useNavigate();
    const user = getUser();

    if (isMobile) return null; // Use BottomNav on mobile

    const navItems = [
        { path: '/stages', icon: '🗺', label: 'Stages' },
        { path: '/news', icon: '📰', label: 'News' },
        { path: '/analysis', icon: '📊', label: 'Analysis' },
        { path: '/profile', icon: '👤', label: 'Profile' }
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const sidebarWidth = isDesktop ? '260px' : '72px';
    const padding = isDesktop ? '32px 20px' : '32px 10px';

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: sidebarWidth,
            background: 'var(--card)',
            borderRight: '1px solid var(--border)',
            padding,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 100,
            transition: 'width 0.3s ease'
        }}>

            {/* BRANDING */}
            <div style={{ padding: isDesktop ? '0 16px' : '0', textAlign: isDesktop ? 'left' : 'center', marginBottom: isDesktop ? '32px' : '40px' }}>
                {isDesktop ? (
                    <>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 800, color: 'var(--green)' }}>
                            Turtrl<span style={{ color: 'var(--gold)' }}>.</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Your €100K Journey</div>
                    </>
                ) : (
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, color: 'var(--green)' }}>T.</div>
                )}
            </div>

            {/* NAVIGATION */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navItems.map(item => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: isDesktop ? '14px 16px' : '14px',
                                justifyContent: isDesktop ? 'flex-start' : 'center',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                background: isActive ? 'var(--green-dim)' : 'transparent',
                                color: isActive ? 'var(--green)' : 'var(--muted)',
                                border: isActive ? '1px solid rgba(46,204,113,0.3)' : '1px solid transparent',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                            title={!isDesktop ? item.label : undefined}
                        >
                            <div style={{ fontSize: '22px' }}>{item.icon}</div>
                            {isDesktop && (
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '15px' }}>
                                    {item.label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* FOOTER USER / LOGOUT */}
            {user && (
                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isDesktop ? 'flex-start' : 'center',
                        gap: '12px',
                        padding: '12px 8px'
                    }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, flexShrink: 0
                        }}>
                            {user.firstName.substring(0, 1)}
                        </div>
                        {isDesktop && (
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user.firstName} {user.lastName}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{user.level}</div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            padding: isDesktop ? '12px 16px' : '12px',
                            borderRadius: '12px',
                            border: '1px solid rgba(231,76,60,0.3)',
                            background: 'transparent',
                            color: 'var(--red)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        title={!isDesktop ? 'Log Out' : undefined}
                    >
                        <span>🚪</span>
                        {isDesktop && 'Log Out'}
                    </button>
                </div>
            )}
        </div>
    );
}
