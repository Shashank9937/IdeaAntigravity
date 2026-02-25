import { useState } from 'react';
import { useStore } from '../store';
import { Plus, Database } from 'lucide-react';

export function PainMining() {
    const { state, addPain } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        topic: '', platform: 'Reddit', complaint: '', intensity: 5, frequency: 5, target: '', workaround: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPain(form);
        setShowModal(false);
        setForm({ topic: '', platform: 'Reddit', complaint: '', intensity: 5, frequency: 5, target: '', workaround: '' });
    };

    const sortedPains = [...state.pains].sort((a, b) => b.opportunityScore - a.opportunityScore);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Pain Mining Lab</h1>
                    <p className="text-muted">Uncover structural problems to solve. People pay for painkillers.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> Log Insight
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sortedPains.length === 0 ? (
                    <div className="card text-center p-12 text-muted border-dashed border-2">
                        <Database size={32} className="mx-auto mb-4 opacity-50" />
                        <p>No pain points logged.</p>
                        <p className="text-sm">Go read negative reviews, subreddits, and support forums.</p>
                    </div>
                ) : (
                    sortedPains.map(pain => (
                        <div key={pain.id} className="card p-5 flex gap-4 border-l-4" style={{ borderLeftColor: `rgba(255, 69, 58, ${pain.intensity / 10})` }}>
                            <div className="w-16 h-16 bg-[#222] rounded-md flex flex-col items-center justify-center font-bold text-accent shrink-0">
                                <span className="text-xs text-muted">SCORE</span>
                                <span className="text-xl">{pain.opportunityScore}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <div className="flex gap-2 items-center">
                                        <span className="badge badge-warning">{pain.platform}</span>
                                        <span className="text-sm font-semibold">{pain.topic}</span>
                                    </div>
                                    <div className="flex gap-4 text-xs font-mono text-muted">
                                        <span>INT: {pain.intensity}/10</span>
                                        <span>FREQ: {pain.frequency}/10</span>
                                    </div>
                                </div>
                                <h3 className="text-lg text-main leading-tight mb-2">"{pain.complaint}"</h3>
                                <div className="text-sm grid grid-cols-2 gap-4 text-muted bg-[#1A1A1A] p-3 rounded-md">
                                    <div><strong className="text-white">Who:</strong> {pain.target}</div>
                                    <div><strong className="text-white">Current workaround:</strong> {pain.workaround}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-card w-full max-w-lg rounded-lg border p-6">
                        <h2 className="mb-4">Log Pain Insight</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Topic/Niche
                                    <input required value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Sales CRMs" />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Platform
                                    <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                                        <option>Reddit</option><option>Twitter</option><option>HackerNews</option>
                                        <option>App Store / G2</option><option>Customer Interview</option>
                                    </select>
                                </label>
                            </div>
                            <label className="flex flex-col gap-1 text-sm font-medium">The Complaint Quote / Observation
                                <textarea required rows={3} value={form.complaint} onChange={e => setForm({ ...form, complaint: e.target.value })} placeholder="They keep saying 'I hate manually doing X...'"></textarea>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium flex-1">Intensity (1-10)
                                    <input type="number" min="1" max="10" required value={form.intensity} onChange={e => setForm({ ...form, intensity: +e.target.value })} />
                                    <span className="text-xs text-muted">How painful is this really?</span>
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium flex-1">Frequency (1-10)
                                    <input type="number" min="1" max="10" required value={form.frequency} onChange={e => setForm({ ...form, frequency: +e.target.value })} />
                                    <span className="text-xs text-muted">How often does it occur?</span>
                                </label>
                            </div>
                            <label className="flex flex-col gap-1 text-sm font-medium">Who specifically feels this?
                                <input required value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} placeholder="B2B SDRs at Series A startups" />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Current workaround
                                <input required value={form.workaround} onChange={e => setForm({ ...form, workaround: e.target.value })} placeholder="5 messy Excel spreadsheets" />
                            </label>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save to Lab</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
