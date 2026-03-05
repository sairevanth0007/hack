import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPointsData } from '../data/mockData';

const Points = () => {
    const navigate = useNavigate();
    const data = mockPointsData;
    const levelProgress = ((data.level.currentXP - 2000) / (data.level.nextLevelXP - 2000)) * 100;

    // Progress Ring
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (levelProgress / 100) * circumference;

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', marginTop: '8px' }}>
                <button onClick={() => navigate(-1)} style={{ padding: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Points & XP</h1>
            </div>

            {/* Hero Card */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(46, 204, 113, 0.08) 100%)',
                borderColor: 'rgba(124, 58, 237, 0.3)',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.06)' }}></div>

                {/* Progress Ring */}
                <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
                    <svg height="100" width="100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle stroke="var(--card2)" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx="50" cy="50" />
                        <circle
                            stroke="var(--purple)" strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                            strokeLinecap="round" fill="transparent" r={normalizedRadius} cx="50" cy="50"
                        />
                    </svg>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>Lv.{data.level.number}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{Math.round(levelProgress)}%</div>
                    </div>
                </div>

                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>Total Points</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                        {data.totalPoints.toLocaleString()}
                    </div>
                    <div style={{
                        marginTop: '8px', fontSize: '0.8rem', fontWeight: 'bold',
                        color: data.level.color, background: 'rgba(255,255,255,0.08)',
                        padding: '4px 10px', borderRadius: '20px', display: 'inline-block'
                    }}>
                        {data.level.name}
                    </div>
                </div>
            </div>

            {/* Level Progress Bar */}
            <div className="card" style={{ marginBottom: '32px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{data.level.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                        {data.level.currentXP.toLocaleString()} / {data.level.nextLevelXP.toLocaleString()} XP
                    </span>
                </div>
                <div style={{ height: '10px', background: 'var(--card2)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', width: `${levelProgress}%`,
                        background: 'linear-gradient(90deg, var(--purple), var(--green))',
                        borderRadius: '5px', transition: 'width 1s ease-in-out'
                    }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Lv.{data.level.number}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Lv.{data.level.number + 1}</span>
                </div>
            </div>

            {/* Recent Activity */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.recentActivity.map(item => (
                        <div key={item.id} style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '14px 16px', borderRadius: '14px',
                            background: 'var(--card)', border: '1px solid var(--border)'
                        }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '12px',
                                background: item.type === 'earn' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(124, 58, 237, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem', flexShrink: 0
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {item.title}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.time}</div>
                            </div>
                            <div style={{
                                fontWeight: 'bold', fontSize: '0.95rem', flexShrink: 0,
                                color: item.type === 'earn' ? 'var(--green)' : 'var(--purple)'
                            }}>
                                {item.type === 'earn' ? '+' : ''}{item.points}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rewards Store */}
            <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Rewards Store</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.rewards.map(r => (
                        <div key={r.id} className="card" style={{
                            padding: '16px', display: 'flex', alignItems: 'center', gap: '16px',
                            opacity: r.redeemed ? 0.5 : 1
                        }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                background: 'var(--card2)', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0
                            }}>
                                {r.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{r.title}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>{r.description}</div>
                            </div>
                            <button style={{
                                padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem',
                                background: r.redeemed ? 'var(--card2)' : (data.totalPoints >= r.cost ? 'var(--green)' : 'var(--card2)'),
                                color: r.redeemed ? 'var(--muted)' : (data.totalPoints >= r.cost ? '#000' : 'var(--muted)'),
                                border: `1px solid ${r.redeemed ? 'var(--border)' : 'transparent'}`,
                                cursor: r.redeemed ? 'default' : 'pointer',
                                flexShrink: 0
                            }}>
                                {r.redeemed ? 'Claimed' : `${r.cost} pts`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Points;
