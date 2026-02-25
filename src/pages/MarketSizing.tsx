import { useState } from 'react';
import { Calculator } from 'lucide-react';

export function MarketSizing() {
    const [targetAudience, setTargetAudience] = useState(10000);
    const [monthlyPrice, setMonthlyPrice] = useState(49);
    const [adoptionRate, setAdoptionRate] = useState(5);

    const arpu = monthlyPrice * 12; // Annual
    const tam = targetAudience * arpu;
    const sam = tam * 0.3; // Arbitrary 30% for Serviceable
    const som = sam * (adoptionRate / 100);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Bottom-Up Market Sizing</h1>
                    <p className="text-muted">Start with highly specific users you can reach. Ignore top-down report fluff.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6 border-accent/30 bg-[#111]">
                    <h3 className="mb-6 flex items-center gap-2 border-b border-[#333] pb-4"><Calculator size={20} /> Inputs</h3>

                    <div className="flex flex-col gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-main uppercase tracking-wider">Total Reachable Users (Worldwide)</span>
                            <input type="number" value={targetAudience} onChange={e => setTargetAudience(+e.target.value)} className="font-mono text-lg bg-black" />
                            <span className="text-xs text-muted">e.g. Total independent plumbers using iPhones.</span>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-main uppercase tracking-wider">Target Monthly Price ($)</span>
                            <input type="number" value={monthlyPrice} onChange={e => setMonthlyPrice(+e.target.value)} className="font-mono text-lg bg-black" />
                            <span className="text-xs text-muted">Be realistic. ARPU: {formatCurrency(arpu)}/yr</span>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-main uppercase tracking-wider">Realistic Adoption Rate (%)</span>
                            <input type="number" value={adoptionRate} onChange={e => setAdoptionRate(+e.target.value)} className="font-mono text-lg bg-black" max="100" />
                            <span className="text-xs text-muted">What % of the market can you capture in year 3?</span>
                        </label>
                    </div>
                </div>

                <div className="card p-6 flex flex-col justify-center border-l-4 border-l-accent bg-[#0a0a0a]">
                    <h3 className="mb-8 flex items-center gap-2 border-b border-[#333] pb-4">Outputs (Annual Revenue)</h3>

                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">TAM (Total Addressable Market)</p>
                            <div className="flex items-center gap-4">
                                <p className="text-2xl font-mono text-main">{formatCurrency(tam)}</p>
                                <div className="flex-1 h-2 bg-[#222] rounded"><div className="h-full bg-main rounded" style={{ width: '100%' }}></div></div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">SAM (Serviceable Addressable Market - 30%)</p>
                            <div className="flex items-center gap-4">
                                <p className="text-2xl font-mono text-accent">{formatCurrency(sam)}</p>
                                <div className="flex-1 h-2 bg-[#222] rounded"><div className="h-full bg-accent rounded" style={{ width: '30%' }}></div></div>
                            </div>
                        </div>

                        <div className="bg-success/10 p-4 border border-success/30 rounded-lg">
                            <p className="text-xs font-bold text-success uppercase tracking-widest mb-1">SOM (Serviceable Obtainable Market) - Year 3 Target</p>
                            <div className="flex items-center gap-4">
                                <p className="text-4xl font-mono font-bold text-success">{formatCurrency(som)}</p>
                                <div className="flex-1 h-2 bg-[#222] rounded"><div className="h-full bg-success rounded shadow-[0_0_10px_rgba(50,215,75,0.8)]" style={{ width: `${adoptionRate}%` }}></div></div>
                            </div>
                            <p className="text-sm mt-3 text-success/80">If you capture {adoptionRate}% of your SAM, you build a {formatCurrency(som)}/year company. Focus solely on obtaining this slice.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
