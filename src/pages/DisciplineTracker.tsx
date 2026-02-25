import { useState } from 'react';
import { useStore } from '../store';
import { Target, Clock, Flame } from 'lucide-react';

export function DisciplineTracker() {
    const { state, addDiscipline } = useStore();
    const [showModal, setShowModal] = useState(false);

    // Today by default
    const todayStr = new Date().toISOString().split('T')[0];
    const [form, setForm] = useState({
        date: todayStr, deepWork: 4, outreach: 10, experiments: 1, content: 1, learning: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addDiscipline(form);
        setShowModal(false);
    };

    const currentWeekStats = state.discipline.slice(0, 7);
    const totalDeepWork = currentWeekStats.reduce((sum, d) => sum + d.deepWork, 0);
    const totalOutreach = currentWeekStats.reduce((sum, d) => sum + d.outreach, 0);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Founder Discipline Protocol</h1>
                    <p className="text-muted">Systems beat motivation. Track what you actually got done today.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Flame size={16} /> Log Today
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="card p-6 border-accent bg-[#0d0d0d]">
                    <h3 className="mb-4 text-accent text-sm uppercase tracking-widest font-bold">7-Day Averages</h3>
                    <div className="grid grid-rows-2 gap-4">
                        <div className="flex items-center justify-between p-4 bg-bg-main border border-[#333] rounded-lg">
                            <div className="flex items-center gap-3">
                                <Clock size={24} className="text-warning" />
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted tracking-wider">Deep Work Total</p>
                                    <p className="text-2xl font-bold font-mono">{totalDeepWork} <span className="text-sm">hrs</span></p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted">Target: 28 hrs</p>
                                <div className="w-24 h-1.5 bg-[#222] rounded-full mt-2">
                                    <div className="h-full bg-warning rounded-full" style={{ width: `${(totalDeepWork / 28) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-bg-main border border-[#333] rounded-lg">
                            <div className="flex items-center gap-3">
                                <Target size={24} className="text-success" />
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted tracking-wider">Outreach Volume</p>
                                    <p className="text-2xl font-bold font-mono">{totalOutreach} <span className="text-sm">msg</span></p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted">Target: 100 msg</p>
                                <div className="w-24 h-1.5 bg-[#222] rounded-full mt-2">
                                    <div className="h-full bg-success rounded-full" style={{ width: `${(totalOutreach / 100) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-6 bg-[#0a0a0a]">
                    <h3 className="mb-4 text-sm uppercase tracking-widest font-bold text-muted">Recent Logs</h3>
                    <div className="flex flex-col gap-2">
                        {state.discipline.slice(0, 5).map(log => (
                            <div key={log.id} className="flex items-center justify-between p-3 border-b border-[#222] hover:bg-[#1a1a1a] transition-colors rounded">
                                <span className="font-mono text-xs font-bold">{log.date}</span>
                                <div className="flex gap-4 text-sm">
                                    <span className="text-main" title="Deep Work Hours">⚡ {log.deepWork}h</span>
                                    <span className="text-muted" title="Outreach">🎯 {log.outreach}</span>
                                    <span className="text-muted" title="Experiments">🧪 {log.experiments}</span>
                                </div>
                            </div>
                        ))}
                        {state.discipline.length === 0 && <p className="text-muted italic text-sm">Start logging daily routines to build a resilient execution habit.</p>}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border w-full max-w-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-6">Log Daily Execution</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <label className="flex gap-4 items-center border-b border-[#333] pb-4">
                                <span className="w-1/3 text-sm font-bold uppercase tracking-wider text-muted">Date</span>
                                <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="flex-1 font-mono" />
                            </label>

                            <div className="grid grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-warning uppercase tracking-wider"><Clock size={14} className="inline mr-1 -mt-1" /> Deep Work (Hrs)</span>
                                    <input type="number" step="0.5" required value={form.deepWork} onChange={e => setForm({ ...form, deepWork: +e.target.value })} className="font-mono text-xl" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-success uppercase tracking-wider"><Target size={14} className="inline mr-1 -mt-1" /> Cold Outreach</span>
                                    <input type="number" required value={form.outreach} onChange={e => setForm({ ...form, outreach: +e.target.value })} className="font-mono text-xl" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-accent uppercase tracking-wider">Experiments Launched</span>
                                    <input type="number" required value={form.experiments} onChange={e => setForm({ ...form, experiments: +e.target.value })} className="font-mono text-xl" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-muted uppercase tracking-wider">Learning (Hrs)</span>
                                    <input type="number" step="0.5" required value={form.learning} onChange={e => setForm({ ...form, learning: +e.target.value })} className="font-mono text-xl" />
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#333]">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Lock In Day</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
