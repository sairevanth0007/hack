import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import coinImg from '../images/coin.png';

export default function CoinsPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    if (!user) return null;

    const coinsHistory = user.coinsHistory || [];

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
                    <img src={coinImg} alt="Coins" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700 }}>Your Coins</div>
                </div>
            </div>

            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '64px', color: 'var(--green)', fontWeight: 800, textAlign: 'center', marginBottom: '32px' }}>
                {user.coins}
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ marginBottom: '16px' }}>How to earn</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px', minHeight: '44px' }}>
                        <span>Complete a stage</span>
                        <span style={{ color: 'var(--green)', fontWeight: 700 }}>+50 Coins</span>
                    </div>
                    <div className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '16px', minHeight: '44px' }}>
                        <span>Pass a news quiz</span>
                        <span style={{ color: 'var(--green)', fontWeight: 700 }}>+10 Coins</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="section-title" style={{ marginBottom: '16px' }}>History</h3>
                {coinsHistory.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>
                        No coins earned yet. Start playing!
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[...coinsHistory].reverse().map((entry, idx) => (
                            <div key={idx} className="card" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', minHeight: '44px' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{entry.source}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                                        {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div style={{ color: 'var(--green)', fontWeight: 700 }}>+{entry.amount} Coins</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
