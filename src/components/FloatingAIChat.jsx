import React, { useState, useEffect, useRef } from 'react';
import BottomSheet from './BottomSheet';
import { getUser } from '../utils/auth';
import { useDevice } from '../utils/hooks';
import mascotImg from '../images/mascot.png';

let nextMessageId = 1000;

export default function FloatingAIChat() {
    const { isDesktop } = useDevice();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const user = getUser(); // Called periodically or on mount

    useEffect(() => {
        if (isOpen && messages.length === 0 && user) {
            setMessages([{
                id: 1,
                sender: 'ai',
                text: `Hey ${user.firstName}! 👋 I'm your financial AI guide. Ask me anything about investing, your stages, or how to reach €100K faster!`
            }]);
        }
    }, [isOpen, messages.length, user]);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isOpen]);

    if (!user) return null;

    const handleSend = (textOverride) => {
        const text = textOverride || inputText;
        if (!text.trim()) return;

        const newMessages = [...messages, { id: nextMessageId++, sender: 'user', text }];
        setMessages(newMessages);
        setInputText('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const lower = text.toLowerCase();
            let response = "Great question! Keep learning through the stages and news quizzes — every bit of knowledge gets you closer to €100K! 💪";

            if (lower.includes('invest')) {
                response = "Based on your profile, I'd suggest starting with ETFs for stable growth. Complete the Mutual Funds chapter to learn more! 📊";
            } else if (lower.includes('ruby') || lower.includes('rubies')) {
                response = "Rubies are earned by maintaining a perfect 7 daystreak! You can use them to skip stages or protect your streak. 💎";
            } else if (lower.includes('compound')) {
                response = "Compound interest means your returns earn returns. €10K at 7%/year becomes €19.6K in 10 years — without adding a cent! 🚀";
            } else if (lower.includes('stage')) {
                response = `Your current stage is Stage ${user.currentStage}. Head to the Stages page to continue! 🗺`;
            } else if (lower.includes('streak')) {
                response = `You're on a ${user.streak}-day streak! Complete a news quiz daily to keep it going 🔥`;
            }

            setMessages(prev => [...prev, { id: nextMessageId++, sender: 'ai', text: response }]);
        }, 1500);
    };

    const chips = [
        "What should I invest in?",
        "How do I earn rubies?",
        "Explain compound interest",
        "What's my next stage?"
    ];

    const chatContent = (
        <>
            {/* Custom header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: isDesktop ? '0' : '-40px', marginBottom: '20px' }}>
                <img src={mascotImg} width="28" height="28" style={{ border: '2px solid var(--green)', borderRadius: '50%' }} alt="AI Avatar" />
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', margin: 0 }}>AI Advisor</h3>
                <span className="pill" style={{ padding: '2px 8px', fontSize: '10px', background: 'var(--purple-dim)', color: 'var(--purple)', borderColor: 'transparent' }}>Beta</span>

                {isDesktop && (
                    <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', height: isDesktop ? 'calc(100% - 60px)' : '60vh' }}>
                {/* Chat Messages */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px' }}>
                    {messages.map(m => (
                        <div key={m.id} style={{ display: 'flex', gap: '8px', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                            {m.sender === 'ai' && (
                                <img src={mascotImg} width="28" height="28" style={{ border: '2px solid var(--green)', borderRadius: '50%', flexShrink: 0 }} alt="AI Avatar" />
                            )}
                            <div style={{
                                background: m.sender === 'user' ? 'var(--green)' : 'var(--card2)',
                                color: m.sender === 'user' ? '#000' : 'var(--text)',
                                borderRadius: m.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                                padding: '10px 14px',
                                fontSize: '14px',
                                lineHeight: 1.4
                            }}>
                                {m.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start', maxWidth: '85%' }}>
                            <img src={mascotImg} width="28" height="28" style={{ border: '2px solid var(--green)', borderRadius: '50%', flexShrink: 0 }} alt="AI Avatar" />
                            <div style={{ background: 'var(--card2)', borderRadius: '4px 16px 16px 16px', padding: '14px', display: 'flex', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', background: 'var(--muted)', borderRadius: '50%', animation: 'bounce 1s infinite 0s' }}></span>
                                <span style={{ width: '6px', height: '6px', background: 'var(--muted)', borderRadius: '50%', animation: 'bounce 1s infinite 0.15s' }}></span>
                                <span style={{ width: '6px', height: '6px', background: 'var(--muted)', borderRadius: '50%', animation: 'bounce 1s infinite 0.3s' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {chips.map((chip, idx) => (
                        <button
                            key={idx}
                            className="pill"
                            onClick={() => handleSend(chip)}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {chip}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        className="input-field"
                        style={{ flex: 1, borderRadius: '24px', paddingLeft: '20px' }}
                        placeholder="Ask anything..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={() => handleSend()}
                        style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            background: inputText.trim() ? 'var(--green)' : 'var(--card2)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: inputText.trim() ? '#000' : 'var(--muted)',
                            transition: 'background 0.2s',
                            fontSize: '18px'
                        }}
                    >
                        ➔
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {(!isOpen || !isDesktop) && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: isDesktop ? '32px' : '80px',
                        right: isDesktop ? '32px' : '16px',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--green)',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(46,204,113,0.4)',
                        zIndex: 90,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        border: '2px solid var(--green)',
                        animation: 'pulseRing 3s infinite'
                    }}></div>
                    <img src={mascotImg} width="36" height="auto" alt="AI Chat" style={{ borderRadius: '50%' }} />
                </button>
            )}

            {isDesktop ? (
                isOpen && (
                    <div style={{
                        position: 'fixed',
                        bottom: '32px',
                        right: '32px',
                        width: '380px',
                        height: '520px',
                        borderRadius: '24px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        zIndex: 201,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'modalIn 0.25s ease forwards'
                    }}>
                        {chatContent}
                    </div>
                )
            ) : (
                <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="">
                    {chatContent}
                </BottomSheet>
            )}
        </>
    );
}
