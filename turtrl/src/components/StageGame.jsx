import React, { useState, useEffect } from 'react';
import Mascot from './Mascot';
import ConfettiEffect from './ConfettiEffect';
import PriceChart from './PriceChart';
import { getUser, updateUser, unlockBadge, awardCoins } from '../utils/auth';
import { getAsset, MARKET_DATA } from '../utils/marketData';
import { useDevice } from '../utils/hooks';

export default function StageGame({ stage, onComplete, onClose }) {
    const { isDesktop } = useDevice();
    if (!stage || !stage.type) return null;
    const [phase, setPhase] = useState('play'); // 'play', 'simulating', 'result', 'bankrupt'

    // Quiz State
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);

    // Trade State
    const [investedAmount, setInvestedAmount] = useState('');
    const [tradeResult, setTradeResult] = useState(null);

    // Decision State
    const [decisionOutcome, setDecisionOutcome] = useState(null);

    const [user, setUser] = useState(getUser());
    const balance = user?.virtualBalance || 0;

    // Cleanup on unmount if needed
    useEffect(() => {
        return () => {
            setPhase('play');
        };
    }, [stage.id]);

    const handleBack = () => {
        if (window.confirm("Quit this stage? Progress will be lost.")) {
            onClose();
        }
    };

    const renderTopBar = () => (
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px' }}>
            <button onClick={handleBack} style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '24px', cursor: 'pointer' }}>
                ←
            </button>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700 }}>
                {stage.title}
            </div>
            <div style={{ width: '24px' }}></div> {/* Spacer for centering */}
        </div>
    );

    const handleQuizAnswer = () => {
        setAnswered(true);
        if (stage.options[selectedAnswer].correct) {
            // Reward granted in result phase or upon continue
        }
    };

    const handleTrade = () => {
        const amount = parseFloat(investedAmount);
        if (!amount || amount < 100 || amount > balance) return;

        setPhase('simulating');

        setTimeout(() => {
            let baseReturn = 0;
            if (stage.realData && stage.realData.yearlyReturn2023) {
                baseReturn = parseFloat(stage.realData.yearlyReturn2023.replace('%', '').replace('+', ''));
            } else if (stage.riskRange) {
                const min = stage.riskRange.minReturn;
                const max = stage.riskRange.maxReturn;
                baseReturn = min + Math.random() * (max - min);
            }

            // Personal variance -2% to +2%
            const variance = (Math.random() * 4) - 2;
            const returnPct = baseReturn + variance;
            const profit = amount * (returnPct / 100);
            const newBalance = balance + profit;

            setTradeResult({ amount, returnPct, profit, newBalance });

            if (newBalance <= 0) {
                setPhase('bankrupt');
            } else {
                setPhase('result');
            }
        }, 2000);
    };

    const handleDecision = (choice) => {
        setDecisionOutcome(choice);
        // Award bonus coins immediately or in a batched update, wait for continue
    };

    const finishStage = (pointsToAward, tradeData = null) => {
        if (typeof awardCoins === 'function') {
            awardCoins(pointsToAward, `Stage ${stage.id}: ${stage.title}`);
        }
        let updates = {};

        if (tradeData) {
            updates.virtualBalance = tradeData.newBalance;
            const history = [...(user.tradeHistory || []), {
                stageId: stage.id,
                asset: stage.asset.name,
                symbol: stage.asset.symbol,
                invested: tradeData.amount,
                returnPct: tradeData.returnPct,
                profit: tradeData.profit,
                date: new Date().toISOString()
            }];
            updates.tradeHistory = history;
            if (history.length === 1) unlockBadge('first_trade');
            if (tradeData.profit > 0) unlockBadge('profit_maker');
        }

        if (decisionOutcome && decisionOutcome.pointBonus) {
            if (typeof awardCoins === 'function') {
                awardCoins(decisionOutcome.pointBonus, `Bonus: ${stage.title} — ${decisionOutcome.text.slice(0, 30)}`);
            }
        }

        // Complete stage list tracking is handled by the parent component or when returning
        updateUser(updates);
        setUser(getUser()); // Refresh user state after update
        setPhase('result_end'); // Show generic completion for a bit
    };

    // ------------------------------------------
    // RENDER FLOWS
    // ------------------------------------------

    const getContainerStyle = (extraStyles = {}) => {
        const desktopStyle = {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        };
        const mobileStyle = {
            position: 'fixed',
            inset: 0,
            background: 'var(--bg)',
            zIndex: 150,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.35s ease'
        };
        return { ...(isDesktop ? desktopStyle : mobileStyle), ...extraStyles };
    };

    if (phase === 'result_end') {
        return (
            <div style={getContainerStyle()}>
                <ConfettiEffect active={true} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px', textAlign: 'center' }}>
                    <Mascot size={150} animation="popIn" />
                    {stage.unlockedByDefault ? (
                        <>
                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '26px', color: 'var(--green)', margin: '24px 0 8px' }}>
                                Nice! You've completed a showcase simulation. 🎉
                            </h2>
                            <p style={{ fontSize: '16px', marginBottom: '24px', color: 'var(--muted)' }}>{stage.title} data explored.</p>
                        </>
                    ) : (
                        <>
                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '30px', color: 'var(--green)', margin: '24px 0 8px' }}>
                                Stage Complete! 🎉
                            </h2>
                            <p style={{ fontSize: '18px', marginBottom: '24px' }}>{stage.title}</p>
                        </>
                    )}

                    <div className="pill active" style={{ fontSize: '16px', padding: '8px 20px', animation: 'popIn 0.4s ease 0.2s both' }}>
                        +50 Coins
                    </div>

                    <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }} onClick={onComplete}>
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'bankrupt') {
        return (
            <div style={getContainerStyle()}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px', textAlign: 'center' }}>
                    <Mascot size={120} animation="shake" />
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', color: 'var(--red)', margin: '24px 0 8px' }}>
                        Bankrupt! 💸
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '32px' }}>
                        Every investor has bad days. Let's start fresh.
                    </p>

                    <button className="btn-primary" onClick={() => {
                        updateUser({ virtualBalance: 10000 });
                        setUser(getUser()); // Refresh user state after update
                        unlockBadge('bankrupt_survivor');
                        onClose(); // Close without saving stage completion, or reset chapter
                    }}>
                        Start fresh →
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'simulating') {
        return (
            <div style={getContainerStyle({ justifyContent: 'center', alignItems: 'center' })}>
                <Mascot size={120} animation="pulse" />
                <p style={{ marginTop: '24px', fontSize: '18px', fontWeight: 600 }}>Simulating 1 year...</p>
            </div>
        );
    }

    if (phase === 'result') {
        const isProfit = tradeResult.profit > 0;
        return (
            <div style={getContainerStyle()}>
                {isProfit && <ConfettiEffect active={true} />}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px' }}>
                    <Mascot size={isProfit ? 120 : 100} animation={isProfit ? 'popIn' : 'shake'} />

                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', color: isProfit ? 'var(--green)' : 'var(--red)', margin: '24px 0 8px' }}>
                        {isProfit ? 'Profit! 🎉' : 'Loss 📉'}
                    </h2>

                    <div style={{ fontSize: '40px', fontWeight: 800, color: isProfit ? 'var(--green)' : 'var(--red)', marginBottom: '8px' }}>
                        {isProfit ? '+' : '-'}€{Math.abs(tradeResult.profit).toFixed(2)}
                    </div>

                    <div style={{ color: isProfit ? 'var(--green)' : 'var(--red)', fontWeight: 600, marginBottom: '32px' }}>
                        {isProfit ? '+' : ''}{tradeResult.returnPct.toFixed(1)}%
                    </div>

                    <div className="card" style={{ width: '100%', textAlign: 'center', fontSize: '18px', fontWeight: 700 }}>
                        New Balance: <span style={{ color: 'var(--gold)' }}>€{tradeResult.newBalance.toFixed(2)}</span>
                    </div>

                    <button className="btn-primary" style={{ marginTop: 'auto' }} onClick={() => finishStage(50, tradeResult)}>
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    const renderActionButton = () => {
        // This function is not fully defined in the provided snippet,
        // but it's used in the decision stage.
        // Assuming it would render a button based on the current state.
        // For now, we'll render a placeholder or the original button.
        if (decisionOutcome) {
            return (
                <button className="btn-primary" onClick={() => finishStage(50)}>
                    Continue →
                </button>
            );
        }
        return null;
    };

    return (
        <div style={getContainerStyle()}>
            {renderTopBar()}

            <div style={{ padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

                {/* QUIZ */}
                {stage.type === 'quiz' && (
                    <>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', marginBottom: '24px', marginTop: '16px' }}>
                            {stage.question}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {stage.options.map((opt, idx) => {
                                let statusClass = '';
                                if (answered) {
                                    if (idx === selectedAnswer) {
                                        statusClass = opt.correct ? 'correct' : 'wrong';
                                    } else if (opt.correct) {
                                        statusClass = 'correct';
                                    }
                                } else if (idx === selectedAnswer) {
                                    statusClass = 'selected';
                                }

                                return (
                                    <div
                                        key={idx}
                                        className={`option-card ${statusClass}`}
                                        onClick={() => !answered && setSelectedAnswer(idx)}
                                    >
                                        {opt.text}
                                    </div>
                                )
                            })}
                        </div>

                        {answered && (
                            <div className="card" style={{
                                marginTop: '24px',
                                background: stage.options[selectedAnswer].correct ? 'var(--green-dim)' : 'rgba(231,76,60,0.12)',
                                borderColor: stage.options[selectedAnswer].correct ? 'var(--green)' : 'var(--red)'
                            }}>
                                <div style={{ fontWeight: 700, marginBottom: '4px', color: stage.options[selectedAnswer].correct ? 'var(--green)' : 'var(--red)' }}>
                                    {stage.options[selectedAnswer].correct ? 'Correct! 🎉' : 'Not quite.'}
                                </div>
                                <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                                    {stage.options[selectedAnswer].explanation}
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 'auto', paddingTop: '24px', paddingBottom: '24px' }}>
                            {!answered ? (
                                <button
                                    className="btn-primary"
                                    disabled={selectedAnswer === null}
                                    onClick={handleQuizAnswer}
                                    style={{ opacity: selectedAnswer === null ? 0.5 : 1 }}
                                >
                                    Check Answer
                                </button>
                            ) : (
                                <button
                                    className="btn-primary"
                                    onClick={() => stage.options[selectedAnswer].correct ? finishStage(50) : onClose()}
                                >
                                    {stage.options[selectedAnswer].correct ? 'Continue →' : 'Got it →'}
                                </button>
                            )}
                        </div>
                    </>
                )}

                {/* TRADE */}
                {stage.type === 'trade' && (() => {
                    const symbol = stage?.asset?.symbol;
                    const assetData = symbol ? getAsset(symbol) : null;

                    // Debug: log what we got
                    console.log('Stage asset symbol:', symbol);
                    console.log('Asset data found:', assetData ? 'YES' : 'NO');
                    console.log('Available symbols:', Object.keys(MARKET_DATA));

                    if (!assetData) {
                        return (
                            <div style={{
                                padding: '20px',
                                background: 'var(--card)',
                                borderRadius: '16px',
                                border: '1px solid var(--border)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
                                <div style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontSize: '16px', fontWeight: '700',
                                    marginBottom: '6px'
                                }}>
                                    Loading asset data...
                                </div>
                                <div style={{
                                    fontSize: '11px', color: 'var(--muted)',
                                    fontFamily: 'monospace'
                                }}>
                                    Symbol: {symbol || 'undefined'}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <>
                            <div className="card" style={{ background: 'var(--green-dim)', borderColor: 'var(--green)', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div style={{ fontSize: '20px' }}>💡</div>
                                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{stage.lesson}</div>
                            </div>

                            <div className="card" style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <AssetLogo symbol={stage.asset.symbol || (stage.realData && stage.realData.symbol)} size={36} />
                                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700 }}>{stage.asset.name}</div>
                                        <span className="pill" style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '10px', padding: '2px 8px' }}>{stage.asset.type}</span>
                                    </div>
                                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700 }}>
                                        €{stage.asset.mockPrice.toFixed(2)}
                                    </div>
                                </div>

                                <div style={{ width: '100%', height: '1px', background: 'var(--border)', marginBottom: '16px' }} />

                                <PriceChart symbol={stage.asset.symbol || (stage.realData && stage.realData.symbol)} height={180} showLabels={true} />
                            </div>

                            <div style={{ marginTop: '24px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>How much to invest?</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text)' }}>€</span>
                                    <input
                                        type="number"
                                        className="input-field"
                                        style={{ paddingLeft: '32px', paddingRight: '60px' }}
                                        value={investedAmount}
                                        onChange={e => setInvestedAmount(e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <button
                                        onClick={() => setInvestedAmount(balance.toString())}
                                        style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--green)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                        MAX
                                    </button>
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
                                    Available: €{balance.toLocaleString()}
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '24px', paddingBottom: '24px' }}>
                                <button
                                    className="btn-primary"
                                    disabled={!investedAmount || parseFloat(investedAmount) < 100 || parseFloat(investedAmount) > balance}
                                    onClick={handleTrade}
                                    style={{ opacity: (!investedAmount || parseFloat(investedAmount) < 100 || parseFloat(investedAmount) > balance) ? 0.5 : 1 }}
                                >
                                    Invest Virtual Money
                                </button>
                                {investedAmount && parseFloat(investedAmount) < 100 && (
                                    <div style={{ textAlign: 'center', color: 'var(--red)', fontSize: '12px', marginTop: '8px' }}>Minimum investment is €100</div>
                                )}
                            </div>
                        </>
                    );
                })()}

                {/* DECISION */}
                {stage.type === 'decision' && (
                    <>
                        <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ fontSize: '32px' }}>🤔</div>
                            <div style={{ fontSize: '15px', lineHeight: 1.5, fontWeight: 500 }}>{stage.scenario}</div>
                        </div>

                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', marginBottom: '16px' }}>What would you do?</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {stage.choices.map((choice, idx) => (
                                <div
                                    key={idx}
                                    className={`option-card ${decisionOutcome === choice ? 'selected' : ''}`}
                                    onClick={() => !decisionOutcome && handleDecision(choice)}
                                    style={{ opacity: decisionOutcome && decisionOutcome !== choice ? 0.5 : 1 }}
                                >
                                    {choice.text}
                                </div>
                            ))}
                        </div>

                        {decisionOutcome && (
                            <div className="card" style={{
                                marginTop: '24px',
                                background: decisionOutcome.pointBonus >= 50 ? 'var(--green-dim)' : (decisionOutcome.pointBonus > 0 ? 'rgba(244,196,48,0.12)' : 'rgba(231,76,60,0.12)'),
                                borderColor: decisionOutcome.pointBonus >= 50 ? 'var(--green)' : (decisionOutcome.pointBonus > 0 ? 'var(--gold)' : 'var(--red)')
                            }}>
                                <div style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: decisionOutcome.pointBonus > 0 ? '12px' : '0' }}>
                                    {decisionOutcome.outcome}
                                </div>
                                {decisionOutcome.pointBonus > 0 && (
                                    <div style={{ fontWeight: 700, color: 'var(--green)' }}>+{decisionOutcome.pointBonus} bonus Coins!</div>
                                )}
                            </div>
                        )}

                        <div style={{ marginTop: 'auto', paddingTop: '24px', paddingBottom: '24px' }}>
                            {renderActionButton()}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
