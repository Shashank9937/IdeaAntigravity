import { useState } from 'react';
import { useStore } from '../store';
import { FileSearch, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export function ValidationTracker() {
    const { state, addValidation } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        hypothesis: 'Users will pay $50/mo for an automated email sender.',
        experiment: 'Fake door landing page with buy button.',
        result: '100 visitors, 5 clicked buy. 5% conversion.',
        signalStrength: 'Medium', decision: 'Pivot'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addValidation(form);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Validation Tracker</h1>
                    <p className="text-muted">Test assumptions fast. Don't build what hasn't been validated.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    New Experiment
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {state.validations.map(val => (
                    <div key={val.id} className="card p-5 border-l-4" style={{ borderLeftColor: val.decision === 'Go' ? 'var(--success)' : val.decision === 'Stop' ? 'var(--danger)' : 'var(--warning)' }}>
                        <h3 className="flex items-center gap-2 mb-2 text-lg">
                            <FileSearch size={20} /> Assumption: {val.hypothesis}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-[#111] p-4 rounded-lg">
                                <p className="text-xs uppercase font-bold text-muted tracking-wider mb-2">Experiment Run</p>
                                <p className="text-main leading-relaxed">{val.experiment}</p>
                            </div>
                            <div className="bg-[#111] p-4 rounded-lg border border-[#333]">
                                <p className="text-xs uppercase font-bold text-muted tracking-wider mb-2">Data Result</p>
                                <p className="text-main leading-relaxed font-mono">{val.result}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#222]">
                            <div className="flex gap-2 items-center">
                                <span className="text-sm font-bold text-muted mr-2">Signal:</span>
                                <span className={`badge ${val.signalStrength === 'High' ? 'badge-success' : val.signalStrength === 'Low' ? 'badge-danger' : 'badge-warning'}`}>{val.signalStrength}</span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <span className="text-sm font-bold text-muted mr-2">Decision Call:</span>
                                <span className={`btn text-xs px-3 py-1 pointer-events-none text-white ${val.decision === 'Go' ? 'bg-success/20 border-success text-success' : val.decision === 'Stop' ? 'bg-danger/20 border-danger text-danger' : 'bg-warning/20 border-warning text-warning'}`}>
                                    {val.decision === 'Go' ? <CheckCircle size={14} /> : val.decision === 'Stop' ? <XCircle size={14} /> : <TrendingUp size={14} />}
                                    {val.decision}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-card w-full max-w-lg rounded-lg border p-6">
                        <h2>Log Validation Experiment</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                            <label className="flex flex-col gap-1 text-sm font-medium">Core Hypothesis Tested
                                <textarea rows={2} required value={form.hypothesis} onChange={e => setForm({ ...form, hypothesis: e.target.value })} />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Experiment Run (How did you test it?)
                                <textarea rows={2} required value={form.experiment} onChange={e => setForm({ ...form, experiment: e.target.value })} />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Measurable Result
                                <input required value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} />
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Signal Strength
                                    <select value={form.signalStrength} onChange={e => setForm({ ...form, signalStrength: e.target.value })}>
                                        <option>High</option><option>Medium</option><option>Low</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Final Decision
                                    <select value={form.decision} onChange={e => setForm({ ...form, decision: e.target.value })}>
                                        <option>Go</option><option>Pivot</option><option>Stop</option>
                                    </select>
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Log Result</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
