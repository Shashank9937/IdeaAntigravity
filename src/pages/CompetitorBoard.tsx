import { useState } from 'react';
import { useStore } from '../store';
import { Network, Plus } from 'lucide-react';

export function CompetitorBoard() {
    const { state, addCompetitor } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: '', url: '', audience: '',
        pricing: '', strengths: '',
        weaknesses: '',
        complaints: '', positioning: '',
        gap: '',
        complexity: 50, premium: 50
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCompetitor(form);
        setShowModal(false);
        setForm({
            name: '', url: '', audience: '',
            pricing: '', strengths: '',
            weaknesses: '',
            complaints: '', positioning: '',
            gap: '',
            complexity: 50, premium: 50
        });
    };

    // Simple heuristic to find whitespace (quadrant with fewest competitors)
    const getWhitespaceQuadrant = () => {
        const counts = [0, 0, 0, 0]; // Q1 (Top-Right), Q2 (Top-Left), Q3 (Bottom-Left), Q4 (Bottom-Right)
        state.competitors.forEach(c => {
            if (c.complexity >= 50 && c.premium >= 50) counts[0]++;
            else if (c.complexity < 50 && c.premium >= 50) counts[1]++;
            else if (c.complexity < 50 && c.premium < 50) counts[2]++;
            else counts[3]++;
        });
        const minCount = Math.min(...counts);
        return counts.indexOf(minCount);
    };

    const whitespaceIdx = getWhitespaceQuadrant();
    const quadrants = [
        { label: 'High Complexity / High Price', x: '50%', y: '0%', w: '50%', h: '50%' },
        { label: 'Simple / Premium', x: '0%', y: '0%', w: '50%', h: '50%' },
        { label: 'Simple / Cheap', x: '0%', y: '50%', w: '50%', h: '50%' },
        { label: 'High Complexity / Cheap', x: '50%', y: '50%', w: '50%', h: '50%' }
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-accent-dim p-6 rounded-2xl border border-accent/20">
                <div>
                    <h1 className="text-3xl mb-1 font-display">Competitor Intel & Whitespace</h1>
                    <p className="text-sm text-muted">Attack where they are weak. Build what they ignore.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> Map New Competitor
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-8 bg-black/40 border-white/5 shadow-2xl relative">
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                            <Network size={18} /> Strategic Positioning Map
                        </h3>
                        <div className="flex gap-4 text-[10px] font-bold uppercase text-muted">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-danger"></div> Competitor</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_var(--success)]"></div> Your Target</span>
                        </div>
                    </div>

                    <div className="relative w-full aspect-square bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                        {/* Grid lines */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10"></div>

                        {/* Axis Labels */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 border border-white/5 rounded text-[10px] font-bold uppercase text-muted tracking-widest z-10">Premium / Niche</div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 border border-white/5 rounded text-[10px] font-bold uppercase text-muted tracking-widest z-10">Cheap / General</div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 border border-white/5 rounded text-[10px] font-bold uppercase text-muted tracking-widest z-10 -rotate-90">Simple / Manual</div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 border border-white/5 rounded text-[10px] font-bold uppercase text-muted tracking-widest z-10 rotate-90">Complex / Automated</div>

                        {/* Whitespace Highlight */}
                        <div
                            className="absolute bg-success/10 border-success/30 border-2 border-dashed pointer-events-none flex items-center justify-center transition-all duration-700"
                            style={{
                                left: quadrants[whitespaceIdx].x,
                                top: quadrants[whitespaceIdx].y,
                                width: quadrants[whitespaceIdx].w,
                                height: quadrants[whitespaceIdx].h
                            }}
                        >
                            <div className="flex flex-col items-center gap-2 animate-pulse">
                                <span className="text-success font-black uppercase tracking-tighter text-2xl opacity-40">Strategic Whitespace</span>
                                <span className="text-[10px] font-bold text-success/60 uppercase">High Leverage Entry Point</span>
                            </div>
                        </div>

                        {state.competitors.map((comp) => (
                            <div
                                key={comp.id}
                                className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 hover:z-20 group cursor-help"
                                style={{ left: `${comp.complexity}%`, top: `${100 - comp.premium}%` }}
                            >
                                <div className="w-4 h-4 rounded-full bg-danger border-2 border-white/20 group-hover:bg-accent group-hover:shadow-[0_0_20px_var(--accent)] transition-all"></div>
                                <div className="opacity-0 group-hover:opacity-100 absolute bottom-6 bg-black border border-white/10 px-3 py-1 rounded shadow-2xl transition-opacity pointer-events-none w-max z-30">
                                    <p className="text-xs font-bold text-white">{comp.name}</p>
                                    <p className="text-[10px] text-muted">{comp.pricing}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-2">Intelligence Briefings</h3>
                    {state.competitors.length === 0 ? (
                        <div className="text-center p-8 border border-dashed border-white/10 rounded-xl text-muted text-sm">
                            <p>No competitors mapped yet.</p>
                        </div>
                    ) : (
                        state.competitors.map(c => (
                            <div key={c.id} className="card p-5 bg-white/5 border-white/5 hover:border-accent/40 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-lg font-bold m-0">{c.name}</h4>
                                        <p className="text-[10px] text-accent font-mono uppercase tracking-widest">{c.url}</p>
                                    </div>
                                    <span className="badge text-[10px]">{c.pricing}</span>
                                </div>
                                <div className="grid gap-3">
                                    <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                                        <span className="text-[10px] font-bold text-success uppercase">Core Weakness</span>
                                        <p className="text-xs text-muted mt-1 italic">"{c.weaknesses}"</p>
                                    </div>
                                    <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                                        <span className="text-[10px] font-bold text-accent uppercase">Strategic Gap</span>
                                        <p className="text-xs text-main mt-1 font-medium">{c.gap}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
                    <div className="bg-card w-full max-w-2xl rounded-2xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-display mb-1">Map Ecosystem Participant</h2>
                                <p className="text-sm text-muted">Input competitor heuristics to visualize market saturation.</p>
                            </div>
                            <button className="text-muted hover:text-white bg-white/5 p-2 rounded-full" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Competitor Name
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Acme Corp" className="bg-white/5" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Primary URL
                                    <input required value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="acme.ai" className="bg-white/5" />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Their Core Strengths
                                    <textarea rows={2} required value={form.strengths} onChange={e => setForm({ ...form, strengths: e.target.value })} placeholder="What keeps their customers loyal?" className="bg-white/5" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Their Core Weaknesses
                                    <textarea rows={2} required value={form.weaknesses} onChange={e => setForm({ ...form, weaknesses: e.target.value })} placeholder="What do their customers complain about?" className="bg-white/5" />
                                </label>
                            </div>

                            <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Detected Whitespace Gap
                                <input required value={form.gap} onChange={e => setForm({ ...form, gap: e.target.value })} placeholder="e.g. They focus on manual SMB work, we focus on automated Enterprise flow" className="bg-white/5" />
                            </label>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col gap-8">
                                <h4 className="text-[10px] font-bold text-accent uppercase tracking-widest border-b border-accent/20 pb-2">Positioning Heuristics</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    <label className="flex flex-col gap-3">
                                        <div className="flex justify-between text-[10px] font-bold uppercase">
                                            <span className="text-muted">Complexity</span>
                                            <span className="text-accent">{form.complexity}%</span>
                                        </div>
                                        <input type="range" min="0" max="100" value={form.complexity} onChange={e => setForm({ ...form, complexity: +e.target.value })} className="accent-accent" />
                                        <div className="flex justify-between text-[8px] text-muted uppercase tracking-tighter"><span>Simple / Manual</span><span>Complex / Automated</span></div>
                                    </label>
                                    <label className="flex flex-col gap-3">
                                        <div className="flex justify-between text-[10px] font-bold uppercase">
                                            <span className="text-muted">Pricing / Niche</span>
                                            <span className="text-accent">{form.premium}%</span>
                                        </div>
                                        <input type="range" min="0" max="100" value={form.premium} onChange={e => setForm({ ...form, premium: +e.target.value })} className="accent-accent" />
                                        <div className="flex justify-between text-[8px] text-muted uppercase tracking-tighter"><span>Cheap / General</span><span>Premium / Niche</span></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" className="btn btn-secondary px-10 py-3" onClick={() => setShowModal(false)}>Cancel mapping</button>
                                <button type="submit" className="btn btn-primary px-10 py-3 font-bold bg-white text-black">Commit to Intelligence Map</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
