const fs = require('fs');
const path = require('path');

const newStages = `export const STAGES = [
    {
        id: 1,
        chapter: "Investment Showcase",
        chapterNumber: 1,
        title: "DAX Index",
        type: 'trade',
        icon: "📈",
        description: "The benchmark index for the German equity market.",
        unlockedByDefault: true,
        asset: { name: "DAX", type: "Index", mockPrice: 16000, riskLevel: "medium" },
        realData: {
            yearlyReturn2023: "+20.3%",
            yearlyReturn2024: "+10.4%",
            chartData: [14069, 15000, 15300, 16000, 15200, 16751, 17000, 18000, 18500],
            context: "The DAX had a strong recovery in 2023 despite energy concerns, pushed by industrial and tech performance. 2024 saw continued steady growth."
        },
        lesson: "Broad market indices like the DAX offer diversification across the biggest national companies."
    },
    {
        id: 2,
        chapter: "Investment Showcase",
        chapterNumber: 1,
        title: "Volkswagen",
        type: 'trade',
        icon: "🚗",
        description: "One of the world's leading automobile manufacturers.",
        unlockedByDefault: true,
        asset: { name: "VW Stock", type: "Stock", mockPrice: 120, riskLevel: "high" },
        realData: {
            yearlyReturn2023: "-4.5%",
            yearlyReturn2024: "-12.0%",
            chartData: [130, 125, 120, 115, 122, 118, 110, 105, 95],
            context: "VW struggled with EV transition costs, software delays, and heavy competition in the Chinese market across 2023-2024."
        },
        lesson: "Even massive, historic companies can lose value during major industry transitions."
    },
    {
        id: 3,
        chapter: "Investment Showcase",
        chapterNumber: 1,
        title: "Siemens",
        type: 'trade',
        icon: "🏭",
        description: "A multinational conglomerate focusing on industrial digitalization.",
        unlockedByDefault: true,
        asset: { name: "Siemens Stock", type: "Stock", mockPrice: 140, riskLevel: "medium" },
        realData: {
            yearlyReturn2023: "+30.1%",
            yearlyReturn2024: "+15.2%",
            chartData: [130, 145, 155, 150, 160, 169, 175, 180, 195],
            context: "Siemens saw massive growth by successfully pivoting hard into digital industries and smart infrastructure."
        },
        lesson: "Legacy industrial companies that successfully adapt to tech trends can generate massive returns."
    },
    {
        id: 4,
        chapter: "Investment Showcase",
        chapterNumber: 1,
        title: "SAP",
        type: 'trade',
        icon: "☁️",
        description: "A global leader in enterprise software.",
        unlockedByDefault: true,
        asset: { name: "SAP Stock", type: "Stock", mockPrice: 130, riskLevel: "medium" },
        realData: {
            yearlyReturn2023: "+45.0%",
            yearlyReturn2024: "+25.5%",
            chartData: [100, 110, 125, 140, 135, 145, 160, 175, 181],
            context: "SAP crushed earnings expectations driven by rapid adoption of its cloud ERP solutions and AI integrations."
        },
        lesson: "Software companies with high recurring revenue and cloud transitions are highly valued by the market."
    },
    {
        id: 5,
        chapter: "Investment Showcase",
        chapterNumber: 1,
        title: "Allianz",
        type: 'trade',
        icon: "🛡",
        description: "One of the world's largest financial services companies.",
        unlockedByDefault: true,
        asset: { name: "Allianz Stock", type: "Stock", mockPrice: 220, riskLevel: "medium" },
        realData: {
            yearlyReturn2023: "+15.8%",
            yearlyReturn2024: "+8.5%",
            chartData: [200, 210, 205, 220, 215, 231, 240, 245, 250],
            context: "Allianz delivered reliable, steady growth backed by strong dividend payouts and solid insurance operations."
        },
        lesson: "Financial stalwarts often provide lower explosive growth but consistent portfolio stability and dividends."
    },
    {
        id: 6,
        chapter: "The Basics",
        chapterNumber: 2,
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
        id: 7,
        chapter: "The Basics",
        chapterNumber: 2,
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
        id: 8,
        chapter: "Global Markets",
        chapterNumber: 3,
        title: "MSCI World",
        type: 'trade',
        icon: "🌍",
        description: "Broad global equity exposure.",
        asset: { name: "MSCI World ETF", type: "ETF", mockPrice: 85, riskLevel: "medium" },
        realData: {
            yearlyReturn2023: "+21.8%",
            yearlyReturn2024: "+12.1%",
            chartData: [80, 85, 83, 90, 88, 97, 100, 105, 109],
            context: "Driven largely by the US tech sector ('Magnificent 7'), the MSCI World saw incredible rallies globally."
        },
        lesson: "Global ETFs provide ultimate diversification. Notice how it beat many individual German stocks."
    },
    {
        id: 9,
        chapter: "Global Markets",
        chapterNumber: 3,
        title: "iShares DAX ETF",
        type: 'trade',
        icon: "📦",
        description: "An ETF tracking the DAX index.",
        asset: { name: "iShares Core DAX", type: "ETF", mockPrice: 130, riskLevel: "medium" },
        realData: {
            yearlyReturn2023: "+20.1%",
            yearlyReturn2024: "+10.2%",
            chartData: [115, 120, 125, 130, 128, 138, 145, 150, 152],
            context: "Tracks the DAX directly, mirroring the index's strong performance over the period."
        },
        lesson: "ETFs are the easiest way for retail investors to capture the gains of an entire index without managing 40 stocks."
    },
    {
        id: 10,
        chapter: "Alternatives",
        chapterNumber: 4,
        title: "Bitcoin",
        type: 'trade',
        icon: "₿",
        description: "The original cryptocurrency.",
        asset: { name: "Bitcoin (BTC)", type: "Crypto", mockPrice: 40000, riskLevel: "very high" },
        realData: {
            yearlyReturn2023: "+155.0%",
            yearlyReturn2024: "+45.0%",
            chartData: [16000, 25000, 30000, 35000, 42000, 50000, 60000, 70000, 65000],
            context: "Bitcoin exploded from its 2022 lows, driven by ETF approvals and institutional adoption."
        },
        lesson: "Crypto can deliver staggering returns, but the volatility and drawdowns can be equally severe."
    },
    {
        id: 11,
        chapter: "Safe Havens",
        chapterNumber: 5,
        title: "German 10Y Bond",
        type: 'trade',
        icon: "🏛",
        description: "Lend money to the German government.",
        asset: { name: "German Bund", type: "Bond", mockPrice: 100, riskLevel: "low" },
        realData: {
            yearlyReturn2023: "+2.5%",
            yearlyReturn2024: "+2.8%",
            chartData: [90, 92, 95, 98, 100, 101, 102, 103, 104],
            context: "As ECB interest rates rose to combat inflation, bond yields became attractive again, offering steady, safe returns."
        },
        lesson: "Bonds don't make you rich quickly, but they protect your capital while providing guaranteed yield."
    },
    {
        id: 12,
        chapter: "Smart Banking",
        chapterNumber: 6,
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
    }
];`;

fs.writeFileSync(path.join(__dirname, 'src', 'utils', 'stagesData.js'), newStages);
console.log('Written stagesData.js');
