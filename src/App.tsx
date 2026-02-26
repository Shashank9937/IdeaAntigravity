import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, BrainCircuit, Lightbulb, UserCircle,
    Swords, Calculator, LineChart, CalendarDays,
    Trash2, Activity, CheckSquare, Target,
    Zap, Rocket, Moon, Sun
} from 'lucide-react';
import { StoreProvider } from './store';

// Importing new pages
import { Dashboard } from './pages/Dashboard';
import { PainMining } from './pages/PainMining';
import { IdeaLog } from './pages/IdeaLog';
import { PersonaBuilder } from './pages/PersonaBuilder';
import { SprintPlanner } from './pages/SprintPlanner';
import { CompetitorBoard } from './pages/CompetitorBoard';
import { ValidationTracker } from './pages/ValidationTracker';
import { MarketSizing } from './pages/MarketSizing';
import { AntiPattern } from './pages/AntiPattern';
import { DisciplineTracker } from './pages/DisciplineTracker';
import { Monetization } from './pages/Monetization';
import { TrendRadar } from './pages/TrendRadar';

const NAV_ITEMS = [
    { path: '/', label: 'Overview Dashboard', icon: LayoutDashboard },
    { path: '/pain-mining', label: 'Pain Mining Lab', icon: BrainCircuit },
    { path: '/ideas', label: 'Idea Log Engine', icon: Lightbulb },
    { path: '/persona', label: 'Customer Persona', icon: UserCircle },
    { path: '/competitors', label: 'Competitor Intel', icon: Swords },
    { path: '/market-size', label: 'Market Sizing', icon: Calculator },
    { path: '/monetization', label: 'Monetization Model', icon: LineChart },
    { path: '/sprint', label: '30-Day Sprint Plan', icon: CalendarDays },
    { path: '/validation', label: 'Validation Tracker', icon: CheckSquare },
    { path: '/anti-patterns', label: 'Anti-Pattern File', icon: Trash2 },
    { path: '/trends', label: 'Trend Radar', icon: Activity },
    { path: '/discipline', label: 'Discipline Tracker', icon: Target },
];

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return !document.documentElement.classList.contains('light');
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-hover transition-colors text-muted hover:text-main flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}

function Sidebar() {
    const location = useLocation();

    return (
        <nav className="sidebar p-0 flex flex-col items-stretch">
            <div className="px-6 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#888] text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Rocket size={20} />
                </div>
                <div>
                    <span className="font-bold tracking-widest text-sm block">FOUNDER</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted block">War Room</span>
                </div>
            </div>

            <div className="flex-col gap-1 flex flex-1 overflow-y-auto w-full px-2">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item rounded-lg py-2.5 px-4 mb-0.5 w-full mx-0.5 ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={18} className={isActive ? 'text-accent' : 'text-muted'} />
                            {item.label}
                        </Link>
                    )
                })}
            </div>

            <div className="px-4 mt-6">
                <div className="p-5 rounded-xl bg-card border shadow-inner text-xs text-muted">
                    <p className="font-bold text-main uppercase tracking-wider mb-2">Operating Velocity</p>
                    <div className="flex gap-2">
                        <span className="flex-1 bg-main text-center py-2 rounded font-mono text-accent">V_1.0.0</span>
                        <span className="flex-1 bg-main text-center py-2 rounded font-mono text-success flex items-center justify-center gap-1"><Zap size={10} />LIVE</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function MainLayout() {
    const location = useLocation();
    const currentPathName = NAV_ITEMS.find(i => i.path === location.pathname)?.label || 'War Room';

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content relative">

                <header className="header justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-main m-0">{currentPathName}</h2>
                        <p className="text-sm text-muted font-mono mt-1 w-full truncate max-w-[200px] sm:max-w-none">
                            /shashank/hq{location.pathname}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <div className="badge badge-warning flex items-center gap-1">
                            <Target size={12} /> EXECUTE
                        </div>
                    </div>
                </header>

                <main className="content-container">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/pain-mining" element={<PainMining />} />
                        <Route path="/ideas" element={<IdeaLog />} />
                        <Route path="/persona" element={<PersonaBuilder />} />
                        <Route path="/competitors" element={<CompetitorBoard />} />
                        <Route path="/market-size" element={<MarketSizing />} />
                        <Route path="/monetization" element={<Monetization />} />
                        <Route path="/sprint" element={<SprintPlanner />} />
                        <Route path="/validation" element={<ValidationTracker />} />
                        <Route path="/anti-patterns" element={<AntiPattern />} />
                        <Route path="/trends" element={<TrendRadar />} />
                        <Route path="/discipline" element={<DisciplineTracker />} />
                    </Routes>
                </main>

                <footer className="w-full border-t flex items-center justify-between p-6 mt-auto text-xs text-muted">
                    <div className="flex gap-4">
                        <span>&copy; {new Date().getFullYear()} FOUNDER OS</span>
                        <span className="hidden sm:inline">|</span>
                        <span className="hidden sm:inline px-2">System V_1.0.0</span>
                    </div>
                    <div className="flex gap-4 uppercase font-semibold">
                        <a href="#" className="hover:text-white transition-colors">Documentation</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}

function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App
