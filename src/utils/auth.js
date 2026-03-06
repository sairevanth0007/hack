const PREFIX = 'turtrl_';

export function getUser() {
    try {
        const raw = localStorage.getItem(`${PREFIX}user`);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.error('getUser parse error:', e);
        localStorage.removeItem(`${PREFIX}user`);
        return null;
    }
}

export function saveUser(data) {
    try {
        if (!data) return;
        localStorage.setItem(`${PREFIX}user`, JSON.stringify(data));
    } catch (e) {
        console.error('saveUser error:', e);
    }
}

export const isLoggedIn = () => {
    return !!getUser();
};

export const isOnboarded = () => {
    const user = getUser();
    return user && user.monthlySavings > 0 && user.level !== null;
};

export function updateUser(fields) {
    try {
        const user = getUser();
        if (!user) return null;
        const updated = { ...user, ...fields };
        saveUser(updated);
        return updated;
    } catch (e) {
        console.error('updateUser error:', e);
        return null;
    }
}

export function awardCoins(amount, source) {
    const user = getUser();
    if (!user) return;

    user.coins = (user.coins || 0) + amount;

    if (!user.coinsHistory) user.coinsHistory = [];

    user.coinsHistory.unshift({
        id: Date.now(),
        source: source,
        amount: amount,
        date: new Date().toISOString()
    });

    if (user.coinsHistory.length > 100) {
        user.coinsHistory = user.coinsHistory.slice(0, 100);
    }

    saveUser(user);
    return user.coins;
}

export const logout = () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(PREFIX)) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
};

export const unlockBadge = (badgeId) => {
    const user = getUser();
    if (!user) return;
    if (!user.badges.includes(badgeId)) {
        user.badges.push(badgeId);
        saveUser(user);
    }
};

export const checkAndUpdateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const user = getUser();
    if (!user) return user;

    const last = user.lastStreakDate;

    if (last === today) {
        return; // Already completed today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    if (last === yStr) {
        user.streak += 1;
    } else if (last === null || last === undefined) {
        user.streak = 1;
    } else {
        if (user.streakShields > 0) {
            user.streakShields -= 1;
            user.streak += 1;
        } else {
            user.streak = 1;
        }
    }

    user.lastStreakDate = today;
    if (user.streak > user.bestStreak) user.bestStreak = user.streak;

    if (user.streak > 0 && user.streak % 60 === 0) {
        user.rubies += 1;
        if (!user.chainsHistory) user.chainsHistory = [];
        user.chainsHistory.push({ source: '60-day Perfect Streak', amount: 1, date: new Date().toISOString() });
    }

    if (!user.streakHistory) user.streakHistory = [];
    user.streakHistory.push({ date: today, maintained: true });

    saveUser(user);
    return user;
};

export const markStreakMissed = () => {
    const user = getUser();
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    if (!user.streakHistory) user.streakHistory = [];
    user.streakHistory.push({ date: today, maintained: false });
    saveUser(user);
};
