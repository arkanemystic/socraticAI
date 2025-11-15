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
      className="cursor-pointer transition-all hover:border-primary border-2 border-border rounded-sm group"
      onClick={onClick}
    >
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-headline mb-2 tracking-tight">{title}</CardTitle>
            <CardDescription className="font-body">{description}</CardDescription>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1 ml-2" />
        </div>
      </CardHeader>
    </Card>
  );
}
