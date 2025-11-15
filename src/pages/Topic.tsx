import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { ArticleCard } from "@/components/ArticleCard";
import { FactsCard } from "@/components/FactsCard";
import { SourcesTable } from "@/components/SourcesTable";
import { SearchBar } from "@/components/SearchBar";
import { TopicCard } from "@/components/TopicCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
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
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{analysis.topic}</h2>
              <p className="text-lg text-muted-foreground">
                Summaries and perspectives from multiple sources
              </p>
            </div>

            {/* Perspective Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
              {/* Left Perspective */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-perspective-left text-perspective-left-foreground">
                    Left
                  </Badge>
                </div>
                {analysis.perspectives.left.map((article, idx) => (
                  <ArticleCard key={idx} article={article} perspective="left" />
                ))}
              </div>

              {/* Center Perspective */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-perspective-center text-perspective-center-foreground">
                    Center
                  </Badge>
                </div>
                {analysis.perspectives.center.map((article, idx) => (
                  <ArticleCard key={idx} article={article} perspective="center" />
                ))}
              </div>

              {/* Right Perspective */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-perspective-right text-perspective-right-foreground">
                    Right
                  </Badge>
                </div>
                {analysis.perspectives.right.map((article, idx) => (
                  <ArticleCard key={idx} article={article} perspective="right" />
                ))}
              </div>

              {/* Facts Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-perspective-facts text-perspective-facts-foreground">
                    Facts Only
                  </Badge>
                </div>
                <FactsCard facts={analysis.perspectives.facts} />
              </div>
            </div>

            {/* Sources Section */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Sources</h3>
              <SourcesTable sources={analysis.sources} />
            </section>

            {/* Hot Topics Sidebar (bottom on mobile) */}
            <section>
              <h3 className="text-2xl font-bold mb-6">Hot Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
