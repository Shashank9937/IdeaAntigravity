import { useStore } from '../store';
import { ShieldAlert, CheckCircle2, TrendingUp, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
    const { state } = useStore();

    const activeIdea = state.ideas.find(i => i.status === 'Active') || state.ideas[0] || null;
    const activeIdeaTitle = activeIdea ? activeIdea.title : "No strategic bet active.";

    const topIdeas = [...state.ideas].sort((a, b) => b.iceScore - a.iceScore).slice(0, 5);

    // Simple Velocity Calculation
    const weeklyVelocity = state.executionHistory.slice(-4).reduce((acc, curr) => acc + curr.tasksCompleted, 0);
    const velocityTrend = weeklyVelocity > 10 ? 'Accelerating' : 'Stable';

    return (
        <div className="flex flex-col gap-8">
            {/* Command Header */}
            <div className="card p-8 bg-accent text-black border-none relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <Target size={300} />
                </div>
                <div className="relative z-10 flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Strategic Command</span>
                        <h1 className="text-4xl font-display mb-2">North Star: {activeIdeaTitle}</h1>
                        <div className="flex gap-4">
                            <span className="px-3 py-1 bg-black/20 rounded-full text-xs font-bold border border-black/10">Target: ₹100Cr ARR</span>
                            <span className="px-3 py-1 bg-black/20 rounded-full text-xs font-bold border border-black/10">Deadline: 18 Months</span>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Execution Velocity</span>
                        <div className="text-5xl font-display font-bold leading-none">{weeklyVelocity}</div>
                        <span className="text-[10px] font-bold uppercase mt-1">Actions / month • {velocityTrend}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Market Intensity', val: `${state.pains.length} Pains`, icon: <ShieldAlert size={16} />, color: 'var(--accent)' },
                    { label: 'Strategic Bets', val: `${state.ideas.length} Drafts`, icon: <Zap size={16} />, color: 'var(--warning)' },
                    { label: 'Risk Validated', val: `${state.validations.filter(v => v.status === 'Validated').length} Tests`, icon: <CheckCircle2 size={16} />, color: 'var(--success)' },
                    { label: 'Peak ICE', val: topIdeas[0]?.iceScore || 0, icon: <TrendingUp size={16} />, color: 'var(--accent)' }
                ].map((stat, i) => (
                    <div key={i} className="card p-5 bg-white/5 border-white/5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                            {stat.icon} {stat.label}
                        </div>
                        <div className="text-2xl font-display font-bold" style={{ color: stat.color }}>{stat.val}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Opportunity Heatmap */}
                <div className="lg:col-span-2 card p-8 bg-black/40 border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                            <Zap size={18} /> Opportunity Heatmap
                        </h3>
                        <span className="text-[10px] text-muted font-bold uppercase tracking-tighter">Ranking by ICE & Unicorn Score</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {topIdeas.map((idea, idx) => (
                            <Link to="/ideas" key={idea.id} className="group p-5 bg-white/2 hover:bg-white/5 border border-white/5 rounded-xl flex items-center gap-6 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center font-display font-bold text-accent border border-white/10">{idx + 1}</div>
                                <div className="flex-1">
                                    <h4 className="text-base font-bold m-0 group-hover:text-accent transition-colors">{idea.title}</h4>
                                    <p className="text-xs text-muted font-mono uppercase tracking-widest mt-0.5">{idea.industry || 'Tech'}</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[8px] font-bold text-muted uppercase">ICE</span>
                                        <span className="text-sm font-bold">{idea.iceScore}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[8px] font-bold text-muted uppercase">Unicorn</span>
                                        <span className={`text-sm font-bold ${idea.scalabilityIndex?.total >= 40 ? 'text-success' : 'text-main'}`}>
                                            {idea.scalabilityIndex?.total || 0}
                                        </span>
                                    </div>
                                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                                    <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded text-[10px] font-bold text-accent group-hover:bg-accent group-hover:text-black transition-all">ANALYZE</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sprints & Velocity */}
                <div className="card p-8 bg-white/2 border-white/5 flex flex-col gap-8">
                    <h3 className="text-sm font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-success" /> Velocity Tracker
                    </h3>

                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-4xl font-display font-bold text-success">{weeklyVelocity}</span>
                                <span className="text-[10px] font-bold text-muted uppercase">Actions Completed (L4W)</span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-success">+{Math.round(weeklyVelocity * 0.1)}%</span>
                                <p className="text-[10px] text-muted uppercase font-bold">MoM Growth</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Sprint Buffer</h4>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-success transition-all duration-1000 shadow-[0_0_15px_var(--success)]" style={{ width: '65%' }}></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-muted uppercase">
                                <span>65 tasks done</span>
                                <span>35 remaining</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                        <Link to="/ideas" className="btn btn-primary w-full py-4 text-xs font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-accent-dim">Launch Risk Test</Link>
                        <Link to="/pain-mining" className="btn btn-secondary w-full py-4 text-xs font-black uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 border-white/10">Scan Pain Market</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
