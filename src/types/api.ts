// Data types based on Technical Specification Section 6

export interface Source {
  name: string;
  url: string;
  bias: string;
}

export interface ArticleSummary {
  outlet: string;
  bias: string;
  title: string;
  summary: string[];
  url: string;
}

// Alias for backward compatibility
export type Article = ArticleSummary;

export interface AnalysisResponse {
  topic: string;
  perspectives: {
    left: ArticleSummary[];
    center: ArticleSummary[];
    right: ArticleSummary[];
  };
  facts: string[];
  sources: Source[];
}

export interface HotTopic {
  topic: string;
  reason: string;
}

export interface PopularTopic {
  id: string;
  title: string;
  description: string;
}
