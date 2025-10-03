import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Placeholder service clients and fetchers for future integrations
export const industryApi = {
  async getMarketSnapshot() {
    // TODO: integrate with real provider (e.g., Adzuna, Levels.fyi)
    return { rolesInDemand: [], medianSalaries: {} } as const;
  },
  async getGrowthPredictions() {
    return { tracks: [], horizons: [] } as const;
  },
  async getLocationInsights() {
    return { regions: [], heatmap: [] } as const;
  },
};

export const assessmentApi = {
  async startPersonalityAssessment() {
    return { assessmentId: 'demo', framework: 'MBTI' } as const;
  },
  async startSkillsAssessment() {
    return { assessmentId: 'demo-skills' } as const;
  },
  async startInterestSurvey() {
    return { assessmentId: 'demo-interests' } as const;
  },
};

export const opportunityApi = {
  async listJobs() {
    return { items: [], nextCursor: null as string | null };
  },
  async listEvents() {
    return { items: [], nextCursor: null as string | null };
  },
  async companyInsights() {
    return { companies: [] } as const;
  },
};