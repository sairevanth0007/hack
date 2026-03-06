import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import Mascot from '../components/Mascot';
import { getUser } from '../utils/auth';
import { useDevice } from '../utils/hooks';
import AssetLogo from '../components/AssetLogo';

export default function Analysis() {
    const { isDesktop } = useDevice();
    const [activeTab, setActiveTab] = useState('personal'); // personal, community, market
    const [postInput, setPostInput] = useState('');
    const [mockPosts, setMockPosts] = useState([
        { id: 1, user: 'CryptoQueen 🧠', time: '2m', likes: 14, comments: 2, text: 'Anyone else holding BTC through this volatility? 📉' },
        { id: 2, user: 'SteadyGrowth 📈', time: '1h', likes: 8, comments: 4, text: 'ETFs vs individual stocks — 6 months in, my honest review' },
        { id: 3, user: 'PennyStocker 🌱', time: '3h', likes: 25, comments: 1, text: 'Just hit my first €5K saved — small milestone but proud 🙌' }
    ]);

    const navigate = useNavigate();
    const user = getUser();
    if (!user) return null;

    const tradeHistory = user.tradeHistory || [];

    const handlePost = () => {
        if (!postInput.trim()) return;
        setMockPosts([{
            id: Date.now(),
            user: `${user.firstName} ${user.level === 'Beginner' ? '🌱' : user.level === 'Intermediate' ? '📈' : '🧠'}`,
            time: 'Just now',
            likes: 0,
            comments: 0,
            text: postInput
        }, ...mockPosts]);
        setPostInput('');
    };

    const renderPersonal = () => {
        if (tradeHistory.length === 0) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: isDesktop ? '20px 0' : '40px 24px', textAlign: 'center' }}>
                    <Mascot size={80} animation="float" style={{ marginBottom: '24px' }} />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', marginBottom: '8px' }}>No trades yet</h2>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Complete investment stages to see your analysis here.</p>
                    <button className="btn-primary" onClick={() => navigate('/stages')}>Go to Stages</button>
                </div>
            );
        }

        const totalTrades = tradeHistory.length;
        const bestReturn = Math.max(...tradeHistory.map(t => t.returnPct));
        const totalPnL = tradeHistory.reduce((sum, t) => sum + t.profit, 0);

        return (
            <div style={{ padding: isDesktop ? '0' : '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 700 }}>{totalTrades}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Trades</div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border)' }}></div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: bestReturn >= 0 ? 'var(--green)' : 'var(--red)' }}>
                            {bestReturn.toFixed(1)}%
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Best Return</div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border)' }}></div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: totalPnL >= 0 ? 'var(--green)' : 'var(--red)' }}>
                            {totalPnL >= 0 ? '+' : '-'}€{Math.abs(totalPnL).toFixed(0)}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Total P&L</div>
                    </div>
                </div>

                <h3 className="section-title" style={{ padding: 0, margin: '8px 0 0 0' }}>Trade History</h3>

                {tradeHistory.slice().reverse().map((t, idx) => {
                    const isProfit = t.profit > 0;
                    return (
                        <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t.symbol && <AssetLogo symbol={t.symbol} size={24} />}
                                    <span style={{ fontWeight: 700 }}>{t.asset}</span>
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                                    {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                                <span style={{ color: 'var(--muted)' }}>Invested €{t.invested}</span>
                                <span style={{ color: isProfit ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{t.returnPct.toFixed(1)}%</span>
                                <span style={{ color: isProfit ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{isProfit ? '+' : '-'}€{Math.abs(t.profit).toFixed(2)}</span>
                            </div>
                            <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--muted)', background: 'var(--card2)', padding: '8px', borderRadius: '8px', marginTop: '4px' }}>
                                💡 {isProfit ? "Good call! Diversifying further reduces risk." : "Losses are lessons. Consider lower-risk assets next time."}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderCommunity = () => (
        <div style={{ padding: isDesktop ? '0' : '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, flexShrink: 0 }}>
                    {user.firstName.substring(0, 1)}
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="What's on your mind?"
                        value={postInput}
                        onChange={e => setPostInput(e.target.value)}
                        style={{ borderRadius: '24px', paddingRight: '70px' }}
                        onKeyDown={e => e.key === 'Enter' && handlePost()}
                    />
                    <button
                        onClick={handlePost}
                        style={{
                            position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)',
                            background: 'var(--green)', border: 'none', color: '#000', fontWeight: 700,
                            padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer'
                        }}
                    >
                        Post
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                {mockPosts.map(post => (
                    <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                                    {post.user.substring(0, 2).toUpperCase()}
                                </div>
                                <div style={{ fontWeight: 600, fontSize: '14px' }}>{post.user}</div>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{post.time}</div>
                        </div>

                        <div style={{ fontSize: '14px', lineHeight: 1.5 }}>{post.text}</div>

                        <div style={{ display: 'flex', gap: '16px', color: 'var(--muted)', fontSize: '13px', fontWeight: 600 }}>
                            <div style={{ cursor: 'pointer' }}>👍 {post.likes}</div>
                            <div style={{ cursor: 'pointer' }}>💬 {post.comments}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMarket = () => (
        <div style={{ padding: isDesktop ? '0' : '0 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Sentiment */}
            <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Market Sentiment</div>
                <div style={{ position: 'relative', height: '60px', overflow: 'hidden', width: '200px', margin: '0 auto', background: 'var(--card2)', borderRadius: '100px 100px 0 0' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', width: '2px', height: '50px', background: 'var(--text)', transformOrigin: 'bottom', transform: 'rotate(25deg)', zIndex: 2 }}></div>
                    <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text)', zIndex: 3 }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, padding: '0 20px', marginTop: '8px' }}>
                    <span style={{ color: 'var(--red)' }}>Bearish</span>
                    <span style={{ color: 'var(--muted)' }}>Neutral</span>
                    <span style={{ color: 'var(--green)' }}>Bullish</span>
                </div>
                <div style={{ marginTop: '16px', fontWeight: 800, color: 'var(--green)', fontSize: '18px' }}>
                    Moderately Bullish 📈
                </div>
            </div>

            {/* Recommendations */}
            <div>
                <h3 className="section-title" style={{ padding: 0, margin: '0 0 16px 0' }}>This Week's Picks 🎯</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        { symbol: 'VWCE.DE', a: 'MSCI World', t: 'ETF', r: 'Defensive play amid rate uncertainty', ret: '6-9%', risk: 'low' },
                        { symbol: 'BTC-EUR', a: 'Bitcoin', t: 'Crypto', r: 'Momentum building post-halving period', ret: '-15 to +40%', risk: 'high' },
                        { symbol: 'BUND-10Y', a: 'German Gov Bond', t: 'Bond', r: 'Safe haven with 4.2% guaranteed', ret: '4-4.5%', risk: 'low' }
                    ].map((rec, i) => (
                        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AssetLogo symbol={rec.symbol} size={28} />
                                <span style={{ fontWeight: 700, fontSize: '15px' }}>{rec.a}</span>
                                <span className="pill" style={{ fontSize: '10px', padding: '2px 8px' }}>{rec.t}</span>
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{rec.r}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 600 }}>Exp: {rec.ret}</span>
                                <span className="pill" style={{
                                    fontSize: '10px', padding: '2px 8px',
                                    color: rec.risk === 'low' ? 'var(--green)' : 'var(--orange)',
                                    borderColor: rec.risk === 'low' ? 'var(--green)' : 'var(--orange)'
                                }}>
                                    {rec.risk} risk
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending */}
            <div>
                <h3 className="section-title" style={{ padding: 0, margin: '0 0 12px 0' }}>Trending 🔥</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['#ETFs', '#Bitcoin', '#InterestRates', '#Dividends', '#CryptoWinter', '#IndexInvesting'].map(tag => (
                        <div key={tag} className="pill">{tag}</div>
                    ))}
                </div>
            </div>

            {/* Events */}
            <div>
                <h3 className="section-title" style={{ padding: 0, margin: '0 0 12px 0' }}>Market Calendar 📅</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { d: 'Mar 19', n: 'ECB Interest Rate Decision', l: 'High', c: 'var(--red)' },
                        { d: 'Apr 1', n: 'Q1 Earnings Season Begins', l: 'Medium', c: 'var(--gold)' },
                        { d: 'Apr 20', n: 'Bitcoin Halving Anniversary', l: 'Medium', c: 'var(--gold)' }
                    ].map((ev, i) => (
                        <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
                            <div style={{ fontWeight: 800, fontSize: '14px', width: '45px', textAlign: 'center' }}>{ev.d}</div>
                            <div style={{ flex: 1, fontSize: '13px', fontWeight: 600 }}>{ev.n}</div>
                            <div className="pill" style={{ fontSize: '10px', padding: '2px 6px', color: ev.c, borderColor: ev.c }}>{ev.l}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

    if (isDesktop) {
        return (
            <div style={{ display: 'flex', gap: '40px', height: 'calc(100vh - 64px)', padding: '24px', overflow: 'hidden' }}>
                {/* LEFT COLUMN: Personal and Market side-by-side or stacked? They fit side-by-side if we have 3 columns total effectively. */}
                <div style={{ flex: 1.5, display: 'flex', gap: '32px', overflowY: 'auto', paddingRight: '12px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', margin: 0 }}>📈 Personal Performance</h2>
                        {renderPersonal()}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', margin: 0 }}>🌍 Market Pulse</h2>
                        {renderMarket()}
                    </div>
                </div>

                {/* RIGHT COLUMN: Community feed */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--card)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', padding: '24px' }}>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', marginBottom: '24px', marginTop: 0 }}>👥 Community Hub</h2>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {renderCommunity()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page" style={{ paddingTop: '56px', paddingBottom: '80px', background: 'var(--bg)' }}>
            <TopNav />

            <div style={{ padding: '16px 20px 0', marginBottom: '16px' }}>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', margin: 0 }}>Analysis 📊</h1>
            </div>

            <div style={{ padding: '0 20px', display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {[
                    { id: 'personal', i: '👤', l: 'Personal' },
                    { id: 'community', i: '👥', l: 'Community' },
                    { id: 'market', i: '📈', l: 'Market' }
                ].map(t => (
                    <div
                        key={t.id}
                        className="card"
                        onClick={() => setActiveTab(t.id)}
                        style={{
                            flex: 1, textAlign: 'center', padding: '12px 8px', cursor: 'pointer',
                            border: activeTab === t.id ? '2px solid var(--green)' : '1px solid var(--border)',
                            background: activeTab === t.id ? 'var(--green-dim)' : 'var(--card)'
                        }}
                    >
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{t.i}</div>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{t.l}</div>
                    </div>
                ))}
            </div>

            {activeTab === 'personal' && renderPersonal()}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'market' && renderMarket()}

            <BottomNav />
        </div>
    );
}
