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
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Socratic AI</h1>
            <nav className="flex gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </a>
              <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Break out of your echo chamber
            </h2>
            <p className="text-xl text-muted-foreground">
              See news from all perspectives, side by side
            </p>
          </div>
          <SearchBar onSearch={handleSearch} className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold mb-8">Popular Topics</h3>
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
