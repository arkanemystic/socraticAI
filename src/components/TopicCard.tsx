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
      className="cursor-pointer transition-all duration-300 hover:border-accent border-2 border-border rounded-sm group hover:shadow-xl relative overflow-hidden"
      onClick={onClick}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      
      <CardHeader className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-headline mb-2 tracking-tight group-hover:text-accent transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="font-body group-hover:text-foreground transition-colors">
              {description}
            </CardDescription>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1 ml-2" />
        </div>
      </CardHeader>
    </Card>
  );
}
