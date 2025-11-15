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
  "Left": "bg-perspective-left-muted text-perspective-left border-perspective-left/20",
  "Lean Left": "bg-perspective-left-muted text-perspective-left border-perspective-left/20",
  "Center": "bg-perspective-center-muted text-perspective-center border-perspective-center/20",
  "Lean Right": "bg-perspective-right-muted text-perspective-right border-perspective-right/20",
  "Right": "bg-perspective-right-muted text-perspective-right border-perspective-right/20",
};

export function SourcesTable({ sources }: SourcesTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Outlet</TableHead>
            <TableHead className="w-[30%]">Bias</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sources.map((source, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{source.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={biasColors[source.bias] || ""}>
                  {source.bias}
                </Badge>
              </TableCell>
              <TableCell>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
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
