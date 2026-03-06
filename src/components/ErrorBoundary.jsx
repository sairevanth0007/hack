import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }
    componentDidCatch(error, info) {
        console.error('Turtrl Error:', error, info)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '24px 20px',
                    paddingTop: '80px',
                    color: '#F0F6FC',
                    fontFamily: 'DM Sans, sans-serif',
                    maxWidth: '430px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: '#161B22',
                        border: '1px solid rgba(231,76,60,0.3)',
                        borderRadius: '16px',
                        padding: '20px'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
                        <div style={{
                            fontFamily: 'Syne, sans-serif',
                            fontSize: '18px',
                            fontWeight: '700',
                            marginBottom: '8px'
                        }}>
                            Something went wrong
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: '#8B949E',
                            marginBottom: '16px',
                            fontFamily: 'monospace',
                            background: '#0D1117',
                            padding: '10px',
                            borderRadius: '8px',
                            wordBreak: 'break-all'
                        }}>
                            {this.state.error?.message || 'Unknown error'}
                        </div>
                        <button
                            onClick={() => window.location.href = '/'}
                            style={{
                                background: '#2ECC71',
                                color: '#000',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px 20px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '14px'
                            }}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
