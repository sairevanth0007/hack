import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStreakData } from '../data/mockData';

const Streak = () => {
    const navigate = useNavigate();
    const data = mockStreakData;

    const currentMilestoneIndex = data.milestones.findIndex(m => !m.reached);
    const progressPercent = currentMilestoneIndex === -1
        ? 100
        : ((currentMilestoneIndex) / data.milestones.length) * 100;

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', marginTop: '8px' }}>
                <button onClick={() => navigate(-1)} style={{ padding: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Your Streak</h1>
            </div>

            {/* Hero Streak Card */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(244, 196, 48, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%)',
                borderColor: 'rgba(244, 196, 48, 0.3)',
                marginBottom: '32px',
                textAlign: 'center',
                padding: '32px 24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: 'rgba(244, 196, 48, 0.08)',
                }}></div>
                <div style={{ fontSize: '4rem', marginBottom: '8px' }}>🔥</div>
                <div style={{
                    fontSize: '3.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)',
                    color: 'var(--gold)', lineHeight: 1
                }}>
                    {data.currentStreak}
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--muted)', marginTop: '4px', fontWeight: '500' }}>
                    Day Streak
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '24px' }}>
                    <div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{data.bestStreak}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Best Streak</div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border)' }}></div>
                    <div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{data.totalActiveDays}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Total Days</div>
                    </div>
                </div>
            </div>

            {/* Weekly Calendar */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>This Week</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    {data.weekCalendar.map((d, i) => (
                        <div key={i} style={{
                            flex: 1, textAlign: 'center', padding: '12px 4px',
                            borderRadius: '16px',
                            background: d.active ? 'rgba(46, 204, 113, 0.1)' : 'var(--card)',
                            border: `1px solid ${d.active ? 'rgba(46, 204, 113, 0.3)' : 'var(--border)'}`,
                            transition: 'all 0.2s ease'
                        }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '8px', fontWeight: '600' }}>
                                {d.day}
                            </div>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 4px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: d.active ? 'var(--green)' : 'transparent',
                                color: d.active ? '#000' : 'var(--muted)',
                                fontWeight: 'bold', fontSize: '0.85rem'
                            }}>
                                {d.active ? '✓' : d.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Milestones</h3>

                {/* Progress Bar */}
                <div style={{
                    height: '6px', background: 'var(--card2)', borderRadius: '3px',
                    marginBottom: '24px', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%', width: `${progressPercent}%`,
                        background: 'linear-gradient(90deg, var(--green), var(--gold))',
                        borderRadius: '3px', transition: 'width 1s ease-in-out'
                    }}></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.milestones.map((m, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '16px',
                            padding: '14px 16px', borderRadius: '14px',
                            background: m.reached ? 'rgba(46, 204, 113, 0.08)' : 'var(--card)',
                            border: `1px solid ${m.reached ? 'rgba(46, 204, 113, 0.2)' : 'var(--border)'}`,
                            opacity: m.reached ? 1 : 0.6
                        }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: m.reached ? 'var(--green)' : 'var(--card2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1rem', fontWeight: 'bold',
                                color: m.reached ? '#000' : 'var(--muted)',
                                flexShrink: 0
                            }}>
                                {m.reached ? '✓' : m.days}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{m.label}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{m.reward}</div>
                            </div>
                            {m.reached && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 'bold', background: 'rgba(46,204,113,0.15)', padding: '4px 10px', borderRadius: '20px' }}>
                                    Claimed
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Streak Rewards */}
            <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Streak Rewards</h3>
                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px 24px' }} className="hide-scrollbar">
                    {data.rewards.map(r => (
                        <div key={r.id} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            gap: '8px', minWidth: '90px', padding: '16px 12px',
                            borderRadius: '16px', background: 'var(--card)',
                            border: `1px solid ${r.unlocked ? 'rgba(244, 196, 48, 0.3)' : 'var(--border)'}`,
                            opacity: r.unlocked ? 1 : 0.5
                        }}>
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '50%',
                                background: 'var(--card2)', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: '1.5rem',
                                boxShadow: r.unlocked ? '0 0 15px rgba(244, 196, 48, 0.2)' : 'none',
                                position: 'relative'
                            }}>
                                {r.icon}
                                {!r.unlocked && (
                                    <div style={{ position: 'absolute', bottom: -4, right: -4, fontSize: '0.7rem' }}>🔒</div>
                                )}
                            </div>
                            <span style={{ fontSize: '0.75rem', textAlign: 'center', fontWeight: '600' }}>{r.title}</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--muted)', textAlign: 'center' }}>{r.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Streak;
