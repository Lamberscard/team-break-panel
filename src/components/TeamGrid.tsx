import { Team } from "@/data/teams";
import { cn } from "@/lib/utils";

interface TeamGridProps {
  teams: Team[];
  selectedTeams: string[];
  onTeamToggle: (teamId: string) => void;
  showLogoBg: boolean;
}

export const TeamGrid = ({ teams, selectedTeams, onTeamToggle, showLogoBg }: TeamGridProps) => {
  return (
    <div className="grid grid-cols-8 gap-1.5 p-2 h-full content-center">
      {teams.map((team) => {
        const isSelected = selectedTeams.includes(team.id);
        return (
          <div key={team.id} className="flex flex-col items-center gap-0.5">
            <button
              onClick={() => onTeamToggle(team.id)}
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition-all duration-300 ease-in-out w-full",
                "flex items-center justify-center p-1.5",
                "border-3 hover:scale-[1.03] active:scale-95",
                isSelected 
                  ? "opacity-40 grayscale" 
                  : "opacity-100 hover:animate-glow-pulse"
              )}
              style={{
                borderColor: team.color,
                backgroundColor: showLogoBg ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
                borderWidth: '3px'
              }}
            >
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-contain"
              />
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <span className="text-4xl font-bold text-red-500">✗</span>
                </div>
              )}
            </button>
            <span className="text-[0.5rem] text-center text-foreground/80 font-medium leading-tight px-0.5 line-clamp-2">
              {team.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
