import React, { useState, useEffect, useRef } from 'react';
import { chatIntros } from '../data/mockData';
import { auth } from '../utils/auth';

const AIChat = () => {
    const user = auth.getCurrentUser();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);

    // Initial greeting
    useEffect(() => {
        const greeting = chatIntros[Math.floor(Math.random() * chatIntros.length)];
        setMessages([{
            id: 1,
            sender: 'ai',
            text: `Hey ${user?.firstName || 'there'}! ` + greeting
        }]);
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        // Add user message
        const newMsgId = messages.length + 1;
        setMessages(prev => [...prev, { id: newMsgId, sender: 'user', text }]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI response delay
        setTimeout(() => {
            setIsTyping(false);

            let replyText = "That's an interesting question about your finances. For demo purposes, here's a generic response: A balanced portfolio strategy combined with consistent monthly savings is the key to steady growth. Keep tracking your milestones!";

            if (text.toLowerCase().includes('etf')) {
                replyText = "ETFs (Exchange Traded Funds) are great because they offer instant diversification. Instead of picking one stock, you're buying a basket of many. Your current MSCI World ETF is holding strong.";
            } else if (text.toLowerCase().includes('btc') || text.toLowerCase().includes('crypto')) {
                replyText = "Crypto assets like BTC are highly volatile. They can offer high returns but carry significant risk. Right now, it makes up 28% of your portfolio, which is quite aggressive for a balanced strategy. Consider if this aligns with your comfort level.";
            } else if (text.toLowerCase().includes('100k')) {
                replyText = "Reaching €100K requires consistency. If you increase your monthly savings by just €50, our projections show you could hit that target 14 months earlier!";
            }

            setMessages(prev => [
                ...prev,
                { id: prev.length + 1, sender: 'ai', text: replyText, showFeedback: (prev.length + 1) % 5 === 0 }
            ]);
        }, 1500);
    };

    const suggestions = [
        "Why is my ETF down?",
        "Should I buy more BTC?",
        "How to reach 100K faster?",
        "Explain compound interest"
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', position: 'relative' }}>

            {/* Header */}
            <div style={{
                padding: '24px 24px 16px 24px',
                background: 'rgba(13, 17, 23, 0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '12px',
                position: 'sticky', top: 0, zIndex: 10
            }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'rgba(46, 204, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', color: 'var(--green)'
                }}>
                    🤖
                </div>
                <div>
                    <h1 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        AI Advisor <span style={{ fontSize: '0.6rem', background: 'var(--purple)', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>BETA</span>
                    </h1>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>Powered by financial intelligence</p>
                </div>
            </div>

            {/* Chat Area */}
            <div style={{
                flex: 1, overflowY: 'auto', padding: '24px', paddingBottom: '140px'
            }} className="hide-scrollbar">

                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            maxWidth: '85%',
                            padding: '16px',
                            borderRadius: '20px',
                            borderBottomLeftRadius: msg.sender === 'ai' ? '4px' : '20px',
                            borderBottomRightRadius: msg.sender === 'user' ? '4px' : '20px',
                            background: msg.sender === 'user' ? 'var(--green)' : 'var(--card2)',
                            color: msg.sender === 'user' ? '#000' : 'var(--text)',
                            border: msg.sender === 'ai' ? '1px solid var(--border)' : 'none',
                            boxShadow: msg.sender === 'user' ? '0 4px 15px var(--green-glow)' : 'none',
                            lineHeight: 1.5,
                            fontSize: '0.95rem'
                        }}>
                            {msg.text}
                        </div>

                        {msg.sender === 'ai' && (
                            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '8px', marginLeft: '4px' }}>
                                Turtrl AI • Just now
                            </div>
                        )}

                        {/* Periodic Feedback Prompt */}
                        {msg.showFeedback && (
                            <div style={{
                                background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px',
                                padding: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px'
                            }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Was this helpful?</span>
                                <button style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--card2)' }}>👍</button>
                                <button style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--card2)' }}>👎</button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div style={{
                        display: 'flex', alignItems: 'flex-start', marginBottom: '20px'
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            borderRadius: '20px',
                            borderBottomLeftRadius: '4px',
                            background: 'var(--card2)',
                            border: '1px solid var(--border)',
                            display: 'flex', gap: '6px'
                        }}>
                            <style>{`
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); opacity: 0.5; }
                  50% { transform: translateY(-4px); opacity: 1; }
                }
                .dot { width: 6px; height: 6px; background: var(--text); border-radius: 50%; opacity: 0.5; }
              `}</style>
                            <div className="dot" style={{ animation: 'bounce 1s infinite' }}></div>
                            <div className="dot" style={{ animation: 'bounce 1s infinite 0.2s' }}></div>
                            <div className="dot" style={{ animation: 'bounce 1s infinite 0.4s' }}></div>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input Area (Fixed at bottom) */}
            <div style={{
                position: 'absolute', bottom: '80px', left: 0, right: 0,
                padding: '16px 24px', background: 'var(--bg)',
                borderTop: '1px solid var(--border)',
                zIndex: 90 // Below bottom nav (zIndex 100)
            }}>

                {/* Suggestion Chips */}
                {messages.length <= 1 && !isTyping && (
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '8px' }} className="hide-scrollbar">
                        {suggestions.map((chip, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(chip)}
                                style={{
                                    whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '20px',
                                    background: 'var(--card)', border: '1px solid var(--green)', color: 'var(--green)',
                                    fontSize: '0.8rem', display: 'flex', alignItems: 'center'
                                }}
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                )}

                {/* Text Input */}
                <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask anything about your finances..."
                        className="input-field"
                        style={{ borderRadius: '24px', paddingLeft: '20px' }}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            background: inputValue.trim() ? 'var(--green)' : 'var(--card2)',
                            color: inputValue.trim() ? '#000' : 'var(--muted)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AIChat;
