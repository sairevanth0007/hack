import React, { useState } from 'react';
import BottomSheet from '../components/BottomSheet';
import { mockStocks, mockFunds, mockCrypto, mockBonds } from '../data/mockData';

const Invest = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [investAmount, setInvestAmount] = useState('');

    const tabs = ['All', 'Stocks', 'Funds', 'Crypto', 'Bonds', 'Cash', 'Credit'];

    const AssetCard = ({ asset, type }) => {
        const isCrypto = type === 'crypto';
        const isBond = type === 'bond';
        const hasReturn = asset.change24h !== undefined || asset.returnYTD !== undefined;
        const returnValue = asset.change24h || asset.returnYTD;
        const isPositive = returnValue >= 0;

        return (
            <div className="card" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '12px', padding: '16px',
                borderColor: isCrypto ? 'rgba(124, 58, 237, 0.3)' : isBond ? 'rgba(46, 204, 113, 0.3)' : 'var(--border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}>
                        {isCrypto ? '₿' : isBond ? '🏦' : '📈'}
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{asset.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px', display: 'flex', gap: '8px' }}>
                            <span>{asset.ticker || asset.type || asset.term}</span>
                            {asset.risk && (
                                <span style={{
                                    color: asset.risk === 'High' ? 'var(--orange)' : asset.risk === 'Low' ? 'var(--green)' : 'var(--gold)',
                                    background: 'rgba(255,255,255,0.05)', padding: '0 4px', borderRadius: '4px'
                                }}>
                                    {asset.risk} Risk {isCrypto && '⚡'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    {asset.price ? (
                        <div style={{ fontWeight: 'bold' }}>€{asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    ) : (
                        <div style={{ fontWeight: 'bold' }}>{asset.rate || asset.returnYTD}% p.a.</div>
                    )}

                    <button
                        onClick={() => setSelectedAsset({ ...asset, type })}
                        style={{
                            background: 'var(--text)', color: 'var(--bg)',
                            padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'
                        }}
                    >
                        {isBond ? 'Open' : 'Buy'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '24px', paddingBottom: '100px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Invest</h1>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Choose where to grow your money.</p>

            {/* Categories */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '8px', margin: '0 -24px', padding: '0 24px' }} className="hide-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 20px', borderRadius: '24px', whiteSpace: 'nowrap',
                            background: activeTab === tab ? 'var(--text)' : 'var(--card)',
                            color: activeTab === tab ? 'var(--bg)' : 'var(--text)',
                            fontWeight: activeTab === tab ? 'bold' : 'normal',
                            border: `1px solid ${activeTab === tab ? 'var(--text)' : 'var(--border)'}`
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Credit Card Banner */}
                {(activeTab === 'All' || activeTab === 'Credit') && (
                    <section>
                        <div className="card" style={{
                            background: 'linear-gradient(135deg, #1c2330 0%, #0d1117 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative', overflow: 'hidden', padding: '24px'
                        }}>
                            {/* Fake card chip */}
                            <div style={{ width: '40px', height: '28px', background: 'gold', borderRadius: '6px', opacity: 0.8, marginBottom: '24px' }}></div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Turtrl Black Card</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '80%' }}>
                                2% cashback on all purchases directly auto-invested into your portfolio.
                            </p>
                            <button className="btn-primary" style={{ background: 'var(--green)', color: '#000', minHeight: '40px', fontSize: '0.9rem' }}>
                                Apply Now
                            </button>
                        </div>
                    </section>
                )}

                {(activeTab === 'All' || activeTab === 'Stocks') && (
                    <section>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Popular Stocks</h3>
                        {mockStocks.map(stock => <AssetCard key={stock.id} asset={stock} type="stock" />)}
                    </section>
                )}

                {(activeTab === 'All' || activeTab === 'Funds') && (
                    <section>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>ETFs & Mutual Funds</h3>
                        {mockFunds.map(fund => <AssetCard key={fund.id} asset={fund} type="fund" />)}
                    </section>
                )}

                {(activeTab === 'All' || activeTab === 'Crypto') && (
                    <section>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Crypto <span style={{ fontSize: '0.9rem', color: 'var(--orange)' }}>High Risk</span></h3>
                        {mockCrypto.map(crypto => <AssetCard key={crypto.id} asset={crypto} type="crypto" />)}
                    </section>
                )}

                {(activeTab === 'All' || activeTab === 'Bonds' || activeTab === 'Cash') && (
                    <section>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Stable & Safe</h3>
                        {mockBonds.map(bond => <AssetCard key={bond.id} asset={bond} type="bond" />)}
                    </section>
                )}
            </div>

            {/* Invest Bottom Sheet */}
            <BottomSheet
                isOpen={!!selectedAsset}
                onClose={() => { setSelectedAsset(null); setInvestAmount(''); }}
                title={`Invest in ${selectedAsset?.name}`}
            >
                {selectedAsset && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--card2)', borderRadius: '12px' }}>
                            <div>
                                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Current Price</div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {selectedAsset.price ? `€${selectedAsset.price.toLocaleString()}` : `${selectedAsset.rate || selectedAsset.returnYTD}% p.a.`}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Available Balance</div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>€1,450.00</div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)' }}>Investment Amount (€)</label>
                            <input
                                type="number"
                                className="input-field"
                                placeholder="0.00"
                                value={investAmount}
                                onChange={(e) => setInvestAmount(e.target.value)}
                                style={{ fontSize: '1.5rem', padding: '16px' }}
                                autoFocus
                            />
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                {['50', '100', '500', 'Max'].map(amt => (
                                    <button
                                        key={amt}
                                        onClick={() => setInvestAmount(amt === 'Max' ? '1450' : amt)}
                                        style={{ flex: 1, padding: '8px', background: 'var(--card2)', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid var(--border)' }}
                                    >
                                        {amt === 'Max' ? amt : `+€${amt}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', background: 'var(--green)', color: '#000', fontSize: '1.1rem', marginTop: '16px' }}
                            onClick={() => {
                                alert(`Mock: Investig €${investAmount} in ${selectedAsset.name}`);
                                setSelectedAsset(null);
                                setInvestAmount('');
                            }}
                            disabled={!investAmount || Number(investAmount) <= 0}
                        >
                            Swipe to Confirm
                        </button>

                        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center' }}>
                            Capital at risk. {selectedAsset.risk === 'High' ? 'This asset is highly volatile.' : 'Past performance is not indicative of future results.'}
                        </p>
                    </div>
                )}
            </BottomSheet>
        </div>
    );
};

export default Invest;
