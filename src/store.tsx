import React, { createContext, useContext, useEffect, useState } from 'react';

// --- TYPES ---
export interface PainEntry {
    id: string; topic: string; platform: string; complaint: string;
    intensity: number; frequency: number; target: string; workaround: string;
    opportunityScore: number;
}
export interface IdeaEntry {
    id: string; title: string; description: string; problem: string; persona: string;
    differentiation: string; status: string;
    impact: number; confidence: number; ease: number; iceScore: number;
    killCriteria: string; swot: string; riskiestAssumption: string;
    validationPlan: string; monetization: string; marketSize: string; notes: string;
    painIds: string[];
}
export interface PersonaEntry {
    id: string; name: string; role: string; industry: string; budget: string;
    workflow: string; primaryPain: string; secondaryPains: string;
    tried: string; failedWhy: string; triggers: string; objections: string; where: string;
}
export interface CompetitorEntry {
    id: string; name: string; url: string; audience: string; pricing: string;
    strengths: string; weaknesses: string; complaints: string; positioning: string; gap: string;
    complexity: number; // 0-100 for 2x2 map
    premium: number; // 0-100 for 2x2 map
}
export interface SprintTask {
    id: string; week: number; text: string; completed: boolean;
}
export interface ValidationEntry {
    id: string; hypothesis: string; experiment: string; result: string;
    signalStrength: string; decision: string;
}
export interface AntiPatternEntry {
    id: string; idea: string; reason: string; lesson: string; pattern: string;
}
export interface TrendEntry {
    id: string; category: string; description: string; impact: string;
}
export interface DisciplineEntry {
    id: string; date: string; deepWork: number; outreach: number; experiments: number;
    content: number; learning: number;
}
export interface AppState {
    pains: PainEntry[];
    ideas: IdeaEntry[];
    personas: PersonaEntry[];
    competitors: CompetitorEntry[];
    sprintTasks: SprintTask[];
    validations: ValidationEntry[];
    antiPatterns: AntiPatternEntry[];
    trends: TrendEntry[];
    discipline: DisciplineEntry[];
}

const defaultState: AppState = {
    pains: [], ideas: [], personas: [], competitors: [],
    sprintTasks: [
        { id: '1', week: 1, text: 'Run 10 validation interviews', completed: false },
        { id: '2', week: 2, text: 'Build MVP core feature', completed: false },
        { id: '3', week: 3, text: 'Launch to 100 beta users', completed: false },
        { id: '4', week: 4, text: 'Evaluate metrics and pivot/persevere', completed: false },
    ],
    validations: [], antiPatterns: [], trends: [], discipline: []
};

// --- INITIAL DATA OR LOAD FROM LOCAL STORAGE ---
function loadState(): AppState {
    try {
        const saved = localStorage.getItem('warRoomState');
        if (saved) return JSON.parse(saved);
    } catch (e) { }
    return defaultState;
}

export const generateId = () => Math.random().toString(36).substring(2, 9);

interface StoreContextType {
    state: AppState;
    updateState: (partial: Partial<AppState>) => void;
    addPain: (item: Omit<PainEntry, 'id' | 'opportunityScore'>) => void;
    addIdea: (item: Omit<IdeaEntry, 'id' | 'iceScore'>) => void;
    addPersona: (item: Omit<PersonaEntry, 'id'>) => void;
    addCompetitor: (item: Omit<CompetitorEntry, 'id'>) => void;
    addTask: (week: number, text: string) => void;
    toggleTask: (id: string) => void;
    addValidation: (item: Omit<ValidationEntry, 'id'>) => void;
    addAntiPattern: (item: Omit<AntiPatternEntry, 'id'>) => void;
    addTrend: (item: Omit<TrendEntry, 'id'>) => void;
    addDiscipline: (item: Omit<DisciplineEntry, 'id'>) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(loadState);

    useEffect(() => {
        localStorage.setItem('warRoomState', JSON.stringify(state));
    }, [state]);

    const updateState = (partial: Partial<AppState>) => {
        setState(s => ({ ...s, ...partial }));
    };

    const addPain = (item: Omit<PainEntry, 'id' | 'opportunityScore'>) => {
        const opportunityScore = item.intensity * item.frequency;
        const newPain = { ...item, id: generateId(), opportunityScore };
        updateState({ pains: [newPain, ...state.pains] });
    };

    const addIdea = (item: Omit<IdeaEntry, 'id' | 'iceScore'>) => {
        const iceScore = Math.round((item.impact + item.confidence + item.ease) / 3);
        const newIdea = { ...item, id: generateId(), iceScore };
        updateState({ ideas: [newIdea, ...state.ideas] });
    };

    const addPersona = (item: Omit<PersonaEntry, 'id'>) => {
        updateState({ personas: [{ ...item, id: generateId() }, ...state.personas] });
    };

    const addCompetitor = (item: Omit<CompetitorEntry, 'id'>) => {
        updateState({ competitors: [{ ...item, id: generateId() }, ...state.competitors] });
    };

    const addTask = (week: number, text: string) => {
        updateState({ sprintTasks: [...state.sprintTasks, { id: generateId(), week, text, completed: false }] });
    };

    const toggleTask = (id: string) => {
        updateState({
            sprintTasks: state.sprintTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        });
    };

    const addValidation = (item: Omit<ValidationEntry, 'id'>) => {
        updateState({ validations: [{ ...item, id: generateId() }, ...state.validations] });
    };

    const addAntiPattern = (item: Omit<AntiPatternEntry, 'id'>) => {
        updateState({ antiPatterns: [{ ...item, id: generateId() }, ...state.antiPatterns] });
    };

    const addTrend = (item: Omit<TrendEntry, 'id'>) => {
        updateState({ trends: [{ ...item, id: generateId() }, ...state.trends] });
    };

    const addDiscipline = (item: Omit<DisciplineEntry, 'id'>) => {
        updateState({ discipline: [{ ...item, id: generateId() }, ...state.discipline] });
    };

    return (
        <StoreContext.Provider value={{
            state, updateState, addPain, addIdea, addPersona, addCompetitor,
            addTask, toggleTask, addValidation, addAntiPattern, addTrend, addDiscipline
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStore = () => {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error("useStore must be inside StoreProvider");
    return ctx;
};
