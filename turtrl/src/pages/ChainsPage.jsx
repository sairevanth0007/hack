import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import chainImg from '../images/chain.png';

export default function ChainsPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    if (!user) return null;

    const chainsHistory = user.chainsHistory || [];

    return (
        <div style={{
            padding: '64px 20px 80px',
            maxWidth: '600px',
            margin: '0 auto',
            overflowY: 'auto',
            minHeight: '100vh',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
        }}>
            {/* Sticky Header */}
            <div style={{
                position: 'sticky',
                top: '56px',
                background: 'var(--bg)',
                padding: '12px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                marginBottom: '16px'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none', border: 'none', color: 'var(--muted)',
                        fontSize: '20px', cursor: 'pointer',
                        minWidth: '44px', minHeight: '44px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--green)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                    ←
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <img src={chainImg} alt="Chains" style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'sepia(1) saturate(4) hue-rotate(5deg)' }} />
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700 }}>Your Chains</div>
                </div>
            </div>

            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '64px', color: 'var(--gold)', fontWeight: 800, textAlign: 'center', marginBottom: '32px' }}>
                {user.rubies}
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ marginBottom: '16px' }}>How to earn</h3>
                <div className="card" style={{ padding: '16px', minHeight: '44px' }}>
                    Maintain a perfect 60-day streak → earn 1 Chain
                </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ marginBottom: '16px' }}>How to spend</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px', minHeight: '44px' }}>
                        <span>Skip a Stage</span>
                        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>1 Chain</span>
                    </div>
                    <div className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px', minHeight: '44px' }}>
                        <span>Buy a Streak Shield</span>
                        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>1 Chain</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="section-title" style={{ marginBottom: '16px' }}>History</h3>
                {chainsHistory.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>
                        No chains earned yet. Keep up your streak!
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[...chainsHistory].reverse().map((entry, idx) => (
                            <div key={idx} className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', minHeight: '44px' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{entry.source}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                                        {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div style={{ color: entry.amount > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>
                                    {entry.amount > 0 ? '+' : ''}{entry.amount} Chains
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
