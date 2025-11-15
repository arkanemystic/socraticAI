import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface FactsCardProps {
  facts: string[];
}

export function FactsCard({ facts }: FactsCardProps) {
  return (
    <Card className="h-full bg-perspective-facts-muted border-perspective-facts/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-perspective-facts" />
          Verified Facts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {facts.map((fact, index) => (
            <li key={index} className="text-sm flex gap-2">
              <span className="text-perspective-facts mt-0.5">✓</span>
              <span className="flex-1">{fact}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
