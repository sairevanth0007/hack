import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { mockPortfolioData, mockNews } from '../data/mockData';

const Home = () => {
    const user = auth.getCurrentUser();
    const navigate = useNavigate();
    const [showStreak, setShowStreak] = useState(true);

    // SVG Progress Ring Calculation
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const target = 100000;
    const current = mockPortfolioData.totalValue;
    const percent = Math.min((current / target) * 100, 100);
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>
            {/* Sticky Header */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 10,
                backgroundColor: 'rgba(13, 17, 23, 0.9)', backdropFilter: 'blur(10px)',
                margin: '-24px -24px 24px -24px', padding: '24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Turtrl<span style={{ color: 'var(--green)' }}>.</span></h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ position: 'relative' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <div style={{ position: 'absolute', top: 0, right: 2, width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%' }}></div>
                    </button>
                    <div
                        onClick={() => navigate('/profile')}
                        style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: 'var(--purple)', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer'
                        }}
                    >
                        {user?.firstName?.[0] || 'U'}
                    </div>
                </div>
            </div>

            {/* Hero Balance Card */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(13, 17, 23, 0) 100%)',
                borderColor: 'rgba(46, 204, 113, 0.2)',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Total Portfolio Value</p>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', margin: '0 0 8px 0', fontWeight: '800' }}>
                        €{mockPortfolioData.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)', fontWeight: 'bold' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        +€{mockPortfolioData.monthlyChange} ({mockPortfolioData.monthlyChangePercent}%)
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
                        <div style={{ position: 'relative', width: 60, height: 60 }}>
                            <svg height="60" width="60" style={{ transform: 'rotate(-90deg)' }}>
                                <circle stroke="var(--card2)" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx="30" cy="30" />
                                <circle
                                    stroke="var(--green)" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference}
                                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                                    strokeLinecap="round" fill="transparent" r={normalizedRadius} cx="30" cy="30"
                                />
                            </svg>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {Math.round(percent)}%
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>To your €100K goal</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--green)', marginTop: '4px' }}>On track for {data?.targetDate || '2030'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Streak Banner */}
            {showStreak && (
                <div style={{
                    background: 'var(--card2)', borderRadius: '12px', padding: '12px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.5rem' }}>🔥</span>
                        <div>
                            <div style={{ fontWeight: 'bold', color: 'var(--gold)' }}>{mockPortfolioData.streakDays} Day Streak</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>You logged in! Keep it up.</div>
                        </div>
                    </div>
                    <button onClick={() => setShowStreak(false)} style={{ color: 'var(--muted)', padding: '4px' }}>✕</button>
                </div>
            )}

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', marginBottom: '40px', paddingBottom: '8px' }} className="hide-scrollbar">
                {[
                    { icon: '+', label: 'Add Funds', bg: 'var(--green)', color: '#000' },
                    { icon: '↑', label: 'Withdraw', bg: 'var(--card2)', color: 'var(--text)' },
                    { icon: '⇄', label: 'Transfer', bg: 'var(--card2)', color: 'var(--text)' },
                    { icon: '📊', label: 'Analytics', bg: 'var(--card2)', color: 'var(--text)' },
                ].map((action, i) => (
                    <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '70px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: action.bg, color: action.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.5rem', fontWeight: 'bold', border: action.bg === 'var(--card2)' ? '1px solid var(--border)' : 'none'
                        }}>
                            {action.icon}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{action.label}</span>
                    </button>
                ))}
            </div>

            {/* AI Nudge */}
            <div className="card glow-green" onClick={() => navigate('/chat')} style={{
                marginBottom: '40px', cursor: 'pointer', background: 'var(--card2)', display: 'flex', alignItems: 'center', gap: '16px'
            }}>
                <div style={{ fontSize: '2rem', background: 'rgba(46, 204, 113, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🤖
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>AI Advisor Insight</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Your portfolio needs attention. Tap to ask why →</div>
                </div>
            </div>

            {/* Your Investments (Horizontal Scroll) */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>Your Investments</h3>
                    <button onClick={() => navigate('/portfolio')} style={{ color: 'var(--green)', fontSize: '0.9rem' }}>See all</button>
                </div>
                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', margin: '0 -24px', padding: '0 24px 16px 24px' }} className="hide-scrollbar">
                    {mockPortfolioData.holdings.map(item => (
                        <div key={item.id} className="card" style={{ minWidth: '200px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {item.type === 'crypto' ? '₿' : item.type === 'stock' ? '📈' : '🏦'}
                                </div>
                                <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
                                €{item.value.toLocaleString()}
                            </div>
                            <div style={{ color: item.gainPercent >= 0 ? 'var(--green)' : 'var(--error)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 'bold' }}>
                                {item.gainPercent >= 0 ? '+' : ''}€{item.gain} ({item.gainPercent}%)
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market Pulse */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>Market Pulse</h3>
                    <button onClick={() => navigate('/news')} style={{ color: 'var(--green)', fontSize: '0.9rem' }}>More news</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {mockNews.slice(0, 3).map(news => (
                        <div key={news.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/news')}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: news.category === 'Breaking' ? 'var(--error)' : 'var(--purple)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                    {news.category}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{news.timeAgo}</span>
                            </div>
                            <div style={{ fontWeight: '600', lineHeight: 1.4 }}>{news.headline}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{news.source}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
