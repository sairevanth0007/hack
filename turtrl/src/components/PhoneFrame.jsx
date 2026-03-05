import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const PhoneFrame = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const location = useLocation();

    // For transition animations
    useEffect(() => {
        setMounted(true);
    }, []);

    const hideNavPaths = ['/login', '/onboarding'];
    const showNav = !hideNavPaths.includes(location.pathname);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--bg)',
            padding: '20px 0',
            overflow: 'hidden'
        }}>
            {/* Desktop Wrapper / Phone Frame */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '430px', /* iPhone 14 Pro Max width */
                    height: '100dvh',
                    maxHeight: '932px',
                    position: 'relative',
                    backgroundColor: 'var(--bg)',
                    borderRadius: window.innerWidth > 430 ? '40px' : '0px',
                    overflow: 'hidden',
                    boxShadow: window.innerWidth > 430 ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 8px #1a1e24' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.5s ease',
                    opacity: mounted ? 1 : 0
                }}
            >
                {/* Dynamic Island fake element for realism on desktop */}
                {window.innerWidth > 430 && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '35px',
                        backgroundColor: '#000',
                        borderRadius: '20px',
                        zIndex: 1000
                    }}></div>
                )}

                {/* Scrollable Content Area */}
                <div id="phone-scroll-container" style={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingBottom: showNav ? '80px' : '0', // Leave space for BottomNav
                    scrollBehavior: 'smooth'
                }} className="hide-scrollbar page-enter-active">
                    {children}
                </div>

                {/* Bottom Navigation */}
                {showNav && <BottomNav />}
            </div>
        </div>
    );
};

export default PhoneFrame;
