import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Invest from './pages/Invest';
import Portfolio from './pages/Portfolio';
import AIChat from './pages/AIChat';
import News from './pages/News';
import Profile from './pages/Profile';
import { auth } from './utils/auth';

// Simple Route Guard
const PrivateRoute = ({ children, requireOnboarding = true }) => {
  const user = auth.getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireOnboarding && !user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!requireOnboarding && user.onboardingComplete) {
    // If they are trying to go to onboarding but already completed it
    if (location.pathname === '/onboarding') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // We scroll the phone frame content area, not window
    const scrollContainer = document.getElementById('phone-scroll-container');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={
            <PrivateRoute requireOnboarding={false}>
              <Onboarding />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/invest" element={
            <PrivateRoute>
              <Invest />
            </PrivateRoute>
          } />
          <Route path="/portfolio" element={
            <PrivateRoute>
              <Portfolio />
            </PrivateRoute>
          } />
          <Route path="/chat" element={
            <PrivateRoute>
              <AIChat />
            </PrivateRoute>
          } />
          <Route path="/news" element={
            <PrivateRoute>
              <News />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PhoneFrame>
    </BrowserRouter>
  );
}

export default App;
