"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { responses } from "@/app/data/responses";

interface SummaryStats {
  topStressors: { source: string; count: number }[];
  avgMentalHealth: number;
  commonStrategies: { strategy: string; count: number }[];
}

export function DataSummary() {
  const [stats, setStats] = useState<SummaryStats | null>(null);

  useEffect(() => {
    const calculateStats = () => {
      const stressors = responses.map(r => {
        const source = r["What are the main sources of academic stress you experience as a university student?"];
        if (source.includes("exam")) return "I'm mainly stressed about preparing for exams.";
        if (source.includes("deadline")) return "I often worry about meeting assignment deadlines.";
        if (source.includes("work") && source.includes("studies")) return "Balancing work and studies is challenging for me.";
        if (source.includes("multiple priorities")) return "Managing multiple priorities is stressful.";
        if (source.includes("tuition") || source.includes("financial")) return "Financial pressure is a major concern.";
        if (source.includes("group projects")) return "Group project coordination is challenging.";
        return source;
      });

      const stressorCounts = stressors.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topStressors = Object.entries(stressorCounts)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      const ratings = responses.map(r => r["On a scale from 1 to 10, how would you rate your overall mental health during the academic year?"]);
      const avgMentalHealth = ratings.reduce((acc, curr) => acc + Number(curr), 0) / ratings.length;

      const strategies = responses.flatMap(r => {
        const stratsString = r["Which of the following strategies do you use to manage academic stress? (Select all that apply)"];
        return stratsString.split(',').map(s => s.trim());
      });

      const strategyCounts = strategies.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const commonStrategies = Object.entries(strategyCounts)
        .map(([strategy, count]) => ({ strategy, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      setStats({ topStressors, avgMentalHealth, commonStrategies });
    };

    calculateStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 flex flex-col gap-2 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Top Stressors</h3>
        </div>
        <div className="space-y-4">
          {stats.topStressors.map((stressor, i) => (
            <div key={stressor.source} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                <span className="text-sm font-medium">{i + 1}</span>
              </div>
              <div className="flex-1">
                <span className="text-sm">
                  {stressor.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Mental Health</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{stats.avgMentalHealth.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">average rating</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Scale: 1-10
        </div>
      </Card>

      <Card className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Top Strategies</h3>
        </div>
        <div className="space-y-2">
          {stats.commonStrategies.map((strategy, i) => (
            <div key={strategy.strategy} className="flex items-center gap-2">
              <Badge variant="outline">{i + 1}</Badge>
              <span className="text-sm text-muted-foreground truncate">
                {strategy.strategy}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 