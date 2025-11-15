import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { NewsCard } from "@/components/NewsCard";
import { FactsCard } from "@/components/FactsCard";
import { SourcesTable } from "@/components/SourcesTable";
import { SearchBar } from "@/components/SearchBar";
import { TopicCard } from "@/components/TopicCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function Topic() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q");

  const { data: analysis, isLoading } = useQuery({
    queryKey: ["topicAnalysis", id, query],
    queryFn: () => query ? api.analyzeTopic(query) : api.getTopicById(id!),
  });

  const { data: hotTopics } = useQuery({
    queryKey: ["popularTopics"],
    queryFn: api.getPopularTopics,
  });

  const handleSearch = (newQuery: string) => {
    const topicId = newQuery.toLowerCase().replace(/\s+/g, "-");
    navigate(`/topic/${topicId}?q=${encodeURIComponent(newQuery)}`);
  };

  const handleTopicClick = (topicId: string) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-headline tracking-tighter">Socratic AI</h1>
            <nav className="flex gap-1">
              <a 
                href="/" 
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border transition-colors"
              >
                Home
              </a>
              <a 
                href="/about" 
                className="px-4 py-2 text-sm font-medium border-b-2 border-accent transition-colors"
              >
                About
              </a>
            </nav>
          </div>
          <SearchBar onSearch={handleSearch} placeholder="Search another topic..." />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          </div>
        ) : analysis ? (
          <>
            {/* Topic Header */}
            <div className="mb-8 pb-8 border-b-2 border-border">
              <h2 className="text-4xl md:text-5xl font-headline mb-3 tracking-tighter">{analysis.topic}</h2>
              <p className="text-lg font-body text-muted-foreground">
                Summaries and perspectives from multiple sources
              </p>
            </div>

            {/* Facts Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-bias-facts">
                <h3 className="text-2xl font-headline tracking-tight">Verified Facts</h3>
              </div>
              <FactsCard facts={analysis.perspectives.facts} />
            </div>

            {/* Perspective Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Left Perspective */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-bias-left">
                  <h3 className="text-lg font-headline tracking-tight">Left Perspective</h3>
                </div>
                {analysis.perspectives.left.map((article, idx) => (
                  <NewsCard 
                    key={idx} 
                    article={article} 
                    biasDistribution={{ left: 100, center: 0, right: 0 }}
                  />
                ))}
              </div>

              {/* Center Perspective */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-border">
                  <h3 className="text-lg font-headline tracking-tight">Center Perspective</h3>
                </div>
                {analysis.perspectives.center.map((article, idx) => (
                  <NewsCard 
                    key={idx} 
                    article={article}
                    biasDistribution={{ left: 0, center: 100, right: 0 }}
                  />
                ))}
              </div>

              {/* Right Perspective */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-bias-right">
                  <h3 className="text-lg font-headline tracking-tight">Right Perspective</h3>
                </div>
                {analysis.perspectives.right.map((article, idx) => (
                  <NewsCard 
                    key={idx} 
                    article={article}
                    biasDistribution={{ left: 0, center: 0, right: 100 }}
                  />
                ))}
              </div>
            </div>

            {/* Sources Section */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-border">
                <h3 className="text-2xl font-headline tracking-tight">Sources</h3>
              </div>
              <SourcesTable sources={analysis.sources} />
            </section>

            {/* Hot Topics Sidebar (bottom on mobile) */}
            <section>
              <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-border">
                <h3 className="text-2xl font-headline tracking-tight">Hot Topics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotTopics?.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    title={topic.title}
                    description={topic.description}
                    onClick={() => handleTopicClick(topic.id)}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Topic not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
