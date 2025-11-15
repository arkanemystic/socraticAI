// Mock API service for Socratic AI

export interface Article {
  outlet: string;
  bias: string;
  title: string;
  summary: string[];
  url: string;
  imageUrl?: string;
}

export interface TopicAnalysis {
  topic: string;
  perspectives: {
    left: Article[];
    center: Article[];
    right: Article[];
    facts: string[];
  };
  sources: {
    name: string;
    url: string;
    bias: string;
  }[];
}

export interface PopularTopic {
  id: string;
  title: string;
  description: string;
}

// Mock data
const mockTopics: PopularTopic[] = [
  {
    id: "us-election-2024",
    title: "US Election 2024",
    description: "Coverage and analysis of the 2024 presidential race"
  },
  {
    id: "ai-regulation",
    title: "AI Regulation",
    description: "Debates around artificial intelligence governance"
  },
  {
    id: "climate-policy",
    title: "Climate Policy",
    description: "Environmental legislation and initiatives"
  },
  {
    id: "healthcare-reform",
    title: "Healthcare Reform",
    description: "Proposed changes to the healthcare system"
  }
];

const mockAnalyses: Record<string, TopicAnalysis> = {
  "us-election-2024": {
    topic: "US Election 2024",
    perspectives: {
      left: [
        {
          outlet: "The Guardian",
          bias: "Left",
          title: "Progressive Coalition Gains Momentum",
          summary: [
            "Democratic candidates emphasize healthcare expansion",
            "Climate change positioned as central campaign issue",
            "Focus on income inequality resonates with younger voters"
          ],
          url: "https://example.com/left1",
          imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop"
        },
        {
          outlet: "MSNBC",
          bias: "Lean Left",
          title: "Voter Turnout Could Decide Election",
          summary: [
            "Early voting numbers show increased participation",
            "Urban areas seeing record registration",
            "Get-out-the-vote efforts target key demographics"
          ],
          url: "https://example.com/left2",
          imageUrl: "https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=800&h=500&fit=crop"
        }
      ],
      center: [
        {
          outlet: "Reuters",
          bias: "Center",
          title: "Election Race Tightens in Swing States",
          summary: [
            "Latest polls show margin within statistical error",
            "Economic concerns dominate voter priorities",
            "Both campaigns focus resources on battleground states"
          ],
          url: "https://example.com/center1",
          imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=500&fit=crop"
        },
        {
          outlet: "Associated Press",
          bias: "Center",
          title: "Candidates Face Off in Final Debate",
          summary: [
            "Foreign policy takes center stage",
            "Fact-checkers busy during heated exchanges",
            "Undecided voters remain key to outcome"
          ],
          url: "https://example.com/center2",
          imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=500&fit=crop"
        }
      ],
      right: [
        {
          outlet: "Fox News",
          bias: "Right",
          title: "Conservative Values Drive Campaign",
          summary: [
            "Republican candidates emphasize border security",
            "Tax cuts and business regulation central to platform",
            "Traditional values resonate in rural communities"
          ],
          url: "https://example.com/right1",
          imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop"
        },
        {
          outlet: "The Wall Street Journal",
          bias: "Lean Right",
          title: "Economic Policy Takes Center Stage",
          summary: [
            "Inflation concerns dominate voter sentiment",
            "Business leaders weigh in on candidate proposals",
            "Market stability becomes campaign focal point"
          ],
          url: "https://example.com/right2",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop"
        }
      ],
      facts: [
        "The election is scheduled for November 5, 2024",
        "270 electoral votes are needed to win the presidency",
        "Voter registration deadlines vary by state",
        "Seven swing states are considered key battlegrounds",
        "Early voting began in some states in September 2024"
      ]
    },
    sources: [
      { name: "The Guardian", url: "https://theguardian.com", bias: "Left" },
      { name: "MSNBC", url: "https://msnbc.com", bias: "Lean Left" },
      { name: "Reuters", url: "https://reuters.com", bias: "Center" },
      { name: "Associated Press", url: "https://apnews.com", bias: "Center" },
      { name: "Fox News", url: "https://foxnews.com", bias: "Right" },
      { name: "The Wall Street Journal", url: "https://wsj.com", bias: "Lean Right" }
    ]
  },
  "ai-regulation": {
    topic: "AI Regulation",
    perspectives: {
      left: [
        {
          outlet: "The New York Times",
          bias: "Lean Left",
          title: "Calls for Strict AI Oversight Grow",
          summary: [
            "Labor unions express concerns about job displacement",
            "Privacy advocates push for data protection measures",
            "Proposed legislation aims to prevent algorithmic bias"
          ],
          url: "https://example.com/left1",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop"
        }
      ],
      center: [
        {
          outlet: "BBC News",
          bias: "Center",
          title: "Global AI Summit Addresses Regulation",
          summary: [
            "International cooperation deemed essential",
            "Balance sought between innovation and safety",
            "Experts present various regulatory frameworks"
          ],
          url: "https://example.com/center1",
          imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=500&fit=crop"
        }
      ],
      right: [
        {
          outlet: "National Review",
          bias: "Right",
          title: "Over-Regulation Could Stifle Innovation",
          summary: [
            "Tech industry warns of competitive disadvantage",
            "Free market approach favored over government mandates",
            "Concerns raised about bureaucratic interference"
          ],
          url: "https://example.com/right1",
          imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop"
        }
      ],
      facts: [
        "The EU AI Act was adopted in March 2024",
        "No comprehensive federal AI regulation exists in the US",
        "China has implemented various AI governance measures",
        "Major tech companies have committed to voluntary safety standards"
      ]
    },
    sources: [
      { name: "The New York Times", url: "https://nytimes.com", bias: "Lean Left" },
      { name: "BBC News", url: "https://bbc.com", bias: "Center" },
      { name: "National Review", url: "https://nationalreview.com", bias: "Right" }
    ]
  },
  "climate-policy": {
    topic: "Climate Policy",
    perspectives: {
      left: [
        {
          outlet: "Mother Jones",
          bias: "Left",
          title: "Ambitious Climate Bill Passes Senate",
          summary: [
            "Bill aims to cut emissions by 40% by 2030",
            "Significant investment in renewable energy",
            "Environmental groups call it a good first step"
          ],
          url: "https://example.com/left1",
          imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop"
        }
      ],
      center: [
        {
          outlet: "Reuters",
          bias: "Center",
          title: "Senate Votes on Climate Legislation",
          summary: [
            "Passed with 51-50 vote along party lines",
            "Includes tax credits for electric vehicles",
            "Implementation timeline extends to 2035"
          ],
          url: "https://example.com/center1",
          imageUrl: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=500&fit=crop"
        }
      ],
      right: [
        {
          outlet: "Fox News",
          bias: "Right",
          title: "Climate Spending Bill Raises Concerns",
          summary: [
            "Critics warn of increased inflation risks",
            "Potential negative impact on oil and gas industry",
            "Questions raised about economic consequences"
          ],
          url: "https://example.com/right1",
          imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop"
        }
      ],
      facts: [
        "The bill was passed on August 7, 2024",
        "It includes $369 billion in energy security programs",
        "The vote was 51-50 with the Vice President breaking the tie",
        "Implementation begins in fiscal year 2025"
      ]
    },
    sources: [
      { name: "Mother Jones", url: "https://motherjones.com", bias: "Left" },
      { name: "Reuters", url: "https://reuters.com", bias: "Center" },
      { name: "Fox News", url: "https://foxnews.com", bias: "Right" }
    ]
  },
  "healthcare-reform": {
    topic: "Healthcare Reform",
    perspectives: {
      left: [
        {
          outlet: "Vox",
          bias: "Lean Left",
          title: "Medicare Expansion Shows Promise",
          summary: [
            "Early data suggests improved coverage rates",
            "Lower out-of-pocket costs reported by beneficiaries",
            "Advocates push for further expansion"
          ],
          url: "https://example.com/left1",
          imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
        }
      ],
      center: [
        {
          outlet: "The Hill",
          bias: "Center",
          title: "Healthcare Costs Continue to Rise",
          summary: [
            "Premium increases outpace wage growth",
            "Bipartisan concern over affordability",
            "Various proposals under consideration"
          ],
          url: "https://example.com/center1",
          imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop"
        }
      ],
      right: [
        {
          outlet: "The Federalist",
          bias: "Right",
          title: "Market-Based Solutions Gain Support",
          summary: [
            "Health savings accounts see increased enrollment",
            "Private sector innovation highlighted",
            "Concerns about government program costs"
          ],
          url: "https://example.com/right1",
          imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=500&fit=crop"
        }
      ],
      facts: [
        "Healthcare costs increased 6.5% in 2024",
        "29 million Americans remain uninsured",
        "Medicare covers approximately 65 million people",
        "Prescription drug costs are a major concern for voters"
      ]
    },
    sources: [
      { name: "Vox", url: "https://vox.com", bias: "Lean Left" },
      { name: "The Hill", url: "https://thehill.com", bias: "Center" },
      { name: "The Federalist", url: "https://thefederalist.com", bias: "Right" }
    ]
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getPopularTopics(): Promise<PopularTopic[]> {
    await delay(300);
    return mockTopics;
  },

  async analyzeTopic(query: string): Promise<TopicAnalysis> {
    await delay(500);
    
    // Find matching mock data or return climate policy as default
    const topicId = query.toLowerCase().replace(/\s+/g, "-");
    const analysis = mockAnalyses[topicId] || mockAnalyses["climate-policy"];
    
    // Customize the topic based on query if not found
    if (!mockAnalyses[topicId]) {
      return {
        ...analysis,
        topic: query
      };
    }
    
    return analysis;
  },

  async getTopicById(id: string): Promise<TopicAnalysis> {
    await delay(500);
    return mockAnalyses[id] || mockAnalyses["climate-policy"];
  }
};
