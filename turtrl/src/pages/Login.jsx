import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';
import { getUser, saveUser, isOnboarded } from '../utils/auth';
import { useDevice } from '../utils/hooks';

export default function Login() {
    const { isDesktop } = useDevice();
    const [activeTab, setActiveTab] = useState('login');

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginShowPw, setLoginShowPw] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Register State
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regAge, setRegAge] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [regShowPw, setRegShowPw] = useState(false);
    const [regAgree, setRegAgree] = useState(false);
    const [regErrors, setRegErrors] = useState({});

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        if (!loginEmail.includes('@') || !loginEmail.includes('.')) {
            setLoginError('Please enter a valid email.');
            return;
        }
        if (loginPassword.length < 6) {
            setLoginError('Password must be at least 6 characters.');
            return;
        }

        const user = getUser();
        if (user && user.email === loginEmail) {
            if (isOnboarded()) {
                navigate('/stages');
            } else {
                navigate('/onboarding');
            }
        } else {
            setLoginError('No account found with this email.');
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (regFirstName.length < 2) errors.firstName = 'Required';
        if (regLastName.length < 2) errors.lastName = 'Required';
        if (!regEmail.includes('@') || !regEmail.includes('.')) errors.email = 'Invalid email';
        if (!regAge || parseInt(regAge) < 18) errors.age = 'You must be 18+ to use Turtrl';
        if (regPassword.length < 8) errors.password = 'Min 8 characters';
        if (regPassword !== regConfirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!regAgree) errors.agree = 'You must agree to the Terms';

        if (Object.keys(errors).length > 0) {
            setRegErrors(errors);
            return;
        }

        // Save default user
        const newUser = {
            firstName: regFirstName,
            lastName: regLastName,
            email: regEmail,
            password: regPassword, // mock local storage only
            level: null,
            currentStage: 1,
            completedStages: [],
            virtualBalance: 10000,
            points: 0,
            rubies: 0,
            streak: 0,
            bestStreak: 0,
            lastStreakDate: null,
            streakShields: 0,
            tradeHistory: [],
            badges: ['first_login'],
            memberSince: new Date().toISOString(),
            feedbackGiven: [],
            interests: [],
            riskType: null,
            monthlySavings: 500
        };
        saveUser(newUser);
        navigate('/onboarding');
    };

    const mobilePageStyle = {
        background: 'radial-gradient(ellipse at 50% 20%, rgba(46,204,113,0.08) 0%, var(--bg) 60%)',
        padding: '32px 24px',
        justifyContent: 'center',
        flex: 1
    };

    const desktopPageStyle = {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        margin: '-32px -40px', // Negate MainContent padding to go full width
        background: 'var(--bg)'
    };

    const loginContent = (
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
            {!isDesktop && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                    <Mascot size={110} animation="float" />
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', color: 'var(--green)', margin: '16px 0 4px', fontWeight: 800 }}>
                        Turtrl<span style={{ color: 'var(--gold)' }}>.</span>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                        Your journey to €100K starts here
                    </p>
                </div>
            )}

            {/* TAB TOGGLE */}
            <div style={{ background: 'var(--card)', borderRadius: '14px', padding: '5px', display: 'flex', marginBottom: '24px' }}>
                <button
                    onClick={() => setActiveTab('login')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', cursor: 'pointer',
                        background: activeTab === 'login' ? 'var(--green)' : 'transparent',
                        color: activeTab === 'login' ? '#000' : 'var(--muted)'
                    }}
                >
                    Log In
                </button>
                <button
                    onClick={() => setActiveTab('register')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', cursor: 'pointer',
                        background: activeTab === 'register' ? 'var(--green)' : 'transparent',
                        color: activeTab === 'register' ? '#000' : 'var(--muted)'
                    }}
                >
                    Create Account
                </button>
            </div>

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <input type="email" placeholder="Email Address" className={`input-field ${loginError && !loginEmail ? 'error' : ''}`} value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type={loginShowPw ? "text" : "password"}
                            placeholder="Password"
                            className={`input-field ${loginError && !loginPassword ? 'error' : ''}`}
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            style={{ paddingRight: '48px' }}
                        />
                        <button type="button" onClick={() => setLoginShowPw(!loginShowPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '16px' }}>
                            {loginShowPw ? '🙈' : '👁'}
                        </button>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '13px', color: 'var(--green)', cursor: 'pointer', fontWeight: 500 }}>
                        Forgot password?
                    </div>

                    {loginError && <div className="field-error" style={{ textAlign: 'center' }}>{loginError}</div>}

                    <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Log In →</button>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', color: 'var(--muted)' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                        <span style={{ padding: '0 12px', fontSize: '13px' }}>or</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="button" onClick={() => alert('Social login coming soon!')} style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            Google
                        </button>
                        <button type="button" onClick={() => alert('Social login coming soon!')} style={{ flex: 1, background: '#000', color: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.24-.86 3.43-.88 1.14-.02 2.47.53 3.31 1.48-2.6 1.54-2.14 4.8.44 5.86-.68 1.95-1.76 4.31-2.26 5.71zm-3.12-14.77c.45-1.39-.17-2.91-1.3-3.83-1.11.96-1.8 2.37-1.31 3.73 1.1-.06 2.01-.84 2.61-1.9z" /></svg>
                            Apple
                        </button>
                    </div>
                </form>
            )}

            {/* CREATE ACCOUNT FORM */}
            {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <input type="text" placeholder="First Name" className={`input-field ${regErrors.firstName ? 'error' : ''}`} value={regFirstName} onChange={e => setRegFirstName(e.target.value)} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <input type="text" placeholder="Last Name" className={`input-field ${regErrors.lastName ? 'error' : ''}`} value={regLastName} onChange={e => setRegLastName(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <input type="email" placeholder="Email Address" className={`input-field ${regErrors.email ? 'error' : ''}`} value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                        {regErrors.email && <div className="field-error">{regErrors.email}</div>}
                    </div>

                    <div>
                        <input type="number" placeholder="Age" className={`input-field ${regErrors.age ? 'error' : ''}`} value={regAge} onChange={e => setRegAge(e.target.value)} />
                        {regErrors.age && <div className="field-error">{regErrors.age}</div>}
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type={regShowPw ? "text" : "password"}
                            placeholder="Password (min 8 chars)"
                            className={`input-field ${regErrors.password ? 'error' : ''}`}
                            value={regPassword}
                            onChange={e => setRegPassword(e.target.value)}
                            style={{ paddingRight: '48px' }}
                        />
                        <button type="button" onClick={() => setRegShowPw(!regShowPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '16px' }}>
                            {regShowPw ? '🙈' : '👁'}
                        </button>
                        {regErrors.password && <div className="field-error">{regErrors.password}</div>}
                    </div>

                    <div>
                        <input
                            type={regShowPw ? "text" : "password"}
                            placeholder="Confirm Password"
                            className={`input-field ${regErrors.confirmPassword ? 'error' : ''}`}
                            value={regConfirmPassword}
                            onChange={e => setRegConfirmPassword(e.target.value)}
                        />
                        {regErrors.confirmPassword && <div className="field-error">{regErrors.confirmPassword}</div>}
                    </div>

                    <div onClick={() => setRegAgree(!regAgree)} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginTop: '4px' }}>
                        <div style={{
                            width: '20px', height: '20px', borderRadius: '4px',
                            border: `2px solid ${regErrors.agree ? 'var(--red)' : regAgree ? 'var(--green)' : 'var(--border)'}`,
                            background: regAgree ? 'var(--green)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {regAgree && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>I agree to the Terms & Privacy Policy</span>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Create Account →</button>
                </form>
            )}
        </div>
    );

    if (isDesktop) {
        return (
            <div style={desktopPageStyle}>
                <div style={{ flex: 1, background: 'linear-gradient(135deg, #0f2d1a, #0D1117)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                    <Mascot size={200} animation="float" />
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '48px', color: 'var(--green)', margin: '32px 0 8px', fontWeight: 800 }}>
                        Turtrl<span style={{ color: 'var(--gold)' }}>.</span>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', color: 'var(--muted)', margin: '0 0 48px', textAlign: 'center' }}>
                        Your journey to €100K starts here
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px', color: 'var(--text)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>✅</span> Learn investing step by step
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>✅</span> Practice with virtual money
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>✅</span> Build your path to €100K
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px' }}>
                    {loginContent}
                </div>
            </div>
        );
    }

    return (
        <div className="page" style={mobilePageStyle}>
            {loginContent}
        </div>
    );
}
