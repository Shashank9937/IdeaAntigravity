import { useState } from 'react';
import { useStore } from '../store';
import { Plus, Database } from 'lucide-react';

export function PainMining() {
    const { state, addPain } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        topic: '', platform: 'Reddit', complaint: '', intensity: 5, frequency: 5,
        actionability: 5, competition: 5, marketSizeTag: 'Medium' as const,
        target: '', workaround: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPain(form);
        setShowModal(false);
        setForm({
            topic: '', platform: 'Reddit', complaint: '', intensity: 5, frequency: 5,
            actionability: 5, competition: 5, marketSizeTag: 'Medium',
            target: '', workaround: ''
        });
    };

    const sortedPains = [...state.pains].sort((a, b) => b.opportunityScore - a.opportunityScore);

    const getUrgencyColor = (score: number) => {
        if (score >= 8) return 'var(--success)';
        if (score >= 5) return 'var(--warning)';
        return 'var(--text-muted)';
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-accent-dim p-4 rounded-xl border border-accent/20">
                <div>
                    <h1 className="text-2xl mb-1">Pain Opportunity Dashboard</h1>
                    <p className="text-sm text-muted">Convert raw customer pain into venture-scale opportunity scores.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> Log High-Leverage Pain
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sortedPains.length === 0 ? (
                    <div className="card text-center p-12 text-muted border-dashed border-2">
                        <Database size={32} className="mx-auto mb-4 opacity-50" />
                        <p>No pain points logged.</p>
                        <p className="text-sm">Filter for high-intensity, high-frequency, actionable problems.</p>
                    </div>
                ) : (
                    <div className="card p-0 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-xs uppercase tracking-widest text-muted border-b">
                                    <th className="p-4">Opportunity</th>
                                    <th className="p-4">Pain Metrics</th>
                                    <th className="p-4 text-center">Score</th>
                                    <th className="p-4">Market</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPains.map(pain => (
                                    <tr key={pain.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="badge text-[10px] py-0.5">{pain.platform}</span>
                                                    <span className="font-bold text-main">{pain.topic}</span>
                                                </div>
                                                <p className="text-sm text-muted italic line-clamp-1">"{pain.complaint}"</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs font-mono text-muted">
                                            <div className="flex flex-col gap-1">
                                                <span>INT: {pain.intensity} | FREQ: {pain.frequency}</span>
                                                <span>ACT: {pain.actionability} | COMP: {pain.competition}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div
                                                className="text-xl font-bold font-display inline-block px-3 py-1 rounded-md"
                                                style={{
                                                    color: getUrgencyColor(pain.opportunityScore),
                                                    backgroundColor: `rgba(0,0,0,0.3)`,
                                                    boxShadow: `0 0 10px ${getUrgencyColor(pain.opportunityScore)}22`
                                                }}
                                            >
                                                {pain.opportunityScore}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`badge ${pain.marketSizeTag === 'Large' ? 'badge-success' :
                                                    pain.marketSizeTag === 'Medium' ? 'badge-warning' : ''
                                                }`}>
                                                {pain.marketSizeTag}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-md">
                    <div className="bg-card w-full max-w-2xl rounded-xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-display">Log Pain Insight</h2>
                                <p className="text-sm text-muted">Identify structural gaps with high monetization potential.</p>
                            </div>
                            <button className="text-muted hover:text-white" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted">Topic/Niche
                                    <input required value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. AI Content Strategy" className="bg-white/5 border-white/10" />
                                </label>
                                <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted">Platform
                                    <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="bg-white/5 border-white/10">
                                        <option>Reddit</option><option>Twitter</option><option>HackerNews</option>
                                        <option>App Store / G2</option><option>Customer Interview</option>
                                    </select>
                                </label>
                            </div>

                            <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted">The Complaint Quote / Observation
                                <textarea required rows={3} value={form.complaint} onChange={e => setForm({ ...form, complaint: e.target.value })} placeholder="What is the visceral pain being felt?" className="bg-white/5 border-white/10"></textarea>
                            </label>

                            <div className="grid grid-cols-4 gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase text-muted">Intensity (1-10)
                                    <input type="number" min="1" max="10" required value={form.intensity} onChange={e => setForm({ ...form, intensity: +e.target.value })} className="bg-black/40" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase text-muted">Frequency (1-10)
                                    <input type="number" min="1" max="10" required value={form.frequency} onChange={e => setForm({ ...form, frequency: +e.target.value })} className="bg-black/40" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase text-muted">Actionability (1-10)
                                    <input type="number" min="1" max="10" required value={form.actionability} onChange={e => setForm({ ...form, actionability: +e.target.value })} className="bg-black/40" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase text-muted">Competition (1-10)
                                    <input type="number" min="1" max="10" required value={form.competition} onChange={e => setForm({ ...form, competition: +e.target.value })} className="bg-black/40" />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted">Target Persona
                                    <input required value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} placeholder="Who is bleeding?" className="bg-white/5 border-white/10" />
                                </label>
                                <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted">Market Size Tag
                                    <select value={form.marketSizeTag} onChange={e => setForm({ ...form, marketSizeTag: e.target.value as any })} className="bg-white/5 border-white/10">
                                        <option value="Small">Small (Lifestyle)</option>
                                        <option value="Medium">Medium (Mid-Market)</option>
                                        <option value="Large">Large (Venture-Scale)</option>
                                    </select>
                                </label>
                            </div>

                            <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-muted">Current Workaround (The 'Cost of Inaction')
                                <input required value={form.workaround} onChange={e => setForm({ ...form, workaround: e.target.value })} placeholder="How are they surviving today?" className="bg-white/5 border-white/10" />
                            </label>

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" className="btn btn-secondary px-8" onClick={() => setShowModal(false)}>Discard</button>
                                <button type="submit" className="btn btn-primary px-8">Commit to Opportunity Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
