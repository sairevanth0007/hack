export const MARKET_DATA = {

    'SAP.DE': {
        symbol: 'SAP.DE',
        shortName: 'SAP SE',
        currency: 'EUR',
        yearReturn2023: 40.2,
        currentPrice: 145.20,
        logoUrl: 'https://logo.clearbit.com/sap.com',
        fallbackLogo: '🖥️',
        prices: [
            { month: 'Jan', value: 104.2 },
            { month: 'Feb', value: 111.4 },
            { month: 'Mar', value: 107.8 },
            { month: 'Apr', value: 118.3 },
            { month: 'May', value: 121.7 },
            { month: 'Jun', value: 125.4 },
            { month: 'Jul', value: 130.2 },
            { month: 'Aug', value: 126.8 },
            { month: 'Sep', value: 122.1 },
            { month: 'Oct', value: 119.4 },
            { month: 'Nov', value: 138.6 },
            { month: 'Dec', value: 145.2 }
        ],
        context: 'SAP surged +40% in 2023 as cloud transformation accelerated across Europe.',
        riskLevel: 'Medium',
        type: 'Stock'
    },

    'SIE.DE': {
        symbol: 'SIE.DE',
        shortName: 'Siemens AG',
        currency: 'EUR',
        yearReturn2023: 24.8,
        currentPrice: 175.3,
        logoUrl: 'https://logo.clearbit.com/siemens.com',
        fallbackLogo: '⚙️',
        prices: [
            { month: 'Jan', value: 140.4 },
            { month: 'Feb', value: 148.2 },
            { month: 'Mar', value: 142.6 },
            { month: 'Apr', value: 152.1 },
            { month: 'May', value: 158.4 },
            { month: 'Jun', value: 162.7 },
            { month: 'Jul', value: 168.3 },
            { month: 'Aug', value: 161.9 },
            { month: 'Sep', value: 155.4 },
            { month: 'Oct', value: 150.2 },
            { month: 'Nov', value: 165.8 },
            { month: 'Dec', value: 175.3 }
        ],
        context: 'Siemens gained +25% in 2023 driven by industrial automation and energy demand.',
        riskLevel: 'Low-Medium',
        type: 'Stock'
    },

    'ALV.DE': {
        symbol: 'ALV.DE',
        shortName: 'Allianz SE',
        currency: 'EUR',
        yearReturn2023: 12.4,
        currentPrice: 220.4,
        logoUrl: 'https://logo.clearbit.com/allianz.com',
        fallbackLogo: '🛡️',
        prices: [
            { month: 'Jan', value: 196.2 },
            { month: 'Feb', value: 208.4 },
            { month: 'Mar', value: 195.8 },
            { month: 'Apr', value: 210.3 },
            { month: 'May', value: 212.7 },
            { month: 'Jun', value: 218.4 },
            { month: 'Jul', value: 222.1 },
            { month: 'Aug', value: 215.6 },
            { month: 'Sep', value: 208.3 },
            { month: 'Oct', value: 200.4 },
            { month: 'Nov', value: 218.9 },
            { month: 'Dec', value: 220.4 }
        ],
        context: 'Allianz gained +12% in 2023 on strong insurance premium growth across Europe.',
        riskLevel: 'Low',
        type: 'Stock'
    },

    'MBG.DE': {
        symbol: 'MBG.DE',
        shortName: 'Mercedes-Benz Group',
        currency: 'EUR',
        yearReturn2023: -2.8,
        currentPrice: 58.4,
        logoUrl: 'https://logo.clearbit.com/mercedes-benz.com',
        fallbackLogo: '🚗',
        prices: [
            { month: 'Jan', value: 75.2 },
            { month: 'Feb', value: 78.4 },
            { month: 'Mar', value: 72.1 },
            { month: 'Apr', value: 73.8 },
            { month: 'May', value: 70.4 },
            { month: 'Jun', value: 68.9 },
            { month: 'Jul', value: 71.2 },
            { month: 'Aug', value: 67.8 },
            { month: 'Sep', value: 63.4 },
            { month: 'Oct', value: 58.9 },
            { month: 'Nov', value: 60.2 },
            { month: 'Dec', value: 58.4 }
        ],
        context: 'Mercedes fell -3% in 2023 facing EV transition pressure and China demand slowdown.',
        riskLevel: 'Medium',
        type: 'Stock'
    },

    'BMW.DE': {
        symbol: 'BMW.DE',
        shortName: 'BMW AG',
        currency: 'EUR',
        yearReturn2023: 4.2,
        currentPrice: 94.8,
        logoUrl: 'https://logo.clearbit.com/bmw.com',
        fallbackLogo: '🚙',
        prices: [
            { month: 'Jan', value: 91.0 },
            { month: 'Feb', value: 96.4 },
            { month: 'Mar', value: 90.8 },
            { month: 'Apr', value: 94.2 },
            { month: 'May', value: 92.6 },
            { month: 'Jun', value: 96.8 },
            { month: 'Jul', value: 99.4 },
            { month: 'Aug', value: 95.2 },
            { month: 'Sep', value: 90.6 },
            { month: 'Oct', value: 86.4 },
            { month: 'Nov', value: 91.8 },
            { month: 'Dec', value: 94.8 }
        ],
        context: 'BMW held steady +4% in 2023 balancing EV investments with strong ICE profits.',
        riskLevel: 'Medium',
        type: 'Stock'
    },

    'BAS.DE': {
        symbol: 'BAS.DE',
        shortName: 'BASF SE',
        currency: 'EUR',
        yearReturn2023: -9.4,
        currentPrice: 44.2,
        logoUrl: 'https://logo.clearbit.com/basf.com',
        fallbackLogo: '🧪',
        prices: [
            { month: 'Jan', value: 48.8 },
            { month: 'Feb', value: 50.2 },
            { month: 'Mar', value: 46.4 },
            { month: 'Apr', value: 47.8 },
            { month: 'May', value: 45.2 },
            { month: 'Jun', value: 46.8 },
            { month: 'Jul', value: 48.4 },
            { month: 'Aug', value: 45.6 },
            { month: 'Sep', value: 43.2 },
            { month: 'Oct', value: 40.8 },
            { month: 'Nov', value: 42.4 },
            { month: 'Dec', value: 44.2 }
        ],
        context: 'BASF dropped -9% in 2023 due to high European energy costs hurting margins.',
        riskLevel: 'Medium-High',
        type: 'Stock'
    },

    'DTE.DE': {
        symbol: 'DTE.DE',
        shortName: 'Deutsche Telekom',
        currency: 'EUR',
        yearReturn2023: 18.6,
        currentPrice: 22.8,
        logoUrl: 'https://logo.clearbit.com/telekom.com',
        fallbackLogo: '📡',
        prices: [
            { month: 'Jan', value: 19.2 },
            { month: 'Feb', value: 19.8 },
            { month: 'Mar', value: 19.4 },
            { month: 'Apr', value: 20.2 },
            { month: 'May', value: 20.8 },
            { month: 'Jun', value: 21.4 },
            { month: 'Jul', value: 21.9 },
            { month: 'Aug', value: 21.4 },
            { month: 'Sep', value: 20.8 },
            { month: 'Oct', value: 20.2 },
            { month: 'Nov', value: 21.8 },
            { month: 'Dec', value: 22.8 }
        ],
        context: 'Deutsche Telekom rose +19% in 2023 on strong T-Mobile US performance.',
        riskLevel: 'Low',
        type: 'Stock'
    },

    'DBK.DE': {
        symbol: 'DBK.DE',
        shortName: 'Deutsche Bank',
        currency: 'EUR',
        yearReturn2023: 8.2,
        currentPrice: 11.8,
        logoUrl: 'https://logo.clearbit.com/db.com',
        fallbackLogo: '🏦',
        prices: [
            { month: 'Jan', value: 10.9 },
            { month: 'Feb', value: 12.4 },
            { month: 'Mar', value: 9.8 },
            { month: 'Apr', value: 10.4 },
            { month: 'May', value: 10.8 },
            { month: 'Jun', value: 11.4 },
            { month: 'Jul', value: 12.2 },
            { month: 'Aug', value: 11.6 },
            { month: 'Sep', value: 10.8 },
            { month: 'Oct', value: 10.2 },
            { month: 'Nov', value: 11.4 },
            { month: 'Dec', value: 11.8 }
        ],
        context: 'Deutsche Bank gained +8% in 2023 benefiting from higher interest rate environment.',
        riskLevel: 'High',
        type: 'Stock'
    },

    'VOW3.DE': {
        symbol: 'VOW3.DE',
        shortName: 'Volkswagen AG',
        currency: 'EUR',
        yearReturn2023: -19.8,
        currentPrice: 107.4,
        logoUrl: 'https://logo.clearbit.com/volkswagen.com',
        fallbackLogo: '🚘',
        prices: [
            { month: 'Jan', value: 134.0 },
            { month: 'Feb', value: 142.8 },
            { month: 'Mar', value: 129.6 },
            { month: 'Apr', value: 127.8 },
            { month: 'May', value: 121.4 },
            { month: 'Jun', value: 118.6 },
            { month: 'Jul', value: 124.2 },
            { month: 'Aug', value: 118.8 },
            { month: 'Sep', value: 111.6 },
            { month: 'Oct', value: 102.8 },
            { month: 'Nov', value: 107.6 },
            { month: 'Dec', value: 107.4 }
        ],
        context: 'Volkswagen fell -20% in 2023 as EV transition costs and China slowdown hit hard.',
        riskLevel: 'High',
        type: 'Stock'
    },

    'MRK.DE': {
        symbol: 'MRK.DE',
        shortName: 'Merck KGaA',
        currency: 'EUR',
        yearReturn2023: -14.2,
        currentPrice: 148.6,
        logoUrl: 'https://logo.clearbit.com/merck.de',
        fallbackLogo: '💊',
        prices: [
            { month: 'Jan', value: 173.2 },
            { month: 'Feb', value: 178.4 },
            { month: 'Mar', value: 168.8 },
            { month: 'Apr', value: 172.4 },
            { month: 'May', value: 165.6 },
            { month: 'Jun', value: 162.8 },
            { month: 'Jul', value: 168.4 },
            { month: 'Aug', value: 158.6 },
            { month: 'Sep', value: 152.4 },
            { month: 'Oct', value: 144.8 },
            { month: 'Nov', value: 146.2 },
            { month: 'Dec', value: 148.6 }
        ],
        context: 'Merck KGaA dropped -14% in 2023 as semiconductor and life science demand weakened.',
        riskLevel: 'Medium',
        type: 'Stock'
    },

    'EXIA.DE': {
        symbol: 'EXIA.DE',
        shortName: 'iShares Core DAX ETF',
        currency: 'EUR',
        yearReturn2023: 20.1,
        currentPrice: 128.4,
        logoUrl: 'https://logo.clearbit.com/ishares.com',
        fallbackLogo: '📊',
        prices: [
            { month: 'Jan', value: 106.8 },
            { month: 'Feb', value: 108.4 },
            { month: 'Mar', value: 105.6 },
            { month: 'Apr', value: 112.4 },
            { month: 'May', value: 110.6 },
            { month: 'Jun', value: 112.8 },
            { month: 'Jul', value: 114.2 },
            { month: 'Aug', value: 111.8 },
            { month: 'Sep', value: 108.6 },
            { month: 'Oct', value: 104.4 },
            { month: 'Nov', value: 112.8 },
            { month: 'Dec', value: 128.4 }
        ],
        context: 'DAX ETF delivered +20% in 2023, tracking Germany\'s top 40 companies.',
        riskLevel: 'Low',
        type: 'ETF'
    },

    'VWCE.DE': {
        symbol: 'VWCE.DE',
        shortName: 'Vanguard FTSE All-World ETF',
        currency: 'EUR',
        yearReturn2023: 22.4,
        currentPrice: 108.6,
        logoUrl: 'https://logo.clearbit.com/vanguard.com',
        fallbackLogo: '🌍',
        prices: [
            { month: 'Jan', value: 88.8 },
            { month: 'Feb', value: 91.4 },
            { month: 'Mar', value: 88.6 },
            { month: 'Apr', value: 92.8 },
            { month: 'May', value: 91.2 },
            { month: 'Jun', value: 95.4 },
            { month: 'Jul', value: 98.6 },
            { month: 'Aug', value: 94.8 },
            { month: 'Sep', value: 90.4 },
            { month: 'Oct', value: 87.2 },
            { month: 'Nov', value: 96.8 },
            { month: 'Dec', value: 108.6 }
        ],
        context: 'Vanguard All-World ETF gained +22% in 2023, benefiting from global equity recovery.',
        riskLevel: 'Low',
        type: 'ETF'
    },

    'BTC-EUR': {
        symbol: 'BTC-EUR',
        shortName: 'Bitcoin',
        currency: 'EUR',
        yearReturn2023: 154.2,
        currentPrice: 38800,
        logoUrl: 'https://logo.clearbit.com/bitcoin.org',
        fallbackLogo: '₿',
        prices: [
            { month: 'Jan', value: 20800 },
            { month: 'Feb', value: 23500 },
            { month: 'Mar', value: 26800 },
            { month: 'Apr', value: 28900 },
            { month: 'May', value: 26200 },
            { month: 'Jun', value: 28100 },
            { month: 'Jul', value: 29400 },
            { month: 'Aug', value: 26000 },
            { month: 'Sep', value: 25400 },
            { month: 'Oct', value: 29800 },
            { month: 'Nov', value: 35200 },
            { month: 'Dec', value: 38800 }
        ],
        context: 'Bitcoin surged +154% in 2023, recovering strongly from the 2022 crypto winter.',
        riskLevel: 'Very High',
        type: 'Crypto'
    },

    'ETH-EUR': {
        symbol: 'ETH-EUR',
        shortName: 'Ethereum',
        currency: 'EUR',
        yearReturn2023: 88.4,
        currentPrice: 2180,
        logoUrl: 'https://logo.clearbit.com/ethereum.org',
        fallbackLogo: '⟠',
        prices: [
            { month: 'Jan', value: 1158 },
            { month: 'Feb', value: 1540 },
            { month: 'Mar', value: 1740 },
            { month: 'Apr', value: 1860 },
            { month: 'May', value: 1720 },
            { month: 'Jun', value: 1860 },
            { month: 'Jul', value: 1940 },
            { month: 'Aug', value: 1640 },
            { month: 'Sep', value: 1540 },
            { month: 'Oct', value: 1620 },
            { month: 'Nov', value: 1980 },
            { month: 'Dec', value: 2180 }
        ],
        context: 'Ethereum gained +88% in 2023 driven by DeFi growth and ETF speculation.',
        riskLevel: 'High',
        type: 'Crypto'
    },

    'BUND-10Y': {
        symbol: 'BUND-10Y',
        shortName: 'German 10Y Government Bond',
        currency: 'EUR',
        yearReturn2023: 2.8,
        currentPrice: 2.40,
        logoUrl: 'https://logo.clearbit.com/bundesfinanzministerium.de',
        fallbackLogo: '🏛️',
        prices: [
            { month: 'Jan', value: 2.29 },
            { month: 'Feb', value: 2.51 },
            { month: 'Mar', value: 2.28 },
            { month: 'Apr', value: 2.42 },
            { month: 'May', value: 2.45 },
            { month: 'Jun', value: 2.39 },
            { month: 'Jul', value: 2.47 },
            { month: 'Aug', value: 2.62 },
            { month: 'Sep', value: 2.89 },
            { month: 'Oct', value: 2.97 },
            { month: 'Nov', value: 2.65 },
            { month: 'Dec', value: 2.40 }
        ],
        context: 'German Bunds offered stable 2-3% yields in 2023, a safe haven in volatile markets.',
        riskLevel: 'Minimal',
        type: 'Bond'
    }
}

export function getAsset(symbol) {
    if (!symbol) {
        console.warn('getAsset called with no symbol')
        return null
    }
    const asset = MARKET_DATA[symbol]
    if (!asset) {
        console.warn('getAsset: symbol not found:', symbol,
            'Available:', Object.keys(MARKET_DATA))
    }
    return asset || null
}

export function getAllAssets() {
    return Object.values(MARKET_DATA)
}

export function getAssetsByType(type) {
    return Object.values(MARKET_DATA).filter(a => a.type === type)
}

export function getLogoUrl(symbol) {
    return MARKET_DATA[symbol]?.logoUrl || null
}

export function getFallbackLogo(symbol) {
    return MARKET_DATA[symbol]?.fallbackLogo || '📈'
}
