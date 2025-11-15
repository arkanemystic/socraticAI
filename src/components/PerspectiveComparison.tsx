import { Article } from "@/services/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PerspectiveComparisonProps {
  leftArticles: Article[];
  centerArticles: Article[];
  rightArticles: Article[];
}

interface ArticlesByDate {
  [date: string]: {
    left: Article[];
    center: Article[];
    right: Article[];
  };
}

export function PerspectiveComparison({
  leftArticles,
  centerArticles,
  rightArticles,
}: PerspectiveComparisonProps) {
  // Group articles by date
  const articlesByDate: ArticlesByDate = {};

  [...leftArticles, ...centerArticles, ...rightArticles].forEach((article) => {
    if (!articlesByDate[article.date]) {
      articlesByDate[article.date] = { left: [], center: [], right: [] };
    }
  });

  leftArticles.forEach((article) => {
    articlesByDate[article.date].left.push(article);
  });

  centerArticles.forEach((article) => {
    articlesByDate[article.date].center.push(article);
  });

  rightArticles.forEach((article) => {
    articlesByDate[article.date].right.push(article);
  });

  // Sort dates (newest first)
  const sortedDates = Object.keys(articlesByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Filter dates that have articles from multiple perspectives
  const datesWithMultiplePerspectives = sortedDates.filter((date) => {
    const count = [
      articlesByDate[date].left.length > 0,
      articlesByDate[date].center.length > 0,
      articlesByDate[date].right.length > 0,
    ].filter(Boolean).length;
    return count >= 2;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (datesWithMultiplePerspectives.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No overlapping coverage dates found across perspectives
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {datesWithMultiplePerspectives.map((date) => {
        const articles = articlesByDate[date];
        const perspectiveCount = [
          articles.left.length > 0,
          articles.center.length > 0,
          articles.right.length > 0,
        ].filter(Boolean).length;

        return (
          <AccordionItem
            key={date}
            value={date}
            className="border-2 border-border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 hover:no-underline hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3 w-full">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="flex flex-col items-start gap-2">
                  <span className="text-lg font-headline">
                    {formatDate(date)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {perspectiveCount} perspectives covering this date
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                {/* Left Perspective */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-bias-left">
                    <h4 className="text-sm font-headline tracking-tight">
                      Left Perspective
                    </h4>
                  </div>
                  {articles.left.length > 0 ? (
                    articles.left.map((article, idx) => (
                      <ArticleComparisonCard
                        key={idx}
                        article={article}
                        biasColor="bias-left"
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No coverage from this perspective
                    </p>
                  )}
                </div>

                {/* Center Perspective */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-border">
                    <h4 className="text-sm font-headline tracking-tight">
                      Center Perspective
                    </h4>
                  </div>
                  {articles.center.length > 0 ? (
                    articles.center.map((article, idx) => (
                      <ArticleComparisonCard
                        key={idx}
                        article={article}
                        biasColor="border"
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No coverage from this perspective
                    </p>
                  )}
                </div>

                {/* Right Perspective */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-bias-right">
                    <h4 className="text-sm font-headline tracking-tight">
                      Right Perspective
                    </h4>
                  </div>
                  {articles.right.length > 0 ? (
                    articles.right.map((article, idx) => (
                      <ArticleComparisonCard
                        key={idx}
                        article={article}
                        biasColor="bias-right"
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No coverage from this perspective
                    </p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

interface ArticleComparisonCardProps {
  article: Article;
  biasColor: string;
}

function ArticleComparisonCard({
  article,
  biasColor,
}: ArticleComparisonCardProps) {
  return (
    <div className={`border-2 border-${biasColor} rounded-lg p-4 bg-card`}>
      <div className="mb-3">
        <Badge variant="outline" className="mb-2">
          {article.outlet}
        </Badge>
        <h5 className="font-medium text-sm leading-tight">{article.title}</h5>
      </div>
      <ul className="space-y-2 mb-3">
        {article.summary.map((point, i) => (
          <li key={i} className="text-xs text-muted-foreground flex gap-2">
            <span className="text-primary">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
      >
        Read article
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
