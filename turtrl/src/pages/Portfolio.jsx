import React, { useState } from 'react';
import { mockPortfolioData } from '../data/mockData';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('1M');
    const [expandedRow, setExpandedRow] = useState(null);

    // Simple SVG Line Chart generator
    const renderLineChart = () => {
        // Determine data based on tab (mock logic)
        const points = {
            '1W': [20, 25, 23, 40, 35, 60, 80],
            '1M': [10, 15, 20, 18, 30, 45, 40, 60, 55, 75, 80, 100],
            '3M': [0, 5, 10, 20, 15, 30, 45, 60, 50, 70, 85, 100],
            '1Y': [0, 10, 5, 20, 35, 30, 50, 45, 65, 80, 95, 100],
            'All': [0, 20, 30, 25, 40, 60, 50, 75, 85, 90, 80, 100],
        }[activeTab] || [];

        const width = 300;
        const height = 150;
        const padding = 10;

        const minX = 0;
        const maxX = points.length - 1;
        const minY = 0;
        const maxY = 100;

        const scaleX = (x) => ((x - minX) / (maxX - minX)) * (width - padding * 2) + padding;
        const scaleY = (y) => height - (((y - minY) / (maxY - minY)) * (height - padding * 2) + padding);

        const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(p)}`).join(' ');

        // Create gradient fill path
        const fillPathData = `${pathData} L ${scaleX(maxX)} ${height} L ${scaleX(minX)} ${height} Z`;

        return (
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--green)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={fillPathData} fill="url(#chartGradient)" />
                <path d={pathData} fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Current point */}
                <circle cx={scaleX(maxX)} cy={scaleY(points[points.length - 1])} r="4" fill="var(--bg)" stroke="var(--green)" strokeWidth="3" />
            </svg>
        );
    };

    // Simple SVG Doughnut Chart generator
    const renderDoughnut = () => {
        let currentAngle = 0;
        const cx = 100, cy = 100, r = 80, strokeWidth = 30;

        const createPath = (percentage, color) => {
            const startAngle = currentAngle;
            const endAngle = currentAngle + (percentage / 100) * 360;
            currentAngle = endAngle;

            const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
            const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
            const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
            const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);

            const largeArcFlag = percentage > 50 ? 1 : 0;

            // Small gap between segments
            const gap = percentage === 100 ? 0 : 2;
            const adjustedEndAngle = endAngle - gap;
            const x2Adj = cx + r * Math.cos((Math.PI * adjustedEndAngle) / 180);
            const y2Adj = cy + r * Math.sin((Math.PI * adjustedEndAngle) / 180);

            return (
                <path
                    key={color}
                    d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2Adj} ${y2Adj}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            );
        };

        return (
            <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                {mockPortfolioData.allocation.map(a => createPath(a.percentage, a.color))}
            </svg>
        );
    };

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Portfolio</h1>

            {/* Performance Chart */}
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Total Balance</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', margin: 0, fontWeight: '800' }}>
                        €{mockPortfolioData.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                    <span style={{ color: 'var(--green)', fontWeight: 'bold', paddingBottom: '6px' }}>
                        +€{mockPortfolioData.monthlyChange} ({mockPortfolioData.monthlyChangePercent}%)
                    </span>
                </div>

                {/* Chart render area */}
                <div style={{ margin: '0 -12px 24px -12px' }}>
                    {renderLineChart()}
                </div>

                {/* Time Toggles */}
                <div style={{ display: 'flex', background: 'var(--card2)', borderRadius: '8px', padding: '4px' }}>
                    {['1W', '1M', '3M', '1Y', 'All'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1, padding: '8px 0', fontSize: '0.8rem', fontWeight: 'bold',
                                borderRadius: '6px',
                                background: activeTab === tab ? 'var(--card)' : 'transparent',
                                color: activeTab === tab ? 'var(--text)' : 'var(--muted)'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Allocation Breakdown */}
            <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Allocation</h3>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px' }}>

                    <div style={{ position: 'relative', marginBottom: '32px' }}>
                        {renderDoughnut()}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{mockPortfolioData.allocation.length}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Assets</span>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {mockPortfolioData.allocation.map(a => (
                            <div key={a.category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: a.color }}></div>
                                    <span style={{ fontWeight: '600' }}>{a.category}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold' }}>{a.percentage}%</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                                        €{((mockPortfolioData.totalValue * a.percentage) / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Holdings List */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Your Holdings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mockPortfolioData.holdings.map(holding => (
                        <div
                            key={holding.id}
                            className="card"
                            style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                            onClick={() => setExpandedRow(expandedRow === holding.id ? null : holding.id)}
                        >
                            {/* Main Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '12px',
                                        background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem'
                                    }}>
                                        {holding.type === 'crypto' ? '₿' : holding.type === 'stock' ? '📈' : holding.type === 'fund' ? '📊' : '🏦'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{holding.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{holding.quantity} {holding.type === 'crypto' ? 'coins' : 'shares'}</div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold' }}>€{holding.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                    <div style={{ fontSize: '0.85rem', color: holding.gainPercent >= 0 ? 'var(--green)' : 'var(--error)', fontWeight: 'bold' }}>
                                        {holding.gainPercent >= 0 ? '+' : ''}{holding.gainPercent}%
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Area */}
                            {expandedRow === holding.id && (
                                <div style={{
                                    background: 'var(--card2)', padding: '16px', borderTop: '1px solid var(--border)',
                                    animation: 'slideInRight 0.3s ease forwards', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Total Return</div>
                                        <div style={{ fontWeight: 'bold', color: holding.gain >= 0 ? 'var(--green)' : 'var(--error)' }}>
                                            {holding.gain >= 0 ? '+' : ''}€{holding.gain.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                    <button className="btn-secondary" style={{ padding: '8px 24px', minHeight: '36px', fontSize: '0.9rem' }}>
                                        Sell
                                    </button>
                                    <button className="btn-primary" style={{ padding: '8px 24px', minHeight: '36px', fontSize: '0.9rem', background: 'var(--green)', color: '#000' }}>
                                        Buy More
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Milestone Progress</h3>
                <div style={{ paddingLeft: '20px', position: 'relative' }}>

                    {/* Vertical generic bar line */}
                    <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '26px', width: '2px', background: 'var(--card2)', zIndex: 0 }}></div>
                    {/* Active green line up to current */}
                    <div style={{ position: 'absolute', top: '10px', height: '50%', left: '26px', width: '2px', background: 'var(--green)', zIndex: 1 }}></div>

                    {mockPortfolioData.stats.milestones.map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', position: 'relative', zIndex: 2 }}>

                            {m.status === 'achieved' && (
                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--bg)' }} />
                            )}
                            {m.status === 'current' && (
                                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--gold)', border: '3px solid var(--bg)', marginLeft: '-2px', boxShadow: '0 0 10px var(--gold-glow)' }} />
                            )}
                            {m.status === 'locked' && (
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--card2)', border: '2px solid var(--bg)', marginLeft: '1px' }} />
                            )}
                            {m.status === 'target' && (
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--purple)', border: '2px solid var(--bg)', marginLeft: '-1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--bg)' }}></div>
                                </div>
                            )}

                            <div style={{ opacity: m.status === 'locked' || m.status === 'target' ? 0.5 : 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: m.status === 'current' ? 'var(--gold)' : m.status === 'target' ? 'var(--purple)' : 'var(--text)' }}>
                                    €{m.amount.toLocaleString()}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>
                                    {m.status === 'achieved' ? 'Reached' : m.status === 'current' ? 'In Progress' : m.status === 'target' ? 'Ultimate Goal' : 'Locked'}
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default Portfolio;
