import { Team } from "@/data/teams";
import { cn } from "@/lib/utils";

interface TeamGridProps {
  teams: Team[];
  selectedTeams: string[];
  tradeTeams: string[];
  tradeMode: boolean;
  onTeamToggle: (teamId: string) => void;
  logoBgColor: 'black' | 'white' | 'transparent';
}

export const TeamGrid = ({ teams, selectedTeams, tradeTeams, tradeMode, onTeamToggle, logoBgColor }: TeamGridProps) => {
  const getBgColor = () => {
    switch (logoBgColor) {
      case 'black': return 'rgba(0, 0, 0, 0.7)';
      case 'white': return 'rgba(255, 255, 255, 0.7)';
      default: return 'transparent';
    }
  };
  return (
    <div className="grid grid-cols-5 landscape:grid-cols-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-0.5 p-0.5 sm:p-1 h-full content-start items-start">
      {teams.map((team) => {
        const isSelected = selectedTeams.includes(team.id);
        const isTradeAvailable = tradeTeams.includes(team.id);
        return (
          <div key={team.id} className="flex flex-col items-center gap-0">
            <button
              onClick={() => onTeamToggle(team.id)}
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition-all duration-300 ease-in-out w-full",
                "flex items-center justify-center p-0.5",
                "border-2 hover:scale-[1.03] active:scale-95",
                isSelected 
                  ? "opacity-40 grayscale" 
                  : "opacity-100 hover:animate-glow-pulse",
                isTradeAvailable && "animate-trade-glow"
              )}
              style={{
                borderColor: isTradeAvailable ? '#fbbf24' : team.color,
                backgroundColor: getBgColor(),
                borderWidth: '2px'
              }}
            >
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-contain"
              />
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <span className="text-2xl font-bold text-red-500">✗</span>
                </div>
              )}
            </button>
            <span className="text-[0.4rem] sm:text-[0.5rem] text-center text-foreground font-semibold leading-none px-0.5 line-clamp-1 mt-0.5">
              {team.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
