export const STAGES = [
    {
        id: 1,
        chapter: "The Basics",
        chapterNumber: 1,
        title: "What is Investing?",
        type: 'quiz',
        icon: "🌱",
        description: "Learn the core concept of making your money work for you.",
        question: "What does it mean to 'invest' your money?",
        options: [
            { text: "Hiding it under your mattress", correct: false, explanation: "That's hoarding. Inflation will eat its value!" },
            { text: "Spending it on luxury goods", correct: false, explanation: "Those lose value over time." },
            { text: "Putting it into assets to generate a profit", correct: true, explanation: "Exactly! You use money to buy things that generate more money over time." },
            { text: "Giving it to a bank for free", correct: false, explanation: "Banks invest your money to make profit for themselves. You should do it yourself!" }
        ]
    },
    {
        id: 2,
        chapter: "The Basics",
        chapterNumber: 1,
        title: "Inflation",
        type: 'quiz',
        icon: "🎈",
        description: "Understand the silent thief of purchasing power.",
        question: "How does inflation affect your savings in a normal bank account?",
        options: [
            { text: "It doubles their value", correct: false, explanation: "Unfortunately, no." },
            { text: "It reduces their purchasing power over time", correct: true, explanation: "Correct. As prices rise, the same €100 buys you less." },
            { text: "It has absolutely no effect", correct: false, explanation: "Prices go up over time, meaning static money buys less." },
            { text: "It forces the bank to tax you", correct: false, explanation: "Banks don't tax you for inflation, the market naturally devalues cash." }
        ]
    },
    {
        id: 3,
        chapter: "The Basics",
        chapterNumber: 1,
        title: "Compound Interest",
        type: 'quiz',
        icon: "❄️",
        description: "The snowball effect of wealth building.",
        question: "What is 'compound interest'?",
        options: [
            { text: "Earning interest on both your initial money and your past interest", correct: true, explanation: "Yes! Your money makes babies, and those babies make babies." },
            { text: "Paying double taxes on profits", correct: false, explanation: "Taxes are annoying but that's not what compounding means." },
            { text: "Interest charged on credit cards", correct: false, explanation: "Credit cards compound against you, but in investing, compounding works FOR you." },
            { text: "A bank fee for complex accounts", correct: false, explanation: "It's not a fee, it's a mathematical advantage." }
        ]
    },
    {
        id: 4,
        chapter: "Bonds & Safe Returns",
        chapterNumber: 2,
        title: "Gov Bonds",
        type: 'trade',
        icon: "🏛",
        description: "Lend your money to a government for a fixed return.",
        asset: {
            name: "Euro Govt Bond",
            type: "Bond",
            mockPrice: 100,
            riskLevel: "low",
            sparkline: [100, 100.5, 101, 101.2, 102, 102.5, 103]
        },
        riskRange: { minReturn: -1, maxReturn: 4 },
        lesson: "Bonds are loans you give to governments or corporations. They are relatively safe but offer low returns."
    },
    {
        id: 5,
        chapter: "Bonds & Safe Returns",
        chapterNumber: 2,
        title: "Corp Bonds",
        type: 'trade',
        icon: "🏢",
        description: "Lend money to a corporation for a slightly higher yield.",
        asset: {
            name: "Bluechip Corp Bond",
            type: "Bond",
            mockPrice: 105,
            riskLevel: "medium",
            sparkline: [105, 104, 106, 107, 106.5, 108, 108.5]
        },
        riskRange: { minReturn: -1, maxReturn: 6 },
        lesson: "Corporate bonds carry slightly more risk than government bonds, so they pay you slightly more to compensate."
    },
    {
        id: 6,
        chapter: "Mutual Funds & ETFs",
        chapterNumber: 3,
        title: "Index Funds",
        type: 'trade',
        icon: "📦",
        description: "Buy a slice of the whole market in one go.",
        asset: {
            name: "Global World ETF",
            type: "ETF",
            mockPrice: 85,
            riskLevel: "medium",
            sparkline: [80, 82, 81, 85, 84, 88, 85]
        },
        riskRange: { minReturn: -3, maxReturn: 10 },
        lesson: "ETFs bundle hundreds of stocks together. If one company fails, the whole fund doesn't crash. Diversification reduces risk!"
    },
    {
        id: 7,
        chapter: "Mutual Funds & ETFs",
        chapterNumber: 3,
        title: "Tech ETF",
        type: 'trade',
        icon: "💻",
        description: "Focus on the high-growth technology sector.",
        asset: {
            name: "Tech Innovators ETF",
            type: "ETF",
            mockPrice: 120,
            riskLevel: "high",
            sparkline: [100, 110, 105, 120, 115, 130, 120]
        },
        riskRange: { minReturn: -5, maxReturn: 15 },
        lesson: "Sector-specific ETFs are more volatile. The tech sector can grow fast but also drop sharply."
    },
    {
        id: 8,
        chapter: "Mutual Funds & ETFs",
        chapterNumber: 3,
        title: "Dividend Fund",
        type: 'trade',
        icon: "💵",
        description: "Invest in reliable companies that pay regular cash dividends.",
        asset: {
            name: "Div Yield Fund",
            type: "ETF",
            mockPrice: 60,
            riskLevel: "medium",
            sparkline: [60, 61, 60.5, 62, 61.5, 63, 60.5]
        },
        riskRange: { minReturn: -2, maxReturn: 8 },
        lesson: "Dividend focused funds provide steady cash income, making them great for long-term compounding."
    },
    {
        id: 9,
        chapter: "Stock Picking",
        chapterNumber: 4,
        title: "Bluechip Stock",
        type: 'trade',
        icon: "🍏",
        description: "Invest in an established, massive global company.",
        asset: {
            name: "MegaFruit Corp",
            type: "Stock",
            mockPrice: 150,
            riskLevel: "high",
            sparkline: [140, 145, 155, 150, 160, 158, 150]
        },
        riskRange: { minReturn: -8, maxReturn: 18 },
        lesson: "Individual stocks are far riskier than ETFs because your money is tied to just one company's success."
    },
    {
        id: 10,
        chapter: "Stock Picking",
        chapterNumber: 4,
        title: "Growth Stock",
        type: 'trade',
        icon: "⚡",
        description: "Bet on an electric vehicle company scaling rapidly.",
        asset: {
            name: "Volt Motors",
            type: "Stock",
            mockPrice: 200,
            riskLevel: "high",
            sparkline: [150, 180, 170, 210, 190, 230, 200]
        },
        riskRange: { minReturn: -12, maxReturn: 25 },
        lesson: "Growth stocks reinvest their profits into expansion rather than paying dividends. High risk, high reward potential."
    },
    {
        id: 11,
        chapter: "Stock Picking",
        chapterNumber: 4,
        title: "Penny Stock",
        type: 'trade',
        icon: "🎰",
        description: "A highly volatile unproven company.",
        asset: {
            name: "NanoTech Solutions",
            type: "Stock",
            mockPrice: 1.50,
            riskLevel: "very high",
            sparkline: [1.0, 2.5, 1.2, 3.0, 1.1, 4.0, 1.5]
        },
        riskRange: { minReturn: -20, maxReturn: 35 },
        lesson: "Penny stocks are highly speculative. You can double your money or lose it completely. Never invest what you can't lose."
    },
    {
        id: 12,
        chapter: "Smart Banking",
        chapterNumber: 5,
        title: "Emergency Fund",
        type: 'decision',
        icon: "🛡",
        description: "Handle a sudden car breakdown immediately.",
        scenario: "Your car broke down. Repairs cost €1,000. Where do you take the money from?",
        choices: [
            { text: "Credit Card (20% APY)", outcome: "Ouch. Credit card debt is expensive. You'll end up paying way more than €1,000.", pointBonus: 0 },
            { text: "Sell some Stocks", outcome: "Not ideal. You might have to sell at a loss and interrupt compounding.", pointBonus: 10 },
            { text: "My dedicated Emergency Fund", outcome: "Perfect! This is exactly why you hold 3-6 months cash in a savings account.", pointBonus: 50 }
        ]
    },
    {
        id: 13,
        chapter: "Smart Banking",
        chapterNumber: 5,
        title: "Payday Routine",
        type: 'decision',
        icon: "📅",
        description: "Decide what to do with your salary on the 1st of the month.",
        scenario: "Payday! €3,000 just hit your account. What do you do first?",
        choices: [
            { text: "Pay rent and bills", outcome: "Good start, but there's a better wealthy habit...", pointBonus: 20 },
            { text: "Go shopping, then save the rest", outcome: "Bad idea. You'll likely end up saving nothing by the end of the month.", pointBonus: 0 },
            { text: "Automate 20% to savings/investing immediately", outcome: "Yes! 'Pay yourself first' ensures your wealth grows automatically before you can spend it.", pointBonus: 50 }
        ]
    },
    {
        id: 14,
        chapter: "Smart Banking",
        chapterNumber: 5,
        title: "Market Crash",
        type: 'decision',
        icon: "📉",
        description: "Your portfolio is bleeding red. How will you react?",
        scenario: "News flash: A global crisis drops the stock market by 20% in a week. Your €10K is now €8K.",
        choices: [
            { text: "Panic sell everything to save the €8K", outcome: "Terrible move. You just locked in your losses. Markets historically recover.", pointBonus: 0 },
            { text: "Stop checking the app and wait", outcome: "Decent approach. Inaction is better than panicked selling.", pointBonus: 30 },
            { text: "Buy more while prices are discounted", outcome: "Excellent! Wealthy investors view crashes as massive sales on good assets.", pointBonus: 50 }
        ]
    },
    {
        id: 15,
        chapter: "Credit & Cash Flow",
        chapterNumber: 6,
        title: "Good Debt vs Bad Debt",
        type: 'quiz',
        icon: "💳",
        description: "Not all debt is evil. Learn the difference.",
        question: "Which of these is generally considered 'Good Debt'?",
        options: [
            { text: "A loan for a luxury vacation", correct: false, explanation: "Experiences are nice, but this debt generates no monetary return." },
            { text: "A low-interest student loan to become a doctor", correct: true, explanation: "Exactly. Good debt is borrowing money to increase your future income or net worth." },
            { text: "A sports car loan", correct: false, explanation: "Cars heavily depreciate in value." },
            { text: "Credit card debt for everyday shopping", correct: false, explanation: "High interest rates and depreciating goods make this bad debt." }
        ]
    },
    {
        id: 16,
        chapter: "Credit & Cash Flow",
        chapterNumber: 6,
        title: "Interest Rates",
        type: 'quiz',
        icon: "📊",
        description: "Understand the true cost of borrowing.",
        question: "If you only make the 'Minimum Payment' on a credit card...",
        options: [
            { text: "The bank will reward you with a lower rate", correct: false, explanation: "They'll reward themselves with your money." },
            { text: "You'll pay it off quickly", correct: false, explanation: "Minimum payments are designed to keep you in debt for years." },
            { text: "Most of your money goes to interest, not the balance", correct: true, explanation: "Yes. Minimum payments maximize bank profits, not your debt freedom." },
            { text: "It clears your debt instantly", correct: false, explanation: "False." }
        ]
    },
    {
        id: 17,
        chapter: "Credit & Cash Flow",
        chapterNumber: 6,
        title: "The 50/30/20 Rule",
        type: 'quiz',
        icon: "🍕",
        description: "A simple budgeting framework for life.",
        question: "In the 50/30/20 budget framework, what is the 30% for?",
        options: [
            { text: "Needs (Rent, groceries)", correct: false, explanation: "Needs are 50%." },
            { text: "Wants (Dining out, hobbies)", correct: true, explanation: "Correct! Life is for living. Enjoy 30% of your income guilt-free." },
            { text: "Investing and Savings", correct: false, explanation: "Savings/Investing should be 20%." },
            { text: "Taxes", correct: false, explanation: "This rule usually applies to your after-tax (net) income." }
        ]
    },
    {
        id: 18,
        chapter: "Crypto",
        chapterNumber: 7,
        title: "Bitcoin",
        type: 'trade',
        icon: "₿",
        description: "The original cryptocurrency asset.",
        asset: {
            name: "Bitcoin (BTC)",
            type: "Crypto",
            mockPrice: 65000,
            riskLevel: "very high",
            sparkline: [50000, 60000, 55000, 70000, 62000, 68000, 65000]
        },
        riskRange: { minReturn: -25, maxReturn: 35 },
        lesson: "Bitcoin operates independently of central banks. Its limited supply drives its price up, but it is extremely volatile."
    },
    {
        id: 19,
        chapter: "Crypto",
        chapterNumber: 7,
        title: "Ethereum",
        type: 'trade',
        icon: "🔷",
        description: "Invest in the platform that powers decentralized apps.",
        asset: {
            name: "Ethereum (ETH)",
            type: "Crypto",
            mockPrice: 3500,
            riskLevel: "very high",
            sparkline: [3000, 3200, 3100, 3800, 3400, 3700, 3500]
        },
        riskRange: { minReturn: -25, maxReturn: 45 },
        lesson: "Unlike Bitcoin which is 'digital gold', Ethereum is effectively a global distributed computer. Highly volatile."
    },
    {
        id: 20,
        chapter: "Crypto",
        chapterNumber: 7,
        title: "Meme Coins",
        type: 'trade',
        icon: "🐕",
        description: "Highly speculative, culturally driven tokens.",
        asset: {
            name: "DogeToken",
            type: "Crypto",
            mockPrice: 0.15,
            riskLevel: "very high",
            sparkline: [0.05, 0.30, 0.10, 0.40, 0.12, 0.20, 0.15]
        },
        riskRange: { minReturn: -40, maxReturn: 80 },
        lesson: "Meme coins have no intrinsic value and run purely on internet hype. It's essentially gambling, not investing."
    },
    {
        id: 21,
        chapter: "Advanced Strategy",
        chapterNumber: 8,
        title: "Diversification",
        type: 'decision',
        icon: "🧺",
        description: "Don't put all your eggs in one basket.",
        scenario: "Your tech stocks are soaring but inflation is rising. What's your move?",
        choices: [
            { text: "Sell everything and buy gold", outcome: "Too extreme. Knee-jerk portolio liquidations ruin returns.", pointBonus: 0 },
            { text: "Put all new cash into tech only", outcome: "Dangerous. If the tech bubble pops, you're wiped out.", pointBonus: 10 },
            { text: "Buy broad ETFs and some bonds", outcome: "Smart. Diversifying across asset classes protects you from sudden industry crashes.", pointBonus: 50 }
        ]
    },
    {
        id: 22,
        chapter: "Advanced Strategy",
        chapterNumber: 8,
        title: "FOMO (Fear Of Missing Out)",
        type: 'decision',
        icon: "😵",
        description: "Everyone is making money but you. What do you do?",
        scenario: "Your coworker just made a 500% return on a tiny new crypto token. They tell you to 'buy it RIGHT NOW before it explodes more'.",
        choices: [
            { text: "Drop your entire €10K into it immediately", outcome: "You bought at the absolute top. The coin dumps 80% the next day. You got 'rekt'.", pointBonus: 0 },
            { text: "Invest a small €100 for fun", outcome: "Acceptable. As long as it's 'play money' you're willing to lose, sure.", pointBonus: 30 },
            { text: "Ignore it and stick to your index funds", outcome: "Excellent discipline. 'Get rich quick' schemes are how people go broke.", pointBonus: 50 }
        ]
    },
    {
        id: 23,
        chapter: "Advanced Strategy",
        chapterNumber: 8,
        title: "The Ultimate Goal",
        type: 'decision',
        icon: "🎯",
        description: "Define what the €100K journey is really about.",
        scenario: "You've successfully built a massive portfolio of €100,000 across ETFs, Stocks, and some Crypto. What is the real point of all this money?",
        choices: [
            { text: "To buy a massive mansion and sports cars", outcome: "Lifestyle creep will bankrupt you again if you aren't careful.", pointBonus: 10 },
            { text: "To impress my friends", outcome: "Ego is a terrible financial advisor.", pointBonus: 0 },
            { text: "Financial Freedom — buying back my time", outcome: "Bingo! 🎯 Wealth isn't about luxury goods, it's about the freedom to do what you want, when you want.", pointBonus: 100 }
        ]
    }
];
