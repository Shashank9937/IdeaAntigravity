import { useStore } from '../store';
import { PlayCircle, ShieldAlert, CheckCircle2, TrendingUp, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
    const { state } = useStore();

    const activeIdea = state.ideas.find(i => i.status === 'Active') || state.ideas[0] || null;
    const activeIdeaTitle = activeIdea ? activeIdea.title : "No active idea. Start exploring.";

    const topIdeas = [...state.ideas].sort((a, b) => b.iceScore - a.iceScore).slice(0, 3);

    const totalTasks = state.sprintTasks.length;
    const completedTasks = state.sprintTasks.filter(t => t.completed).length;
    const sprintProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="flex flex-col gap-6">

            {/* North Star */}
            <div className="card border p-6 flex items-center justify-between" style={{ backgroundColor: 'var(--accent-dim)', borderColor: 'var(--accent)' }}>
                <div>
                    <h2 className="text-xl font-bold text-accent mb-1 flex items-center gap-2"><Target size={24} /> CURRENT FOCUS</h2>
                    <p className="text-lg text-main font-medium">{activeIdeaTitle}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-accent">NORTH STAR METRIC</p>
                    <p className="text-3xl font-bold">100 Beta Users</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="card p-4">
                    <p className="stat-label flex items-center gap-1"><Zap size={16} /> Ideas Logged</p>
                    <p className="stat-value">{state.ideas.length}</p>
                </div>
                <div className="card p-4">
                    <p className="stat-label flex items-center gap-1"><ShieldAlert size={16} /> Pains Mined</p>
                    <p className="stat-value">{state.pains.length}</p>
                </div>
                <div className="card p-4">
                    <p className="stat-label flex items-center gap-1"><CheckCircle2 size={16} /> Validation Tests</p>
                    <p className="stat-value">{state.validations.length}</p>
                </div>
                <div className="card p-4">
                    <p className="stat-label flex items-center gap-1"><TrendingUp size={16} /> ICE Top Score</p>
                    <p className="stat-value">{topIdeas[0]?.iceScore || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="flex items-center gap-2 mb-4"><PlayCircle size={20} /> 30-Day Sprint Progress</h3>
                    <div className="w-full bg-[#222] rounded-full h-3 mb-2">
                        <div className="bg-accent h-3 rounded-full" style={{ width: `${sprintProgress}%` }}></div>
                    </div>
                    <p className="text-right text-sm font-bold text-accent">{sprintProgress}% Complete</p>

                    <div className="mt-6">
                        <h4 className="text-sm text-muted mb-3 font-semibold text-uppercase uppercase">Critical Tasks Remaining</h4>
                        <div className="flex flex-col gap-2">
                            {state.sprintTasks.filter(t => !t.completed).slice(0, 5).map(task => (
                                <div key={task.id} className="flex items-center gap-2 text-sm bg-bg-hover p-2 rounded-md">
                                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                                    <span>{task.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="flex items-center gap-2 mb-4"><Zap size={20} /> Top 3 Ideas by ICE Score</h3>
                    <div className="flex flex-col gap-3">
                        {topIdeas.map(idea => (
                            <div key={idea.id} className="p-3 border rounded-md flex justify-between items-center bg-bg-hover">
                                <div>
                                    <p className="font-bold">{idea.title}</p>
                                    <p className="text-xs text-muted">{idea.problem}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="badge badge-primary">ICE: {idea.iceScore}</span>
                                    <Link to="/ideas" className="text-muted hover:text-white">Review &gt;</Link>
                                </div>
                            </div>
                        ))}
                        {topIdeas.length === 0 && <p className="text-muted text-sm">No ideas evaluated yet. Head to Idea Log.</p>}
                    </div>
                    <div className="mt-6 flex gap-2">
                        <Link to="/pain-mining" className="btn btn-secondary flex-1">Mine Pain</Link>
                        <Link to="/ideas" className="btn btn-primary flex-1">+ New Idea</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
