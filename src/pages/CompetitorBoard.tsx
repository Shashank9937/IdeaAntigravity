import { useState } from 'react';
import { useStore } from '../store';
import { Network, Plus } from 'lucide-react';

export function CompetitorBoard() {
    const { state, addCompetitor } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: 'Big Corp Inc.', url: 'bigcorp.com', audience: 'Enterprise B2B',
        pricing: '$1000/mo', strengths: 'Brand trust, 500 integrations',
        weaknesses: 'Clunky UI, slow support, 6-month onboarding',
        complaints: 'Too complex to set up', positioning: 'The ultimate all-in-one suite',
        gap: 'Fast setup for small teams without dedicated ops',
        complexity: 90, premium: 80
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCompetitor(form);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Competitor Intelligence</h1>
                    <p className="text-muted">Know your enemy. Find the whitespace. Attack where they are weak.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> New Competitor
                </button>
            </div>

            <div className="card p-6 bg-[#0a0a0a] border-[#222]">
                <h3 className="mb-4 flex items-center gap-2"><Network size={18} /> 2x2 Positioning Map</h3>

                <div className="relative w-full aspect-square md:aspect-[2/1] bg-bg-card border rounded-lg overflow-hidden">
                    {/* Grid lines */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#333]"></div>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-[#333]"></div>

                    {/* Labels */}
                    <span className="absolute top-2 left-1/2 -ml-6 text-xs text-muted font-bold tracking-wider uppercase bg-bg-card px-2">Premium</span>
                    <span className="absolute bottom-2 left-1/2 -ml-5 text-xs text-muted font-bold tracking-wider uppercase bg-bg-card px-2">Cheap</span>
                    <span className="absolute left-2 top-1/2 -mt-2 text-xs text-muted font-bold tracking-wider uppercase bg-bg-card px-2 transform -rotate-90 origin-left">Simple</span>
                    <span className="absolute right-2 top-1/2 -mt-2 text-xs text-muted font-bold tracking-wider uppercase bg-bg-card px-2 transform rotate-90 origin-right">Complex</span>

                    <div className="absolute inset-0 bg-accent/5 opacity-5 z-0"></div>

                    {/* Whitespace radar - arbitrarily highlighting cheap & simple (bottom-left) as whitespace */}
                    <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-success/10 border-success/20 border-t border-r pointer-events-none flex items-center justify-center">
                        <span className="text-success/30 font-bold uppercase tracking-widest text-lg rotate-45 transform">Whitespace Opportunity</span>
                    </div>

                    {state.competitors.map((comp) => {
                        return (
                            <div
                                key={comp.id}
                                className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 hover:z-10 group"
                                style={{ left: `${comp.complexity}%`, top: `${100 - comp.premium}%` }}
                            >
                                <div className="w-4 h-4 rounded-full bg-danger border-2 border-bg-main group-hover:bg-accent ring-2 ring-transparent group-hover:ring-accent/50 shadow-[0_0_10px_rgba(255,69,58,0.5)]"></div>
                                <span className="text-xs font-bold mt-1 bg-black/80 px-2 py-0.5 rounded shadow whitespace-nowrap">{comp.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.competitors.map(c => (
                    <div key={c.id} className="card p-5 bg-[#121212] border-t-4 border-t-[#333]">
                        <h3 className="m-0 text-xl font-bold truncate pr-4">{c.name}</h3>
                        <a href={`https://${c.url}`} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">{c.url}</a>

                        <div className="mt-4 grid gap-3">
                            <div className="bg-[#050505] p-3 rounded border">
                                <p className="text-xs font-bold text-success uppercase tracking-wider mb-1">Their Strengths</p>
                                <p className="text-sm text-main">{c.strengths}</p>
                            </div>
                            <div className="bg-[#050505] p-3 rounded border">
                                <p className="text-xs font-bold text-danger uppercase tracking-wider mb-1">Their Weaknesses</p>
                                <p className="text-sm text-main">{c.weaknesses}</p>
                            </div>
                            <div className="bg-[#050505] p-3 rounded border border-warning/30">
                                <p className="text-xs font-bold text-warning uppercase tracking-wider mb-1">The Whitespace Gap</p>
                                <p className="text-sm text-main">{c.gap}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-[#111] border w-full max-w-2xl rounded-xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold mb-6">Log Competitor Intel</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Company Name
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">URL
                                    <input required value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Strengths (Why people buy)
                                    <textarea rows={2} required value={form.strengths} onChange={e => setForm({ ...form, strengths: e.target.value })} />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Weaknesses (Why people churn)
                                    <textarea rows={2} required value={form.weaknesses} onChange={e => setForm({ ...form, weaknesses: e.target.value })} />
                                </label>
                            </div>

                            <label className="flex flex-col gap-1 text-sm font-medium">Your Whitespace Attack Gap
                                <input required value={form.gap} onChange={e => setForm({ ...form, gap: e.target.value })} placeholder="e.g. They focus on enterprise, we focus on solo operators" />
                            </label>

                            <div className="p-4 bg-[#222] rounded-lg mt-2">
                                <h4 className="text-sm uppercase tracking-wider text-accent font-bold mb-4">Positioning (0 to 100)</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    <label className="flex flex-col gap-2 text-sm font-medium">Complexity
                                        <input type="range" min="0" max="100" value={form.complexity} onChange={e => setForm({ ...form, complexity: +e.target.value })} className="w-full" />
                                        <div className="flex justify-between text-xs text-muted font-mono"><span>Simple (0)</span><span>Complex (100)</span></div>
                                    </label>
                                    <label className="flex flex-col gap-2 text-sm font-medium">Pricing
                                        <input type="range" min="0" max="100" value={form.premium} onChange={e => setForm({ ...form, premium: +e.target.value })} className="w-full" />
                                        <div className="flex justify-between text-xs text-muted font-mono"><span>Cheap (0)</span><span>Premium (100)</span></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Map Competitor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
