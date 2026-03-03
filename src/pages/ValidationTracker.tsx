import { useState } from 'react';
import { useStore } from '../store';
import { FileSearch, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export function ValidationTracker() {
    const { state, addValidation } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        hypothesis: '',
        experiment: '',
        testDesign: '',
        testCost: '$0',
        result: '',
        signalStrength: 'Medium' as 'High' | 'Medium' | 'Low',
        decision: 'Pivot' as 'Go' | 'Pivot' | 'Stop',
        status: 'Validating' as 'Pending' | 'Validating' | 'Validated' | 'Invalidated',
        learning: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addValidation(form);
        setShowModal(false);
        setForm({
            hypothesis: '', experiment: '', testDesign: '', testCost: '$0',
            result: '', signalStrength: 'Medium', decision: 'Pivot',
            status: 'Validating', learning: ''
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Validated': return 'text-success bg-success/10 border-success/20';
            case 'Invalidated': return 'text-danger bg-danger/10 border-danger/20';
            case 'Validating': return 'text-warning bg-warning/10 border-warning/20';
            default: return 'text-muted bg-white/5 border-white/10';
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-accent-dim p-6 rounded-2xl border border-accent/20">
                <div>
                    <h1 className="text-3xl mb-1 font-display">Riskiest Assumption Tracker</h1>
                    <p className="text-sm text-muted">Kill ideas fast by testing the hardest assumptions first. Velocity {'>'} Perfection.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> New Assumption Test
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {state.validations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/5 rounded-2xl bg-white/2">
                        <FileSearch size={48} className="text-muted mb-4 opacity-20" />
                        <p className="text-muted italic">No experiments logged. High risk detected.</p>
                    </div>
                ) : (
                    state.validations.map(val => (
                        <div key={val.id} className="card p-8 group hover:border-accent/40 transition-all flex flex-col gap-6 border-l-4" style={{ borderLeftColor: val.status === 'Validated' ? 'var(--success)' : val.status === 'Invalidated' ? 'var(--danger)' : 'var(--warning)' }}>
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(val.status)}`}>{val.status}</span>
                                        <h3 className="m-0 text-xl font-display">Assumption: {val.hypothesis}</h3>
                                    </div>
                                    <p className="text-xs text-muted font-mono mt-1 uppercase tracking-widest">Test Design: {val.testDesign} • Budget: {val.testCost}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-lg font-bold text-sm border flex items-center gap-2 ${val.decision === 'Go' ? 'text-success bg-success/10 border-success/20' : val.decision === 'Stop' ? 'text-danger bg-danger/10 border-danger/20' : 'text-warning bg-warning/10 border-warning/20'}`}>
                                    {val.decision === 'Go' ? <CheckCircle size={14} /> : val.decision === 'Stop' ? <XCircle size={14} /> : <TrendingUp size={14} />}
                                    Decision: {val.decision}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">Experiment Run</span>
                                    <p className="text-sm text-muted leading-relaxed italic">"{val.experiment}"</p>
                                </div>
                                <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                                    <span className="text-[10px] font-bold text-warning uppercase tracking-widest block mb-2">Hard Data Result</span>
                                    <p className="text-sm text-main font-semibold">{val.result || "Awaiting outcome..."}</p>
                                </div>
                                <div className="bg-success/5 p-5 rounded-xl border border-success/10">
                                    <span className="text-[10px] font-bold text-success uppercase tracking-widest block mb-2">Core Learning / Insight</span>
                                    <p className="text-sm text-success/80">{(val as any).learning || "Log insights after experiment completion."}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-tighter pt-4 border-t border-white/5">
                                <span className="flex items-center gap-2">Signal Strength: <span className={val.signalStrength === 'High' ? 'text-success' : val.signalStrength === 'Low' ? 'text-danger' : 'text-warning'}>{val.signalStrength}</span></span>
                                <span className="flex items-center gap-2">Velocity: High-Priority</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
                    <div className="bg-card w-full max-w-2xl rounded-2xl border border-white/10 p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-display mb-1">Architect Validation Test</h2>
                                <p className="text-sm text-muted">Define the fastest way to prove this assumption WRONG.</p>
                            </div>
                            <button className="text-muted hover:text-white bg-white/5 p-2 rounded-full" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Core Hypothesis
                                <textarea rows={2} required value={form.hypothesis} onChange={e => setForm({ ...form, hypothesis: e.target.value })} placeholder="e.g. Real estate agents will pay for $300/mo automated drones" className="bg-white/5" />
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Test Design (MVP)
                                    <input required value={form.testDesign} onChange={e => setForm({ ...form, testDesign: e.target.value })} placeholder="Fake door, LOI, Concierge..." className="bg-white/5" />
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Test Cost / Duration
                                    <input required value={form.testCost} onChange={e => setForm({ ...form, testCost: e.target.value })} placeholder="$100 / 48 hours" className="bg-white/5" />
                                </label>
                            </div>

                            <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Experiment Execution Details
                                <textarea rows={2} required value={form.experiment} onChange={e => setForm({ ...form, experiment: e.target.value })} placeholder="Launched FB ads to a Carrd page with 'Reserve' button..." className="bg-white/5" />
                            </label>

                            <div className="grid grid-cols-3 gap-4">
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Current Status
                                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className="bg-white/5">
                                        <option>Pending</option><option>Validating</option><option>Validated</option><option>Invalidated</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Signal Strength
                                    <select value={form.signalStrength} onChange={e => setForm({ ...form, signalStrength: e.target.value as any })} className="bg-white/5">
                                        <option>High</option><option>Medium</option><option>Low</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Strategic Decision
                                    <select value={form.decision} onChange={e => setForm({ ...form, decision: e.target.value as any })} className="bg-white/5">
                                        <option>Go</option><option>Pivot</option><option>Stop</option>
                                    </select>
                                </label>
                            </div>

                            <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Hard Data Result (Raw numbers)
                                <input value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} placeholder="12 email signups from 50 clicks (24%)" className="bg-white/5" />
                            </label>

                            <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">Learning / Pivot Insight
                                <textarea rows={2} value={form.learning} onChange={e => setForm({ ...form, learning: e.target.value })} placeholder="What did you learn that changed your mind?" className="bg-white/5" />
                            </label>

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" className="btn btn-secondary px-10 py-3" onClick={() => setShowModal(false)}>Discard Log</button>
                                <button type="submit" className="btn btn-primary px-10 py-3 font-bold bg-white text-black">Commit to Risk Ledger</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const Plus = ({ size }: { size: number }) => <span style={{ width: size, height: size }} className="inline-block border rounded flex items-center justify-center">+</span>
