import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";
import { Article } from "@/services/api";

interface NewsCardProps {
  article: Article;
  biasDistribution?: {
    left: number;
    center: number;
    right: number;
  };
}

export function NewsCard({ article, biasDistribution }: NewsCardProps) {
  // Default distribution if not provided
  const distribution = biasDistribution || {
    left: article.bias.toLowerCase().includes("left") ? 100 : 0,
    center: article.bias.toLowerCase() === "center" ? 100 : 0,
    right: article.bias.toLowerCase().includes("right") ? 100 : 0,
  };

  const getBiasColor = (bias: string) => {
    const lowerBias = bias.toLowerCase();
    if (lowerBias.includes("left")) return "bg-bias-left text-bias-left-foreground";
    if (lowerBias.includes("right")) return "bg-bias-right text-bias-right-foreground";
    return "bg-bias-center text-bias-center-foreground border border-border";
  };

  return (
    <Card className="overflow-hidden rounded-sm border-2 border-border hover:border-primary transition-colors">
      <div className="p-4 space-y-3">
        {/* Source and Bias */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {article.outlet}
          </span>
          <Badge variant="outline" className={`text-xs rounded-sm ${getBiasColor(article.bias)}`}>
            {article.bias}
          </Badge>
        </div>

        {/* Headline */}
        <h3 className="font-headline text-lg leading-tight text-foreground">
          {article.title}
        </h3>

        {/* Summary */}
        <ul className="space-y-1.5">
          {article.summary.map((point, index) => (
            <li key={index} className="text-sm text-foreground/80 flex gap-2">
              <span className="text-muted-foreground mt-1">•</span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>

        {/* Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>2 hours ago</span>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-foreground hover:text-accent transition-colors gap-1"
          >
            Read
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Bias Distribution Bar */}
      <div className="h-2 flex">
        {distribution.left > 0 && (
          <div
            className="bg-bias-left"
            style={{ width: `${distribution.left}%` }}
            title={`${distribution.left}% Left coverage`}
          />
        )}
        {distribution.center > 0 && (
          <div
            className="bg-bias-center border-r border-l border-border"
            style={{ width: `${distribution.center}%` }}
            title={`${distribution.center}% Center coverage`}
          />
        )}
        {distribution.right > 0 && (
          <div
            className="bg-bias-right"
            style={{ width: `${distribution.right}%` }}
            title={`${distribution.right}% Right coverage`}
          />
        )}
      </div>
    </Card>
  );
}
