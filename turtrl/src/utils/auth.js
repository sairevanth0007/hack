// src/utils/auth.js

export const auth = {
    login: (email, password) => {
        // Mock login
        const users = JSON.parse(localStorage.getItem('turtrl_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('turtrl_current_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, error: 'Invalid email or password' };
    },

    register: (userData) => {
        const users = JSON.parse(localStorage.getItem('turtrl_users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'Email already exists' };
        }

        const newUser = { ...userData, id: Date.now().toString(), onboardingComplete: false };
        users.push(newUser);
        localStorage.setItem('turtrl_users', JSON.stringify(users));
        localStorage.setItem('turtrl_current_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    },

    logout: () => {
        localStorage.removeItem('turtrl_current_user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('turtrl_current_user');
        return userStr ? JSON.parse(userStr) : null;
    },

    completeOnboarding: (onboardingData) => {
        const defaultPortfolio = {
            balance: onboardingData.startingBalance || 0,
            monthlyChange: 0,
            monthlyChangePercent: 0,
        };
        const update = { onboardingComplete: true, onboarding: onboardingData, portfolio: defaultPortfolio };
        return auth.updateUser(update);
    },

    updateUser: (updates) => {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return null;

        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('turtrl_current_user', JSON.stringify(updatedUser));

        // Update in users list too
        const users = JSON.parse(localStorage.getItem('turtrl_users') || '[]');
        const index = users.findIndex(u => u.id === currentUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('turtrl_users', JSON.stringify(users));
        }

        return updatedUser;
    }
};
