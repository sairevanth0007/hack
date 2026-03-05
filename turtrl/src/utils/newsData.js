export const NEWS_ARTICLES = [
    {
        id: 1,
        category: "Economy",
        headline: "Central Bank Maintains Interest Rates",
        summary: [
            "The European Central Bank elected to keep rates steady at 4.0% this month.",
            "Inflation cooled slightly to 2.4%, inching closer to the 2.0% target.",
            "Analysts predict the first rate cut might happen by mid-year if trends continue."
        ],
        source: "Global Finance",
        timeAgo: "2h ago",
        quiz: [
            {
                question: "What is the ECB's target inflation rate?",
                options: [
                    { text: "1.0%", correct: false },
                    { text: "2.0%", correct: true },
                    { text: "3.0%", correct: false },
                    { text: "4.0%", correct: false }
                ],
                explanation: "Central banks typically target a 2% inflation rate to maintain stable economic growth without excessive price increases."
            },
            {
                question: "Why might the ECB cut rates later this year?",
                options: [
                    { text: "To increase inflation further", correct: false },
                    { text: "Because inflation is cooling down", correct: true },
                    { text: "To make borrowing more expensive", correct: false },
                    { text: "Because stock markets are crashing", correct: false }
                ],
                explanation: "As inflation cools to acceptable levels, the central bank can lower interest rates to encourage borrowing and stimulate the economy."
            }
        ]
    },
    {
        id: 2,
        category: "Stocks",
        headline: "Tech Sector Rallies on AI Optimism",
        summary: [
            "Major tech indices surged 2.5% on Tuesday following strong earnings from semiconductor firms.",
            "Generative AI adoption continues to drive increased spending on cloud infrastructure.",
            "Retail investor participation in the tech sector hit a 12-month high."
        ],
        source: "Tech Markets",
        timeAgo: "5h ago",
        quiz: [
            {
                question: "What drove the recent surge in tech stocks?",
                options: [
                    { text: "Lower interest rates", correct: false },
                    { text: "AI optimism and strong earnings", correct: true },
                    { text: "Government subsidies", correct: false },
                    { text: "A drop in cloud spending", correct: false }
                ],
                explanation: "Earnings beats in the semiconductor sector combined with AI optimism sparked the 2.5% market rally."
            }
        ]
    },
    {
        id: 3,
        category: "Crypto",
        headline: "Bitcoin Halving Event Approaches",
        summary: [
            "The upcoming Bitcoin halving will reduce the block reward from 6.25 to 3.125 BTC.",
            "Historically, halving events have preceded major bullish cycles in the crypto market.",
            "Institutional inflows through recent Spot ETFs provide a new dynamic compared to previous cycles."
        ],
        source: "Crypto Daily",
        timeAgo: "1d ago",
        quiz: [
            {
                question: "What does the Bitcoin halving actually do?",
                options: [
                    { text: "Cuts the total supply in half", correct: false },
                    { text: "Reduces the new supply created per block", correct: true },
                    { text: "Divides everyone's coins by two", correct: false },
                    { text: "Doubles the transaction fees", correct: false }
                ],
                explanation: "The halving reduces the 'block reward'—meaning fewer new Bitcoins are generated and added to the circulating supply."
            },
            {
                question: "What new factor makes this cycle different from past ones?",
                options: [
                    { text: "It's the very first halving", correct: false },
                    { text: "There are no transaction fees now", correct: false },
                    { text: "Inflows from new Spot ETFs", correct: true },
                    { text: "Bitcoin was replaced by Ethereum", correct: false }
                ],
                explanation: "The introduction of formal Spot ETFs has allowed massive institutional capital to enter the market directly."
            }
        ]
    },
    {
        id: 4,
        category: "Personal Finance",
        headline: "The Power of High-Yield Savings Accounts",
        summary: [
            "With current interest rates, high-yield savings accounts (HYSAs) are offering upwards of 4.5% APY.",
            "Experts recommend keeping a 3-6 month emergency fund in liquid accounts like these.",
            "Unlike risky investments, HYSAs provide guaranteed returns with virtually zero risk of losing your principal."
        ],
        source: "Money Smart",
        timeAgo: "1d ago",
        quiz: [
            {
                question: "What is the primary benefit of an emergency fund in an HYSA?",
                options: [
                    { text: "It will beat stock market returns", correct: false },
                    { text: "Liquid access with guaranteed returns", correct: true },
                    { text: "It is entirely tax-free", correct: false },
                    { text: "It prevents you from overspending", correct: false }
                ],
                explanation: "An HYSA keeps your money safe from market drops while giving you easy access (liquidity) and earning some guaranteed interest."
            }
        ]
    },
    {
        id: 5,
        category: "Bonds",
        headline: "Government Yields Attract Conservative Investors",
        summary: [
            "10-year government bond yields hold steady near 4.1%, providing attractive income for conservative portfolios.",
            "Bond prices and yields move inversely; as yields rise, existing bond prices fall.",
            "Many aging investors are shifting from volatile equities back toward predictable fixed-income assets."
        ],
        source: "Fixed Income Weekly",
        timeAgo: "2d ago",
        quiz: [
            {
                question: "How do bond prices react when yields (interest rates) rise?",
                options: [
                    { text: "Bond prices also rise", correct: false },
                    { text: "Bond prices fall", correct: true },
                    { text: "Bond prices remain unchanged", correct: false },
                    { text: "Bonds convert to stocks", correct: false }
                ],
                explanation: "They have an inverse relationship. If new bonds are issued at higher yields, the older bonds with lower yields become less valuable, so their price drops."
            }
        ]
    },
    {
        id: 6,
        category: "Stocks",
        headline: "Dividend Aristocrats Provide Safe Haven in Volatility",
        summary: [
            "Companies that have increased their dividend payouts for 25+ consecutive years are known as 'Dividend Aristocrats'.",
            "During recent market turbulence, these mature companies outperformed growth stocks.",
            "Reinvesting these dividends can significantly compound a portfolio's growth over decades."
        ],
        source: "Investment Times",
        timeAgo: "3d ago",
        quiz: [
            {
                question: "What makes a company a 'Dividend Aristocrat'?",
                options: [
                    { text: "Having the highest dividend yield", correct: false },
                    { text: "Increasing dividend payouts for 25+ years", correct: true },
                    { text: "Being owned by wealthy investors", correct: false },
                    { text: "Never paying a dividend", correct: false }
                ],
                explanation: "A Dividend Aristocrat is a company that has not only paid dividends, but consistently increased them every year for at least 25 consecutive years."
            },
            {
                question: "How do dividends impact long-term growth?",
                options: [
                    { text: "They reduce your total returns", correct: false },
                    { text: "They are irrelevant", correct: false },
                    { text: "Reinvesting them creates significant compound growth", correct: true },
                    { text: "They only matter for day trading", correct: false }
                ],
                explanation: "By taking the cash dividends and using them to buy more shares, you earn dividends on those new shares too—this is a core component of compound growth."
            }
        ]
    },
    {
        id: 7,
        category: "Economy",
        headline: "Labor Market Shows Unexpected Resilience",
        summary: [
            "Unemployment remains historically low at 3.8% despite aggressive rate hikes by the central bank.",
            "Wage growth continues to outpace inflation for the first time in two years.",
            "However, job creation is heavily concentrated in healthcare and government sectors."
        ],
        source: "Macro Daily",
        timeAgo: "4d ago",
        quiz: [
            {
                question: "What is notable about current wage growth?",
                options: [
                    { text: "It is causing mass unemployment", correct: false },
                    { text: "It is finally outpacing inflation", correct: true },
                    { text: "It is dropping rapidly", correct: false },
                    { text: "It only affects tech workers", correct: false }
                ],
                explanation: "When wage growth outpaces inflation, workers gain 'real' purchasing power because their pay is rising faster than the cost of living."
            }
        ]
    },
    {
        id: 8,
        category: "Personal Finance",
        headline: "The 50/30/20 Rule Gains Popularity with Gen Z",
        summary: [
            "Many young adults are adopting the 50/30/20 budget method to manage their finances.",
            "The rule suggests allocating 50% to needs, 30% to wants, and 20% to savings/investments.",
            "Automating the 20% savings portion right on payday is key to long-term wealth building."
        ],
        source: "Budget Pros",
        timeAgo: "5d ago",
        quiz: [
            {
                question: "In the 50/30/20 rule, what does the 20% represent?",
                options: [
                    { text: "Needs like rent and groceries", correct: false },
                    { text: "Wants like dining out and hobbies", correct: false },
                    { text: "Taxes paid to the government", correct: false },
                    { text: "Savings and investments", correct: true }
                ],
                explanation: "The 20% is strictly dedicated to paying your future self, through savings, debt payoff, and investments."
            }
        ]
    }
];
