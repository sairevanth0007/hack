import React, { useRef, useEffect, useState } from 'react';
import { getAsset } from '../utils/marketData';

export default function PriceChart({ symbol, height = 140, showLabels = true, animated = true }) {
    const data = getAsset(symbol);
    const pathRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);

    if (!data) return null;

    const prices = data.prices;
    const values = prices.map(p => p.value);
    const min = Math.min(...values) * 0.99;
    const max = Math.max(...values) * 1.01;
    const range = max - min;
    const isPositive = data.yearReturn2023 > 0;
    const lineColor = isPositive ? 'var(--green)' : 'var(--red)';
    const gradientColor = isPositive ? 'rgba(46,204,113,' : 'rgba(231,76,60,';

    // Calculate points
    const points = prices.map((p, index) => {
        const x = (index / (prices.length - 1)) * 280 + 20;
        const y = height - ((p.value - min) / range) * (height - 30) - 10;
        return { x, y, month: p.month };
    });

    const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const filledPathD = `${pathD} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

    const lastPoint = points[points.length - 1];

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [pathD]);

    const chartId = `chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <svg width="100%" height={height} viewBox={`0 0 320 ${height}`} style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`grad-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={`${gradientColor}0.3)`} />
                        <stop offset="100%" stopColor={`${gradientColor}0)`} />
                    </linearGradient>
                </defs>

                {/* Fill Area */}
                <path
                    d={filledPathD}
                    fill={`url(#grad-${chartId})`}
                    style={animated ? {
                        animation: 'fadeIn 1s ease-in-out 0.8s forwards',
                        opacity: 0
                    } : {}}
                />

                {/* Line Path */}
                <path
                    ref={pathRef}
                    d={pathD}
                    stroke={lineColor}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={pathLength}
                    strokeDashoffset={animated ? pathLength : 0}
                    style={animated && pathLength > 0 ? {
                        animation: 'drawLine 1.2s ease-in-out forwards'
                    } : {}}
                />

                {/* End dot */}
                <circle
                    cx={lastPoint.x}
                    cy={lastPoint.y}
                    r="5"
                    fill={lineColor}
                    style={animated ? {
                        animation: 'pulseDot 2s infinite ease-in-out',
                        transformOrigin: `${lastPoint.x}px ${lastPoint.y}px`
                    } : {}}
                />

                {/* Labels */}
                {showLabels && (
                    <g>
                        {/* X-axis: Every other month */}
                        {points.map((p, i) => (
                            i % 2 === 0 && (
                                <text key={p.month} x={p.x} y={height - 2} fontSize="9" fill="var(--muted)" textAnchor="middle">
                                    {p.month}
                                </text>
                            )
                        ))}

                        {/* Y-axis: 3 ticks (min, mid, max) */}
                        <text x="0" y="10" fontSize="9" fill="var(--muted)" textAnchor="start">
                            €{max.toFixed(0)}
                        </text>
                        <text x="0" y={(height - 30) / 2 + 15} fontSize="9" fill="var(--muted)" textAnchor="start">
                            €{((min + max) / 2).toFixed(0)}
                        </text>
                        <text x="0" y={height - 15} fontSize="9" fill="var(--muted)" textAnchor="start">
                            €{min.toFixed(0)}
                        </text>
                    </g>
                )}

                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes drawLine {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          @keyframes pulseDot {
            0% { transform: scale(0.8); opacity: 1; }
            50% { transform: scale(1.4); opacity: 0.4; }
            100% { transform: scale(0.8); opacity: 1; }
          }
        `}} />
            </svg>

            {/* Context and Return Badge */}
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', padding: '0 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        color: lineColor,
                        fontWeight: 700,
                        fontSize: '13px'
                    }}>
                        {isPositive ? '+' : ''}{data.yearReturn2023}%
                    </span>
                    <span style={{ color: 'var(--muted)', fontSize: '11px' }}>
                        Real 2023 performance 📊
                    </span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '11px', color: 'var(--muted)', marginTop: '6px', lineHeight: 1.4 }}>
                    {data.context}
                </div>
            </div>
        </div>
    );
}
