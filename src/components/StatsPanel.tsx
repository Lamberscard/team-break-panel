import { cn } from "@/lib/utils";

interface StatsPanelProps {
  totalTeams: number;
  soldTeams: number;
  customPanels: Array<{ label: string; value: number; visible: boolean }>;
  tradeMode: boolean;
  onTradeModeToggle: () => void;
}

export const StatsPanel = ({ totalTeams, soldTeams, customPanels, tradeMode, onTradeModeToggle }: StatsPanelProps) => {
  const remaining = totalTeams - soldTeams;

  return (
    <div className="flex flex-row gap-2 p-1.5 items-center justify-center">
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
        <button
          onClick={onTradeModeToggle}
          className={cn(
            "rounded-md p-4 flex items-center gap-2 transition-all duration-300 font-bold text-base uppercase tracking-wide",
            tradeMode 
              ? "bg-amber-500 text-black animate-trade-glow shadow-lg" 
              : "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 border-2 border-amber-500/50"
          )}
        >
          <span>Trade Mode</span>
          {tradeMode && <span className="text-xl">✓</span>}
        </button>
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
  <div className={cn("rounded-md p-4 flex items-center gap-4", bgColor)}>
    <span className="font-bold text-base uppercase tracking-wide text-background">
      {label}
    </span>
    <span className="text-3xl font-bold text-background">{value}</span>
  </div>
);
