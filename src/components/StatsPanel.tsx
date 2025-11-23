import { cn } from "@/lib/utils";

interface StatsPanelProps {
  totalTeams: number;
  soldTeams: number;
  customPanels: Array<{ label: string; value: number; visible: boolean }>;
}

export const StatsPanel = ({ totalTeams, soldTeams, customPanels }: StatsPanelProps) => {
  const remaining = totalTeams - soldTeams;

  return (
    <div className="flex flex-col gap-2 p-2">
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
  <div className={cn("rounded-md p-3 flex items-center justify-between", bgColor)}>
    <span className="font-bold text-base uppercase tracking-wide text-background">
      {label}
    </span>
    <span className="text-3xl font-bold text-background">{value}</span>
  </div>
);
