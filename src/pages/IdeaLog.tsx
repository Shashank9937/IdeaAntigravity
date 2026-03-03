import { useState } from 'react';
import { useStore } from '../store';
import { Plus, Zap } from 'lucide-react';

export function IdeaLog() {
    const { state, addIdea } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('All');

    const [form, setForm] = useState({
        title: '', description: '', problem: '', persona: '', differentiation: '',
        status: 'Raw Pain', impact: 5, confidence: 5, ease: 5,
        industry: 'SaaS',
        founderFit: {
            leverageAssets: 1, visionAlign: 1, build30Days: 1, compoundPotential: 1,
            score: 4, isMisaligned: false
        },
        scalabilityIndex: {
            marketSize: 5, networkEffects: 5, marginPotential: 5, capitalEfficiency: 5, defensibility: 5, total: 25
        },
        killCriteria: '', swot: '', riskiestAssumption: '', validationPlan: '',
        monetization: '', marketSize: '', notes: '', painIds: [] as string[]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addIdea(form);
        setShowModal(false);
    };

    const ideas = filter === 'All' ? state.ideas : state.ideas.filter((i) => i.status === filter);
    const sortedIdeas = [...ideas].sort((a, b) => b.iceScore - a.iceScore);

    const getUnicornProbabilityColor = (score: number) => {
        if (score >= 40) return 'var(--success)';
        if (score >= 25) return 'var(--warning)';
        return 'var(--danger)';
    };

    const getLifecycleBadge = (status: string) => {
        const colors: Record<string, string> = {
            "Raw Pain": "badge-primary",
            "Validated Pain": "badge-warning",
            "Persona Defined": "badge-primary",
            "Market Sized": "badge-success",
            "Monetisation Modeled": "badge-success",
            "MVP Built": "badge-warning",
            "First Revenue": "badge-success",
            "Scaling": "badge-success"
        };
        return colors[status] || "badge";
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-accent-dim p-4 rounded-xl border border-accent/20">
                <div>
                    <h1 className="text-2xl mb-1">Venture-Scale Idea Engine</h1>
                    <p className="text-sm text-muted">Filter for asymmetric outcomes. Kill ideas that don't compound.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> New Strategic Bet
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {[
                    'All', 'Raw Pain', 'Validated Pain', 'Persona Defined',
                    'Market Sized', 'Monetisation Modeled', 'MVP Built',
                    'First Revenue', 'Scaling'
                ].map(f => (
                    <button
                        key={f}
                        className={`btn btn-secondary text-[10px] py-1 px-3 ${filter === f ? 'bg-accent/20 text-accent border-accent/40 shadow-[0_0_15px_rgba(94,106,210,0.2)]' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sortedIdeas.map(idea => (
                    <div key={idea.id} className="card p-6 group transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(94,106,210,0.1)]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl m-0 font-display">{idea.title}</h3>
                                    <span className={`badge ${getLifecycleBadge(idea.status)}`}>{idea.status}</span>
                                    {idea.founderFit.isMisaligned && (
                                        <span className="badge badge-danger text-[10px] animate-pulse">MISALIGNED</span>
                                    )}
                                </div>
                                <p className="text-muted text-sm">{idea.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-black/40 border px-3 py-2 flex flex-col items-center min-w-[60px] rounded-lg">
                                    <span className="text-[10px] font-bold tracking-widest text-muted">ICE</span>
                                    <span className="text-lg font-bold text-accent">{idea.iceScore}</span>
                                </div>
                                <div className="bg-black/40 border px-3 py-2 flex flex-col items-center min-w-[60px] rounded-lg">
                                    <span className="text-[10px] font-bold tracking-widest text-muted">UNICORN</span>
                                    <span className="text-lg font-bold" style={{ color: getUnicornProbabilityColor(idea.scalabilityIndex.total) }}>
                                        {idea.scalabilityIndex.total}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-accent text-[10px] uppercase tracking-wider">Founder Fit</p>
                                    <span className="text-[10px] font-mono">{idea.founderFit.score}/4</span>
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full ${i <= idea.founderFit.score ? 'bg-success' : 'bg-white/10'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <p className="font-bold text-accent mb-2 text-[10px] uppercase tracking-wider">Riskiest Assumption</p>
                                <p className="text-xs text-muted line-clamp-2">{idea.riskiestAssumption}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <p className="font-bold text-accent mb-2 text-[10px] uppercase tracking-wider">Differentiation</p>
                                <p className="text-xs text-muted line-clamp-2">{idea.differentiation}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <div className="flex gap-4 text-muted">
                                <span className="flex gap-1 items-center"><Zap size={12} className="text-accent" /> ICE Breakdown: {idea.impact}/{idea.confidence}/{idea.ease}</span>
                                <span className="flex gap-1 items-center"><Link2 size={12} /> {idea.painIds.length} Linked Pains</span>
                            </div>
                            <button className="btn btn-secondary text-xs py-1.5 px-4 bg-white/5 hover:bg-accent/20">Analyze Detail</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-md">
                    <div className="bg-card w-full max-w-4xl rounded-2xl border border-white/10 p-8 my-auto shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-display mb-1">Architect Strategic Bet</h2>
                                <p className="text-sm text-muted">Configure the parameters for venture-scale execution.</p>
                            </div>
                            <button className="text-muted hover:text-white bg-white/5 p-2 rounded-full" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 flex flex-col gap-4">
                                    <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Strategic Title
                                        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Project Antigravity" className="text-lg bg-white/5" />
                                    </label>
                                    <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">One-Line Strategic Intent
                                        <input required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="High-velocity decision engine for unicorn founders." className="bg-white/5" />
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Industry
                                            <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} className="bg-white/5">
                                                <option>B2B AI</option><option>Logistics</option><option>Agriculture</option>
                                                <option>Climate</option><option>Health</option><option>SaaS</option>
                                                <option>Marketplace</option><option>Hardware</option>
                                            </select>
                                        </label>
                                        <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Current Lifecycle
                                            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="bg-white/5">
                                                <option>Raw Pain</option><option>Validated Pain</option>
                                                <option>Persona Defined</option><option>Market Sized</option>
                                                <option>Monetisation Modeled</option><option>MVP Built</option>
                                                <option>First Revenue</option><option>Scaling</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="bg-accent-dim p-5 rounded-xl border border-accent/20 flex flex-col gap-4">
                                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest">Founder Fit Gate</h3>
                                    {[
                                        { label: 'Asset Leverage', field: 'leverageAssets' },
                                        { label: 'Vision Align', field: 'visionAlign' },
                                        { label: '30-Day MVP', field: 'build30Days' },
                                        { label: '₹100Cr+ Potential', field: 'compoundPotential' }
                                    ].map(q => (
                                        <div key={q.field} className="flex justify-between items-center">
                                            <span className="text-xs text-main">{q.label}</span>
                                            <button
                                                type="button"
                                                className={`w-10 h-6 rounded-full transition-all flex items-center p-1 ${form.founderFit[q.field as keyof typeof form.founderFit] ? 'bg-success' : 'bg-white/10'}`}
                                                onClick={() => {
                                                    const newVal = form.founderFit[q.field as keyof typeof form.founderFit] ? 0 : 1;
                                                    setForm({
                                                        ...form,
                                                        founderFit: { ...form.founderFit, [q.field]: newVal }
                                                    });
                                                }}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white transition-all ${form.founderFit[q.field as keyof typeof form.founderFit] ? 'ml-4' : 'ml-0'}`} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="mt-auto pt-4 border-t border-accent/10 flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-muted uppercase">Status</span>
                                        <span className={`text-[10px] font-bold p-1 rounded ${[form.founderFit.leverageAssets, form.founderFit.visionAlign, form.founderFit.build30Days, form.founderFit.compoundPotential].filter(v => v === 0).length >= 2 ? 'text-danger bg-danger/10' : 'text-success bg-success/10'}`}>
                                            {[form.founderFit.leverageAssets, form.founderFit.visionAlign, form.founderFit.build30Days, form.founderFit.compoundPotential].filter(v => v === 0).length >= 2 ? 'MISALIGNED' : 'ALIGNED'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-white/5 pb-2">Venture Scalability Index</h3>
                                    {[
                                        { label: 'Total Addressable Market', field: 'marketSize' },
                                        { label: 'Network Effects / Moat', field: 'networkEffects' },
                                        { label: 'Gross Margin Potential', field: 'marginPotential' },
                                        { label: 'Capital Efficiency', field: 'capitalEfficiency' },
                                        { label: 'Defensibility / IP', field: 'defensibility' }
                                    ].map(s => (
                                        <div key={s.field} className="flex flex-col gap-2">
                                            <div className="flex justify-between text-[10px] text-muted uppercase font-bold">
                                                <span>{s.label}</span>
                                                <span className="text-accent">{form.scalabilityIndex[s.field as keyof typeof form.scalabilityIndex]} / 10</span>
                                            </div>
                                            <input
                                                type="range" min="1" max="10"
                                                value={form.scalabilityIndex[s.field as keyof typeof form.scalabilityIndex]}
                                                onChange={e => setForm({
                                                    ...form,
                                                    scalabilityIndex: { ...form.scalabilityIndex, [s.field]: +e.target.value }
                                                })}
                                                className="accent-accent"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-white/5 pb-2">Prioritization (ICE)</h3>
                                    <div className="grid grid-cols-3 gap-6 bg-white/5 p-6 rounded-xl border border-white/5">
                                        {['impact', 'confidence', 'ease'].map(ice => (
                                            <div key={ice} className="flex flex-col items-center gap-2">
                                                <span className="text-[10px] text-muted font-bold uppercase">{ice}</span>
                                                <input type="number" min="1" max="10" value={form[ice as 'impact' | 'confidence' | 'ease']} onChange={e => setForm({ ...form, [ice]: +e.target.value })} className="w-full text-center font-mono text-xl bg-black/40 border-none outline-none focus:ring-0" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-accent p-6 rounded-xl flex items-center justify-between text-black">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Calculated ICE Score</span>
                                            <span className="text-3xl font-bold font-display">{Math.round((form.impact + form.confidence + form.ease) / 3)}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Unicorn Score</span>
                                            <span className="text-3xl font-bold font-display">{form.scalabilityIndex.marketSize + form.scalabilityIndex.networkEffects + form.scalabilityIndex.marginPotential + form.scalabilityIndex.capitalEfficiency + form.scalabilityIndex.defensibility}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Riskiest Assumption
                                    <textarea rows={2} required value={form.riskiestAssumption} onChange={e => setForm({ ...form, riskiestAssumption: e.target.value })} placeholder="What must be true for this NOT to fail?" className="bg-white/5" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Kill Criteria
                                    <textarea rows={2} required value={form.killCriteria} onChange={e => setForm({ ...form, killCriteria: e.target.value })} placeholder="When do we stop spending and kill the project?" className="bg-white/5" />
                                </label>
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                                <button type="button" className="btn btn-secondary px-10 py-3" onClick={() => setShowModal(false)}>Discard Draft</button>
                                <button type="submit" className="btn btn-primary px-10 py-3 bg-white text-black font-bold">Commit to Venture Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const Link2 = ({ size }: { size: number }) => <span style={{ width: size, height: size }} className="inline-block border rounded flex items-center justify-center">L</span>
