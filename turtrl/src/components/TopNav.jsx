import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { useDevice } from '../utils/hooks';
import mascotImg from '../images/mascot.png';
import coinImg from '../images/coin.png';
import chainImg from '../images/chain.png';

export default function TopNav() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobile, isTablet, isDesktop } = useDevice();

    useEffect(() => {
        setUser(getUser());
        const handleStorage = () => setUser(getUser());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [location.pathname]);

    if (!user) return null;

    const isStatPage = ['/streak', '/coins', '/chains', '/leaderboard'].includes(location.pathname);

    const topNavStyle = isMobile ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '56px',
        background: 'rgba(13,17,23,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
    } : {
        position: 'fixed',
        top: 0,
        left: isDesktop ? '260px' : '72px',
        right: 0,
        height: '64px',
        background: 'rgba(13,17,23,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px'
    };

    const statBtnStyle = isMobile ? navBtnStyle : {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: '10px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    return (
        <div style={topNavStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {isStatPage ? (
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer', padding: 0 }}
                    >
                        ←
                    </button>
                ) : null}

                <img
                    src={mascotImg}
                    alt="Profile"
                    onClick={() => navigate('/profile')}
                    style={{
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        border: '2px solid var(--green)',
                        cursor: 'pointer',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: isMobile ? '4px' : '12px' }}>
                {/* Streak */}
                <button onClick={() => navigate('/streak')} style={statBtnStyle}>
                    <div style={{ fontSize: isMobile ? '16px' : '18px', filter: user.streak === 0 ? 'grayscale(1)' : 'none' }}>🔥</div>
                    <div style={{ fontSize: isMobile ? '10px' : '14px', fontWeight: 'bold', color: user.streak > 0 ? 'var(--gold)' : 'var(--muted)' }}>
                        {user.streak}
                    </div>
                </button>

                {/* Coins */}
                <button onClick={() => navigate('/coins')} style={statBtnStyle}>
                    <img src={coinImg} alt="Coins" style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', objectFit: 'contain' }} />
                    <div style={{ fontSize: isMobile ? '10px' : '14px', fontWeight: 'bold', color: 'var(--green)' }}>
                        {user.coins}
                    </div>
                </button>

                {/* Chains */}
                <button onClick={() => navigate('/chains')} style={statBtnStyle}>
                    <img src={chainImg} alt="Chains" style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', objectFit: 'contain', filter: 'sepia(1) saturate(4) hue-rotate(5deg)' }} />
                    <div style={{ fontSize: isMobile ? '10px' : '14px', fontWeight: 'bold', color: 'var(--gold)' }}>
                        {user.rubies}
                    </div>
                </button>

                {/* Leaderboard */}
                <button onClick={() => navigate('/leaderboard')} style={{ ...statBtnStyle, justifyContent: 'center' }}>
                    <div style={{ fontSize: isMobile ? '20px' : '18px' }}>🏆</div>
                </button>
            </div>
        </div>
    );
}

const navBtnStyle = {
    width: '40px', // slightly wider if value is big, but good for mobile
    minWidth: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    gap: '2px',
    transition: 'background 0.2s'
};

