import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser } from '../utils/auth'
import mascotImg from '../images/mascot.png'

export default function CoinsPage() {
    const navigate = useNavigate()
    const [coins, setCoins] = useState(0)
    const [history, setHistory] = useState([])

    const refresh = () => {
        try {
            const u = getUser()
            if (!u) { navigate('/'); return }
            setCoins(u.coins || 0)
            setHistory(u.coinsHistory || [])
        } catch (e) {
            console.error('CoinsPage error:', e)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refresh()
        window.addEventListener('focus', refresh)
        document.addEventListener('visibilitychange', refresh)
        return () => {
            window.removeEventListener('focus', refresh)
            document.removeEventListener('visibilitychange', refresh)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatDate = (iso) => {
        try {
            const d = new Date(iso)
            return d.toLocaleDateString('en-DE', {
                month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            })
        } catch { return '' }
    }

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
            {/* Sticky header */}
            <div style={{
                position: 'sticky', top: '56px',
                background: 'var(--bg)',
                padding: '12px 20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '12px',
                zIndex: 10
            }}>
                <button onClick={() => navigate(-1)} style={{
                    background: 'none', border: 'none',
                    color: 'var(--muted)', fontSize: '20px',
                    cursor: 'pointer', padding: '4px 8px',
                    minWidth: '44px', minHeight: '44px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center'
                }}>←</button>
                <span style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '20px', fontWeight: '700'
                }}>Your Coins</span>
            </div>

            {/* Hero */}
            <div style={{
                textAlign: 'center', padding: '24px 20px 16px'
            }}>
                <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '64px', fontWeight: '800',
                    color: 'var(--gold)', lineHeight: 1
                }}>{coins.toLocaleString()}</div>
                <div style={{
                    color: 'var(--muted)', fontSize: '14px',
                    marginTop: '6px'
                }}>Total Coins Earned</div>
            </div>

            {/* How to earn */}
            <div style={{ padding: '0 20px 16px' }}>
                <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '15px', fontWeight: '700',
                    marginBottom: '10px'
                }}>How to Earn</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                        { icon: '🗺', label: 'Complete a Stage', amount: '+50' },
                        { icon: '📰', label: 'Pass News Quiz', amount: '+10' }
                    ].map((item, i) => (
                        <div key={i} style={{
                            flex: 1, background: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px', padding: '14px',
                            textAlign: 'center', width: '100%'
                        }}>
                            <div style={{ fontSize: '24px' }}>{item.icon}</div>
                            <div style={{
                                color: 'var(--green)', fontWeight: '700',
                                fontSize: '16px', margin: '6px 0 4px',
                                fontFamily: 'Syne, sans-serif'
                            }}>{item.amount}</div>
                            <div style={{
                                color: 'var(--muted)', fontSize: '12px'
                            }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* History */}
            <div style={{ padding: '0 20px' }}>
                <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '15px', fontWeight: '700',
                    marginBottom: '10px'
                }}>History</div>

                {history.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '40px 20px',
                        background: 'var(--card)',
                        borderRadius: '16px',
                        border: '1px solid var(--border)',
                        width: '100%'
                    }}>
                        <img src={mascotImg} width={70}
                            style={{ marginBottom: '12px' }} alt="mascot" />
                        <div style={{
                            fontFamily: 'Syne, sans-serif',
                            fontSize: '16px', fontWeight: '700',
                            marginBottom: '6px'
                        }}>No coins yet</div>
                        <div style={{
                            color: 'var(--muted)', fontSize: '13px',
                            marginBottom: '16px'
                        }}>
                            Complete stages and news quizzes to earn coins!
                        </div>
                        <button
                            onClick={() => navigate('/stages')}
                            style={{
                                background: 'var(--green)', color: '#000',
                                border: 'none', borderRadius: '12px',
                                padding: '12px 24px', fontWeight: '700',
                                cursor: 'pointer', fontSize: '14px',
                                fontFamily: 'DM Sans, sans-serif'
                            }}
                        >Go to Stages</button>
                    </div>
                ) : (
                    <div style={{
                        background: 'var(--card)',
                        borderRadius: '16px',
                        border: '1px solid var(--border)',
                        overflow: 'hidden',
                        width: '100%'
                    }}>
                        {history.map((item, i) => (
                            <div key={item.id || i} style={{
                                display: 'flex', alignItems: 'center',
                                padding: '14px 16px',
                                borderBottom: i < history.length - 1
                                    ? '1px solid var(--border)' : 'none',
                                minHeight: '52px'
                            }}>
                                <div style={{ flex: 1, marginRight: '12px', minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '14px', fontWeight: '500',
                                        overflow: 'hidden', textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>{item.source || 'Coins earned'}</div>
                                    <div style={{
                                        fontSize: '11px', color: 'var(--muted)',
                                        marginTop: '2px'
                                    }}>{formatDate(item.date)}</div>
                                </div>
                                <div style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontSize: '15px', fontWeight: '700',
                                    color: 'var(--green)', whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}>+{item.amount}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
