import React, { createContext, useContext, useEffect, useState } from 'react';

// --- TYPES ---
export interface PainEntry {
    id: string; topic: string; platform: string; complaint: string;
    intensity: number; frequency: number; actionability: number; // 1-10
    competition: number; // 1-10 (Numeric value for Competition Density)
    marketSizeTag: 'Small' | 'Medium' | 'Large';
    target: string; workaround: string;
    opportunityScore: number;
}

export interface FounderFit {
    leverageAssets: number; // 0 or 1
    visionAlign: number; // 0 or 1
    build30Days: number; // 0 or 1
    compoundPotential: number; // 0 or 1
    score: number;
    isMisaligned: boolean;
}

export interface MarketCalculations {
    customerCount: number;
    arpu: number;
    geoMultiplier: number;
    adoptionRate: number;
    tam: number;
    sam: number;
    som: number;
    projection3Year: number;
}

export interface IdeaEntry {
    id: string; title: string; description: string; problem: string; persona: string;
    differentiation: string; status: string;
    impact: number; confidence: number; ease: number; iceScore: number;
    killCriteria: string; swot: string; riskiestAssumption: string;
    validationPlan: string; monetization: string; marketSize: string; notes: string;
    painIds: string[];
    industry: string;
    founderFit: FounderFit;
    marketCalculations: MarketCalculations;
    scalabilityIndex: {
        marketSize: number;
        networkEffects: number;
        marginPotential: number;
        capitalEfficiency: number;
        defensibility: number;
        total: number;
    };
    secondOrderThinking: {
        successImpact: string;
        adjacentMarkets: string;
        networkEffects: string;
        platformExpandable: string;
        platformScore: number;
    };
    monetizationStress: {
        breakEvenCustomers: number;
        revAt100: number;
        revAt1000: number;
        churnImpact: string;
        acquisitionDifficulty: string;
    };
}

export interface PersonaEntry {
    id: string; name: string; role: string; industry: string; budget: string;
    workflow: string; primaryPain: string; secondaryPains: string;
    tried: string; failedWhy: string; triggers: string; objections: string; where: string;
}

export interface CompetitorEntry {
    id: string; name: string; url: string; audience: string; pricing: string;
    strengths: string; weaknesses: string; complaints: string; positioning: string; gap: string;
    complexity: number; // 0-100 for 2x2 map (Price vs Complexity)
    premium: number; // 0-100 for 2x2 map (Niche vs General)
}

export interface SprintTask {
    id: string; week: number; text: string; completed: boolean;
}

export interface ValidationEntry {
    id: string; hypothesis: string; experiment: string; result: string;
    signalStrength: string; decision: string;
    testDesign: string;
    testCost: string;
    status: 'Pending' | 'Validating' | 'Validated' | 'Invalidated';
    learning: string;
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

export interface ExecutionMetrics {
    week: string;
    ideasGenerated: number;
    ideasValidated: number;
    ideasKilled: number;
    mvpsLaunched: number;
    revenueExperiments: number;
    tasksCompleted: number;
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
    executionHistory: ExecutionMetrics[];
}

const defaultState: AppState = {
    pains: [], ideas: [], personas: [], competitors: [],
    sprintTasks: [
        { id: '1', week: 1, text: 'Run 10 validation interviews', completed: false },
        { id: '2', week: 2, text: 'Build MVP core feature', completed: false },
        { id: '3', week: 3, text: 'Launch to 100 beta users', completed: false },
        { id: '4', week: 4, text: 'Evaluate metrics and pivot/persevere', completed: false },
    ],
    validations: [], antiPatterns: [], trends: [], discipline: [],
    executionHistory: [
        { week: 'W1', ideasGenerated: 4, ideasValidated: 1, ideasKilled: 2, mvpsLaunched: 0, revenueExperiments: 0, tasksCompleted: 12 },
        { week: 'W2', ideasGenerated: 6, ideasValidated: 2, ideasKilled: 1, mvpsLaunched: 1, revenueExperiments: 0, tasksCompleted: 18 },
        { week: 'W3', ideasGenerated: 3, ideasValidated: 3, ideasKilled: 0, mvpsLaunched: 1, revenueExperiments: 1, tasksCompleted: 15 },
        { week: 'W4', ideasGenerated: 5, ideasValidated: 2, ideasKilled: 1, mvpsLaunched: 0, revenueExperiments: 2, tasksCompleted: 22 },
    ]
};

// --- INITIAL DATA OR LOAD FROM LOCAL STORAGE ---
function loadState(): AppState {
    try {
        const saved = localStorage.getItem('warRoomState');
        if (saved) {
            const parsed = JSON.parse(saved);

            const safeIdeas = (parsed.ideas || []).map((idea: any) => ({
                ...idea,
                founderFit: idea.founderFit || {
                    leverageAssets: 1, visionAlign: 1, build30Days: 1, compoundPotential: 1, score: 4, isMisaligned: false
                },
                scalabilityIndex: idea.scalabilityIndex || {
                    marketSize: 5, networkEffects: 5, marginPotential: 5, capitalEfficiency: 5, defensibility: 5, total: 25
                },
                secondOrderThinking: idea.secondOrderThinking || {
                    successImpact: '', adjacentMarkets: '', networkEffects: '', platformExpandable: '', platformScore: 5
                },
                monetizationStress: idea.monetizationStress || {
                    breakEvenCustomers: 0, revAt100: 0, revAt1000: 0, churnImpact: '', acquisitionDifficulty: ''
                },
                marketCalculations: idea.marketCalculations || {
                    customerCount: 0, arpu: 0, geoMultiplier: 1, adoptionRate: 0.1, tam: 0, sam: 0, som: 0, projection3Year: 0
                },
                painIds: idea.painIds || []
            }));

            return {
                ...defaultState,
                ...parsed,
                pains: parsed.pains || defaultState.pains,
                ideas: safeIdeas,
                personas: parsed.personas || defaultState.personas,
                competitors: parsed.competitors || defaultState.competitors,
                sprintTasks: parsed.sprintTasks || defaultState.sprintTasks,
                validations: parsed.validations || defaultState.validations,
                antiPatterns: parsed.antiPatterns || defaultState.antiPatterns,
                trends: parsed.trends || defaultState.trends,
                discipline: parsed.discipline || defaultState.discipline,
                executionHistory: parsed.executionHistory || defaultState.executionHistory
            };
        }
    } catch (e) { }
    return defaultState;
}

export const generateId = () => Math.random().toString(36).substring(2, 9);

interface StoreContextType {
    state: AppState;
    updateState: (partial: Partial<AppState>) => void;
    addPain: (item: Partial<PainEntry>) => void;
    addIdea: (item: Partial<IdeaEntry>) => void;
    addPersona: (item: Omit<PersonaEntry, 'id'>) => void;
    addCompetitor: (item: Omit<CompetitorEntry, 'id'>) => void;
    addTask: (week: number, text: string) => void;
    toggleTask: (id: string) => void;
    addValidation: (item: Partial<ValidationEntry>) => void;
    addAntiPattern: (item: Omit<AntiPatternEntry, 'id'>) => void;
    addTrend: (item: Omit<TrendEntry, 'id'>) => void;
    addDiscipline: (item: Omit<DisciplineEntry, 'id'>) => void;
    addExecutionMetric: (item: Omit<ExecutionMetrics, 'week'>) => void;
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

    const addPain = (item: Partial<PainEntry>) => {
        const frequency = item.frequency || 5;
        const intensity = item.intensity || 5;
        const actionability = item.actionability || 5;
        const competition = item.competition || 5;

        const opportunityScore = Number(((frequency + intensity + actionability) / (competition || 1)).toFixed(2));

        const newPain: PainEntry = {
            id: generateId(),
            topic: item.topic || '',
            platform: item.platform || '',
            complaint: item.complaint || '',
            frequency,
            intensity,
            actionability,
            competition,
            marketSizeTag: item.marketSizeTag || 'Medium',
            target: item.target || '',
            workaround: item.workaround || '',
            opportunityScore
        };
        updateState({ pains: [newPain, ...state.pains] });
    };

    const addIdea = (item: Partial<IdeaEntry>) => {
        const impact = item.impact || 5;
        const confidence = item.confidence || 5;
        const ease = item.ease || 5;
        const iceScore = Math.round((impact + confidence + ease) / 3);

        const ff = item.founderFit || {
            leverageAssets: 1, visionAlign: 1, build30Days: 1, compoundPotential: 1,
            score: 4, isMisaligned: false
        };

        // Auto-flag misaligned if 2 or more fail (0s)
        const failedCount = [ff.leverageAssets, ff.visionAlign, ff.build30Days, ff.compoundPotential].filter(v => v === 0).length;
        ff.isMisaligned = failedCount >= 2;
        ff.score = (ff.leverageAssets + ff.visionAlign + ff.build30Days + ff.compoundPotential);

        const si = item.scalabilityIndex || {
            marketSize: 5, networkEffects: 5, marginPotential: 5, capitalEfficiency: 5, defensibility: 5, total: 25
        };
        si.total = si.marketSize + si.networkEffects + si.marginPotential + si.capitalEfficiency + si.defensibility;

        const newIdea: IdeaEntry = {
            id: generateId(),
            title: item.title || '',
            description: item.description || '',
            problem: item.problem || '',
            persona: item.persona || '',
            differentiation: item.differentiation || '',
            status: item.status || 'Raw Pain',
            impact, confidence, ease, iceScore,
            killCriteria: item.killCriteria || '',
            swot: item.swot || '',
            riskiestAssumption: item.riskiestAssumption || '',
            validationPlan: item.validationPlan || '',
            monetization: item.monetization || '',
            marketSize: item.marketSize || '',
            notes: item.notes || '',
            painIds: item.painIds || [],
            industry: item.industry || 'SaaS',
            founderFit: ff,
            marketCalculations: item.marketCalculations || {
                customerCount: 0, arpu: 0, geoMultiplier: 1, adoptionRate: 0.1,
                tam: 0, sam: 0, som: 0, projection3Year: 0
            },
            scalabilityIndex: si,
            secondOrderThinking: item.secondOrderThinking || {
                successImpact: '', adjacentMarkets: '', networkEffects: '', platformExpandable: '', platformScore: 5
            },
            monetizationStress: item.monetizationStress || {
                breakEvenCustomers: 0, revAt100: 0, revAt1000: 0, churnImpact: '', acquisitionDifficulty: ''
            }
        };
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

    const addValidation = (item: Partial<ValidationEntry>) => {
        const newVal: ValidationEntry = {
            id: generateId(),
            hypothesis: item.hypothesis || '',
            experiment: item.experiment || '',
            result: item.result || '',
            signalStrength: item.signalStrength || 'Low',
            decision: item.decision || 'Pending',
            testDesign: item.testDesign || '',
            testCost: item.testCost || '',
            status: item.status || 'Pending',
            learning: item.learning || ''
        };
        updateState({ validations: [newVal, ...state.validations] });
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

    const addExecutionMetric = (item: Omit<ExecutionMetrics, 'week'>) => {
        const week = `W${state.executionHistory.length + 1}`;
        updateState({ executionHistory: [...state.executionHistory, { ...item, week }] });
    };

    return (
        <StoreContext.Provider value={{
            state, updateState, addPain, addIdea, addPersona, addCompetitor,
            addTask, toggleTask, addValidation, addAntiPattern, addTrend, addDiscipline,
            addExecutionMetric
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
