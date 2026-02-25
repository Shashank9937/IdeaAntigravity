import { useState } from 'react';
import { useStore } from '../store';
import { Activity, Plus, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export function TrendRadar() {
    const { state, addTrend } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        category: 'Industry', description: 'Massive shift from SaaS to AI micro-agents.', impact: 'High'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTrend(form);
        setShowModal(false);
    };

    const getIcon = (category: string) => {
        switch (category) {
            case 'Industry': return <TrendingUp size={16} className="text-accent" />;
            case 'Tech': return <Activity size={16} className="text-success" />;
            case 'Culture': return <RefreshCw size={16} className="text-warning" />;
            case 'Fading': return <TrendingDown size={16} className="text-danger" />;
            default: return <Activity size={16} />;
        }
    };

    const renderRadarQuadrant = (categoryFilter: string, title: string, colorClass: string) => {
        const items = state.trends.filter(t => t.category === categoryFilter);

        return (
            <div className="card p-5 bg-[#0a0a0a] border-[#222] group hover:border-white transition-all">
                <h3 className={`text-sm uppercase tracking-widest font-bold mb-4 flex items-center gap-2 ${colorClass}`}>
                    {getIcon(categoryFilter)} {title}
                </h3>

                <div className="flex flex-col gap-3">
                    {items.map(item => (
                        <div key={item.id} className="p-3 bg-[#111] rounded border border-[#333] flex justify-between gap-4">
                            <p className="text-sm m-0 leading-snug">{item.description}</p>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted shrink-0 my-auto bg-black px-2 py-1 rounded">
                                Impact: {item.impact}
                            </span>
                        </div>
                    ))}
                    {items.length === 0 && <p className="text-xs text-muted italic p-2">Tracking isolated. No structural shifts logged.</p>}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Trend Radar</h1>
                    <p className="text-muted">Ride the wave, don't fight it. Map macro-economic, tech, and cultural shifts early.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> Log Shift
                </button>
            </div>

            <div className="relative p-6 bg-[#050505] rounded-xl border border-[#333] shadow-inner overflow-hidden">
                {/* Radar UI Background */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <div className="w-[800px] h-[800px] rounded-full border border-success animate-[spin_10s_linear_infinite] overflow-hidden">
                        <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-success"></div>
                    </div>
                    <div className="absolute w-[600px] h-[600px] rounded-full border border-success"></div>
                    <div className="absolute w-[400px] h-[400px] rounded-full border border-success"></div>
                    <div className="absolute w-[200px] h-[200px] rounded-full border border-success"></div>
                    <div className="absolute w-full h-[1px] bg-success"></div>
                    <div className="absolute h-full w-[1px] bg-success"></div>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                    {renderRadarQuadrant('Tech', 'Tech & Platforms', 'text-success')}
                    {renderRadarQuadrant('Industry', 'Industry & B2B', 'text-accent')}
                    {renderRadarQuadrant('Culture', 'Consumer Culture', 'text-warning')}
                    {renderRadarQuadrant('Fading', 'Fading & Dying Trends', 'text-danger')}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border w-full max-w-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-6">Log Radar Blip</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label className="flex flex-col gap-1 text-sm font-medium">Quadrant (Category)
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option>Tech</option>
                                    <option>Industry</option>
                                    <option>Culture</option>
                                    <option>Fading</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Observation / Shift
                                <textarea rows={2} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="e.g. Sales teams firing SDRs due to AI. Outbound volume dropping." />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Estimated Impact
                                <select value={form.impact} onChange={e => setForm({ ...form, impact: e.target.value })}>
                                    <option>High</option><option>Medium</option><option>Low</option>
                                </select>
                            </label>

                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#333]">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary bg-success text-black border-none hover:bg-success">Pin to Radar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
