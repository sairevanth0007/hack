import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLeaderboardData } from '../data/mockData';

const Leaderboard = () => {
    const navigate = useNavigate();
    const data = mockLeaderboardData;
    const [filter, setFilter] = useState('weekly');

    const top3 = data.users.slice(0, 3);
    const rest = data.users.slice(3);

    const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
    const podiumHeights = [100, 140, 80];
    const podiumColors = ['#C0C0C0', '#f4c430', '#CD7F32'];
    const podiumLabels = ['2nd', '1st', '3rd'];

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', marginTop: '8px' }}>
                <button onClick={() => navigate(-1)} style={{ padding: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Leaderboard</h1>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex', gap: '8px', marginBottom: '32px',
                background: 'var(--card)', borderRadius: '14px', padding: '4px',
                border: '1px solid var(--border)'
            }}>
                {['weekly', 'allTime'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            flex: 1, padding: '12px', borderRadius: '12px', fontWeight: '600',
                            fontSize: '0.9rem', transition: 'all 0.2s ease',
                            background: filter === f ? 'var(--green)' : 'transparent',
                            color: filter === f ? '#000' : 'var(--muted)',
                        }}
                    >
                        {f === 'weekly' ? 'This Week' : 'All Time'}
                    </button>
                ))}
            </div>

            {/* Top 3 Podium */}
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                gap: '12px', marginBottom: '40px', padding: '0 8px'
            }}>
                {podiumOrder.map((user, i) => (
                    <div key={user.rank} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        flex: 1, maxWidth: '120px'
                    }}>
                        {/* Avatar */}
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                            <div style={{
                                width: i === 1 ? '72px' : '56px',
                                height: i === 1 ? '72px' : '56px',
                                borderRadius: '50%',
                                background: user.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold', fontSize: i === 1 ? '1.3rem' : '1rem',
                                border: `3px solid ${podiumColors[i]}`,
                                boxShadow: `0 0 20px ${podiumColors[i]}40`
                            }}>
                                {user.initials}
                            </div>
                            {i === 1 && (
                                <div style={{
                                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                                    fontSize: '1.3rem'
                                }}>👑</div>
                            )}
                        </div>

                        {/* Name & Points */}
                        <div style={{
                            fontWeight: '600', fontSize: '0.85rem', marginBottom: '4px',
                            textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden',
                            textOverflow: 'ellipsis', maxWidth: '100%'
                        }}>
                            {user.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 'bold', marginBottom: '12px' }}>
                            {user.points.toLocaleString()} pts
                        </div>

                        {/* Podium Bar */}
                        <div style={{
                            width: '100%', height: `${podiumHeights[i]}px`,
                            borderRadius: '12px 12px 0 0',
                            background: `linear-gradient(180deg, ${podiumColors[i]}30 0%, ${podiumColors[i]}10 100%)`,
                            border: `1px solid ${podiumColors[i]}40`,
                            borderBottom: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '1.2rem', color: podiumColors[i],
                            fontFamily: 'var(--font-heading)'
                        }}>
                            {podiumLabels[i]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Remaining Rankings */}
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {rest.map(user => (
                        <div key={user.rank} style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '14px 16px', borderRadius: '16px',
                            background: user.isCurrentUser ? 'rgba(46, 204, 113, 0.08)' : 'var(--card)',
                            border: `1px solid ${user.isCurrentUser ? 'rgba(46, 204, 113, 0.3)' : 'var(--border)'}`,
                            boxShadow: user.isCurrentUser ? '0 0 20px rgba(46, 204, 113, 0.1)' : 'none'
                        }}>
                            {/* Rank */}
                            <div style={{
                                width: '28px', fontWeight: 'bold', fontSize: '1rem',
                                color: user.isCurrentUser ? 'var(--green)' : 'var(--muted)',
                                fontFamily: 'var(--font-heading)', textAlign: 'center', flexShrink: 0
                            }}>
                                #{user.rank}
                            </div>

                            {/* Avatar */}
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: user.color, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem',
                                flexShrink: 0,
                                border: user.isCurrentUser ? '2px solid var(--green)' : 'none'
                            }}>
                                {user.initials}
                            </div>

                            {/* Name & Streak */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontWeight: '600', fontSize: '0.95rem',
                                    color: user.isCurrentUser ? 'var(--green)' : 'var(--text)'
                                }}>
                                    {user.name}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    🔥 {user.streak} days
                                </div>
                            </div>

                            {/* Points */}
                            <div style={{
                                fontWeight: 'bold', fontSize: '0.95rem', flexShrink: 0,
                                color: user.isCurrentUser ? 'var(--green)' : 'var(--gold)',
                                fontFamily: 'var(--font-heading)'
                            }}>
                                {user.points.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Your Position Banner */}
            <div className="card" style={{
                marginTop: '24px',
                background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%)',
                borderColor: 'rgba(46, 204, 113, 0.25)',
                textAlign: 'center', padding: '24px'
            }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '4px' }}>Your Position</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--green)' }}>
                    #{data.currentUserRank}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '8px' }}>
                    Keep investing to climb the ranks! 🚀
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
