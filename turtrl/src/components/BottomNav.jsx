import React from 'react';
import { NavLink } from 'react-router-dom';

// Simple SVG Icons
const HomeIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const InvestIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const PortfolioIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
);

const ChatIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
);

const ProfileIcon = ({ active }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const BottomNav = () => {
    const navItems = [
        { path: '/', label: 'Home', icon: HomeIcon },
        { path: '/invest', label: 'Invest', icon: InvestIcon },
        { path: '/portfolio', label: 'Portfolio', icon: PortfolioIcon },
        { path: '/chat', label: 'AI Chat', icon: ChatIcon },
        { path: '/profile', label: 'Profile', icon: ProfileIcon }
    ];

    return (
        <div className="glass" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: '20px', // Extra padding for safe area on physical devices
            zIndex: 100
        }}>
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    style={({ isActive }) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: isActive ? 'var(--green)' : 'var(--muted)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        position: 'relative',
                        width: '20%'
                    })}
                >
                    {({ isActive }) => (
                        <>
                            <div style={{
                                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transform: isActive ? 'translateY(-4px)' : 'translateY(0)'
                            }}>
                                <item.icon active={isActive} />
                            </div>

                            <span style={{
                                marginTop: '4px',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'opacity 0.2s ease',
                                opacity: isActive ? 1 : 0.8
                            }}>
                                {item.label}
                            </span>

                            {/* Active Dot Indicator */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-8px',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--green)',
                                opacity: isActive ? 1 : 0,
                                transform: isActive ? 'scale(1)' : 'scale(0)',
                                transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }} />
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    );
};

export default BottomNav;
