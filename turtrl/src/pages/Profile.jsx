import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { mockPortfolioData } from '../data/mockData';

const Profile = () => {
    const user = auth.getCurrentUser();
    const navigate = useNavigate();
    const [showFeedback, setShowFeedback] = useState(true);
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleLogout = () => {
        auth.logout();
        navigate('/login', { replace: true });
    };

    const badges = [
        { id: 1, title: 'Starter', icon: '🐣', unlocked: true, color: 'var(--green)' },
        { id: 2, title: 'First Invest', icon: '🌱', unlocked: true, color: 'var(--purple)' },
        { id: 3, title: '7 Day Streak', icon: '🔥', unlocked: true, color: 'var(--orange)' },
        { id: 4, title: '10K Club', icon: '🥉', unlocked: true, color: 'var(--gold)' },
        { id: 5, title: '25K Club', icon: '🥈', unlocked: true, color: '#C0C0C0' },
        { id: 6, title: '30 Day Streak', icon: '☄️', unlocked: false, color: 'var(--muted)' },
        { id: 7, title: '50K Club', icon: '🥇', unlocked: false, color: 'var(--muted)' },
        { id: 8, title: '100K Legend', icon: '👑', unlocked: false, color: 'var(--muted)' }
    ];

    const SettingRow = ({ icon, label, danger }) => (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: danger ? 'var(--error)' : 'var(--text)' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <span style={{ fontWeight: '500' }}>{label}</span>
            </div>
            {!danger && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            )}
        </div>
    );

    return (
        <div style={{ padding: '24px', paddingBottom: '120px' }}>

            {/* Header Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', marginTop: '16px' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--green), var(--purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(46, 204, 113, 0.3)'
                }}>
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '1.5rem', margin: '0 0 4px 0' }}>{user?.firstName} {user?.lastName}</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: 0 }}>{user?.email}</p>
                    <div style={{ background: 'var(--card2)', display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', marginTop: '8px', color: 'var(--gold)', fontWeight: 'bold' }}>
                        PRO Member
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                <div className="card" style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                        €{Math.floor(mockPortfolioData.stats.totalSaved / 1000)}k
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>Saved</div>
                </div>
                <div className="card" style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                        {mockPortfolioData.stats.activeInvestments}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>Assets</div>
                </div>
                <div className="card" style={{ flex: 1, padding: '16px', textAlign: 'center', borderColor: 'rgba(244, 196, 48, 0.3)' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}>
                        {mockPortfolioData.streakDays}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>Day Streak</div>
                </div>
            </div>

            {/* Badges */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Your Badges</h3>
                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px 24px' }} className="hide-scrollbar">
                    {badges.map(b => (
                        <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '70px', opacity: b.unlocked ? 1 : 0.4 }}>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '50%',
                                background: 'var(--card2)', border: `2px solid ${b.unlocked ? b.color : 'var(--border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
                                position: 'relative', boxShadow: b.unlocked ? `0 0 15px ${b.color}40` : 'none'
                            }}>
                                {b.icon}
                                {!b.unlocked && (
                                    <div style={{ position: 'absolute', bottom: -5, right: -5, background: 'var(--bg)', borderRadius: '50%', padding: '2px', fontSize: '0.8rem' }}>🔒</div>
                                )}
                            </div>
                            <span style={{ fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold', color: b.unlocked ? 'var(--text)' : 'var(--muted)' }}>
                                {b.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedback Prompt */}
            {showFeedback && (
                <div className="card glow-green" style={{ marginBottom: '40px', background: 'linear-gradient(to right, var(--card), var(--card2))', position: 'relative' }}>
                    <button onClick={() => setShowFeedback(false)} style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--muted)' }}>✕</button>
                    <h4 style={{ marginBottom: '12px' }}>How is your experience so far?</h4>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '2rem' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                onClick={() => { setRating(star); setTimeout(() => setShowFeedback(false), 1500); }}
                                style={{
                                    cursor: 'pointer',
                                    color: star <= (hoveredStar || rating) ? 'var(--gold)' : 'var(--card2)',
                                    transition: 'color 0.2s',
                                    textShadow: star <= (hoveredStar || rating) ? '0 0 10px rgba(244,196,48,0.5)' : 'none'
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {rating > 0 && <p style={{ color: 'var(--green)', marginTop: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>Thank you for your feedback!</p>}
                </div>
            )}

            {/* Settings Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                <section>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>ACCOUNT</div>
                    <SettingRow icon="👤" label="Edit Profile" />
                    <SettingRow icon="🔒" label="Security & Password" />
                    <SettingRow icon="🏦" label="Connected Banks" />
                </section>

                <section>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>PREFERENCES</div>
                    <SettingRow icon="🔔" label="Notifications" />
                    <SettingRow icon="💶" label="Currency (€ EUR)" />
                    <SettingRow icon="⚖️" label="Risk Profile" />
                </section>

                <section>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>SUPPORT</div>
                    <SettingRow icon="❓" label="Help Center" />
                    <SettingRow icon="💬" label="Contact Us" />
                </section>

                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%', padding: '16px', borderRadius: '16px',
                        border: '1px solid rgba(255, 77, 79, 0.3)', color: 'var(--error)',
                        background: 'rgba(255, 77, 79, 0.05)', fontWeight: 'bold', fontSize: '1rem',
                        marginTop: '16px'
                    }}
                >
                    Log Out
                </button>

            </div>
        </div>
    );
};

export default Profile;
