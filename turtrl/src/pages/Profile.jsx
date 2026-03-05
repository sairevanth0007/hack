import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import Mascot from '../components/Mascot';
import { getUser, logout } from '../utils/auth';
import { useDevice } from '../utils/hooks';

const ALL_BADGES = [
    { id: 'first_login', icon: '🐣', name: 'First Login' },
    { id: 'first_trade', icon: '📈', name: 'First Trade' },
    { id: 'streak_7', icon: '🔥', name: '7-Day Streak' },
    { id: 'streak_30', icon: '🔥', name: '30-Day Streak' },
    { id: 'profit_maker', icon: '💰', name: 'Profit Maker' },
    { id: 'chapter_1_complete', icon: '🎓', name: 'Chapter 1' },
    { id: 'expert_level', icon: '🧠', name: 'Expert Level' },
    { id: '10k_club', icon: '💎', name: '10K Club' },
    { id: 'first_ruby', icon: '💎', name: 'First Ruby' },
    { id: 'bankrupt_survivor', icon: '💸', name: 'Survivor' }
];

export default function Profile() {
    const navigate = useNavigate();
    const { isDesktop } = useDevice();
    const [feedbackDone, setFeedbackDone] = useState(false);
    const user = getUser();

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getLevelColor = () => {
        if (user.level === 'Beginner') return 'var(--green)';
        if (user.level === 'Intermediate') return 'var(--gold)';
        return 'var(--purple)';
    };

    const renderHero = () => (
        <div style={{ padding: isDesktop ? '0 0 24px' : '16px 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ border: '3px solid var(--green)', borderRadius: '50%', padding: '4px' }}>
                <Mascot size={80} animation="float" />
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', margin: '12px 0 4px' }}>
                {user.firstName} {user.lastName}
            </h1>
            <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '6px' }}>{user.email}</div>
            <div className="pill active" style={{ borderColor: getLevelColor(), color: getLevelColor(), marginBottom: '8px' }}>
                {user.level} Investor
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '12px' }}>
                Member since {new Date(user.memberSince).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
            </div>
        </div>
    );

    const renderStats = () => (
        <div style={{ padding: isDesktop ? '0' : '0 20px', display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <div className="card" style={{ flex: 1, textAlign: 'center', padding: '16px 8px' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--green)' }}>
                    {user.completedStages ? user.completedStages.length : 0}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Stages Done</div>
            </div>
            <div className="card" style={{ flex: 1, textAlign: 'center', padding: '16px 8px' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--green)' }}>
                    {user.bestStreak} <span style={{ fontSize: '16px' }}>🔥</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Best Streak</div>
            </div>
            <div className="card" style={{ flex: 1, textAlign: 'center', padding: '16px 8px' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--green)' }}>
                    {user.points} <span style={{ fontSize: '16px' }}>⭐</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Total XP</div>
            </div>
        </div>
    );

    const renderBadges = () => (
        <div style={{ marginBottom: '24px' }}>
            <h3 className="section-title" style={{ padding: isDesktop ? '0' : '0 20px', margin: '0 0 12px 0' }}>Achievements</h3>
            <div style={{ display: 'flex', gap: '12px', padding: isDesktop ? '0' : '0 20px', overflowX: 'auto', flexWrap: isDesktop ? 'wrap' : 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {ALL_BADGES.map(badge => {
                    const hasBadge = user.badges?.includes(badge.id);
                    return (
                        <div key={badge.id} className="card" style={{
                            minWidth: '80px', height: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            filter: hasBadge ? 'none' : 'grayscale(1) opacity(0.4)',
                            borderColor: hasBadge ? 'var(--green)' : 'var(--border)'
                        }}>
                            <div style={{ fontSize: '32px' }}>{badge.icon}</div>
                            <div style={{ fontSize: '10px', fontWeight: 600, textAlign: 'center', marginTop: '6px', lineHeight: 1.2 }}>
                                {badge.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderFeedback = () => (
        <div className="card" style={{ margin: isDesktop ? '0 0 24px 0' : '0 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: feedbackDone ? 'var(--green-dim)' : 'var(--card)' }}>
            {feedbackDone ? (
                <div style={{ color: 'var(--green)', fontWeight: 700, padding: '8px 0' }}>
                    Thanks for your feedback! ❤️
                </div>
            ) : (
                <>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>
                        How are you enjoying Turtrl?
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        {['😞', '😐', '🙂', '😊', '🤩'].map(emoji => (
                            <button key={emoji} style={{
                                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card2)', border: '1px solid var(--border)', fontSize: '20px', cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}
                                onClick={(e) => {
                                    [...e.currentTarget.parentElement.children].forEach(c => { c.style.transform = 'scale(1)'; c.style.borderColor = 'var(--border)'; });
                                    e.currentTarget.style.transform = 'scale(1.3)';
                                    e.currentTarget.style.borderColor = 'var(--green)';
                                }}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <button className="btn-primary" style={{ padding: '10px', fontSize: '14px' }} onClick={() => setFeedbackDone(true)}>
                        Submit Feedback
                    </button>
                </>
            )}
        </div>
    );

    const renderSettings = () => (
        <div style={{ padding: isDesktop ? '0' : '0 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px', marginBottom: '4px', fontWeight: 700 }}>
                Account
            </div>
            <div className="card option-card" style={{ padding: '16px' }}>
                <span style={{ fontSize: '20px' }}>⚙️</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>Edit Profile</span>
                <span style={{ color: 'var(--muted)' }}>›</span>
            </div>
            <div className="card option-card" style={{ padding: '16px' }}>
                <span style={{ fontSize: '20px' }}>🔐</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>Change Password</span>
                <span style={{ color: 'var(--muted)' }}>›</span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '4px', fontWeight: 700 }}>
                Preferences
            </div>
            <div className="card option-card" style={{ padding: '16px' }}>
                <span style={{ fontSize: '20px' }}>🔔</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>Notifications</span>
                <span style={{ color: 'var(--muted)' }}>›</span>
            </div>
            <div className="card option-card" style={{ padding: '16px' }}>
                <span style={{ fontSize: '20px' }}>🌙</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>Dark Theme</span>
                <span style={{ color: 'var(--muted)', fontSize: '12px' }}>Always on</span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '4px', fontWeight: 700 }}>
                Support
            </div>
            <div className="card option-card" style={{ padding: '16px' }}>
                <span style={{ fontSize: '20px' }}>❓</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>Help Center</span>
                <span style={{ color: 'var(--muted)' }}>›</span>
            </div>

            <button
                className="btn-ghost"
                style={{ borderColor: 'rgba(231,76,60,0.3)', color: 'var(--red)', marginTop: '24px', fontWeight: 700 }}
                onClick={handleLogout}
            >
                Log Out
            </button>
        </div>
    );

    if (isDesktop) {
        return (
            <div style={{ display: 'flex', gap: '40px', height: 'calc(100vh - 64px)', padding: '24px', overflow: 'hidden', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '12px', height: '100%' }}>
                    {renderHero()}
                    {renderStats()}
                    {renderBadges()}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--card)', borderRadius: '24px', border: '1px solid var(--border)', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', padding: '24px' }}>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', marginBottom: '24px', marginTop: 0 }}>⚙️ Settings & Preferences</h2>
                        {renderFeedback()}
                        {renderSettings()}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page" style={{ paddingTop: '56px', paddingBottom: '80px', background: 'var(--bg)' }}>
            <TopNav />
            {renderHero()}
            {renderStats()}
            {renderBadges()}
            {renderFeedback()}
            {renderSettings()}
            <BottomNav />
        </div>
    );
}
