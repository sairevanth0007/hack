import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import Mascot from '../components/Mascot';
import ConfettiEffect from '../components/ConfettiEffect';
import { NEWS_ARTICLES } from '../utils/newsData';
import { checkAndUpdateStreak } from '../utils/auth';
import { useDevice } from '../utils/hooks';

export default function News() {
    const { isDesktop } = useDevice();
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeArticle, setActiveArticle] = useState(null); // the article being read/quizzed
    const [quizState, setQuizState] = useState(null); // { phase: 'reading'|'quiz'|'complete', qIndex: 0, correctCount: 0, answered: false, selectedOpt: null }

    const categories = ['All', 'Stocks', 'Crypto', 'Economy', 'Bonds', 'Personal Finance'];

    const filteredNav = activeCategory === 'All'
        ? NEWS_ARTICLES
        : NEWS_ARTICLES.filter(a => a.category === activeCategory);

    const handleRead = (article) => {
        setActiveArticle(article);
        setQuizState({ phase: 'reading', qIndex: 0, correctCount: 0, answered: false, selectedOpt: null });
    };

    const handleQuizStart = () => {
        setQuizState(prev => ({ ...prev, phase: 'quiz' }));
    };

    const handleAnswer = (optIndex) => {
        if (quizState.answered) return;

        const isCorrect = activeArticle.quiz[quizState.qIndex].options[optIndex].correct;
        setQuizState(prev => ({
            ...prev,
            answered: true,
            selectedOpt: optIndex,
            correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount
        }));
    };

    const handleNextQ = () => {
        if (quizState.qIndex < activeArticle.quiz.length - 1) {
            setQuizState(prev => ({
                ...prev,
                qIndex: prev.qIndex + 1,
                answered: false,
                selectedOpt: null
            }));
        } else {
            // Finished all questions
            const finalCount = quizState.correctCount;
            if (finalCount === activeArticle.quiz.length) {
                checkAndUpdateStreak();
            }
            setQuizState(prev => ({ ...prev, phase: 'complete' }));
        }
    };

    const getPillColor = (cat) => {
        switch (cat) {
            case 'Stocks': return 'var(--purple)';
            case 'Crypto': return 'var(--gold)';
            case 'Economy': return '#3498db';
            case 'Bonds': return 'var(--orange)';
            case 'Personal Finance': return 'var(--green)';
            default: return 'var(--muted)';
        }
    };

    const renderList = () => (
        <>
            {/* HEADER SECTION */}
            <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mascot size={40} animation="none" />
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', margin: 0 }}>Market Pulse 📡</h1>
            </div>

            {/* FILTER TABS */}
            <div style={{ padding: '16px 20px', display: 'flex', gap: '10px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', flexShrink: 0 }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ARTICLES LIST */}
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingBottom: isDesktop ? '32px' : '0' }}>
                {filteredNav.map(article => (
                    <div key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', border: `1px solid ${getPillColor(article.category)}`, color: getPillColor(article.category), background: 'var(--card2)' }}>
                                {article.category}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{article.timeAgo}</span>
                        </div>

                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', margin: '8px 0 12px' }}>
                            {article.headline}
                        </h2>

                        <ul style={{ listStyle: 'none', margin: '0 0 16px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {article.summary.map((point, idx) => (
                                <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                                    <span style={{ color: 'var(--green)', fontSize: '16px', lineHeight: 1 }}>▪</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '16px' }}>
                            — {article.source}
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            {/* Hidden buttons or alternative interaction for desktop maybe, but we can reuse the same layout */}
                            <button className="btn-ghost" style={{ flex: 1, padding: '10px' }} onClick={() => { /* Skip logic */ }}>
                                I know this — Skip →
                            </button>
                            <button className="btn-primary" style={{ flex: 1, padding: '10px' }} onClick={() => handleRead(article)}>
                                Read & Quiz →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const renderArticleContent = () => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--muted)' }}>
                    {quizState.phase === 'reading' ? 'Reading' : quizState.phase === 'quiz' ? 'Quiz Time' : 'Results'}
                </span>
                <button onClick={() => setActiveArticle(null)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
                {/* READING PHASE */}
                {quizState.phase === 'reading' && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', marginBottom: '8px' }}>
                            {activeArticle.headline}
                        </h1>
                        <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '24px' }}>
                            {activeArticle.source} • {activeArticle.timeAgo}
                        </div>

                        <div className="card" style={{ background: 'var(--card2)', border: 'none' }}>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {activeArticle.summary.map((point, idx) => (
                                    <li key={idx} style={{ display: 'flex', gap: '12px', fontSize: '15px', lineHeight: 1.6 }}>
                                        <span style={{ color: 'var(--green)', fontSize: '20px', lineHeight: 1 }}>▪</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
                            <button className="btn-primary" onClick={handleQuizStart}>
                                I'm ready — Take the Quiz →
                            </button>
                        </div>
                    </div>
                )}

                {/* QUIZ PHASE */}
                {quizState.phase === 'quiz' && (() => {
                    const q = activeArticle.quiz[quizState.qIndex];
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px', fontWeight: 600 }}>
                                Question {quizState.qIndex + 1} of {activeArticle.quiz.length}
                            </div>

                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', marginBottom: '24px' }}>
                                {q.question}
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {q.options.map((opt, idx) => {
                                    let sClass = '';
                                    if (quizState.answered) {
                                        if (idx === quizState.selectedOpt) sClass = opt.correct ? 'correct' : 'wrong';
                                        else if (opt.correct) sClass = 'correct';
                                    }
                                    return (
                                        <div
                                            key={idx}
                                            className={`option-card ${sClass}`}
                                            onClick={() => handleAnswer(idx)}
                                        >
                                            {opt.text}
                                        </div>
                                    )
                                })}
                            </div>

                            {quizState.answered && (
                                <div className="card" style={{
                                    marginTop: '24px',
                                    background: q.options[quizState.selectedOpt].correct ? 'var(--green-dim)' : 'rgba(231,76,60,0.12)',
                                    borderColor: q.options[quizState.selectedOpt].correct ? 'var(--green)' : 'var(--red)'
                                }}>
                                    <div style={{ fontWeight: 700, marginBottom: '4px', color: q.options[quizState.selectedOpt].correct ? 'var(--green)' : 'var(--red)' }}>
                                        {q.options[quizState.selectedOpt].correct ? 'Correct!' : 'Not quite.'}
                                    </div>
                                    <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                                        {q.explanation}
                                    </div>
                                </div>
                            )}

                            <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                                {quizState.answered && (
                                    <button className="btn-primary" onClick={handleNextQ}>
                                        {quizState.qIndex < activeArticle.quiz.length - 1 ? 'Next →' : 'See Results →'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })()}

                {/* COMPLETE PHASE */}
                {quizState.phase === 'complete' && (() => {
                    const allCorrect = quizState.correctCount === activeArticle.quiz.length;
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            {allCorrect && <ConfettiEffect active={true} />}

                            <Mascot size={allCorrect ? 100 : 80} animation={allCorrect ? "popIn" : "bounce"} />

                            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, margin: '24px 0 8px', color: allCorrect ? 'var(--green)' : 'var(--text)' }}>
                                {quizState.correctCount} / {activeArticle.quiz.length} correct
                            </div>

                            <p style={{ fontSize: '16px', color: allCorrect ? 'var(--green)' : 'var(--muted)', marginBottom: '32px', fontWeight: 600 }}>
                                {allCorrect ? "Perfect score! 🎉" : "Keep learning!"}
                            </p>

                            {allCorrect && (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                                    <div className="card" style={{ background: 'var(--gold-dim)', borderColor: 'var(--gold)', color: 'var(--gold)', fontWeight: 700 }}>
                                        🔥 Streak extended!
                                    </div>
                                    <div className="card" style={{ background: 'var(--green-dim)', borderColor: 'var(--green)', color: 'var(--green)', fontWeight: 700 }}>
                                        +10 XP
                                    </div>
                                </div>
                            )}

                            <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }} onClick={() => setActiveArticle(null)}>
                                Back to News
                            </button>
                        </div>
                    );
                })()}
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <div style={{ display: 'flex', gap: '40px', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: '20px' }}>
                    {renderList()}
                </div>
                <div style={{ flex: 1, height: '100%', paddingBottom: '32px' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--card)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                        {activeArticle && quizState ? renderArticleContent() : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>
                                <Mascot size={150} animation="float" />
                                <h2 style={{ marginTop: '24px', fontFamily: "'Syne', sans-serif", fontSize: '24px', color: 'var(--green)' }}>Market Pulse</h2>
                                <p style={{ marginTop: '16px', fontSize: '16px' }}>Select an article from the left to read and test your knowledge!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page" style={{ paddingTop: '56px', paddingBottom: '64px', background: 'var(--bg)' }}>
            <TopNav />
            {renderList()}
            <BottomNav />

            {/* FULL SCREEN READING / QUIZ OVERLAY FOR MOBILE */}
            {activeArticle && quizState && !isDesktop && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 150,
                    display: 'flex', flexDirection: 'column', animation: 'slideUp 0.3s ease'
                }}>
                    {renderArticleContent()}
                </div>
            )}
        </div>
    );
}
