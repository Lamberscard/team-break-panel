import { useState, useEffect } from "react";
import { TeamGrid } from "@/components/TeamGrid";
import { StatsPanel } from "@/components/StatsPanel";
import { AdminPanel } from "@/components/AdminPanel";
import { getTeamsBySport, Sport } from "@/data/teams";
import { useToast } from "@/hooks/use-toast";

interface CustomPanel {
  label: string;
  value: number;
  visible: boolean;
}

const Index = () => {
  const { toast } = useToast();
  
  const [sport, setSport] = useState<Sport>(() => {
    const saved = localStorage.getItem('breakSport');
    return (saved as Sport) || 'NBA';
  });
  
  const [selectedTeams, setSelectedTeams] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedTeams');
    return saved ? JSON.parse(saved) : [];
  });

  const [userLogo, setUserLogo] = useState<string | null>(() => {
    return localStorage.getItem('userLogo');
  });

  const [customPanels, setCustomPanels] = useState<CustomPanel[]>(() => {
    const saved = localStorage.getItem('customPanels');
    return saved ? JSON.parse(saved) : [
      { label: 'STASH PASS', value: 30, visible: false },
      { label: 'SEE 2 PICK 1', value: 40, visible: false },
    ];
  });

  const teams = getTeamsBySport(sport);

  useEffect(() => {
    localStorage.setItem('breakSport', sport);
  }, [sport]);

  useEffect(() => {
    localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
  }, [selectedTeams]);

  useEffect(() => {
    if (userLogo) {
      localStorage.setItem('userLogo', userLogo);
    } else {
      localStorage.removeItem('userLogo');
    }
  }, [userLogo]);

  useEffect(() => {
    localStorage.setItem('customPanels', JSON.stringify(customPanels));
  }, [customPanels]);

  const handleTeamToggle = (teamId: string) => {
    setSelectedTeams(prev => {
      if (prev.includes(teamId)) {
        return prev.filter(id => id !== teamId);
      }
      return [...prev, teamId];
    });
  };

  const handleSportChange = (newSport: Sport) => {
    setSport(newSport);
    setSelectedTeams([]);
    toast({
      title: "Sport Changed",
      description: `Switched to ${newSport}. All selections reset.`,
    });
  };

  const handleReset = () => {
    setSelectedTeams([]);
    toast({
      title: "Break Reset",
      description: "All team selections have been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-accent to-secondary p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          {userLogo ? (
            <img src={userLogo} alt="Logo" className="h-12 object-contain" />
          ) : (
            <div className="h-12 w-12 bg-background/20 rounded-lg" />
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-background text-stroke uppercase tracking-wider">
            {sport} Box Break
          </h1>
          <div className="h-12 w-12" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content - 16:9 aspect ratio */}
      <div className="container mx-auto p-4">
        <div className="aspect-video bg-card rounded-lg shadow-2xl overflow-hidden border-4 border-primary">
          <div className="h-full flex">
            {/* Team Grid */}
            <div className="flex-1 overflow-auto">
              <TeamGrid
                teams={teams}
                selectedTeams={selectedTeams}
                onTeamToggle={handleTeamToggle}
              />
            </div>

            {/* Stats Panel */}
            <div className="w-64 bg-card border-l-4 border-primary">
              <StatsPanel
                totalTeams={teams.length}
                soldTeams={selectedTeams.length}
                customPanels={customPanels}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel
        sport={sport}
        onSportChange={handleSportChange}
        customPanels={customPanels}
        onCustomPanelsChange={setCustomPanels}
        userLogo={userLogo}
        onUserLogoChange={setUserLogo}
        onReset={handleReset}
      />
    </div>
  );
};

export default Index;
