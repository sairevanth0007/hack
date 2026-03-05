// src/data/mockData.js

export const mockStocks = [
    { id: 's1', name: 'Apple', ticker: 'AAPL', price: 173.50, change24h: 1.2, risk: 'Medium' },
    { id: 's2', name: 'Tesla', ticker: 'TSLA', price: 188.14, change24h: -2.4, risk: 'High' },
    { id: 's3', name: 'NVIDIA', ticker: 'NVDA', price: 875.28, change24h: 3.8, risk: 'High' },
    { id: 's4', name: 'Microsoft', ticker: 'MSFT', price: 415.10, change24h: 0.5, risk: 'Medium' }
];

export const mockFunds = [
    { id: 'f1', name: 'MSCI World ETF', type: 'Global Equity', risk: 'Medium', returnYTD: 8.5, minInvest: 50 },
    { id: 'f2', name: 'S&P 500 ETF', type: 'US Equity', risk: 'Medium', returnYTD: 10.2, minInvest: 50 },
    { id: 'f3', name: 'Emerging Markets ETF', type: 'Emerging Equity', risk: 'High', returnYTD: 4.1, minInvest: 50 }
];

export const mockCrypto = [
    { id: 'c1', name: 'Bitcoin', ticker: 'BTC', price: 64230.00, change24h: 4.2 },
    { id: 'c2', name: 'Ethereum', ticker: 'ETH', price: 3450.80, change24h: 2.1 },
    { id: 'c3', name: 'Solana', ticker: 'SOL', price: 145.20, change24h: -1.5 }
];

export const mockBonds = [
    { id: 'b1', name: 'Government Bond 10Y', rate: 4.2, risk: 'Low', term: '10 Years' },
    { id: 'b2', name: 'High-Yield Savings', rate: 4.8, risk: 'Low', term: 'Instant Access' }
];

export const mockNews = [
    { id: 'n1', category: 'Breaking', headline: 'Fed Signals Potential Rate Cut in Upcoming Quarter', source: 'Financial Times', timeAgo: '2h ago', isFeatured: true },
    { id: 'n2', category: 'Stocks', headline: 'Tech giants report Q1 earnings above expectations', source: 'Bloomberg', timeAgo: '4h ago' },
    { id: 'n3', category: 'Crypto', headline: 'Bitcoin approaches all-time high amid ETF inflows', source: 'CoinDesk', timeAgo: '6h ago' },
    { id: 'n4', category: 'Economy', headline: 'Inflation data shows cooling trend for third consecutive month', source: 'Reuters', timeAgo: '1d ago' },
    { id: 'n5', category: 'Personal Finance', headline: '5 everyday habits that are silently draining your wallet', source: 'CNBC Make It', timeAgo: '1d ago' }
];

export const mockEvents = [
    { id: 'e1', title: 'Fed Interest Rate Decision', date: 'Mar 19', type: 'macro' },
    { id: 'e2', title: 'Bitcoin Halving Countdown', date: 'Apr 20', type: 'crypto' },
    { id: 'e3', title: 'Q1 Earnings Season Starts', date: 'Apr 1', type: 'stocks' }
];

export const mockPortfolioData = {
    totalValue: 34280.50,
    monthlyChange: 842.10,
    monthlyChangePercent: 2.5,
    streakDays: 14,
    holdings: [
        { id: 'h1', assetId: 'f1', name: 'MSCI World ETF', type: 'fund', quantity: 154, value: 18480, gain: 1250, gainPercent: 7.2 },
        { id: 'h2', assetId: 'c1', name: 'Bitcoin', type: 'crypto', quantity: 0.15, value: 9634.50, gain: 3400, gainPercent: 54.5 },
        { id: 'h3', assetId: 'b2', name: 'High-Yield Savings', type: 'savings', quantity: 1, value: 4500, gain: 180, gainPercent: 4.1 },
        { id: 'h4', assetId: 's1', name: 'Apple', type: 'stock', quantity: 9.6, value: 1666, gain: -45, gainPercent: -2.6 }
    ],
    history: [
        { date: '2023-10', value: 28000 },
        { date: '2023-11', value: 29500 },
        { date: '2023-12', value: 31000 },
        { date: '2024-01', value: 31800 },
        { date: '2024-02', value: 33438 },
        { date: '2024-03', value: 34280.50 }
    ],
    allocation: [
        { category: 'Stocks & ETFs', percentage: 58.7, color: '#7c3aed' },
        { category: 'Crypto', percentage: 28.1, color: '#f4c430' },
        { category: 'Cash & Savings', percentage: 13.2, color: '#2ecc71' }
    ],
    stats: {
        totalSaved: 29500,
        activeInvestments: 4,
        milestones: [
            { amount: 10000, status: 'achieved' },
            { amount: 25000, status: 'achieved' },
            { amount: 50000, status: 'current' },
            { amount: 75000, status: 'locked' },
            { amount: 100000, status: 'target' }
        ]
    }
};

export const chatIntros = [
    "Hey there! 👋 Based on your portfolio, I noticed your ETF allocations are doing well this week.",
    "Welcome back! Your saving streak is at 14 days. Keep it up! 🔥",
    "I'm keeping an eye on the market. Let me know if you want a daily summary."
];
