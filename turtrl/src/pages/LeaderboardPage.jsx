import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LeaderboardPage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('coins');

    useEffect(() => {
        const loggedInUser = getUser();
        if (!loggedInUser) {
            navigate('/');
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentUser(loggedInUser);

        const getAllUsers = () => {
            try {
                const usersList = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('turtrl_user_') && key !== 'turtrl_user') {
                        try {
                            const val = localStorage.getItem(key);
                            if (val) usersList.push(JSON.parse(val));
                        } catch (error) {
                            // skip malformed entry
                        }
                    }
                }
                return usersList;
            } catch (error) {
                return [];
            }
        };

        // Fetch all users from localStorage
        const users = getAllUsers();

        if (users.length === 0 && loggedInUser) {
            // Need the logged in user to be in the list if not stored with turtrl_user_email key
            // The prompt asks to save public stats with turtrl_user_{email}.
            // If they aren't saved yet, let's at least show them.
            users.push(loggedInUser);
        }

        // De-duplicate if needed (same email)
        const uniqueUsers = [];
        const seenEmails = new Set();
        users.forEach(u => {
            if (u && u.email && !seenEmails.has(u.email)) {
                seenEmails.add(u.email);
                uniqueUsers.push(u);
            }
        });

        setAllUsers(uniqueUsers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!currentUser) return null;

    // Filter and sort based on tab
    const sortedUsers = [...allUsers].sort((a, b) => {
        if (activeTab === 'coins') {
            return (b.coins || 0) - (a.coins || 0);
        } else {
            return (b.streak || 0) - (a.streak || 0);
        }
    });

    const isOnlyUser = allUsers.length <= 1;

    // Show mock users if there's only 1 user
    const displayUsers = isOnlyUser ? [
        currentUser,
        { email: 'mock1', firstName: 'Crypto', lastName: 'King', level: 5, coins: 14500, streak: 100, isMock: true, color: '#e74c3c' },
        { email: 'mock2', firstName: 'Diamond', lastName: 'Hands', level: 3, coins: 8200, streak: 45, isMock: true, color: '#7c3aed' },
        { email: 'mock3', firstName: 'Steady', lastName: 'Growth', level: 3, coins: 4100, streak: 12, isMock: true, color: '#f4c430' },
        { email: 'mock4', firstName: 'Moon', lastName: 'Walker', level: 2, coins: 2300, streak: 5, isMock: true, color: '#3498db' },
        { email: 'mock5', firstName: 'Penny', lastName: 'Stocker', level: 1, coins: 500, streak: 1, isMock: true, color: '#e67e22' },
    ].sort((a, b) => activeTab === 'coins' ? (b.coins || 0) - (a.coins || 0) : (b.streak || 0) - (a.streak || 0)) : sortedUsers;

    const colors = ['#e74c3c', '#7c3aed', '#f4c430', '#2ecc71', '#ff6b35', '#3498db', '#e67e22', '#1abc9c', '#95a5a6'];

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
            {/* Sticky Header */}
            <div style={{
                position: 'sticky',
                top: '56px',
                background: 'var(--bg)',
                padding: '12px 20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none', border: 'none', color: 'var(--muted)',
                        fontSize: '20px', cursor: 'pointer', padding: '4px 8px',
                        minWidth: '44px', minHeight: '44px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--green)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                    ←
                </button>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: '700' }}>
                    Leaderboard 🏆
                </span>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 20px 16px' }}>
                <div style={{ background: 'var(--card)', borderRadius: '14px', padding: '5px', display: 'flex', width: '100%' }}>
                    <button
                        onClick={() => setActiveTab('coins')}
                        style={{
                            flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', cursor: 'pointer', minHeight: '44px',
                            background: activeTab === 'coins' ? 'var(--green)' : 'transparent',
                            color: activeTab === 'coins' ? '#000' : 'var(--muted)'
                        }}
                    >
                        Coins
                    </button>
                    <button
                        onClick={() => setActiveTab('streak')}
                        style={{
                            flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', cursor: 'pointer', minHeight: '44px',
                            background: activeTab === 'streak' ? 'var(--green)' : 'transparent',
                            color: activeTab === 'streak' ? '#000' : 'var(--muted)'
                        }}
                    >
                        Streak
                    </button>
                </div>
            </div>

            <div style={{ padding: '0 20px', width: '100%' }}>
                {isOnlyUser && (
                    <div style={{ textAlign: 'center', margin: '8px 0 24px', color: 'var(--muted)', fontSize: '14px' }}>
                        No other players yet. Share Turtrl with friends! 🐢
                    </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    {displayUsers.map((u, idx) => {
                        const isCurrent = u.email === currentUser.email;
                        let rankColor = 'var(--muted)';
                        let rankIcon = '';
                        if (idx === 0) { rankColor = 'var(--gold)'; rankIcon = '👑'; }
                        else if (idx === 1) { rankColor = '#C0C0C0'; rankIcon = '🥈'; }
                        else if (idx === 2) { rankColor = '#CD7F32'; rankIcon = '🥉'; }

                        const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Anonymous';
                        const initial = name.substring(0, 2).toUpperCase();
                        const color = u.color || colors[idx % colors.length];

                        return (
                            <div key={u.email || idx} className="card" style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                                border: isCurrent ? '1.5px solid var(--green)' : '1px solid var(--border)',
                                background: isCurrent ? 'var(--green-dim)' : 'var(--card)',
                                borderLeft: isCurrent ? '4px solid var(--green)' : '1px solid var(--border)'
                            }}>
                                <div style={{ width: '24px', textAlign: 'center', color: rankColor, fontWeight: 700, fontSize: '14px' }}>
                                    {rankIcon || (idx + 1)}
                                </div>

                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: color, display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontWeight: 'bold', color: '#fff',
                                    fontSize: '14px'
                                }}>
                                    {initial}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                                        {isCurrent && <span style={{ background: 'var(--green)', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>YOU</span>}
                                        {u.isMock && <span style={{ color: 'var(--muted)', fontSize: '10px', fontWeight: 400, flexShrink: 0 }}>(Demo)</span>}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                                        Lvl {u.level || 1}
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    {activeTab === 'coins' ? (
                                        <div style={{ color: 'var(--green)', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>{u.coins || 0} Coins</div>
                                    ) : (
                                        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>{u.streak || 0} 🔥</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
