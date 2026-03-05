import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';

const steps = [
    { id: 'welcome', type: 'info' },
    { id: 'knowledge', type: 'cards' },
    { id: 'savings', type: 'slider' },
    { id: 'style', type: 'cards' },
    { id: 'interests', type: 'multi' },
    { id: 'goal', type: 'form' }
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState('forward');
    const [data, setData] = useState({
        knowledge: '',
        monthlySavings: 500,
        style: '',
        interests: [],
        targetDate: '2030-01',
        startingBalance: ''
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setDirection('forward');
            setCurrentStep(c => c + 1);
        } else {
            finishOnboarding();
        }
    };

    const handleSkip = () => {
        if (currentStep < steps.length - 1) {
            setDirection('forward');
            setCurrentStep(c => c + 1);
        } else {
            finishOnboarding();
        }
    };

    const finishOnboarding = () => {
        auth.completeOnboarding(data);
        navigate('/');
    };

    // Rendering specific step contents
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Let's get to know you</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '48px', lineHeight: 1.6 }}>
                            Takes 2 minutes. Helps us personalise everything for your journey.
                        </p>
                        <button className="btn-primary" onClick={handleNext} style={{ background: 'var(--green)', color: '#000' }}>
                            Let's do it →
                        </button>
                    </div>
                );
            case 1:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>How familiar are you with investing?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { id: 'beginner', icon: '🌱', title: "Complete beginner", desc: "what's a stock?" },
                                { id: 'basic', icon: '📚', title: "I know the basics", desc: "heard of ETFs" },
                                { id: 'intermediate', icon: '📈', title: "Intermediate", desc: "I've invested before" },
                                { id: 'advanced', icon: '🧠', title: "Advanced", desc: "I actively manage a portfolio" }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => { setData({ ...data, knowledge: opt.id }); setTimeout(handleNext, 300); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', p: '20px', padding: '20px',
                                        background: data.knowledge === opt.id ? 'var(--green-glow)' : 'var(--card)',
                                        border: `1px solid ${data.knowledge === opt.id ? 'var(--green)' : 'var(--border)'}`,
                                        borderRadius: '16px', textAlign: 'left',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span style={{ fontSize: '2rem', marginRight: '16px' }}>{opt.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{opt.title}</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4px' }}>— {opt.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '48px' }}>How much can you save per month?</h2>

                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--green)', fontFamily: 'var(--font-heading)' }}>
                                €{data.monthlySavings}
                            </div>
                            <div style={{ color: 'var(--gold)', marginTop: '8px', fontWeight: 'bold' }}>
                                That's €{(data.monthlySavings * 12).toLocaleString()}/year!
                            </div>
                        </div>

                        <input
                            type="range"
                            min="50" max="5000" step="50"
                            value={data.monthlySavings}
                            onChange={(e) => setData({ ...data, monthlySavings: Number(e.target.value) })}
                            style={{
                                width: '100%',
                                accentColor: 'var(--green)',
                                height: '8px',
                                borderRadius: '4px',
                                background: 'var(--card2)'
                            }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', marginTop: '16px', fontSize: '0.875rem' }}>
                            <span>€50</span>
                            <span>€5,000+</span>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <button className="btn-primary" style={{ width: '100%' }} onClick={handleNext}>Continue →</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>What kind of investor are you?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { id: 'steady', icon: '🐢', title: "Slow & Steady", desc: "Safe, long-term growth" },
                                { id: 'balanced', icon: '⚖️', title: "Balanced", desc: "Mix of safe and a bit of risk" },
                                { id: 'bold', icon: '🐇', title: "Fast & Bold", desc: "Comfortable with high risk" }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => { setData({ ...data, style: opt.id }); setTimeout(handleNext, 300); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', padding: '24px',
                                        background: data.style === opt.id ? 'var(--purple-glow)' : 'var(--card)',
                                        border: `1px solid ${data.style === opt.id ? 'var(--purple)' : 'var(--border)'}`,
                                        borderRadius: '16px', textAlign: 'left',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span style={{ fontSize: '2.5rem', marginRight: '20px' }}>{opt.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{opt.title}</div>
                                        <div style={{ color: 'var(--muted)', marginTop: '4px' }}>{opt.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                const toggleInterest = (id) => {
                    if (data.interests.includes(id)) {
                        setData({ ...data, interests: data.interests.filter(i => i !== id) });
                    } else if (data.interests.length < 3) {
                        setData({ ...data, interests: [...data.interests, id] });
                    }
                };

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>What interests you most?</h2>
                        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Pick up to 3 topics</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {[
                                { id: 'etf', icon: '📊', label: 'Stocks & ETFs' },
                                { id: 'reit', icon: '🏠', label: 'Real Estate' },
                                { id: 'crypto', icon: '₿', label: 'Crypto' },
                                { id: 'bonds', icon: '🏦', label: 'Bonds & Savings' },
                                { id: 'credit', icon: '💳', label: 'Credit & Cash Flow' },
                                { id: 'ai', icon: '🤖', label: 'AI-guided investing' }
                            ].map(tag => {
                                const isSelected = data.interests.includes(tag.id);
                                return (
                                    <button
                                        key={tag.id}
                                        onClick={() => toggleInterest(tag.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                            padding: '12px 20px', borderRadius: '30px',
                                            background: isSelected ? 'var(--text)' : 'var(--card)',
                                            color: isSelected ? 'var(--bg)' : 'var(--text)',
                                            border: `1px solid ${isSelected ? 'var(--text)' : 'var(--border)'}`,
                                            fontWeight: isSelected ? 'bold' : 'normal',
                                            fontSize: '1rem',
                                            opacity: !isSelected && data.interests.length >= 3 ? 0.5 : 1
                                        }}
                                    >
                                        <span>{tag.icon}</span> {tag.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <button
                                className="btn-primary"
                                style={{ width: '100%' }}
                                onClick={handleNext}
                                disabled={data.interests.length === 0}
                            >
                                Continue →
                            </button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>Set your first milestone</h2>

                        <div className="card" style={{ textAlign: 'center', marginBottom: '32px', border: '1px solid var(--gold)', boxShadow: '0 0 20px var(--gold-glow)' }}>
                            <div style={{ color: 'var(--gold)', fontWeight: 'bold', marginBottom: '8px' }}>TARGET</div>
                            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>€100,000</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '0.9rem' }}>Target Date</label>
                                <input
                                    type="month"
                                    value={data.targetDate}
                                    onChange={(e) => setData({ ...data, targetDate: e.target.value })}
                                    className="input-field"
                                    style={{ fontSize: '1.1rem' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '0.9rem', }}>Starting Balance (€) (Optional)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 1500"
                                    value={data.startingBalance}
                                    onChange={(e) => setData({ ...data, startingBalance: Number(e.target.value) })}
                                    className="input-field"
                                    style={{ fontSize: '1.1rem' }}
                                />
                                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '8px' }}>
                                    It's okay to start at zero. Everyone starts somewhere.
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <button className="btn-primary" style={{ width: '100%', background: 'var(--green)', color: '#000' }} onClick={handleNext}>
                                Build my plan →
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px', position: 'relative' }}>
            {/* Top Bar Navigation & Progress */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', paddingTop: '20px' }}>
                {currentStep > 0 ? (
                    <button onClick={() => { setDirection('back'); setCurrentStep(c => c - 1); }} style={{ padding: '8px', marginLeft: '-8px', color: 'var(--muted)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                ) : <div style={{ width: '40px' }} />}

                {/* Progress Dots */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {steps.map((s, i) => (
                        <div
                            key={s.id}
                            style={{
                                width: i === currentStep ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i <= currentStep ? 'var(--green)' : 'var(--card2)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>

                <button onClick={handleSkip} style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Skip
                </button>
            </div>

            {/* Animated Step Content Container */}
            <div style={{ flex: 1, position: 'relative' }}>
                <div key={currentStep} style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    animation: `${direction === 'forward' ? 'slideInRight' : 'slideInLeft'} 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`
                }}>
                    {renderStepContent()}
                </div>
            </div>

            {/* Inline animations for transitions */}
            <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};

export default Onboarding;
