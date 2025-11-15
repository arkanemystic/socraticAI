# Socratic AI
*A news-summarizing, bias-balancing, perspective-aligned AI built for people who want the truth without the tantrums.*

## Overview
Socratic AI digests a topic you search, fetches articles across the political/ideological spectrum, and returns four clean lanes of understanding:

- **Left**
- **Center**
- **Right**
- **Facts-Only**

The system is built for clarity, neutrality, and speed. No secret sauce—just architecture that actually makes sense.

## Architecture

### High-Level Stack
**Frontend:** React SPA (Lovable.dev)  
**API Layer:** Flask (input validation, secret shielding)  
**Backend Brain:** n8n workflows  
**Storage:** n8n database (topics, logs, cached trending topics)

### Request Flow
1. User enters a topic  
2. Frontend → Flask `/api/analyze`  
3. Flask → n8n workflow  
4. n8n fetches articles, summaries, perspectives  
5. n8n → Flask → frontend  
6. UI renders the four perspectives + sources + hot topics

## Features

### 1. Multi-Perspective Topic Analysis
Each query returns structured summaries:
- Left / Center / Right perspectives
- Facts-only distilled view
- Outlet name, bias label, bullets, and links

### 2. Hot Topics
Trending global topics aggregated automatically via n8n workflows.

### 3. Source Transparency
Curated outlet list with:
- Bias  
- Credibility  
- Homepage URL  
- Category (left / center / right / factual)

### 4. Hackathon-Friendly Build Path
- React UI with data  
- Flask with responses  
- n8n pipeline wired in afterward  

## Frontend (React + Lovable)

### Pages
- `/` — Homepage search  
- `/topic/:id` — Topic summaries  
- `/about` — Methodology  

### API Module Example
```ts
export async function analyzeTopic(query) {
  return fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then(r => r.json());
}
```

## Backend (Flask)

### Purpose
- Normalize requests  
- Hide API keys and n8n URLs  
- Add metadata  
- Forward requests to n8n  

### Key Endpoints
`POST /api/analyze`  
`GET /api/popular-topics`  
`GET /api/hot-topics`

## n8n Workflows

### Workflow A — analyze-topic
- Normalize topic  
- Fetch sources  
- Pull articles  
- Summarize with LLM  
- Generate facts-only bullets  
- Log query  
- Return unified JSON  

### Workflow B — hot-topics
- Fetch global RSS  
- Cluster stories  
- Return trending items  

## Security
- No API keys in frontend  
- All secrets in environment variables  
- CORS restricted  
- HTTPS recommended  

## Data Contract

### Example `/api/analyze` response
```json
{
  "topic": "climate change bill",
  "perspectives": {
    "left": [],
    "center": [],
    "right": []
  },
  "facts": [],
  "sources": []
}
```

## Local Development

### Frontend
```
cd frontend
npm install
npm run dev
```

### Flask
```
cd server
pip install -r requirements.txt
python app.py
```

### n8n
- Import workflows  
- Set webhook URLs  
- Start Docker or local instance  

## Roadmap
- Automatic credibility scoring  
- Topic similarity clustering  
- User accounts  
- Mobile performance tuning

## Demo Video
https://youtu.be/fpL_kgeM3R4
