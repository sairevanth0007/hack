import React from 'react';
import { getAsset } from '../utils/marketData';

const PriceChart = ({ symbol, height = 180, showLabels = true }) => {
    const data = getAsset(symbol);
    if (!data || !Array.isArray(data.prices) || data.prices.length === 0) {
        return (
            <div style={{
                height: height,
                background: 'var(--card2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8B949E',
                fontSize: '13px'
            }}>
                No chart data available
            </div>
        );
    }

    const { prices, yearReturn2023, context } = data;
    const values = prices.map(p => p.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const valRange = maxVal - minVal;
    const safeRange = valRange === 0 ? 1 : valRange;
    const isPositive = yearReturn2023 > 0;

    const PADDING = { top: 16, right: 48, bottom: 28, left: 8 };
    const W = 320;
    const H = height;
    const chartW = W - PADDING.left - PADDING.right;
    const chartH = H - PADDING.top - PADDING.bottom;

    // Convert values to SVG coordinates
    const toX = (i) => PADDING.left + (i / (values.length - 1)) * chartW;
    const toY = (v) => PADDING.top + (1 - (v - minVal) / safeRange) * chartH;

    // Build line path
    const linePath = values.map((v, i) =>
        `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`
    ).join(' ');

    // Build fill path (close at bottom)
    const fillPath = linePath +
        ` L ${toX(values.length - 1).toFixed(1)} ${(PADDING.top + chartH).toFixed(1)}` +
        ` L ${toX(0).toFixed(1)} ${(PADDING.top + chartH).toFixed(1)} Z`;

    // Grid lines (4 horizontal)
    const gridLines = [0, 0.33, 0.66, 1].map(pct => ({
        y: PADDING.top + pct * chartH,
        value: maxVal - pct * valRange
    }));

    // Color
    const lineColor = isPositive ? '#2ECC71' : '#E74C3C';
    const gradId = `fill-${symbol.replace(/[^a-zA-Z0-9]/g, '-')}`;

    // Format price label
    const fmt = (v) => {
        if (v > 1000) return `€${(v / 1000).toFixed(1)}K`;
        if (v < 10) return `${v.toFixed(2)}%`;
        return `€${v.toFixed(0)}`;
    };

    return (
        <div style={{ width: '100%' }}>
            <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                height={height}
                style={{ display: 'block', overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
                    </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {gridLines.map((gl, i) => (
                    <g key={i}>
                        <line
                            x1={PADDING.left} y1={gl.y}
                            x2={W - PADDING.right} y2={gl.y}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="1"
                        />
                        {/* Y-axis price label — RIGHT side */}
                        <text
                            x={W - PADDING.right + 4}
                            y={gl.y + 4}
                            fontSize="9"
                            fill="#8B949E"
                            fontFamily="DM Sans, sans-serif"
                        >
                            {fmt(gl.value)}
                        </text>
                    </g>
                ))}

                {/* Fill area */}
                <path d={fillPath} fill={`url(#${gradId})`} />

                {/* Price line — sharp, financial style */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="1.8"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                />

                {/* Min point marker */}
                {(() => {
                    const minIdx = values.indexOf(minVal);
                    if (minIdx === -1) return null;
                    return (
                        <g>
                            <circle
                                cx={toX(minIdx)} cy={toY(minVal)}
                                r="3" fill="#E74C3C"
                            />
                            <text
                                x={toX(minIdx)}
                                y={toY(minVal) + 12}
                                fontSize="8" fill="#E74C3C"
                                textAnchor="middle"
                                fontFamily="DM Sans, sans-serif"
                            >
                                {fmt(minVal)}
                            </text>
                        </g>
                    );
                })()}

                {/* Max point marker */}
                {(() => {
                    const maxIdx = values.indexOf(maxVal);
                    if (maxIdx === -1) return null;
                    return (
                        <g>
                            <circle
                                cx={toX(maxIdx)} cy={toY(maxVal)}
                                r="3" fill="#2ECC71"
                            />
                            <text
                                x={toX(maxIdx)}
                                y={toY(maxVal) - 6}
                                fontSize="8" fill="#2ECC71"
                                textAnchor="middle"
                                fontFamily="DM Sans, sans-serif"
                            >
                                {fmt(maxVal)}
                            </text>
                        </g>
                    );
                })()}

                {/* Current price dot + label at end of line */}
                {(() => {
                    const lastX = toX(values.length - 1);
                    const lastY = toY(values[values.length - 1]);
                    return (
                        <g>
                            <circle cx={lastX} cy={lastY} r="4"
                                fill={lineColor} stroke="var(--bg)" strokeWidth="2" />
                            <rect
                                x={lastX - 22} y={lastY - 20}
                                width="44" height="16"
                                rx="4" fill={lineColor} opacity="0.15"
                            />
                            <text
                                x={lastX} y={lastY - 9}
                                fontSize="9" fill={lineColor}
                                textAnchor="middle" fontWeight="700"
                                fontFamily="DM Sans, sans-serif"
                            >
                                {fmt(values[values.length - 1])}
                            </text>
                        </g>
                    );
                })()}

                {/* X-axis month labels */}
                {showLabels && prices.map((p, i) => {
                    if (i % 2 !== 0) return null;
                    return (
                        <text
                            key={i}
                            x={toX(i)}
                            y={H - 4}
                            fontSize="9"
                            fill="#8B949E"
                            textAnchor="middle"
                            fontFamily="DM Sans, sans-serif"
                        >
                            {p.month}
                        </text>
                    );
                })}
            </svg>

            {/* Below chart: return badge + context */}
            <div style={{
                display: 'flex', alignItems: 'center',
                gap: '8px', marginTop: '6px',
                padding: '0 4px'
            }}>
                <span style={{
                    background: isPositive
                        ? 'rgba(46,204,113,0.15)' : 'rgba(231,76,60,0.15)',
                    color: lineColor,
                    padding: '3px 8px', borderRadius: '6px',
                    fontSize: '12px', fontWeight: '700',
                    fontFamily: 'DM Sans, sans-serif'
                }}>
                    {isPositive ? '+' : ''}{yearReturn2023}%
                </span>
                <span style={{
                    fontSize: '11px', color: '#8B949E',
                    fontStyle: 'italic', lineHeight: 1.3
                }}>
                    {context}
                </span>
            </div>

            <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '0 4px', marginTop: '8px', color: 'var(--muted)', fontSize: '10px'
            }}>
                <span>📊</span> Based on real 2023 market data
            </div>
        </div>
    );
};

export default PriceChart;
