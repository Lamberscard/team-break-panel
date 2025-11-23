import { cn } from "@/lib/utils";

interface StatsPanelProps {
  totalTeams: number;
  soldTeams: number;
  customPanels: Array<{ label: string; value: number; visible: boolean }>;
}

export const StatsPanel = ({ totalTeams, soldTeams, customPanels }: StatsPanelProps) => {
  const remaining = totalTeams - soldTeams;

  return (
    <div className="flex flex-row gap-2 p-2 items-center justify-center">
      <div className="flex gap-2">
        <StatCard
          label="REMAINING"
          value={remaining}
          bgColor="bg-accent"
        />
        <StatCard
          label="SOLD"
          value={soldTeams}
          bgColor="bg-muted"
        />
      </div>
      {customPanels.filter(p => p.visible).map((panel, index) => (
        <StatCard
          key={index}
          label={panel.label}
          value={panel.value}
          bgColor="bg-primary"
        />
      ))}
    </div>
  );
};

const StatCard = ({ label, value, bgColor }: { label: string; value: number; bgColor: string }) => (
  <div className={cn("rounded-md p-3 flex items-center gap-3", bgColor)}>
    <span className="font-bold text-sm uppercase tracking-wide text-background">
      {label}
    </span>
    <span className="text-2xl font-bold text-background">{value}</span>
  </div>
);
