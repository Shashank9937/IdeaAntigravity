import { useState } from 'react';
import { useStore } from '../store';
import { UserCircle2, ArrowRight } from 'lucide-react';

export function PersonaBuilder() {
    const { state, addPersona } = useStore();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: 'Exhausted Ed', role: 'Head of Sales', industry: 'B2B SaaS',
        budget: '$500/mo', workflow: 'Spends 3 hours a day cross-referencing Salesforce with ZoomInfo.',
        primaryPain: 'Data decay in CRM leading to bounced emails and lost reps time.',
        secondaryPains: 'SDR churn is high, onboarding takes 3 months.',
        tried: 'ZoomInfo, Apollo, LeadIQ',
        failedWhy: 'Too expensive, reps forget to push to Salesforce.',
        triggers: 'End of quarter missed quota.',
        objections: 'We already use X, too hard to migrate.',
        where: 'LinkedIn Sales Navigator groups, r/sales.'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPersona(form);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Customer Persona Engine</h1>
                    <p className="text-muted">Generate exact positioning and messaging based on extreme clarity of who you serve.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    New Persona
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {state.personas.map(p => (
                    <div key={p.id} className="card p-0 overflow-hidden flex flex-col md:flex-row shadow-lg">
                        <div className="bg-[#111] p-6 border-r md:w-1/3 flex flex-col gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full bg-accent text-bg-main flex items-center justify-center"><UserCircle2 size={24} /></div>
                                <div>
                                    <h3 className="m-0 leading-tight">{p.name}</h3>
                                    <p className="text-sm font-mono text-muted">{p.role} · {p.industry}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs uppercase text-muted font-bold tracking-wider mb-1">Where to find them</p>
                                <p className="text-sm border-l-2 border-accent pl-2">{p.where}</p>
                            </div>

                            <div>
                                <p className="text-xs uppercase text-muted font-bold tracking-wider mb-1">Buying Triggers</p>
                                <p className="text-sm border-l-2 border-warning pl-2">{p.triggers}</p>
                            </div>

                            <div>
                                <p className="text-xs uppercase text-muted font-bold tracking-wider mb-1">Failed Workarounds</p>
                                <p className="text-sm border-l-2 border-danger pl-2">{p.tried} — {p.failedWhy}</p>
                            </div>
                        </div>

                        <div className="p-6 md:w-2/3 bg-card flex flex-col justify-between">
                            <div>
                                <h4 className="text-accent mb-2 flex items-center gap-2"><ArrowRight size={16} /> The Primary Pain</h4>
                                <p className="text-lg bg-[#1a1a1a] p-4 rounded-md border border-[#333] mb-6">"{p.primaryPain}"</p>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="text-sm text-muted mb-2">Secondary Pains</h4>
                                        <p className="text-sm">{p.secondaryPains}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-muted mb-2">Daily Workflow</h4>
                                        <p className="text-sm">{p.workflow}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto border-t border-[#333] pt-4">
                                <h4 className="text-xs text-muted mb-2 uppercase tracking-wider font-bold">Auto-Generated Positioning Statement</h4>
                                <p className="text-sm italic text-main">
                                    "For <strong>{p.role}s</strong> in <strong>{p.industry}</strong> who struggle with <strong>{p.primaryPain.toLowerCase()}</strong>, our product helps them achieve their goals without <strong>{p.failedWhy.toLowerCase()}</strong> unlike <strong>{p.tried}</strong>."
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {state.personas.length === 0 && <p className="text-muted italic">Build your first persona to unlock positioning formulas.</p>}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-card w-full max-w-2xl rounded-lg border p-6 my-auto">
                        <h2>Compile Target Persona</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Persona Name (e.g. Sales Sam)
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Role & Industry
                                    <div className="flex gap-2">
                                        <input className="w-1/2" required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Role" />
                                        <input className="w-1/2" required value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="Industry" />
                                    </div>
                                </label>
                            </div>
                            <label className="flex flex-col gap-1 text-sm font-medium">Primary Pain Point
                                <textarea rows={2} required value={form.primaryPain} onChange={e => setForm({ ...form, primaryPain: e.target.value })} />
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">What have they tried?
                                    <input required value={form.tried} onChange={e => setForm({ ...form, tried: e.target.value })} placeholder="Competitors, Excel, etc." />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Why did it fail?
                                    <input required value={form.failedWhy} onChange={e => setForm({ ...form, failedWhy: e.target.value })} />
                                </label>
                            </div>
                            <label className="flex flex-col gap-1 text-sm font-medium">Where do they hang out online?
                                <input required value={form.where} onChange={e => setForm({ ...form, where: e.target.value })} />
                            </label>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Generate Persona</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
