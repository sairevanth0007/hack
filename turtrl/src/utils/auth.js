const PREFIX = 'turtrl_';

export const getUser = () => {
    const data = localStorage.getItem(`${PREFIX}user`);
    return data ? JSON.parse(data) : null;
};

export const saveUser = (data) => {
    localStorage.setItem(`${PREFIX}user`, JSON.stringify(data));
};

export const isLoggedIn = () => {
    return !!getUser();
};

export const isOnboarded = () => {
    const user = getUser();
    return user && user.monthlySavings > 0 && user.level !== null;
};

export const updateUser = (fields) => {
    const user = getUser() || {};
    const updated = { ...user, ...fields };
    saveUser(updated);
    return updated;
};

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
    const user = getUser();
    if (!user) return user;

    const todayStr = new Date().toISOString().split('T')[0];
    const lastStr = user.lastStreakDate;

    if (lastStr === todayStr) {
        // Already tracked today
        return user;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = user.streak;
    let newShields = user.streakShields;
    let newRubies = user.rubies;

    if (lastStr === yesterdayStr) {
        // Sequential day
        newStreak += 1;
    } else {
        // Missed a day
        if (newShields > 0 && newStreak > 0) {
            newShields -= 1;
            newStreak += 1;
        } else {
            newStreak = 1;
        }
    }

    let newBestStreak = user.bestStreak;
    if (newStreak > newBestStreak) {
        newBestStreak = newStreak;
    }

    if (newStreak > 0 && newStreak % 60 === 0) {
        newRubies += 1;
    }

    const updated = updateUser({
        streak: newStreak,
        bestStreak: newBestStreak,
        lastStreakDate: todayStr,
        streakShields: newShields,
        rubies: newRubies
    });

    if (newStreak >= 7) unlockBadge('streak_7');
    if (newStreak >= 30) unlockBadge('streak_30');
    if (newRubies >= 1) unlockBadge('first_ruby');

    return updated;
};
