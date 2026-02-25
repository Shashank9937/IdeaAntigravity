import { useState } from 'react';
import { useStore } from '../store';
import { ShieldAlert, Trash2 } from 'lucide-react';

export function AntiPattern() {
    const { state, addAntiPattern } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        idea: 'Dog Walking App with AI mapping', reason: 'Too saturated. Rover owns the market. Differentiation is pure technical fluff.',
        lesson: 'Never build AI features just to sound cool if the core pain is trust.', pattern: 'Building vitamins instead of painkillers.'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addAntiPattern(form);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Anti-Pattern Memory System</h1>
                    <p className="text-muted">Avoid repeating the same mistakes. Log bad ideas and failed models here.</p>
                </div>
                <button className="btn btn-danger" onClick={() => setShowModal(true)}>
                    <Trash2 size={16} /> Log Failure
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.antiPatterns.map(ap => (
                    <div key={ap.id} className="card p-6 bg-[#0a0505] border-danger/30">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-danger/20 flex items-center justify-center text-danger shrink-0"><ShieldAlert size={24} /></div>
                            <div>
                                <h3 className="m-0 text-danger">{ap.idea}</h3>
                                <span className="text-xs uppercase tracking-wider font-bold text-muted bg-[#222] px-2 py-1 rounded">Pattern: {ap.pattern}</span>
                            </div>
                        </div>

                        <div className="pl-16 flex flex-col gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase text-muted mb-1">Why it was rejected / failed</p>
                                <p className="text-sm text-main">{ap.reason}</p>
                            </div>
                            <div className="bg-danger/10 p-3 border-l-2 border-danger rounded-r-md">
                                <p className="text-xs font-bold uppercase text-danger mb-1">Core Lesson Learned</p>
                                <p className="text-sm font-bold text-main">"{ap.lesson}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border-danger w-full max-w-lg rounded-xl p-6 shadow-[0_0_30px_rgba(255,69,58,0.2)]">
                        <h2 className="text-xl font-bold mb-6 text-danger">Log Anti-Pattern</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label className="flex flex-col gap-1 text-sm font-medium">Original Idea
                                <input required value={form.idea} onChange={e => setForm({ ...form, idea: e.target.value })} />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Why it failed / Why you killed it
                                <textarea rows={2} required value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Core Lesson
                                <textarea rows={2} required value={form.lesson} onChange={e => setForm({ ...form, lesson: e.target.value })} />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-medium">Identified Pattern
                                <select value={form.pattern} onChange={e => setForm({ ...form, pattern: e.target.value })}>
                                    <option>Building vitamins instead of painkillers</option>
                                    <option>Solving a problem nobody pays for</option>
                                    <option>Relying on platform algorithms</option>
                                    <option>Feature creep without validation</option>
                                    <option>Target persona has zero budget</option>
                                    <option>Too complex to explain in 1 sentence</option>
                                    <option>Other</option>
                                </select>
                            </label>

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-danger hover:bg-danger hover:text-white">Save Pattern</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
