import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import PhoneFrame from './components/PhoneFrame';
import LoadingScreen from './components/LoadingScreen';
import FloatingAIChat from './components/FloatingAIChat';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import { useDevice } from './utils/hooks';

import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Stages from './pages/Stages';
import News from './pages/News';
import Analysis from './pages/Analysis';
import Profile from './pages/Profile';
import StreakPage from './pages/StreakPage';
import CoinsPage from './pages/CoinsPage';
import ChainsPage from './pages/ChainsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ErrorBoundary from './components/ErrorBoundary';

import { isLoggedIn } from './utils/auth';

function PrivateRoute({ children }) {
    return isLoggedIn() ? children : <Navigate to="/" />;
}

export default function App() {
    return (
        <BrowserRouter>
            <AppLayout />
        </BrowserRouter>
    );
}

function AppLayout() {
    const [loading, setLoading] = useState(true);
    const { isMobile, isTablet, isDesktop } = useDevice();
    const location = useLocation();

    if (loading) {
        return <LoadingScreen onComplete={() => setLoading(false)} />;
    }

    const isAuthRoute = location.pathname === '/' || location.pathname === '/onboarding';

    let marginLeft = '0px';
    if (!isAuthRoute) {
        if (isDesktop) marginLeft = '260px';
        else if (isTablet) marginLeft = '72px';
    }

    const mainContentStyle = isMobile ? {
        width: '100%',
        minHeight: '100vh'
    } : {
        marginLeft,
        padding: '32px 40px',
        maxWidth: '1280px',
        minHeight: '100vh',
        width: `calc(100% - ${marginLeft})`
    };

    return (
        <PhoneFrame>
            {!isAuthRoute && <Sidebar />}
            <div style={mainContentStyle}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/onboarding" element={<Onboarding />} />

                    <Route path="/stages" element={<PrivateRoute><ErrorBoundary><Stages /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/news" element={<PrivateRoute><ErrorBoundary><News /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/analysis" element={<PrivateRoute><ErrorBoundary><Analysis /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><ErrorBoundary><Profile /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/streak" element={<PrivateRoute><ErrorBoundary><StreakPage /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/coins" element={<PrivateRoute><ErrorBoundary><CoinsPage /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/chains" element={<PrivateRoute><ErrorBoundary><ChainsPage /></ErrorBoundary></PrivateRoute>} />
                    <Route path="/leaderboard" element={<PrivateRoute><ErrorBoundary><LeaderboardPage /></ErrorBoundary></PrivateRoute>} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            {!isAuthRoute && <BottomNav />}
            <FloatingAIChat />
        </PhoneFrame>
    );
}
