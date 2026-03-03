import { useState } from 'react';
import { Calculator } from 'lucide-react';

export function MarketSizing() {
    const [customerCount, setCustomerCount] = useState(10000);
    const [arpu, setArpu] = useState(500);
    const [geoMultiplier, setGeoMultiplier] = useState(1);
    const [adoptionRate, setAdoptionRate] = useState(5);

    const tam = customerCount * arpu * geoMultiplier;
    const sam = tam * 0.4; // 40% Serviceable
    const som = sam * (adoptionRate / 100);
    const projection3Year = som * 2.5; // Estimated growth

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0, notation: 'compact'
    }).format(val * 80); // Converting to INR for the ₹50+ crore context

    const getScaleSignal = (val: number) => {
        const inCr = (val * 80) / 10000000;
        if (inCr >= 100) return { label: 'Venture Scale', color: 'var(--success)', bg: 'rgba(0, 201, 136, 0.1)' };
        if (inCr >= 10) return { label: 'Mid-Sized', color: 'var(--warning)', bg: 'rgba(245, 166, 35, 0.1)' };
        return { label: 'Lifestyle Scale', color: 'var(--danger)', bg: 'rgba(248, 81, 73, 0.1)' };
    };

    const scale = getScaleSignal(som);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-accent-dim p-6 rounded-2xl border border-accent/20">
                <div>
                    <h1 className="text-3xl mb-1 font-display">Revenue Calculation Engine</h1>
                    <p className="text-sm text-muted">Bottom-up estimation. Avoid top-down "1% of a billion" fallacies.</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Scale Classification</span>
                    <div className="px-4 py-2 rounded-lg font-bold text-sm border" style={{ color: scale.color, backgroundColor: scale.bg, borderColor: `${scale.color}44` }}>
                        {scale.label}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card p-8 bg-black/40 border-white/5 shadow-2xl">
                    <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Variable Inputs</h3>
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-muted uppercase">Global Customer Count</span>
                                <input type="number" value={customerCount} onChange={e => setCustomerCount(+e.target.value)} className="text-xl font-mono bg-white/5" />
                                <span className="text-[10px] text-muted italic">Total reachable units</span>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-muted uppercase">ARPU (Annual $)</span>
                                <input type="number" value={arpu} onChange={e => setArpu(+e.target.value)} className="text-xl font-mono bg-white/5" />
                                <span className="text-[10px] text-muted italic">Average Revenue Per User</span>
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-muted uppercase">Geography Multiplier</span>
                                <input type="number" step="0.1" value={geoMultiplier} onChange={e => setGeoMultiplier(+e.target.value)} className="text-xl font-mono bg-white/5" />
                                <span className="text-[10px] text-muted italic">Market efficiency factor</span>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-muted uppercase">Target Adoption (%)</span>
                                <input type="number" value={adoptionRate} onChange={e => setAdoptionRate(+e.target.value)} className="text-xl font-mono bg-white/5" max="100" />
                                <span className="text-[10px] text-muted italic">Year 3 penetration goal</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="card p-8 border-l-4" style={{ borderLeftColor: scale.color }}>
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Calculated Market Potential</h3>
                        <div className="flex flex-col gap-8">
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-muted uppercase">TAM (Total Market)</span>
                                    <span className="text-2xl font-mono font-bold">{formatCurrency(tam)}</span>
                                </div>
                                <div className="text-right flex flex-col">
                                    <span className="text-[10px] font-bold text-muted uppercase">SAM (Serviceable)</span>
                                    <span className="text-lg font-mono text-accent">{formatCurrency(sam)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-main uppercase">SOM (Annual Revenue Target)</span>
                                    <span className="text-4xl font-mono font-bold" style={{ color: scale.color }}>{formatCurrency(som)}</span>
                                </div>
                                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full transition-all duration-500 rounded-full" style={{ width: `${adoptionRate}%`, backgroundColor: scale.color, boxShadow: `0 0 20px ${scale.color}44` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 bg-accent text-black flex justify-between items-center group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Calculator size={80} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">3-Year Projected Cumulative Revenue</h3>
                            <p className="text-3xl font-bold font-display">{formatCurrency(projection3Year)}</p>
                            <p className="text-[10px] mt-2 font-medium opacity-80">Estimated assuming product-market fit and linear scaling velocity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
