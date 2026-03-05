import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const PhoneFrame = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const location = useLocation();

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
            padding: isDesktop ? '20px 0' : '0',
            overflow: 'hidden'
        }}>
            {/* Responsive wrapper: phone frame on desktop, full-width on mobile */}
            <div
                style={{
                    width: '100%',
                    maxWidth: isDesktop ? '430px' : 'none',
                    height: isDesktop ? '100dvh' : '100dvh',
                    maxHeight: isDesktop ? '932px' : 'none',
                    position: 'relative',
                    backgroundColor: 'var(--bg)',
                    borderRadius: isDesktop ? '40px' : '0px',
                    overflow: 'hidden',
                    boxShadow: isDesktop ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 8px #1a1e24' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'opacity 0.5s ease',
                    opacity: mounted ? 1 : 0
                }}
            >
                {/* Dynamic Island — only on desktop phone frame */}
                {isDesktop && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '35px',
                        backgroundColor: '#000',
                        borderRadius: '20px',
                        zIndex: 999,
                        pointerEvents: 'none'
                    }}></div>
                )}

                {/* Scrollable Content Area */}
                <div id="phone-scroll-container" style={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingBottom: showNav ? '80px' : '0',
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
