import { useState } from 'react';
import { Wallet, Users, Settings } from 'lucide-react';

export function Monetization() {
    const [model, setModel] = useState('Subscription');
    const [tier1Price, setTier1Price] = useState(29);
    const [tier2Price, setTier2Price] = useState(99);
    const [tier3Price, setTier3Price] = useState(299);

    const [expectedUsers, setExpectedUsers] = useState(100);
    const [churnRate, setChurnRate] = useState(5);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    // Simple projection calculation
    const mrr = expectedUsers * tier2Price; // Assuming average hits mid-tier
    const churnedRevenue = mrr * (churnRate / 100);
    const netMrr = mrr - churnedRevenue;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Monetization Modeler</h1>
                    <p className="text-muted">Simulate pricing models. Optimize for maximum LTV, minimum friction.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="card p-6 bg-[#0a0a0a]">
                        <h3 className="mb-4 flex items-center gap-2 text-accent border-b border-[#222] pb-4"><Settings size={18} /> Pricing Architecture</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {['Subscription', 'Usage-based', 'Per-seat', 'Freemium'].map(m => (
                                <button
                                    key={m}
                                    className={`btn py-2 px-4 border text-xs ${model === m ? 'bg-accent text-bg-main font-bold border-accent' : 'btn-secondary text-muted'}`}
                                    onClick={() => setModel(m)}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#111] p-4 rounded-lg border border-[#333]">
                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Starter Tier</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">$</span>
                                    <input type="number" value={tier1Price} onChange={e => setTier1Price(+e.target.value)} className="w-full text-2xl font-mono bg-transparent border-0 border-b border-[#333] rounded-none px-0 focus:border-accent" />
                                    <span className="text-xs text-muted">/mo</span>
                                </div>
                            </div>
                            <div className="bg-[#151515] p-4 rounded-lg border border-accent/50 relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-1 bg-accent"></div>
                                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Pro Tier (Target)</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">$</span>
                                    <input type="number" value={tier2Price} onChange={e => setTier2Price(+e.target.value)} className="w-full text-2xl font-mono font-bold bg-transparent border-0 border-b border-accent rounded-none px-0 focus:border-white" />
                                    <span className="text-xs text-muted">/mo</span>
                                </div>
                            </div>
                            <div className="bg-[#111] p-4 rounded-lg border border-[#333]">
                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Enterprise Tier</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">$</span>
                                    <input type="number" value={tier3Price} onChange={e => setTier3Price(+e.target.value)} className="w-full text-2xl font-mono bg-transparent border-0 border-b border-[#333] rounded-none px-0 focus:border-accent" />
                                    <span className="text-xs text-muted">/mo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 bg-[#0a0a0a]">
                        <h3 className="mb-4 flex items-center gap-2 text-warning border-b border-[#222] pb-4"><Users size={18} /> Velocity Assumptions</h3>
                        <div className="grid grid-cols-2 gap-8">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold uppercase tracking-wider text-muted">Active Paying Users</span>
                                <input type="number" value={expectedUsers} onChange={e => setExpectedUsers(+e.target.value)} className="text-xl font-mono" />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold uppercase tracking-wider text-muted text-danger">Monthly Churn (%)</span>
                                <input type="number" max="100" value={churnRate} onChange={e => setChurnRate(+e.target.value)} className="text-xl font-mono" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="card p-6 border-success bg-success/5 flex flex-col">
                    <h3 className="mb-6 flex items-center gap-2 text-success border-b border-success/20 pb-4"><Wallet size={20} /> Projection Engine</h3>

                    <div className="flex flex-col gap-8 flex-1">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Gross MRR</p>
                            <p className="text-4xl font-mono font-bold text-main">{formatCurrency(mrr)}</p>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-danger mb-1">Revenue Lost to Churn</p>
                            <p className="text-xl font-mono font-bold text-danger">-{formatCurrency(churnedRevenue)}</p>
                        </div>

                        <div className="bg-[#050505] p-5 rounded-lg border border-success/30 shadow-[0_0_20px_rgba(50,215,75,0.1)] mt-auto">
                            <p className="text-sm font-bold uppercase tracking-widest text-success mb-2">Net ARR (Annual)</p>
                            <p className="text-5xl font-mono font-bold text-success">{formatCurrency(netMrr * 12)}</p>
                            <p className="text-xs font-mono text-muted mt-4 pt-4 border-t border-[#333]">Assuming {model} model running at {formatCurrency(tier2Price)} / mo ARPU.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
