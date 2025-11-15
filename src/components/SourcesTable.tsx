import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Source {
  name: string;
  url: string;
  bias: string;
}

interface SourcesTableProps {
  sources: Source[];
}

const biasColors: Record<string, string> = {
  "Left": "bg-bias-left text-bias-left-foreground",
  "Lean Left": "bg-bias-left text-bias-left-foreground",
  "Center": "bg-bias-center text-bias-center-foreground border border-border",
  "Lean Right": "bg-bias-right text-bias-right-foreground",
  "Right": "bg-bias-right text-bias-right-foreground",
};

export function SourcesTable({ sources }: SourcesTableProps) {
  return (
    <div className="rounded-sm border-2 border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-border">
            <TableHead className="w-[40%] font-headline tracking-tight">Outlet</TableHead>
            <TableHead className="w-[30%] font-headline tracking-tight">Bias</TableHead>
            <TableHead className="font-headline tracking-tight">URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sources.map((source, index) => (
            <TableRow key={index} className="border-b border-border">
              <TableCell className="font-medium font-body">{source.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`rounded-sm text-xs ${biasColors[source.bias] || ""}`}>
                  {source.bias}
                </Badge>
              </TableCell>
              <TableCell>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-body text-foreground hover:text-accent transition-colors"
                >
                  Visit source
                  <ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
