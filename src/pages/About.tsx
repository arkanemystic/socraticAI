import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Socratic AI</h1>
            <nav className="flex gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </a>
              <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <article className="prose prose-gray max-w-none">
          <h2 className="text-3xl font-bold mb-6">About Socratic AI</h2>
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-foreground leading-relaxed">
              In an era of increasing polarization and echo chambers, Socratic AI aims to combat misinformation 
              and bias by presenting news and analysis from multiple political perspectives side by side. We 
              believe that understanding different viewpoints is essential to forming informed opinions and 
              participating in democratic discourse.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">How It Works</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Our AI-powered platform aggregates news coverage from reputable sources across the political 
              spectrum. For each topic, we provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><strong>Left perspective:</strong> Analysis and reporting from left-leaning outlets</li>
              <li><strong>Center perspective:</strong> Coverage from politically neutral sources</li>
              <li><strong>Right perspective:</strong> Analysis and reporting from right-leaning outlets</li>
              <li><strong>Verified facts:</strong> Cross-referenced, objective facts derived from multiple sources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Source Credibility</h3>
            <p className="text-foreground leading-relaxed">
              We carefully curate our source list to include only established news organizations with strong 
              journalistic standards. Each source is labeled with its political bias based on independent 
              media bias ratings. Our "Facts Only" column synthesizes information that appears consistently 
              across multiple sources, regardless of their political leaning.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Factual Accuracy</h3>
            <p className="text-foreground leading-relaxed">
              The facts presented in our analysis are cross-verified across multiple sources and filtered 
              through our AI system to identify claims that are consistently reported without contradiction. 
              While we strive for accuracy, we encourage users to verify important information through 
              primary sources and maintain a critical perspective.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
            <p className="text-foreground leading-relaxed">
              Rather than telling you what to think, Socratic AI presents you with the full spectrum of 
              perspectives and lets you draw your own conclusions. We believe that exposure to diverse 
              viewpoints, combined with verified facts, empowers users to think critically and form 
              well-reasoned opinions on complex issues.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
