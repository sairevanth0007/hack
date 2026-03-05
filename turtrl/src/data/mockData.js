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

export const mockStreakData = {
    currentStreak: 14,
    bestStreak: 21,
    totalActiveDays: 47,
    weekCalendar: [
        { day: 'Mon', date: 3, active: true },
        { day: 'Tue', date: 4, active: true },
        { day: 'Wed', date: 5, active: true },
        { day: 'Thu', date: 6, active: false },
        { day: 'Fri', date: 7, active: false },
        { day: 'Sat', date: 8, active: false },
        { day: 'Sun', date: 9, active: false },
    ],
    milestones: [
        { days: 7, label: '7 Days', reached: true, reward: '+50 XP' },
        { days: 14, label: '14 Days', reached: true, reward: '+150 XP' },
        { days: 30, label: '30 Days', reached: false, reward: '+500 XP' },
        { days: 60, label: '60 Days', reached: false, reward: '+1,200 XP' },
        { days: 100, label: '100 Days', reached: false, reward: '+3,000 XP' },
    ],
    rewards: [
        { id: 'sr1', title: 'Early Bird Badge', description: '7-day streak reward', icon: '🐣', unlocked: true },
        { id: 'sr2', title: 'Fire Starter', description: '14-day streak reward', icon: '🔥', unlocked: true },
        { id: 'sr3', title: 'Unstoppable', description: '30-day streak reward', icon: '☄️', unlocked: false },
        { id: 'sr4', title: 'Diamond Hands', description: '60-day streak reward', icon: '💎', unlocked: false },
        { id: 'sr5', title: 'Legendary', description: '100-day streak reward', icon: '👑', unlocked: false },
    ]
};

export const mockPointsData = {
    totalPoints: 2340,
    level: { name: 'Silver Investor', number: 3, currentXP: 2340, nextLevelXP: 5000, color: '#C0C0C0' },
    levels: [
        { name: 'Bronze Starter', number: 1, minXP: 0 },
        { name: 'Bronze Investor', number: 2, minXP: 500 },
        { name: 'Silver Investor', number: 3, minXP: 2000 },
        { name: 'Gold Investor', number: 4, minXP: 5000 },
        { name: 'Platinum Pro', number: 5, minXP: 10000 },
        { name: 'Diamond Legend', number: 6, minXP: 25000 },
    ],
    recentActivity: [
        { id: 'pa1', type: 'earn', title: 'Daily Login', points: 10, time: '2h ago', icon: '✅' },
        { id: 'pa2', type: 'earn', title: 'Completed Quiz', points: 50, time: '5h ago', icon: '📝' },
        { id: 'pa3', type: 'earn', title: 'First Investment', points: 200, time: '1d ago', icon: '🌱' },
        { id: 'pa4', type: 'earn', title: '14-Day Streak Bonus', points: 150, time: '1d ago', icon: '🔥' },
        { id: 'pa5', type: 'spend', title: 'Redeemed: Custom Theme', points: -100, time: '3d ago', icon: '🎨' },
        { id: 'pa6', type: 'earn', title: 'Referred a Friend', points: 500, time: '5d ago', icon: '🤝' },
        { id: 'pa7', type: 'earn', title: 'Portfolio Milestone: €25K', points: 300, time: '1w ago', icon: '🏆' },
    ],
    rewards: [
        { id: 'pr1', title: 'Custom Theme', cost: 100, icon: '🎨', description: 'Unlock a custom app color theme', redeemed: true },
        { id: 'pr2', title: 'Priority Support', cost: 250, icon: '⚡', description: 'Jump the support queue for 30 days', redeemed: false },
        { id: 'pr3', title: 'Fee-Free Trade', cost: 500, icon: '💸', description: 'One commission-free trade', redeemed: false },
        { id: 'pr4', title: 'Pro Badge', cost: 1000, icon: '🏅', description: 'Exclusive profile badge', redeemed: false },
        { id: 'pr5', title: 'AI Advisor Premium', cost: 2500, icon: '🤖', description: '30 days of premium AI insights', redeemed: false },
    ]
};

export const mockLeaderboardData = {
    currentUserRank: 4,
    users: [
        { rank: 1, name: 'Emma W.', initials: 'EW', points: 12450, streak: 42, isCurrentUser: false, color: '#7c3aed' },
        { rank: 2, name: 'Lucas M.', initials: 'LM', points: 9800, streak: 35, isCurrentUser: false, color: '#ff6b35' },
        { rank: 3, name: 'Sophie K.', initials: 'SK', points: 8920, streak: 28, isCurrentUser: false, color: '#2ecc71' },
        { rank: 4, name: 'You', initials: 'AK', points: 2340, streak: 14, isCurrentUser: true, color: '#2ecc71' },
        { rank: 5, name: 'Noah T.', initials: 'NT', points: 2100, streak: 10, isCurrentUser: false, color: '#f4c430' },
        { rank: 6, name: 'Mia R.', initials: 'MR', points: 1850, streak: 9, isCurrentUser: false, color: '#7c3aed' },
        { rank: 7, name: 'Liam B.', initials: 'LB', points: 1600, streak: 7, isCurrentUser: false, color: '#ff6b35' },
        { rank: 8, name: 'Olivia D.', initials: 'OD', points: 1200, streak: 5, isCurrentUser: false, color: '#2ecc71' },
        { rank: 9, name: 'Ethan P.', initials: 'EP', points: 980, streak: 3, isCurrentUser: false, color: '#f4c430' },
        { rank: 10, name: 'Ava C.', initials: 'AC', points: 750, streak: 2, isCurrentUser: false, color: '#7c3aed' },
    ]
};
