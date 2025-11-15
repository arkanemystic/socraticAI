import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface FactsCardProps {
  facts: string[];
}

export function FactsCard({ facts }: FactsCardProps) {
  return (
    <Card className="h-full border-2 border-bias-facts rounded-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-headline flex items-center gap-2 tracking-tight">
          <CheckCircle2 className="h-5 w-5 text-bias-facts" />
          Verified Facts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {facts.map((fact, index) => (
            <li key={index} className="text-sm font-body flex gap-2">
              <span className="text-bias-facts mt-0.5 font-bold">✓</span>
              <span className="flex-1">{fact}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
