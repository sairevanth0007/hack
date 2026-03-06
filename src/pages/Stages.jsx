import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import BottomSheet from '../components/BottomSheet';
import StageGame from '../components/StageGame';
import Mascot from '../components/Mascot';
import AssetLogo from '../components/AssetLogo';
import { getUser, updateUser } from '../utils/auth';
import { STAGES } from '../utils/stagesData';
import { useDevice } from '../utils/hooks';

export default function Stages() {
    // 1. hooks first
    const { isDesktop } = useDevice();
    const navigate = useNavigate();
    const [nodePositions, setNodePositions] = useState([]);
    const [activeStage, setActiveStage] = useState(null); // The stage object user clicked to play
    const [sheetContent, setSheetContent] = useState(null); // { type: 'locked'|'completed', stage }
    const [feedbackPopup, setFeedbackPopup] = useState(false);
    const pathContainerRef = useRef(null);
    const nodeRefs = useRef({});

    useEffect(() => {
        if (!getUser()) {
            navigate('/');
        }
    }, [navigate]);

    const user = getUser();
    const currentStageId = user?.currentStage || 1;
    const completedStageIds = user?.completedStages || [];

    // 4. chaptersMap MUST be here before any JSX or callbacks
    const chaptersMap = (STAGES || []).reduce((acc, stage) => {
        const ch = stage.chapterNumber;
        if (!acc[ch]) {
            acc[ch] = {
                number: ch,
                title: stage.chapter,
                stages: []
            };
        }
        acc[ch].stages.push(stage);
        return acc;
    }, {});

    const chapters = Object.values(chaptersMap).sort((a, b) => a.number - b.number);

    // 5. everything else below...
    useEffect(() => {
        const recalculate = () => {
            try {
                if (!pathContainerRef.current) return;
                const containerRect = pathContainerRef.current.getBoundingClientRect();
                const positions = [];
                Object.entries(nodeRefs.current).forEach(([id, el]) => {
                    if (!el) return;
                    try {
                        const rect = el.getBoundingClientRect();
                        positions.push({
                            id: Number(id),
                            x: rect.left - containerRect.left + rect.width / 2,
                            y: rect.top - containerRect.top + rect.height / 2
                        });
                    } catch (e) {
                        console.warn('Node ref error', id, e);
                    }
                });
                positions.sort((a, b) => a.id - b.id);
                setNodePositions(positions);
            } catch (e) {
                console.error('Stage position calculation error:', e);
            }
        };

        // Delay to ensure DOM is painted
        const timer = setTimeout(recalculate, 100);
        window.addEventListener('resize', recalculate);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', recalculate);
        };
    }, [activeStage, sheetContent, isDesktop, chapters.length]);

    if (!user) return null;

    const handleNodeClick = (stage) => {
        if (completedStageIds.includes(stage.id)) {
            setSheetContent({ type: 'completed', stage });
        } else if (stage.id === currentStageId || stage.unlockedByDefault) {
            setActiveStage(stage);
        } else {
            setSheetContent({ type: 'locked', stage });
        }
    };

    const handleStageComplete = () => {
        // Stage was finished successfully
        const newCompleted = [...new Set([...completedStageIds, activeStage.id])];
        const newCurrent = activeStage.id === currentStageId ? currentStageId + 1 : currentStageId;

        updateUser({
            completedStages: newCompleted,
            currentStage: newCurrent
        });

        setActiveStage(null);

        // Random 1 in 4 chance for feedback popup
        if (Math.random() < 0.25) {
            setTimeout(() => setFeedbackPopup(true), 500);
        }
    };

    const handleSkipRuby = () => {
        if (user.rubies > 0 && sheetContent?.stage) {
            const skippedStageId = sheetContent.stage.id;
            const newCompleted = [...new Set([...completedStageIds, skippedStageId])];
            const newCurrent = Math.max(currentStageId, skippedStageId + 1);

            updateUser({
                rubies: user.rubies - 1,
                completedStages: newCompleted,
                currentStage: newCurrent
            });
            setSheetContent(null);
        }
    };

    // Helper for UI
    const getLevelColor = () => {
        if (user.level === 'Beginner') return 'var(--green)';
        if (user.level === 'Intermediate') return 'var(--gold)';
        return 'var(--purple)';
    };

    const renderCompletedContent = () => (
        <div style={{ textAlign: 'center', padding: isDesktop ? '32px' : '10px 0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: 'var(--green)', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>+50 Coins Earned</div>

            {sheetContent?.stage?.type === 'trade' && (
                <div className="card" style={{ marginBottom: '24px', textAlign: 'left' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Trade Summary</div>
                    <div style={{ fontWeight: 600 }}>{sheetContent.stage.asset.name}</div>
                    <div style={{ fontSize: '14px', marginTop: '4px' }}>Result recorded in Analysis tab.</div>
                </div>
            )}

            <button className="btn-ghost" onClick={() => {
                const s = sheetContent.stage;
                setSheetContent(null);
                setActiveStage(s);
            }}>
                Replay (No Coins given)
            </button>
        </div>
    );

    const renderLockedContent = () => (
        <div style={{ textAlign: 'center', padding: isDesktop ? '32px' : '10px 0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Mascot size={isDesktop ? 120 : 60} animation="none" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', marginBottom: '8px' }}>This stage is locked 🔒</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Complete the previous stage to unlock.</p>

            <div style={{ borderTop: '1px solid var(--border)', margin: isDesktop ? 'auto -32px 0' : '0 -20px 24px', padding: isDesktop ? '32px 32px 0' : '24px 20px 0', width: '100%' }}>
                {user.rubies > 0 ? (
                    <div className="card" style={{ background: 'var(--purple-dim)', borderColor: 'var(--purple)' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--purple)' }}>
                            Use 1 Ruby to skip this stage
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '16px' }}>
                            Current balance: {user.rubies} 💎
                        </div>
                        <button className="btn-primary" style={{ background: 'var(--purple)', color: '#fff', boxShadow: '0 6px 20px rgba(124,58,237,0.3)', width: '100%' }} onClick={handleSkipRuby}>
                            Skip with Ruby 💎
                        </button>
                    </div>
                ) : (
                    <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                        Earn rubies by maintaining a perfect 60-day streak to skip stages.
                    </p>
                )}
            </div>
        </div>
    );

    const renderPlaceholderContent = () => (
        <div style={{ textAlign: 'center', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Mascot size={150} animation="float" />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', color: 'var(--green)', margin: '32px 0 16px' }}>
                Select a stage
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
                Click on any stage on the map to begin learning.
            </p>
        </div>
    );

    const renderDesktopRightPanel = () => {
        if (activeStage) {
            return (
                <StageGame
                    stage={activeStage}
                    onComplete={handleStageComplete}
                    onClose={() => setActiveStage(null)}
                />
            );
        }
        if (sheetContent?.type === 'completed') return renderCompletedContent();
        if (sheetContent?.type === 'locked') return renderLockedContent();

        return renderPlaceholderContent();
    };

    const mapContent = (
        <>
            {/* WINDING PATH */}
            <div ref={pathContainerRef} style={{ position: 'relative', padding: isDesktop ? '20px 0 60px' : '40px 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>

                {/* Mascot at top */}
                <Mascot size={isDesktop ? 160 : 130} animation="float" speech={completedStageIds.length === 0 ? "Let's start your journey! 🚀" : completedStageIds.length > 5 ? "You're on fire! 🔥" : "Keep going, you're doing great! 💪"} style={{ marginBottom: '20px', zIndex: 1 }} />

                {/* Dynamic SVG Path Background */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--green)" />
                            <stop offset="100%" stopColor="var(--gold)" />
                        </linearGradient>
                    </defs>
                    {nodePositions.length >= 2 && (() => {
                        const paths = [];
                        for (let i = 0; i < nodePositions.length - 1; i++) {
                            const A = nodePositions[i];
                            const B = nodePositions[i + 1];
                            if (!A || !B) continue;
                            const midY = (A.y + B.y) / 2;
                            const pathD = `M ${A.x} ${A.y} C ${A.x} ${midY}, ${B.x} ${midY}, ${B.x} ${B.y}`;

                            const isACompleted = completedStageIds.includes(A.id);
                            const isBCompleted = completedStageIds.includes(B.id);

                            let strokeColor = "var(--border)";
                            let strokeDash = "6 5";
                            let opacity = 1;

                            if (isACompleted && isBCompleted) {
                                strokeColor = "var(--green)";
                                strokeDash = "none";
                                opacity = 0.5;
                            } else if (isACompleted && !isBCompleted) {
                                strokeColor = "url(#progressGrad)";
                                strokeDash = "none";
                            }

                            paths.push(
                                <path
                                    key={i}
                                    d={pathD}
                                    stroke={strokeColor}
                                    strokeWidth="3"
                                    strokeDasharray={strokeDash}
                                    fill="none"
                                    strokeLinecap="round"
                                    opacity={opacity}
                                />
                            );
                        }
                        return paths;
                    })()}
                </svg>

                {chapters.map((chapter) => {
                    const chapterCompleted = chapter.stages.every(s => completedStageIds.includes(s.id));
                    const chapterLocked = chapter.stages[0].id > currentStageId && !chapter.stages[0].unlockedByDefault;

                    return (
                        <React.Fragment key={chapter.num}>
                            {/* CHAPTER BANNER */}
                            <div style={{
                                width: 'calc(100% - 40px)', margin: '32px 20px', padding: '16px', borderRadius: '16px', zIndex: 1,
                                background: chapterCompleted ? 'var(--green-dim)' : 'var(--card)',
                                border: `1px solid ${chapterCompleted ? 'var(--green)' : 'var(--border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                maxWidth: '600px' // cap width on desktop
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: chapterCompleted ? 'var(--green)' : 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: chapterCompleted ? '#000' : 'var(--text)' }}>
                                        {chapter.num}
                                    </div>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700 }}>{chapter.name}</div>
                                </div>
                                {chapterLocked ? (
                                    <div style={{ color: 'var(--muted)' }}>🔒</div>
                                ) : (
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: chapterCompleted ? 'var(--green)' : 'var(--muted)' }}>
                                        {chapter.stages.filter(s => completedStageIds.includes(s.id)).length}/{chapter.stages.length}
                                    </div>
                                )}
                            </div>

                            {/* NODES */}
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '20px' }}>
                                {chapter.stages.map((stage, idx) => {
                                    const isCompleted = completedStageIds.includes(stage.id);
                                    const isShowcase = stage.unlockedByDefault;
                                    const isCurrent = stage.id === currentStageId || (isShowcase && !isCompleted);
                                    const isLocked = !isShowcase && stage.id > currentStageId;
                                    const isLeft = idx % 2 === 0;
                                    const isActiveDesktop = isDesktop && ((activeStage?.id === stage.id) || (sheetContent?.stage?.id === stage.id));

                                    return (
                                        <div
                                            key={stage.id}
                                            ref={el => { if (el) nodeRefs.current[stage.id] = el; }}
                                            onClick={() => handleNodeClick(stage)}
                                            style={{
                                                zIndex: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                width: '80px',
                                                alignSelf: isLeft ? 'flex-start' : 'flex-end',
                                                marginLeft: isLeft ? '40px' : '0',
                                                marginRight: !isLeft ? '40px' : '0',
                                                transform: isActiveDesktop ? 'scale(1.15)' : isCurrent ? 'scale(1.05)' : 'scale(1)',
                                                transition: 'transform 0.2s',
                                                position: 'relative'
                                            }}
                                        >
                                            {isCurrent && (
                                                <div style={{
                                                    position: 'absolute', inset: -16, borderRadius: '50%',
                                                    animation: 'pulseRing 2s infinite'
                                                }} />
                                            )}

                                            <div style={{
                                                width: isDesktop ? (isShowcase ? '90px' : '80px') : (isShowcase ? '72px' : '64px'),
                                                height: isDesktop ? (isShowcase ? '90px' : '80px') : (isShowcase ? '72px' : '64px'),
                                                borderRadius: '50%',
                                                background: isCompleted ? 'var(--green)' : isCurrent ? 'var(--gold)' : 'var(--card2)',
                                                border: `3px solid ${isActiveDesktop ? '#fff' : isShowcase ? '#d4a822' : isCompleted ? '#1a9e52' : isCurrent ? '#d4a822' : 'var(--border)'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: isDesktop ? '36px' : '28px',
                                                boxShadow: isActiveDesktop ? '0 0 0 4px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)' : isShowcase ? '0 0 20px rgba(244,196,48,0.5)' : isCurrent ? '0 10px 20px rgba(244,196,48,0.3)' : '0 8px 16px rgba(0,0,0,0.4)',
                                                marginBottom: '8px',
                                                zIndex: 2,
                                                transition: 'all 0.2s'
                                            }}>
                                                {isCompleted ? <span style={{ color: '#fff' }}>✓</span> : isLocked ? <span style={{ fontSize: '20px', filter: 'grayscale(1)' }}>🔒</span> : (isShowcase ? <AssetLogo symbol={({ 1: 'EXIA.DE', 2: 'VOW3.DE', 3: 'SIE.DE', 4: 'SAP.DE', 5: 'ALV.DE' })[stage.id]} size={28} /> : stage.icon)}
                                            </div>

                                            {isCurrent && (
                                                <div style={{
                                                    background: 'var(--card)', border: '2px solid var(--gold)', borderRadius: '12px',
                                                    color: 'var(--gold)', fontSize: '10px', fontWeight: 800, padding: '4px 10px',
                                                    position: 'absolute', top: '-14px', zIndex: 3, letterSpacing: '0.5px'
                                                }}>
                                                    PLAY
                                                </div>
                                            )}

                                            <div style={{ fontSize: '12px', textAlign: 'center', fontWeight: isActiveDesktop ? 800 : 600, color: isLocked ? 'var(--muted)' : isActiveDesktop ? '#fff' : 'var(--text)' }}>
                                                {stage.title}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );

    if (isDesktop) {
        return (
            <div style={{ display: 'flex', gap: '40px', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
                {/* LEFT COLUMN: MAP */}
                <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div className="pill" style={{ borderColor: getLevelColor(), color: getLevelColor(), padding: '8px 16px', fontSize: '14px' }}>
                            {user.level}
                        </div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700 }}>
                            💰 €{user.virtualBalance.toLocaleString()}
                        </div>
                    </div>
                    {/* Winding path content */}
                    {mapContent}
                </div>

                {/* RIGHT COLUMN: STICKY PANEL / STAGE GAME */}
                <div style={{ flex: 1, height: '100%', paddingBottom: '32px' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--card)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                        {renderDesktopRightPanel()}
                    </div>
                </div>

                {/* FEEDBACK POPUP OVERLAY */}
                {feedbackPopup && (
                    <div style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 250,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px'
                    }}>
                        <div className="card" style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'scaleIn 0.3s ease' }}>
                            <Mascot size={80} animation="bounce" style={{ marginBottom: '16px' }} />
                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', textAlign: 'center', marginBottom: '24px' }}>
                                How are you finding Turtrl? 😊
                            </h2>

                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                                {['😞', '😐', '🙂', '😊', '🤩'].map(emoji => (
                                    <button key={emoji} style={{
                                        width: '44px', height: '44px', borderRadius: '50%', background: 'var(--card2)', border: '1px solid var(--border)', fontSize: '24px', cursor: 'pointer',
                                        transition: 'transform 0.2s'
                                    }}
                                        onClick={(e) => {
                                            [...e.currentTarget.parentElement.children].forEach(c => { c.style.transform = 'scale(1)'; c.style.borderColor = 'var(--border)'; });
                                            e.currentTarget.style.transform = 'scale(1.3)';
                                            e.currentTarget.style.borderColor = 'var(--green)';
                                        }}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>

                            <textarea className="input-field" placeholder="Tell us more (optional)" style={{ minHeight: '80px', marginBottom: '16px', resize: 'none' }}></textarea>

                            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setFeedbackPopup(false)}>Skip</button>
                                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setFeedbackPopup(false)}>Submit</button>
                            </div>
                        </div>
                        <style>{`@keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1;} }`}</style>
                    </div>
                )}

            </div>
        );
    }

    return (
        <div className="page" style={{ paddingTop: '56px', paddingBottom: '64px', background: 'var(--bg)' }}>
            <TopNav />

            {/* HEADER SECTION */}
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: '56px', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="pill" style={{ borderColor: getLevelColor(), color: getLevelColor(), padding: '6px 12px' }}>
                        {user.level}
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700 }}>
                        💰 €{user.virtualBalance.toLocaleString()}
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', fontWeight: 600 }}>
                        <span>⭐ {user.coins} Coins</span>
                        <span>Next level</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--card2)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${(user.coins % 500) / 500 * 100}%`, height: '100%', background: 'var(--green)', transition: 'width 0.3s ease' }}></div>
                    </div>
                </div>
            </div>

            {mapContent}

            {/* COMPLETED SHEET */}
            <BottomSheet isOpen={sheetContent?.type === 'completed'} onClose={() => setSheetContent(null)} title={sheetContent?.stage?.title}>
                {renderCompletedContent()}
            </BottomSheet>

            {/* LOCKED SHEET */}
            <BottomSheet isOpen={sheetContent?.type === 'locked'} onClose={() => setSheetContent(null)} title="">
                {renderLockedContent()}
            </BottomSheet>

            {/* ACTIVE STAGE GAME OVERLAY */}
            {!isDesktop && activeStage && (
                <StageGame
                    stage={activeStage}
                    onComplete={handleStageComplete}
                    onClose={() => setActiveStage(null)}
                />
            )}

            {/* FEEDBACK POPUP OVERLAY */}
            {feedbackPopup && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 250,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'scaleIn 0.3s ease' }}>
                        <Mascot size={80} animation="bounce" style={{ marginBottom: '16px' }} />
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', textAlign: 'center', marginBottom: '24px' }}>
                            How are you finding Turtrl? 😊
                        </h2>

                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                            {['😞', '😐', '🙂', '😊', '🤩'].map(emoji => (
                                <button key={emoji} style={{
                                    width: '44px', height: '44px', borderRadius: '50%', background: 'var(--card2)', border: '1px solid var(--border)', fontSize: '24px', cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                    onClick={(e) => {
                                        [...e.currentTarget.parentElement.children].forEach(c => { c.style.transform = 'scale(1)'; c.style.borderColor = 'var(--border)'; });
                                        e.currentTarget.style.transform = 'scale(1.3)';
                                        e.currentTarget.style.borderColor = 'var(--green)';
                                    }}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>

                        <textarea className="input-field" placeholder="Tell us more (optional)" style={{ minHeight: '80px', marginBottom: '16px', resize: 'none' }}></textarea>

                        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                            <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setFeedbackPopup(false)}>Skip</button>
                            <button className="btn-primary" style={{ flex: 1 }} onClick={() => setFeedbackPopup(false)}>Submit</button>
                        </div>
                    </div>
                    <style>{`@keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1;} }`}</style>
                </div>
            )}
        </div>
    );
}
