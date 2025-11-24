import { useState, useEffect } from "react";
import { TeamGrid } from "@/components/TeamGrid";
import { StatsPanel } from "@/components/StatsPanel";
import { AdminPanel } from "@/components/AdminPanel";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getTeamsBySport, Sport, Team } from "@/data/teams";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import lambersLogo from "@/assets/lamberscard-logo.png";
import whatnotLogo from "@/assets/whatnot-logo.png";

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

  const [customPanels, setCustomPanels] = useState<CustomPanel[]>(() => {
    const saved = localStorage.getItem('customPanels');
    return saved ? JSON.parse(saved) : [
      { label: 'STASH PASS', value: 30, visible: false },
      { label: 'SEE 2 PICK 1', value: 40, visible: false },
    ];
  });

  const [customTeams, setCustomTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('customTeams');
    return saved ? JSON.parse(saved) : [];
  });

  const [logoBgColor, setLogoBgColor] = useState<'black' | 'white' | 'transparent'>(() => {
    const saved = localStorage.getItem('logoBgColor');
    return (saved as 'black' | 'white' | 'transparent') || 'black';
  });

  const [bgColor, setBgColor] = useState<string>(() => {
    return localStorage.getItem('bgColor') || '#212329';
  });

  const [obsMode, setObsMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('obsMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [gridBgColor, setGridBgColor] = useState<string>(() => {
    return localStorage.getItem('gridBgColor') || '#1a1d23';
  });

  const [showAnimation, setShowAnimation] = useState<boolean>(() => {
    const saved = localStorage.getItem('showAnimation');
    return saved ? JSON.parse(saved) : true;
  });

  const [animationIntensity, setAnimationIntensity] = useState<number>(() => {
    const saved = localStorage.getItem('animationIntensity');
    return saved ? parseInt(saved) : 2;
  });

  const [borderColor, setBorderColor] = useState<string>(() => {
    return localStorage.getItem('borderColor') || '#00bfff';
  });

  const [showSmoothElements, setShowSmoothElements] = useState<boolean>(() => {
    const saved = localStorage.getItem('showSmoothElements');
    return saved ? JSON.parse(saved) : false;
  });

  const [gradientColor1, setGradientColor1] = useState<string>(() => {
    return localStorage.getItem('gradientColor1') || '#00bfff';
  });

  const [gradientColor2, setGradientColor2] = useState<string>(() => {
    return localStorage.getItem('gradientColor2') || '#ff00ff';
  });

  const defaultTeams = getTeamsBySport(sport);
  const sportCustomTeams = customTeams.filter(t => t.sport === sport);
  const teams = [...defaultTeams, ...sportCustomTeams];

  useEffect(() => {
    localStorage.setItem('breakSport', sport);
  }, [sport]);

  useEffect(() => {
    localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
  }, [selectedTeams]);

  useEffect(() => {
    localStorage.setItem('customPanels', JSON.stringify(customPanels));
  }, [customPanels]);

  useEffect(() => {
    localStorage.setItem('customTeams', JSON.stringify(customTeams));
  }, [customTeams]);

  useEffect(() => {
    localStorage.setItem('logoBgColor', logoBgColor);
  }, [logoBgColor]);

  useEffect(() => {
    localStorage.setItem('bgColor', bgColor);
  }, [bgColor]);

  useEffect(() => {
    localStorage.setItem('obsMode', JSON.stringify(obsMode));
  }, [obsMode]);

  useEffect(() => {
    localStorage.setItem('gridBgColor', gridBgColor);
  }, [gridBgColor]);

  useEffect(() => {
    localStorage.setItem('showAnimation', JSON.stringify(showAnimation));
  }, [showAnimation]);

  useEffect(() => {
    localStorage.setItem('animationIntensity', animationIntensity.toString());
  }, [animationIntensity]);

  useEffect(() => {
    localStorage.setItem('borderColor', borderColor);
  }, [borderColor]);

  useEffect(() => {
    localStorage.setItem('showSmoothElements', JSON.stringify(showSmoothElements));
  }, [showSmoothElements]);

  useEffect(() => {
    localStorage.setItem('gradientColor1', gradientColor1);
  }, [gradientColor1]);

  useEffect(() => {
    localStorage.setItem('gradientColor2', gradientColor2);
  }, [gradientColor2]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && obsMode) {
        setObsMode(false);
        toast({
          title: "Mode OBS désactivé",
          description: "Vous pouvez maintenant accéder aux contrôles.",
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [obsMode, toast]);

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
    <div className="min-h-screen relative" style={{ 
      backgroundColor: bgColor,
      padding: obsMode ? '0' : '0.5rem'
    }}>
      {showAnimation && <AnimatedBackground intensity={animationIntensity} showSmoothElements={showSmoothElements} gradientColor1={gradientColor1} gradientColor2={gradientColor2} />}
      
      {/* Main Content - 16:9 aspect ratio */}
      <div className={obsMode ? "w-full h-screen relative z-10" : "w-full h-screen flex items-center justify-center p-2 relative z-10"}>
        <div 
          className={obsMode 
            ? `w-full h-full ${gridBgColor === 'transparent' || gridBgColor.startsWith('rgba') ? 'bg-transparent' : 'bg-card/95'} ${gridBgColor === 'transparent' ? '' : 'backdrop-blur-sm'}` 
            : `w-full max-w-[98vw] aspect-video ${gridBgColor === 'transparent' || gridBgColor.startsWith('rgba') ? 'bg-transparent' : 'bg-card/95'} ${gridBgColor === 'transparent' ? '' : 'backdrop-blur-sm'} rounded-lg shadow-2xl overflow-hidden border-2`
          }
          style={!obsMode ? { borderColor: borderColor } : {}}
        >
          <div className="h-full flex flex-col relative">
            {/* Team Grid */}
            <div className="flex-1 overflow-hidden" style={{ backgroundColor: gridBgColor }}>
              <TeamGrid
                teams={teams}
                selectedTeams={selectedTeams}
                onTeamToggle={handleTeamToggle}
                logoBgColor={logoBgColor}
              />
            </div>

            {/* Stats Panel */}
            <div className={obsMode ? "bg-card relative" : "bg-card border-t-2 relative"} style={!obsMode ? { borderColor: borderColor } : {}}>
              <StatsPanel
                totalTeams={teams.length}
                soldTeams={selectedTeams.length}
                customPanels={customPanels}
              />
              
              {/* Lamberscard & Whatnot Branding */}
              {!obsMode && (
                <div className="absolute left-4 bottom-3 flex items-center gap-6">
                  <a 
                    href="https://lamberscard.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <span className="text-sm font-semibold text-foreground">Créé par Lamberscard.com</span>
                    <img src={lambersLogo} alt="Lamberscard" className="h-8" />
                  </a>
                  <a 
                    href="https://whatnot.com/invite/lamberscard_com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <img src={whatnotLogo} alt="Whatnot" className="h-8" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      {!obsMode && (
        <AdminPanel
          sport={sport}
          onSportChange={handleSportChange}
          customPanels={customPanels}
          onCustomPanelsChange={setCustomPanels}
          onReset={handleReset}
          customTeams={customTeams}
          onCustomTeamsChange={setCustomTeams}
          logoBgColor={logoBgColor}
          onLogoBgColorChange={setLogoBgColor}
          bgColor={bgColor}
          onBgColorChange={setBgColor}
          obsMode={obsMode}
          onObsModeChange={setObsMode}
          gridBgColor={gridBgColor}
          onGridBgColorChange={setGridBgColor}
          borderColor={borderColor}
          onBorderColorChange={setBorderColor}
          showAnimation={showAnimation}
          onShowAnimationChange={setShowAnimation}
          animationIntensity={animationIntensity}
          onAnimationIntensityChange={setAnimationIntensity}
          showSmoothElements={showSmoothElements}
          onShowSmoothElementsChange={setShowSmoothElements}
          gradientColor1={gradientColor1}
          onGradientColor1Change={setGradientColor1}
          gradientColor2={gradientColor2}
          onGradientColor2Change={setGradientColor2}
        />
      )}

      {/* Exit OBS Mode Button */}
      {obsMode && (
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setObsMode(false);
            toast({
              title: "Mode OBS désactivé",
              description: "Vous pouvez maintenant accéder aux contrôles.",
            });
          }}
          className="fixed top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity bg-muted/50 backdrop-blur-sm w-8 h-8"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default Index;
