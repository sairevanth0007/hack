import React, { useState } from 'react';
import { getLogoUrl, getFallbackLogo } from '../utils/marketData';

export default function AssetLogo({ symbol, size = 32 }) {
    const [imgError, setImgError] = useState(false);
    const logoUrl = getLogoUrl(symbol);
    const fallback = getFallbackLogo(symbol);

    if (imgError || !logoUrl) {
        return (
            <div style={{
                width: size, height: size,
                borderRadius: size * 0.25,
                background: 'var(--card2)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontSize: size * 0.5,
                border: '1px solid var(--border)',
                flexShrink: 0
            }}>
                {fallback}
            </div>
        );
    }

    return (
        <img
            src={logoUrl}
            width={size}
            height={size}
            alt={symbol}
            onError={() => setImgError(true)}
            style={{
                borderRadius: size * 0.25,
                objectFit: 'contain',
                background: 'white',
                padding: size * 0.1,
                flexShrink: 0,
                border: '1px solid var(--border)'
            }}
        />
    );
}
