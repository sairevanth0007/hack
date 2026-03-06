import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';
import { updateUser, unlockBadge } from '../utils/auth';
import { useDevice } from '../utils/hooks';

export default function Onboarding() {
    const { isDesktop } = useDevice();
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // State collected during onboarding
    const [knowledgeIndex, setKnowledgeIndex] = useState(null);
    const [monthlySavings, setMonthlySavings] = useState(500);
    const [riskType, setRiskType] = useState(null);
    const [interests, setInterests] = useState([]);

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigate('/');
    };

    const handleComplete = () => {
        // Determine level
        let lvl = 'Beginner';
        if (knowledgeIndex === 2) lvl = 'Intermediate';
        if (knowledgeIndex === 3) lvl = 'Expert';

        updateUser({
            level: lvl,
            riskType: riskType || 'Balanced',
            interests,
            monthlySavings
        });
        unlockBadge('first_login');
        navigate('/stages');
    };

    const renderTopBar = () => (
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: '16px' }}>
            <button onClick={handleBack} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '20px', cursor: 'pointer' }}>
                ←
            </button>
            <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${(step / 6) * 100}%`, height: '100%', background: 'var(--green)', transition: 'width 0.4s ease' }} />
            </div>
            {step > 1 && step < 6 ? (
                <button onClick={() => setStep(step + 1)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer' }}>
                    Skip
                </button>
            ) : <div style={{ width: '30px' }} />}
        </div>
    );

    const renderDesktopOnboarding = () => (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            background: 'var(--bg)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
        }}>
            <div style={{
                background: 'var(--card)',
                borderRadius: '24px',
                border: '1px solid var(--border)',
                width: '100%',
                maxWidth: '600px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {renderTopBar()}
                <div style={{ padding: '20px 40px 60px 40px', display: 'flex', flexDirection: 'column' }}>
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );

    const renderStepContent = () => (
        <>
            {/* STEP 1: Welcome */}
            {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Mascot size={110} animation="bounce" speech="Hi! I'm your guide to €100K 🚀" style={{ marginBottom: '32px' }} />
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '32px' : '24px', textAlign: 'center', marginBottom: '8px' }}>
                        Welcome to Turtrl!
                    </h1>
                    <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '36px', fontSize: isDesktop ? '16px' : '14px' }}>
                        5 quick questions to personalise your journey.
                    </p>
                    <button className="btn-primary" onClick={() => setStep(2)}>
                        Let's go →
                    </button>
                </div>
            )}

            {/* STEP 2: Knowledge */}
            {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ alignSelf: 'center', marginBottom: '24px' }}>
                        <Mascot size={110} animation="bounce" />
                    </div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '28px' : '22px', textAlign: 'center', marginBottom: '8px' }}>
                        How much do you know about investing?
                    </h2>
                    <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '36px', fontSize: isDesktop ? '16px' : '14px' }}>
                        Be honest — we'll match your learning level.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        {[
                            { i: 0, t: "🌱 Nothing yet — total beginner" },
                            { i: 1, t: "📚 I know what stocks and funds are" },
                            { i: 2, t: "📈 I've invested before" },
                            { i: 3, t: "🧠 I actively manage investments" }
                        ].map(opt => (
                            <div
                                key={opt.i}
                                className={`option-card ${knowledgeIndex === opt.i ? 'selected' : ''}`}
                                onClick={() => setKnowledgeIndex(opt.i)}
                            >
                                {opt.t}
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary" disabled={knowledgeIndex === null} style={{ opacity: knowledgeIndex === null ? 0.5 : 1 }} onClick={() => setStep(3)}>
                        Continue →
                    </button>
                </div>
            )}

            {/* STEP 3: Savings */}
            {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ alignSelf: 'center', marginBottom: '24px' }}>
                        <Mascot size={110} animation="bounce" />
                    </div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '28px' : '22px', textAlign: 'center', marginBottom: '8px' }}>
                        How much can you save per month?
                    </h2>
                    <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '48px', fontSize: isDesktop ? '16px' : '14px' }}>
                        Drag the slider to your comfortable amount.
                    </p>

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '56px' : '44px', color: 'var(--green)', fontWeight: 800 }}>
                            €{monthlySavings}
                        </div>
                        <div style={{ fontSize: isDesktop ? '15px' : '13px', color: 'var(--muted)' }}>
                            That's €{(monthlySavings * 12).toLocaleString()} per year
                        </div>
                    </div>

                    <input
                        type="range"
                        min="50" max="5000" step="25"
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(parseInt(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--green)', padding: '10px 0', marginBottom: '32px' }}
                    />

                    <button className="btn-primary" onClick={() => setStep(4)}>
                        Looks good →
                    </button>
                </div>
            )}

            {/* STEP 4: Risk */}
            {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ alignSelf: 'center', marginBottom: '24px' }}>
                        <Mascot size={110} animation="bounce" />
                    </div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '28px' : '22px', textAlign: 'center', marginBottom: '8px' }}>
                        What type of investor are you?
                    </h2>
                    <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '36px', fontSize: isDesktop ? '16px' : '14px' }}>
                        This shapes which stages you start on.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                        {[
                            { r: 'Slow & Steady', i: '🐢', sub: "Safe long-term growth" },
                            { r: 'Balanced', i: '⚖️', sub: "Mix of safe and some risk" },
                            { r: 'Bold & Fast', i: '🐇', sub: "Comfortable with high risk" }
                        ].map(opt => (
                            <div
                                key={opt.r}
                                className={`option-card ${riskType === opt.r ? 'selected' : ''}`}
                                onClick={() => setRiskType(opt.r)}
                                style={{ display: 'flex', alignItems: 'center', padding: isDesktop ? '16px 24px' : '14px 16px' }}
                            >
                                <div style={{ fontSize: '32px', marginRight: '16px' }}>{opt.i}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <span style={{ fontWeight: 700, fontSize: isDesktop ? '16px' : '15px' }}>{opt.r}</span>
                                    <span style={{ fontSize: isDesktop ? '14px' : '12px', color: 'var(--muted)' }}>{opt.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="btn-primary" disabled={!riskType} style={{ opacity: !riskType ? 0.5 : 1 }} onClick={() => setStep(5)}>
                        Continue →
                    </button>
                </div>
            )}

            {/* STEP 5: Interests */}
            {step === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ alignSelf: 'center', marginBottom: '24px' }}>
                        <Mascot size={110} animation="bounce" />
                    </div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '28px' : '22px', textAlign: 'center', marginBottom: '8px' }}>
                        What interests you most?
                    </h2>
                    <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '36px', fontSize: isDesktop ? '16px' : '14px' }}>
                        Pick up to 3 topics.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
                        {[
                            "📊 Stocks & ETFs", "🏠 Real Estate (REITs)", "₿ Crypto",
                            "🏦 Bonds & Savings", "💳 Credit & Cash Flow", "🤖 AI-guided investing"
                        ].map(tag => {
                            const isActive = interests.includes(tag);
                            const isMaxed = !isActive && interests.length >= 3;
                            return (
                                <button
                                    key={tag}
                                    className={`pill ${isActive ? 'active' : ''}`}
                                    style={{ fontSize: isDesktop ? '15px' : '14px', padding: '12px 18px' }}
                                    onClick={(e) => {
                                        if (isActive) {
                                            setInterests(interests.filter(i => i !== tag));
                                        } else {
                                            if (!isMaxed) {
                                                setInterests([...interests, tag]);
                                            } else {
                                                const el = e.currentTarget;
                                                el.style.animation = 'none';
                                                el.offsetHeight;
                                                el.style.animation = 'shake 0.4s ease';
                                            }
                                        }
                                    }}
                                >
                                    {tag}
                                </button>
                            )
                        })}
                    </div>

                    <button className="btn-primary" disabled={interests.length === 0} style={{ opacity: interests.length === 0 ? 0.5 : 1 }} onClick={() => setStep(6)}>
                        Almost done →
                    </button>
                </div>
            )}

            {/* STEP 6: Assignment */}
            {step === 6 && (() => {
                let lvl = 'Beginner';
                let emoji = '🌱';
                let desc = "We'll start from scratch and build your confidence.";

                if (knowledgeIndex === 2) {
                    lvl = 'Intermediate'; emoji = '📈'; desc = "You know the basics — let's go deeper.";
                } else if (knowledgeIndex === 3) {
                    lvl = 'Expert'; emoji = '🧠'; desc = "Time to sharpen your edge.";
                }

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Mascot size={120} animation="bounce" style={{ marginBottom: '32px' }} />

                        <div className="card" style={{ width: '100%', textAlign: 'center', marginBottom: '20px', background: 'var(--green-dim)', borderColor: 'var(--green)', padding: isDesktop ? '24px' : '16px' }}>
                            <div style={{ fontSize: '56px', marginBottom: '12px' }}>{emoji}</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '32px' : '28px', color: 'var(--green)', fontWeight: 800, marginBottom: '8px' }}>
                                {lvl}
                            </div>
                            <div style={{ fontSize: isDesktop ? '16px' : '14px' }}>{desc}</div>
                        </div>

                        <div className="card" style={{ width: '100%', textAlign: 'center', padding: isDesktop ? '24px' : '16px', marginBottom: '32px' }}>
                            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>Your starting virtual balance:</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: isDesktop ? '44px' : '36px', color: 'var(--gold)', fontWeight: 800, marginBottom: '8px' }}>
                                €10,000
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Use this to practice investing risk-free</div>
                        </div>

                        <button className="btn-primary" style={{ width: '100%' }} onClick={handleComplete}>
                            Start my journey →
                        </button>
                    </div>
                );
            })()}
        </>
    );

    if (isDesktop) {
        return renderDesktopOnboarding();
    }

    return (
        <div className="page" style={{ paddingBottom: '24px' }}>
            {renderTopBar()}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px', justifyContent: 'space-between' }}>
                {renderStepContent()}
            </div>
        </div>
    );
}
