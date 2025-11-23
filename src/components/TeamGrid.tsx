import { Team } from "@/data/teams";
import { cn } from "@/lib/utils";

interface TeamGridProps {
  teams: Team[];
  selectedTeams: string[];
  onTeamToggle: (teamId: string) => void;
}

export const TeamGrid = ({ teams, selectedTeams, onTeamToggle }: TeamGridProps) => {
  return (
    <div className="grid grid-cols-6 auto-rows-fr gap-3 p-3 h-full content-start">
      {teams.map((team) => {
        const isSelected = selectedTeams.includes(team.id);
        return (
          <button
            key={team.id}
            onClick={() => onTeamToggle(team.id)}
            className={cn(
              "relative w-full h-20 rounded overflow-hidden transition-all duration-200",
              "flex items-center justify-center p-2",
              "border-2 hover:scale-105 active:scale-95",
              isSelected ? "opacity-40 grayscale" : "opacity-100"
            )}
            style={{
              borderColor: team.color,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <img
              src={team.logo}
              alt={team.name}
              className="max-w-[70%] max-h-[70%] object-contain"
            />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <span className="text-3xl font-bold text-red-500">✗</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
