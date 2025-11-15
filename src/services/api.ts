// API service for Socratic AI backend
// Based on Technical Specification Section 2.5

import type { AnalysisResponse, HotTopic, PopularTopic } from "@/types/api";

const API_BASE = "/api";

export async function analyzeTopic(query: string): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  
  if (!res.ok) {
    throw new Error(`Failed to analyze topic: ${res.statusText}`);
  }
  
  return res.json();
}

export async function getPopularTopics(): Promise<PopularTopic[]> {
  const res = await fetch(`${API_BASE}/popular-topics`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch popular topics: ${res.statusText}`);
  }
  
  return res.json();
}

export async function getHotTopics(): Promise<HotTopic[]> {
  const res = await fetch(`${API_BASE}/hot-topics`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch hot topics: ${res.statusText}`);
  }
  
  const data = await res.json();
  return data.hotTopics || [];
}
