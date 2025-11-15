import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { TopicCard } from "@/components/TopicCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { TrendingUp, Eye, Users, ChevronDown } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [taglineIndex, setTaglineIndex] = useState(0);
  
  const taglines = [
    "Break out of your echo chamber",
    "See every side of the story",
    "Truth has many perspectives",
    "Beyond the headlines"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const { data: topics, isLoading } = useQuery({
    queryKey: ["popularTopics"],
    queryFn: api.getPopularTopics,
  });

  const handleSearch = (query: string) => {
    const topicId = query.toLowerCase().replace(/\s+/g, "-");
    navigate(`/topic/${topicId}?q=${encodeURIComponent(query)}`);
  };

  const handleTopicClick = (topicId: string) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with subtle shadow */}
      <header className="border-b-2 border-border bg-card sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-headline tracking-tighter animate-fade-in">
              Socratic AI
            </h1>
            <nav className="flex gap-1">
              <a 
                href="/" 
                className="px-4 py-2 text-sm font-medium border-b-2 border-accent transition-all hover:scale-105"
              >
                Home
              </a>
              <a 
                href="/about" 
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border transition-all hover:scale-105"
              >
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Enhanced Visuals */}
      <section className="relative py-20 md:py-32 px-4 border-b-2 border-border overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/5 animate-gradient"></div>
        
        {/* Background Image Collage with Animation */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0 opacity-[0.06]">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-110" />
          <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-110" />
          <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-110" />
          <img src="https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-110" />
          <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-110" />
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-110" />
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12 space-y-6">
            {/* Animated Main Headline */}
            <h2 className="text-5xl md:text-7xl font-headline tracking-tighter animate-fade-in">
              <span className="inline-block animate-float" style={{ animationDelay: '0s' }}>
                {taglines[taglineIndex]}
              </span>
            </h2>
            
            {/* Subtitle with typing effect */}
            <p className="text-xl md:text-2xl font-body text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              See news from all perspectives, side by side
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="px-4 py-2 bg-bias-left/10 border border-bias-left/20 rounded-full text-sm font-medium text-bias-left hover:bg-bias-left/20 transition-all hover:scale-105">
                Left Perspective
              </span>
              <span className="px-4 py-2 bg-border/50 border border-border rounded-full text-sm font-medium hover:bg-border transition-all hover:scale-105">
                Center View
              </span>
              <span className="px-4 py-2 bg-bias-right/10 border border-bias-right/20 rounded-full text-sm font-medium text-bias-right hover:bg-bias-right/20 transition-all hover:scale-105">
                Right Perspective
              </span>
            </div>
          </div>
          
          {/* Search Bar with Pulse Effect */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <SearchBar onSearch={handleSearch} className="max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow ring-2 ring-accent/20 hover:ring-accent/40" />
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-12 animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-card border-b-2 border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-background border-2 border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-accent" />
              <h4 className="text-3xl font-headline mb-2">1000+</h4>
              <p className="text-sm text-muted-foreground">Articles Analyzed</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border-2 border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg">
              <Eye className="h-10 w-10 mx-auto mb-3 text-accent" />
              <h4 className="text-3xl font-headline mb-2">3</h4>
              <p className="text-sm text-muted-foreground">Perspectives</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background border-2 border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg">
              <Users className="h-10 w-10 mx-auto mb-3 text-accent" />
              <h4 className="text-3xl font-headline mb-2">100+</h4>
              <p className="text-sm text-muted-foreground">News Sources</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-headline mb-3 tracking-tight animate-fade-in">
              Popular Topics
            </h3>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Explore trending stories from multiple perspectives
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics?.map((topic, index) => (
                <div
                  key={topic.id}
                  className="animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TopicCard
                    title={topic.title}
                    description={topic.description}
                    onClick={() => handleTopicClick(topic.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
