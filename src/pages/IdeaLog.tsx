import { useState } from 'react';
import { useStore } from '../store';
import { Plus, SortDesc, Zap, Link2 } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
    "🌱 Seed": "badge-warning",
    "🔍 Exploring": "badge-primary",
    "✅ Active": "badge-success",
    "⏸ Paused": "badge",
    "❌ Dropped": "badge-danger",
    "💡 Revisit": "badge-warning"
};

export function IdeaLog() {
    const { state, addIdea } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('All');

    const [form, setForm] = useState({
        title: '', description: '', problem: '', persona: '', differentiation: '',
        status: '🌱 Seed', impact: 5, confidence: 5, ease: 5,
        killCriteria: '', swot: '', riskiestAssumption: '', validationPlan: '',
        monetization: '', marketSize: '', notes: '', painIds: [] as string[]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addIdea(form);
        setShowModal(false);
    };

    const ideas = filter === 'All' ? state.ideas : state.ideas.filter(i => i.status === filter);
    const sortedIdeas = [...ideas].sort((a, b) => b.iceScore - a.iceScore);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Idea Database</h1>
                    <p className="text-muted">Track, evaluate, and prioritize ruthlessly using ICE frameworks.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> New Idea
                </button>
            </div>

            <div className="flex gap-2">
                {['All', '🌱 Seed', '🔍 Exploring', '✅ Active', '⏸ Paused', '❌ Dropped', '💡 Revisit'].map(f => (
                    <button
                        key={f}
                        className={`btn btn-secondary text-xs py-1 ${filter === f ? 'bg-bg-hover text-white border-white' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
                <button className="btn btn-secondary text-xs py-1 ml-auto"><SortDesc size={14} /> ICE Score</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sortedIdeas.map(idea => (
                    <div key={idea.id} className="card p-5 group transition-colors hover:border-accent">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-3 items-center">
                                <h3 className="text-lg m-0">{idea.title}</h3>
                                <span className={`badge ${STATUS_COLORS[idea.status]}`}>{idea.status}</span>
                            </div>
                            <div className="bg-bg-main border px-3 py-1 flex items-center gap-2 rounded-lg group-hover:bg-accent-dim group-hover:border-accent group-hover:text-accent transition-all cursor-pointer">
                                <span className="text-xs font-bold font-mono tracking-widest text-muted">ICE</span>
                                <span className="font-bold">{idea.iceScore}</span>
                            </div>
                        </div>

                        <p className="text-main mb-4 font-medium">{idea.description}</p>

                        <div className="grid grid-cols-3 gap-6 text-sm">
                            <div className="bg-[#151515] p-3 rounded border">
                                <p className="font-bold text-accent mb-1 text-xs uppercase">The Problem</p>
                                <p className="text-muted">{idea.problem}</p>
                            </div>
                            <div className="bg-[#151515] p-3 rounded border">
                                <p className="font-bold text-accent mb-1 text-xs uppercase">Target Persona</p>
                                <p className="text-muted">{idea.persona}</p>
                            </div>
                            <div className="bg-[#151515] p-3 rounded border">
                                <p className="font-bold text-accent mb-1 text-xs uppercase">Riskiest Assumption</p>
                                <p className="text-muted">{idea.riskiestAssumption}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-4 text-xs text-muted items-center">
                            <span className="flex gap-1 items-center"><Zap size={14} className="text-accent" /> I: {idea.impact} / C: {idea.confidence} / E: {idea.ease}</span>
                            <span className="flex gap-1 items-center"><Link2 size={14} /> {idea.painIds.length} Pains Linked</span>
                            <button className="btn btn-secondary ml-auto text-xs py-1">View Details</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm pt-20 pb-20">
                    <div className="bg-card w-full max-w-3xl rounded-lg border p-6 my-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="m-0">Log New Idea</h2>
                            <button className="text-muted hover:text-white" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium col-span-2">Idea Title
                                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Sales CRM for Plumbers" />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium col-span-2">One-Line Pitch
                                    <input required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="A highly simplified mobile-first CRM that operates primarily via SMS." />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Core Problem Solved
                                    <textarea rows={2} required value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} placeholder="Plumbers lose leads because they are covered in grease and can't use desktop software." />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Differentiation (The Hook)
                                    <textarea rows={2} required value={form.differentiation} onChange={e => setForm({ ...form, differentiation: e.target.value })} placeholder="100% voice and SMS based data entry." />
                                </label>
                            </div>

                            <div className="bg-[#151515] p-4 border rounded-lg">
                                <h3 className="text-sm font-bold text-accent mb-3 uppercase tracking-wider">ICE Framework Evaluation</h3>
                                <div className="grid grid-cols-3 gap-6">
                                    <label className="flex flex-col gap-1 text-sm font-medium text-center">Impact (1-10)
                                        <input type="range" min="1" max="10" value={form.impact} onChange={e => setForm({ ...form, impact: +e.target.value })} />
                                        <span className="font-mono text-accent text-lg">{form.impact}</span>
                                    </label>
                                    <label className="flex flex-col gap-1 text-sm font-medium text-center">Confidence (1-10)
                                        <input type="range" min="1" max="10" value={form.confidence} onChange={e => setForm({ ...form, confidence: +e.target.value })} />
                                        <span className="font-mono text-accent text-lg">{form.confidence}</span>
                                    </label>
                                    <label className="flex flex-col gap-1 text-sm font-medium text-center">Ease (1-10)
                                        <input type="range" min="1" max="10" value={form.ease} onChange={e => setForm({ ...form, ease: +e.target.value })} />
                                        <span className="font-mono text-accent text-lg">{form.ease}</span>
                                    </label>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-xs text-muted uppercase tracking-wider">Calculated ICE Score</p>
                                    <p className="text-3xl font-bold font-mono text-white">{Math.round((form.impact + form.confidence + form.ease) / 3)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1 text-sm font-medium">Riskiest Assumption
                                    <input required value={form.riskiestAssumption} onChange={e => setForm({ ...form, riskiestAssumption: e.target.value })} placeholder="Will they pay $50/mo for a text bot?" />
                                </label>
                                <label className="flex flex-col gap-1 text-sm font-medium">Kill Criteria
                                    <input required value={form.killCriteria} onChange={e => setForm({ ...form, killCriteria: e.target.value })} placeholder="If we don't get 5 paying LOIs in 2 weeks." />
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Idea to Protocol</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
