import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { TopicCard } from "@/components/TopicCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const navigate = useNavigate();
  
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
      {/* Header */}
      <header className="border-b-2 border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-headline tracking-tighter">Socratic AI</h1>
            <nav className="flex gap-1">
              <a 
                href="/" 
                className="px-4 py-2 text-sm font-medium border-b-2 border-accent transition-colors"
              >
                Home
              </a>
              <a 
                href="/about" 
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border transition-colors"
              >
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b-2 border-border overflow-hidden">
        {/* Background Image Collage */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0 opacity-[0.08]">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale" />
        </div>
        
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-background/80"></div>
        
        {/* Content */}
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-headline mb-4 tracking-tighter">
              Break out of your echo chamber
            </h2>
            <p className="text-lg font-body text-muted-foreground">
              See news from all perspectives, side by side
            </p>
          </div>
          <SearchBar onSearch={handleSearch} className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-headline mb-8 tracking-tight">Popular Topics</h3>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics?.map((topic) => (
                <TopicCard
                  key={topic.id}
                  title={topic.title}
                  description={topic.description}
                  onClick={() => handleTopicClick(topic.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
