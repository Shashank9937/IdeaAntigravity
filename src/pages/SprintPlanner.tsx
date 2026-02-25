import { useState } from 'react';
import { useStore } from '../store';
import { CalendarDays, CheckCircle2, Circle } from 'lucide-react';

export function SprintPlanner() {
    const { state, addTask, toggleTask } = useStore();
    const [newTask, setNewTask] = useState('');
    const [selectedWeek, setSelectedWeek] = useState(1);

    const calculateProgress = (week: number) => {
        const tasks = state.sprintTasks.filter(t => t.week === week);
        if (!tasks.length) return 0;
        return Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            addTask(selectedWeek, newTask.trim());
            setNewTask('');
        }
    };

    const weeks = [
        { num: 1, title: 'Week 1: Validate', focus: 'Talk to 10 users, test risky assumptions.' },
        { num: 2, title: 'Week 2: Build', focus: 'Build ugly MVP. Only absolute core value.' },
        { num: 3, title: 'Week 3: Launch', focus: 'Onboard 10-50 beta testers. Get feedback.' },
        { num: 4, title: 'Week 4: Iterate', focus: 'Fix major bugs. Decide Go/Pivot/Stop.' }
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>30-Day Execution Sprint</h1>
                    <p className="text-muted">No fluff. Just a step-by-step march to $1 Revenue.</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
                {weeks.map(w => (
                    <div key={w.num}
                        className={`card p-4 transition-all cursor-pointer ${selectedWeek === w.num ? 'border-accent shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'opacity-70 hover:opacity-100'}`}
                        onClick={() => setSelectedWeek(w.num)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm uppercase tracking-wider font-bold m-0">{w.title}</h3>
                            <span className="text-xs font-mono font-bold text-accent">{calculateProgress(w.num)}%</span>
                        </div>
                        <div className="w-full bg-[#222] rounded-full h-1 mb-3">
                            <div className="bg-accent h-1 rounded-full transition-all" style={{ width: `${calculateProgress(w.num)}%` }}></div>
                        </div>
                        <p className="text-xs text-muted leading-tight">{w.focus}</p>
                    </div>
                ))}
            </div>

            <div className="card p-6 border-accent bg-[#0d0d0d]">
                <h2 className="mb-6 flex items-center gap-2 border-b border-[#222] pb-4">
                    <CalendarDays size={20} /> Sprint Log - Week {selectedWeek}
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                    {state.sprintTasks.filter(t => t.week === selectedWeek).map(task => (
                        <div
                            key={task.id}
                            className={`flex items-center gap-3 p-3 rounded-md transition-all border border-[#222] bg-[#151515] cursor-pointer hover:bg-[#1a1a1a] ${task.completed ? 'opacity-50 line-through' : ''}`}
                            onClick={() => toggleTask(task.id)}
                        >
                            <button className="text-accent focus:outline-none shrink-0 mt-0.5">
                                {task.completed ? <CheckCircle2 size={18} className="text-success" /> : <Circle size={18} />}
                            </button>
                            <span className="text-sm font-medium">{task.text}</span>
                        </div>
                    ))}
                    {state.sprintTasks.filter(t => t.week === selectedWeek).length === 0 && (
                        <p className="text-center text-muted italic p-4">No tasks set for Week {selectedWeek}. Prepare your execution plan.</p>
                    )}
                </div>

                <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                        className="flex-1 bg-black border border-[#333] pl-4 py-2 text-sm rounded-md"
                        placeholder={`Add a high-leverage task for Week ${selectedWeek}...`}
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary whitespace-nowrap">Add Task</button>
                </form>
            </div>
        </div>
    )
}
