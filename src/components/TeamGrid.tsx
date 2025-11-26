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
    <div className="grid grid-cols-5 landscape:grid-cols-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-0.5 p-1.5 sm:p-2 h-full content-start items-start">
      {teams.map((team) => {
        const isSelected = selectedTeams.includes(team.id);
        const isTradeAvailable = tradeTeams.includes(team.id);
        return (
          <button
            key={team.id}
            onClick={() => onTeamToggle(team.id)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ease-in-out w-full group",
              "flex items-center justify-center p-0.5",
              "border backdrop-blur-sm hover:scale-[1.03] active:scale-95",
              "shadow-sm hover:shadow-md",
              isSelected 
                ? "opacity-40 grayscale border-white/20" 
                : "opacity-100 hover:animate-glow-pulse border-white/30",
              isTradeAvailable && "animate-trade-glow !border-amber-400/60"
            )}
            style={{
              backgroundColor: getBgColor()
            }}
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-full h-full object-contain"
            />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <span className="text-sm sm:text-base font-bold text-white/90 text-center px-2 leading-tight">
                  {team.name}
                </span>
              </div>
            )}
            {!isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm sm:text-base font-bold text-white/90 text-center px-2 leading-tight">
                  {team.name}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
