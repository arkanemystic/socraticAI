import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Article } from "@/types/api";

interface ArticleCardProps {
  article: Article;
  perspective: "left" | "center" | "right";
}

const perspectiveColors = {
  left: "bg-perspective-left-muted text-perspective-left border-perspective-left/20",
  center: "bg-perspective-center-muted text-perspective-center border-perspective-center/20",
  right: "bg-perspective-right-muted text-perspective-right border-perspective-right/20",
};

export function ArticleCard({ article, perspective }: ArticleCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{article.outlet}</p>
            <Badge variant="outline" className={perspectiveColors[perspective]}>
              {article.bias}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {article.summary.map((point, index) => (
            <li key={index} className="text-sm text-foreground flex gap-2">
              <span className="text-muted-foreground mt-1.5">•</span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-primary hover:underline gap-1"
        >
          Read full article
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}
