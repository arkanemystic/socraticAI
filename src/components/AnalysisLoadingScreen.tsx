import { useEffect, useState } from "react";
import { Loader2, Search, Brain, CheckCircle2, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const loadingStages = [
  {
    icon: Search,
    message: "Fetching articles from multiple sources...",
    duration: 1000,
  },
  {
    icon: FileText,
    message: "Collecting perspectives across the spectrum...",
    duration: 1200,
  },
  {
    icon: Brain,
    message: "Analyzing bias and sentiment...",
    duration: 1300,
  },
  {
    icon: CheckCircle2,
    message: "Compiling comprehensive analysis...",
    duration: 1500,
  },
];

interface AnalysisLoadingScreenProps {
  onComplete: () => void;
}

export function AnalysisLoadingScreen({ onComplete }: AnalysisLoadingScreenProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / totalDuration) * 50;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    let elapsed = 0;
    const intervals: NodeJS.Timeout[] = [];

    loadingStages.forEach((stage, index) => {
      const timeout = setTimeout(() => {
        setCurrentStage(index);
      }, elapsed);
      intervals.push(timeout);
      elapsed += stage.duration;
    });

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 5000);
    intervals.push(completeTimeout);

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [onComplete]);

  const CurrentIcon = loadingStages[currentStage].icon;

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="max-w-md w-full px-8 space-y-8">
        {/* Logo/Title */}
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-headline tracking-tighter mb-2">
            Socratic AI
          </h2>
          <p className="text-sm text-muted-foreground">
            Breaking through echo chambers
          </p>
        </div>

        {/* Loading Stages */}
        <div className="space-y-6">
          {loadingStages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 transition-all duration-500 ${
                  isActive
                    ? "opacity-100 scale-100"
                    : isCompleted
                    ? "opacity-50 scale-95"
                    : "opacity-30 scale-90"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/10 animate-pulse"
                      : isCompleted
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <StageIcon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : isCompleted
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {stage.message}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 animate-fade-in">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Spinning Loader */}
        <div className="flex justify-center animate-fade-in">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      </div>
    </div>
  );
}
