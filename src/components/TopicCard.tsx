import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function TopicCard({ title, description, onClick }: TopicCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50 group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1 ml-2" />
        </div>
      </CardHeader>
    </Card>
  );
}
