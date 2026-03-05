import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';

const Login = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        agreed: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setError(''); // Clear error on typing
    };

    const validateForm = () => {
        if (activeTab === 'login') {
            if (!formData.email || !formData.password) return 'Please fill in all fields';
            return null;
        }

        // Register validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.age) {
            return 'Please fill in all fields';
        }
        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match';
        }
        if (parseInt(formData.age) < 18) {
            return 'You must be at least 18 to use Turtrl';
        }
        if (!formData.agreed) {
            return 'You must agree to the Terms & Privacy Policy';
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        if (activeTab === 'login') {
            const result = auth.login(formData.email, formData.password);
            if (result.success) {
                if (result.user.onboardingComplete) {
                    navigate('/');
                } else {
                    navigate('/onboarding');
                }
            } else {
                setError(result.error);
            }
        } else {
            const result = auth.register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            if (result.success) {
                navigate('/onboarding');
            } else {
                setError(result.error);
            }
        }
    };

    // Aesthetic: slow animated background
    const bgStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% -20%, rgba(46, 204, 113, 0.15), var(--bg) 70%)',
        zIndex: -1,
        animation: 'pulse-gradient 8s ease-in-out infinite alternate'
    };

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={bgStyle} />

            {/* Brand Header */}
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Turtrl<span style={{ color: 'var(--green)' }}>.</span>
                </h1>
                <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '1.1rem' }}>
                    Your journey to €100K starts here
                </p>
            </div>

            {/* Main Card */}
            <div className="card" style={{ flex: 1, padding: '32px 24px' }}>

                {/* Tab Toggle */}
                <div style={{ display: 'flex', marginBottom: '32px', background: 'var(--card2)', borderRadius: '12px', padding: '4px' }}>
                    <button
                        onClick={() => setActiveTab('login')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '8px',
                            background: activeTab === 'login' ? 'var(--card)' : 'transparent',
                            color: activeTab === 'login' ? 'var(--text)' : 'var(--muted)',
                            fontWeight: activeTab === 'login' ? 'bold' : 'normal',
                            boxShadow: activeTab === 'login' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '8px',
                            background: activeTab === 'register' ? 'var(--card)' : 'transparent',
                            color: activeTab === 'register' ? 'var(--text)' : 'var(--muted)',
                            fontWeight: activeTab === 'register' ? 'bold' : 'normal',
                            boxShadow: activeTab === 'register' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                        }}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {error && (
                        <div style={{ padding: '12px', background: 'rgba(255, 77, 79, 0.1)', color: 'var(--error)', borderRadius: '8px', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    {activeTab === 'register' && (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                type="text" name="firstName" placeholder="First Name"
                                className="input-field" value={formData.firstName} onChange={handleChange}
                            />
                            <input
                                type="text" name="lastName" placeholder="Last Name"
                                className="input-field" value={formData.lastName} onChange={handleChange}
                            />
                        </div>
                    )}

                    <input
                        type="email" name="email" placeholder="Email address"
                        className="input-field" value={formData.email} onChange={handleChange}
                    />

                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'} name="password"
                            placeholder="Password" className="input-field"
                            value={formData.password} onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '0.875rem' }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {activeTab === 'login' && (
                        <div style={{ textAlign: 'right' }}>
                            <a href="#" style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>Forgot password?</a>
                        </div>
                    )}

                    {activeTab === 'register' && (
                        <>
                            <input
                                type={showPassword ? 'text' : 'password'} name="confirmPassword"
                                placeholder="Confirm Password" className="input-field"
                                value={formData.confirmPassword} onChange={handleChange}
                            />
                            <input
                                type="number" name="age" placeholder="Your age (18+)"
                                className="input-field" value={formData.age} onChange={handleChange}
                                min="18"
                            />
                            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: 'var(--muted)', marginTop: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox" name="agreed"
                                    checked={formData.agreed} onChange={handleChange}
                                    style={{ width: '20px', height: '20px', accentColor: 'var(--green)' }}
                                />
                                I agree to the Terms & Privacy Policy
                            </label>
                        </>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: '16px', fontSize: '1.1rem', background: 'var(--green)', color: '#000' }}
                    >
                        {activeTab === 'login' ? 'Log In' : 'Create Account'}
                    </button>

                    {activeTab === 'login' && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', color: 'var(--muted)', fontSize: '0.875rem' }}>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                                <span style={{ padding: '0 12px' }}>or continue with</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                            </div>

                            <button type="button" className="btn-secondary" style={{ display: 'flex', gap: '12px' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                        </>
                    )}

                </form>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px', color: 'var(--muted)', fontSize: '0.875rem' }}>
                <p>Mock Credentials for Demo:</p>
                <p>Email: test@test.com / Pass: 123456</p>
            </div>
        </div>
    );
};

export default Login;
