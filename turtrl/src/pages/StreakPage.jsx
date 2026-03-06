import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function StreakPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = getUser();
        if (!u) {
            navigate('/');
            return;
        }
        setUser(u);
    }, [navigate]);

    if (!user) return null;

    const streakHistory = user?.streakHistory || [];

    // Helper for generating calendar
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const currentDayIndex = new Date().getDay();
    // JS getDay is 0 (Sun) - 6 (Sat). We want Mon(0)-Sun(6).
    const adjustedDay = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

    return (
        <div style={{
            paddingTop: '56px',
            paddingBottom: '80px',
            minHeight: '100vh',
            background: 'var(--bg)',
            fontFamily: 'DM Sans, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%'
        }}>
            {/* Sticky Header */}
            <div style={{
                position: 'sticky',
                top: '56px',
                background: 'var(--bg)',
                padding: '12px 20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none', border: 'none', color: 'var(--muted)',
                        fontSize: '20px', cursor: 'pointer', padding: '4px 8px',
                        minWidth: '44px', minHeight: '44px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--green)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                    ←
                </button>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: '700' }}>
                    Daily Streak 🔥
                </span>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 20px 16px' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '72px', color: 'var(--gold)', fontWeight: 800, margin: 0, lineHeight: 1 }}>
                    {user.streak}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '16px', marginTop: '6px', marginBottom: '8px' }}>day streak</div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '32px', width: '100%' }}>
                    {days.map((day, i) => {
                        let isActive = false;
                        if (user.streak > 0) {
                            const daysCovered = user.streak % 7 || (user.streak > 0 ? 7 : 0);
                            const diff = adjustedDay - i;
                            if (diff >= 0 && diff < daysCovered) {
                                isActive = true;
                            } else if (diff < 0 && (7 + diff) < daysCovered) {
                                isActive = true;
                            }
                        }

                        const isToday = i === adjustedDay;

                        return (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
                                <div className={isToday && user.lastStreakDate !== new Date().toISOString().split('T')[0] ? "pulse" : ""} style={{
                                    width: '100%', aspectRatio: '1', borderRadius: '50%',
                                    background: isActive ? 'var(--green)' : 'transparent',
                                    border: isActive ? 'none' : '2px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: isActive ? '#000' : 'var(--muted)',
                                    fontSize: '14px', fontWeight: 800,
                                    transform: isToday ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'all 0.2s',
                                    flexShrink: 0
                                }}>
                                    {isActive ? '✓' : ''}
                                </div>
                                <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: isToday ? 800 : 400 }}>{day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ padding: '0 20px', width: '100%' }}>
                <div className="card" style={{ width: '100%', marginBottom: '24px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '24px' }}>🛡</div>
                    <div>
                        <div style={{ fontWeight: 700 }}>{user.streakShields} shields</div>
                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Protects your streak if you miss a day</div>
                    </div>
                </div>

                <div className="card" style={{ width: '100%', marginBottom: '32px', textAlign: 'left' }}>
                    <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>How it works</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>
                        Complete at least 1 news quiz per day to extend your streak. Simply logging in does NOT count.
                    </p>
                </div>

                <div style={{ textAlign: 'left', width: '100%' }}>
                    <h3 className="section-title" style={{ marginBottom: '16px' }}>History</h3>
                    {streakHistory.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px', width: '100%' }}>
                            No streak history yet.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                            {[...streakHistory].reverse().slice(0, 14).map((entry, idx) => (
                                <div key={idx} className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', minHeight: '44px', cursor: 'pointer' }}>
                                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{new Date(entry.date).toLocaleDateString()}</div>
                                    <div style={{
                                        color: entry.maintained ? 'var(--green)' : 'var(--red)',
                                        fontWeight: 700, fontSize: '14px',
                                        display: 'flex', alignItems: 'center', gap: '6px'
                                    }}>
                                        {entry.maintained ? '✅ Extended' : '❌ Broken'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes pulse-ring {
                    0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(46, 204, 113, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
                }
                .pulse {
                    animation: pulse-ring 2s infinite;
                }
            `}</style>
        </div>
    );
}
