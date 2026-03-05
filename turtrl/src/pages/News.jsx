import React, { useState } from 'react';
import { mockNews, mockEvents } from '../data/mockData';

const News = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Stocks', 'Crypto', 'Economy', 'Personal Finance'];

    const filteredNews = activeCategory === 'All'
        ? mockNews
        : mockNews.filter(n => n.category.includes(activeCategory) || (activeCategory === 'Breaking' && n.isFeatured));

    // Separate featured news if viewing 'All'
    const featuredNews = mockNews.find(n => n.isFeatured);
    const regularNews = filteredNews.filter(n => !n.isFeatured || activeCategory !== 'All');

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '24px' }}>Market Pulse 📡</h1>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '8px', margin: '0 -24px', padding: '0 24px' }} className="hide-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 20px', borderRadius: '24px', whiteSpace: 'nowrap',
                            background: activeCategory === cat ? 'var(--text)' : 'var(--card)',
                            color: activeCategory === cat ? 'var(--bg)' : 'var(--text)',
                            fontWeight: activeCategory === cat ? 'bold' : 'normal',
                            border: `1px solid ${activeCategory === cat ? 'var(--text)' : 'var(--border)'}`
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Featured News */}
            {activeCategory === 'All' && featuredNews && (
                <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '32px' }}>
                    <div style={{
                        height: '160px',
                        background: 'linear-gradient(45deg, var(--purple), var(--orange))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '3rem', opacity: 0.5 }}>⚡</span>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--error)', background: 'rgba(255, 77, 79, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                {featuredNews.category}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{featuredNews.timeAgo}</span>
                        </div>
                        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px', lineHeight: 1.3 }}>{featuredNews.headline}</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 'bold' }}>{featuredNews.source}</span>
                            <button style={{ color: 'var(--muted)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* News List */}
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Latest Updates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {regularNews.map(news => (
                    <div key={news.id} className="card" style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--green)', background: 'rgba(46, 204, 113, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                {news.category}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{news.timeAgo}</span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', lineHeight: 1.4 }}>{news.headline}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'bold' }}>{news.source}</span>
                            <button style={{ color: 'var(--muted)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Events Timeline */}
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Upcoming Events</h3>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '0', width: '2px', background: 'var(--card2)' }}></div>

                {mockEvents.map((evt, i) => (
                    <div key={evt.id} style={{ position: 'relative', marginBottom: i === mockEvents.length - 1 ? 0 : '32px' }}>
                        <div style={{
                            position: 'absolute', left: '-25px', top: '4px', width: '12px', height: '12px',
                            borderRadius: '50%', background: evt.type === 'crypto' ? 'var(--orange)' : evt.type === 'stocks' ? 'var(--green)' : 'var(--purple)',
                            border: '2px solid var(--bg)'
                        }}></div>
                        <div style={{ fontWeight: 'bold', color: 'var(--text)', fontSize: '1.1rem' }}>{evt.title}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4px' }}>{evt.date}</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default News;
