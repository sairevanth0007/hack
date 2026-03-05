import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomSheet from './BottomSheet';
import { getUser } from '../utils/auth';
import { useDevice } from '../utils/hooks';

const MOCK_USERS = [
    { name: 'AlexTheBull', points: 14500, streak: 124, color: '#e74c3c' },
    { name: 'CryptoQueen', points: 12200, streak: 89, color: '#7c3aed' },
    { name: 'DiamondHands', points: 9800, streak: 45, color: '#f4c430' },
    { name: 'InvestBot99', points: 8500, streak: 32, color: '#2ecc71' },
    { name: 'SteadyGrowth', points: 7200, streak: 21, color: '#ff6b35' },
    { name: 'MoonWalker', points: 6100, streak: 14, color: '#3498db' },
    { name: 'PennyStocker', points: 4300, streak: 7, color: '#e67e22' },
    { name: 'YieldHunter', points: 3100, streak: 5, color: '#1abc9c' },
    { name: 'NewbieInvestor', points: 800, streak: 2, color: '#95a5a6' }
];

export default function TopNav() {
    const [user, setUser] = useState(null);
    const [activeSheet, setActiveSheet] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobile, isTablet, isDesktop } = useDevice();

    useEffect(() => {
        // TopNav will re-render if we use a global store or context, 
        // but for now we poll or just read once per mount.
        // In a real app we'd dispatch an event. We will fetch on mount.
        setUser(getUser());

        // Add a simple listener for local storage updates if needed 
        // (doesn't trigger on same window always, but good practice)
        const handleStorage = () => setUser(getUser());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [activeSheet]); // Refetch when a sheet opens

    if (!user) return null;

    const handleOpenNews = () => {
        setActiveSheet(null);
        navigate('/news');
    };

    // Combine mock users with current user to create leaderboard
    const allUsers = [...MOCK_USERS, {
        isCurrentUser: true,
        name: `${user.firstName} ${user.lastName || ''}`.trim() || 'You',
        points: user.points,
        streak: user.streak,
        color: '#2ecc71' // Green for user
    }].sort((a, b) => b.points - a.points); // Sort by points descending

    const renderLeaderboard = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button className="pill active" style={{ flex: 1 }}>Global</button>
                <button className="pill" style={{ flex: 1, opacity: 0.5 }}>Friends</button>
            </div>

            {allUsers.slice(0, 10).map((u, idx) => {
                const isCurrent = u.isCurrentUser;
                let rankColor = 'var(--muted)';
                let rankIcon = '';
                if (idx === 0) { rankColor = 'var(--gold)'; rankIcon = '👑'; }
                else if (idx === 1) { rankColor = '#C0C0C0'; rankIcon = ''; }
                else if (idx === 2) { rankColor = '#CD7F32'; rankIcon = ''; }

                return (
                    <div key={idx} className="card" style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                        border: isCurrent ? '1.5px solid var(--green)' : '1px solid var(--border)',
                        background: isCurrent ? 'var(--green-dim)' : 'var(--card)',
                        marginBottom: '4px'
                    }}>
                        <div style={{ width: '24px', textAlign: 'center', color: rankColor, fontWeight: 700, fontSize: '14px' }}>
                            {rankIcon || (idx + 1)}
                        </div>

                        <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: u.color, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontWeight: 'bold', color: '#fff',
                            fontSize: '14px'
                        }}>
                            {u.name.substring(0, 2).toUpperCase()}
                        </div>

                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {u.name}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: 'var(--green)', fontWeight: 700, fontSize: '14px' }}>{u.points} XP</div>
                            <div style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: 600 }}>🔥 {u.streak}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const getPageTitle = () => {
        if (location.pathname.startsWith('/stages')) return 'Stages';
        if (location.pathname.startsWith('/news')) return 'News';
        if (location.pathname.startsWith('/analysis')) return 'Analysis';
        if (location.pathname.startsWith('/profile')) return 'Profile';
        return 'Turtrl';
    };

    const topNavStyle = isMobile ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '56px',
        background: 'rgba(13,17,23,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
    } : {
        position: 'fixed',
        top: 0,
        left: isDesktop ? '260px' : '72px',
        right: 0,
        height: '64px',
        background: 'rgba(13,17,23,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px'
    };

    const statBtnStyle = isMobile ? navBtnStyle : {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: '10px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    return (
        <>
            <div style={topNavStyle}>
                {isMobile ? (
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 800, color: 'var(--green)' }}>
                        Turtrl<span style={{ color: 'var(--gold)' }}>.</span>
                    </div>
                ) : (
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700 }}>
                        {getPageTitle()}
                    </div>
                )}

                <div style={{ display: 'flex', gap: isMobile ? '4px' : '12px' }}>
                    {/* Streak */}
                    <button onClick={() => setActiveSheet('streak')} style={statBtnStyle}>
                        <div style={{ fontSize: isMobile ? '16px' : '18px', filter: user.streak === 0 ? 'grayscale(1)' : 'none' }}>🔥</div>
                        <div style={{ fontSize: isMobile ? '10px' : '14px', fontWeight: 'bold', color: user.streak > 0 ? 'var(--gold)' : 'var(--muted)' }}>
                            {user.streak}
                        </div>
                    </button>

                    {/* Points */}
                    <button onClick={() => setActiveSheet('points')} style={statBtnStyle}>
                        <div style={{ fontSize: isMobile ? '16px' : '18px' }}>⭐</div>
                        <div style={{ fontSize: isMobile ? '10px' : '14px', fontWeight: 'bold', color: 'var(--green)' }}>
                            {user.points}
                        </div>
                    </button>

                    {/* Rubies */}
                    <button onClick={() => setActiveSheet('rubies')} style={statBtnStyle}>
                        <div style={{ fontSize: isMobile ? '16px' : '18px' }}>💎</div>
                        <div style={{ fontSize: isMobile ? '10px' : '14px', fontWeight: 'bold', color: 'var(--purple)' }}>
                            {user.rubies}
                        </div>
                    </button>

                    {/* Leaderboard */}
                    <button onClick={() => setActiveSheet('leaderboard')} style={{ ...statBtnStyle, justifyContent: 'center' }}>
                        <div style={{ fontSize: isMobile ? '20px' : '18px' }}>🏆</div>
                    </button>
                </div>
            </div>

            {/* STREAK SHEET */}
            <BottomSheet isOpen={activeSheet === 'streak'} onClose={() => setActiveSheet(null)} title="Daily Streak 🔥">
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '48px', color: 'var(--gold)', fontWeight: 800 }}>
                        {user.streak}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '-8px', marginBottom: '24px' }}>day streak</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                            const isActive = i < (user.streak % 7 || (user.streak > 0 ? 7 : 0));
                            return (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        background: isActive ? 'var(--green)' : 'transparent',
                                        border: isActive ? 'none' : '2px solid var(--card2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: isActive ? '#000' : 'var(--muted)',
                                        fontSize: '14px', fontWeight: 800
                                    }}>
                                        {isActive ? '✓' : ''}
                                    </div>
                                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{day}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card" style={{ textAlign: 'left', marginBottom: '16px' }}>
                        <div style={{ fontWeight: 700, marginBottom: '4px' }}>🛡 {user.streakShields} shields remaining</div>
                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Complete a news quiz each day to extend your streak. Spend 1 Ruby for 1 Streak Shield.</div>
                    </div>

                    <button className="btn-primary" onClick={handleOpenNews}>Go to News</button>
                </div>
            </BottomSheet>

            {/* POINTS SHEET */}
            <BottomSheet isOpen={activeSheet === 'points'} onClose={() => setActiveSheet(null)} title="Your XP Points ⭐">
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '48px', color: 'var(--green)', fontWeight: 800 }}>
                        {user.points}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '-8px', marginBottom: '24px' }}>
                        Points are earned by completing stages and news quizzes.
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <h3 className="section-title" style={{ padding: 0, margin: '0 0 12px 0' }}>Points History</h3>
                        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {/* Mock history since we don't store full point log in user object yet */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Completed Stage {user.currentStage > 1 ? user.currentStage - 1 : 1}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Today</div>
                                </div>
                                <div style={{ color: 'var(--green)', fontWeight: 700 }}>+50 XP</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>News Quiz Perfect Score</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Yesterday</div>
                                </div>
                                <div style={{ color: 'var(--green)', fontWeight: 700 }}>+10 XP</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '16px' }}>
                            XP determines your leaderboard rank
                        </div>
                    </div>
                </div>
            </BottomSheet>

            {/* RUBY SHEET */}
            <BottomSheet isOpen={activeSheet === 'rubies'} onClose={() => setActiveSheet(null)} title="Rubies 💎">
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '48px', color: 'var(--purple)', fontWeight: 800, marginBottom: '24px' }}>
                        {user.rubies}
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                        <h3 className="section-title" style={{ padding: 0, margin: '0 0 12px 0' }}>How to earn</h3>
                        <div className="card" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ fontSize: '24px' }}>🔥</div>
                            <div style={{ fontSize: '14px' }}>Maintain a 60-day perfect streak → earn 1 Ruby</div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <h3 className="section-title" style={{ padding: 0, margin: '0 0 12px 0' }}>How to spend</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 12px' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏭</div>
                                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Skip a Stage</div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Cost: 1 Ruby</div>
                                <button className="btn-primary" style={{ padding: '8px', fontSize: '13px' }}>Use Ruby</button>
                            </div>
                            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 12px' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛡</div>
                                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Streak Shield</div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Cost: 1 Ruby</div>
                                <button className="btn-primary" style={{ padding: '8px', fontSize: '13px' }}>Use Ruby</button>
                            </div>
                        </div>
                    </div>
                </div>
            </BottomSheet>

            {/* LEADERBOARD SHEET */}
            <BottomSheet isOpen={activeSheet === 'leaderboard'} onClose={() => setActiveSheet(null)} title="Leaderboard 🏆">
                {renderLeaderboard()}
            </BottomSheet>
        </>
    );
}

const navBtnStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    gap: '2px',
    transition: 'background 0.2s'
};
