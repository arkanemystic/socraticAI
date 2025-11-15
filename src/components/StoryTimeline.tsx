import { Article } from "@/services/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StoryTimelineProps {
  articles: Article[];
}

export function StoryTimeline({ articles }: StoryTimelineProps) {
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getBiasColor = (bias: string) => {
    if (bias.toLowerCase().includes("left")) return "bg-bias-left/20 text-bias-left border-bias-left";
    if (bias.toLowerCase().includes("right")) return "bg-bias-right/20 text-bias-right border-bias-right";
    return "bg-border/20 text-foreground border-border";
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

      <Accordion type="single" collapsible className="space-y-4">
        {sortedArticles.map((article, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border-0 bg-card relative"
          >
            {/* Timeline dot */}
            <div className="absolute left-2.5 top-6 h-3 w-3 rounded-full bg-primary border-2 border-background z-10" />

            <div className="ml-10 border-2 border-border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-accent/50 transition-colors">
                <div className="flex flex-col items-start gap-2 w-full pr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(article.date)}
                    </span>
                    <Badge variant="outline" className={getBiasColor(article.bias)}>
                      {article.bias}
                    </Badge>
                  </div>
                  <h4 className="text-base font-medium text-left">
                    {article.title}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {article.outlet}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="space-y-2 mb-4">
                  {article.summary.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Read full article
                  <ExternalLink className="h-3 w-3" />
                </a>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
