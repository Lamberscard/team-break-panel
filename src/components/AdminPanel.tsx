import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings, Plus, Trash2, Edit, Palette } from "lucide-react";
import { Sport, Team } from "@/data/teams";

const colorPresets = {
  default: {
    name: "Défaut",
    bgColor: "#212329",
    gridBgColor: "#1a1d23",
    borderColor: "#00bfff",
    icon: "⚫"
  },
  cyberpunk: {
    name: "Cyberpunk",
    bgColor: "#0a0e27",
    gridBgColor: "transparent",
    borderColor: "#ff00ff",
    icon: "🌆"
  },
  ocean: {
    name: "Océan",
    bgColor: "#001f3f",
    gridBgColor: "rgba(0, 31, 63, 0.7)",
    borderColor: "#00d4ff",
    icon: "🌊"
  },
  fire: {
    name: "Feu",
    bgColor: "#1a0a00",
    gridBgColor: "rgba(51, 17, 0, 0.7)",
    borderColor: "#ff4500",
    icon: "🔥"
  },
  forest: {
    name: "Forêt",
    bgColor: "#0d1f0d",
    gridBgColor: "rgba(13, 31, 13, 0.8)",
    borderColor: "#32cd32",
    icon: "🌲"
  },
  neon: {
    name: "Néon",
    bgColor: "#1a001a",
    gridBgColor: "transparent",
    borderColor: "#ff1493",
    icon: "💜"
  }
};

interface CustomPanel {
  label: string;
  value: number;
  visible: boolean;
}

interface AdminPanelProps {
  sport: Sport;
  onSportChange: (sport: Sport) => void;
  customPanels: CustomPanel[];
  onCustomPanelsChange: (panels: CustomPanel[]) => void;
  userLogo: string | null;
  onUserLogoChange: (logo: string) => void;
  onReset: () => void;
  customTeams: Team[];
  onCustomTeamsChange: (teams: Team[]) => void;
  logoBgColor: 'black' | 'white' | 'transparent';
  onLogoBgColorChange: (color: 'black' | 'white' | 'transparent') => void;
  bgColor: string;
  onBgColorChange: (color: string) => void;
  obsMode: boolean;
  onObsModeChange: (mode: boolean) => void;
  bannerLogo: string | null;
  onBannerLogoChange: (logo: string) => void;
  gridBgColor: string;
  onGridBgColorChange: (color: string) => void;
  borderColor: string;
  onBorderColorChange: (color: string) => void;
  showAnimation: boolean;
  onShowAnimationChange: (show: boolean) => void;
  animationIntensity: number;
  onAnimationIntensityChange: (intensity: number) => void;
  showSmoothElements: boolean;
  onShowSmoothElementsChange: (show: boolean) => void;
}

export const AdminPanel = ({
  sport,
  onSportChange,
  customPanels,
  onCustomPanelsChange,
  userLogo,
  onUserLogoChange,
  onReset,
  customTeams,
  onCustomTeamsChange,
  logoBgColor,
  onLogoBgColorChange,
  bgColor,
  onBgColorChange,
  obsMode,
  onObsModeChange,
  bannerLogo,
  onBannerLogoChange,
  gridBgColor,
  onGridBgColorChange,
  borderColor,
  onBorderColorChange,
  showAnimation,
  onShowAnimationChange,
  animationIntensity,
  onAnimationIntensityChange,
  showSmoothElements,
  onShowSmoothElementsChange,
}: AdminPanelProps) => {
  const [logoInput, setLogoInput] = useState(userLogo || "");
  const [bannerInput, setBannerInput] = useState(bannerLogo || "");
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeam, setNewTeam] = useState({ name: "", logo: "", color: "#000000" });

  const updatePanel = (index: number, updates: Partial<CustomPanel>) => {
    const newPanels = [...customPanels];
    newPanels[index] = { ...newPanels[index], ...updates };
    onCustomPanelsChange(newPanels);
  };

  const addCustomTeam = () => {
    if (newTeam.name && newTeam.logo) {
      const team: Team = {
        id: `custom-${Date.now()}`,
        name: newTeam.name,
        logo: newTeam.logo,
        color: newTeam.color,
        sport: sport,
      };
      onCustomTeamsChange([...customTeams, team]);
      setNewTeam({ name: "", logo: "", color: "#000000" });
    }
  };

  const updateCustomTeam = (team: Team) => {
    const updatedTeams = customTeams.map(t => t.id === team.id ? team : t);
    onCustomTeamsChange(updatedTeams);
    setEditingTeam(null);
  };

  const deleteCustomTeam = (teamId: string) => {
    onCustomTeamsChange(customTeams.filter(t => t.id !== teamId));
  };

  const applyColorPreset = (presetKey: keyof typeof colorPresets) => {
    const preset = colorPresets[presetKey];
    onBgColorChange(preset.bgColor);
    onGridBgColorChange(preset.gridBgColor);
    onBorderColorChange(preset.borderColor);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg z-50 hover:bg-primary/90"
          style={{ backgroundColor: borderColor, borderColor: borderColor }}
        >
          <Settings className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Admin Panel</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Sport Selection */}
          <div className="space-y-2">
            <Label>Sport</Label>
            <Select value={sport} onValueChange={(value) => onSportChange(value as Sport)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="NFL">NFL</SelectItem>
                <SelectItem value="SOCCER">Soccer</SelectItem>
                <SelectItem value="MLB">MLB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Logo */}
          <div className="space-y-2">
            <Label>Your Logo URL</Label>
            <div className="flex gap-2">
              <Input
                value={logoInput}
                onChange={(e) => setLogoInput(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <Button onClick={() => onUserLogoChange(logoInput)}>
                Save
              </Button>
            </div>
            {userLogo && (
              <div className="mt-2 p-2 bg-muted rounded-lg">
                <img src={userLogo} alt="User logo" className="h-16 object-contain" />
              </div>
            )}
          </div>

          {/* Logo Background Select */}
          <div className="space-y-2">
            <Label>Fond des logos</Label>
            <Select value={logoBgColor} onValueChange={(value) => onLogoBgColorChange(value as 'black' | 'white' | 'transparent')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Noir</SelectItem>
                <SelectItem value="white">Blanc</SelectItem>
                <SelectItem value="transparent">Transparent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Presets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <Label>Presets de Couleurs</Label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(colorPresets).map(([key, preset]) => (
                <Button
                  key={key}
                  variant="outline"
                  className="h-auto py-3 flex flex-col gap-1"
                  onClick={() => applyColorPreset(key as keyof typeof colorPresets)}
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="text-xs">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Animation Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label>Animation du fond</Label>
              <p className="text-sm text-muted-foreground">Activer les effets animés en arrière-plan</p>
            </div>
            <Switch
              checked={showAnimation}
              onCheckedChange={onShowAnimationChange}
            />
          </div>

          {/* Animation Intensity Slider */}
          {showAnimation && (
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Intensité de l'animation</Label>
                <p className="text-sm text-muted-foreground">
                  {animationIntensity === 1 && "Subtile - Mouvement léger"}
                  {animationIntensity === 2 && "Modérée - Équilibrée"}
                  {animationIntensity === 3 && "Intense - Mouvement prononcé"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Subtile</span>
                <Slider
                  value={[animationIntensity]}
                  onValueChange={(value) => onAnimationIntensityChange(value[0])}
                  min={1}
                  max={3}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground">Intense</span>
              </div>
            </div>
          )}

          {/* Smooth Elements Toggle */}
          {showAnimation && (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Particules et étoiles</Label>
                <p className="text-sm text-muted-foreground">Ajouter des particules flottantes et un effet étoilé</p>
              </div>
              <Switch
                checked={showSmoothElements}
                onCheckedChange={onShowSmoothElementsChange}
              />
            </div>
          )}

          {/* Banner Logo */}
          <div className="space-y-2">
            <Label>Logo bannière (970x90px recommandé)</Label>
            <div className="flex gap-2">
              <Input
                value={bannerInput}
                onChange={(e) => setBannerInput(e.target.value)}
                placeholder="https://example.com/banner.png"
              />
              <Button onClick={() => onBannerLogoChange(bannerInput)}>
                Save
              </Button>
            </div>
            {bannerLogo && (
              <div className="mt-2 p-2 bg-muted rounded-lg">
                <img src={bannerLogo} alt="Banner logo" className="h-[90px] w-auto max-w-full object-contain" />
              </div>
            )}
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <Label>Couleur de fond extérieur</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                placeholder="#212329"
                className="flex-1"
              />
            </div>
          </div>

          {/* Grid Background Color */}
          <div className="space-y-2">
            <Label>Couleur de fond du tableau</Label>
            <p className="text-sm text-muted-foreground mb-2">Utilisez "transparent" pour voir l'animation</p>
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={gridBgColor === 'transparent' ? '#1a1d23' : gridBgColor}
                onChange={(e) => onGridBgColorChange(e.target.value)}
                className="w-20 h-10"
                disabled={gridBgColor === 'transparent'}
              />
              <Input
                type="text"
                value={gridBgColor}
                onChange={(e) => onGridBgColorChange(e.target.value)}
                placeholder="#1a1d23 ou transparent"
                className="flex-1"
              />
            </div>
          </div>

          {/* Border Color */}
          <div className="space-y-2">
            <Label>Couleur du contour</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={borderColor}
                onChange={(e) => onBorderColorChange(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={borderColor}
                onChange={(e) => onBorderColorChange(e.target.value)}
                placeholder="#00bfff"
                className="flex-1"
              />
            </div>
          </div>

          {/* OBS Mode */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/10">
            <div className="space-y-0.5">
              <Label className="text-primary">Mode OBS / Plein écran</Label>
              <p className="text-sm text-muted-foreground">Masque les bordures et contrôles pour la capture d'écran</p>
            </div>
            <Switch
              checked={obsMode}
              onCheckedChange={onObsModeChange}
            />
          </div>

          {/* Custom Panels */}
          <div className="space-y-4">
            <Label className="text-lg">Custom Info Panels</Label>
            {customPanels.map((panel, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Panel {index + 1}</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`visible-${index}`}>Visible</Label>
                    <Switch
                      id={`visible-${index}`}
                      checked={panel.visible}
                      onCheckedChange={(checked) => updatePanel(index, { visible: checked })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={panel.label}
                      onChange={(e) => updatePanel(index, { label: e.target.value })}
                      placeholder="STASH PASS"
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      type="number"
                      value={panel.value}
                      onChange={(e) => updatePanel(index, { value: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Teams */}
          <div className="space-y-4">
            <Label className="text-lg">Équipes Personnalisées</Label>
            
            {/* Add New Team */}
            <div className="p-4 border rounded-lg space-y-3 bg-muted/50">
              <Label>Ajouter une nouvelle équipe</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Nom de l'équipe"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                />
                <Input
                  placeholder="URL du logo"
                  value={newTeam.logo}
                  onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                />
                <div className="flex gap-2 items-center">
                  <Input
                    type="color"
                    value={newTeam.color}
                    onChange={(e) => setNewTeam({ ...newTeam, color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <span className="text-sm text-muted-foreground">Couleur principale</span>
                </div>
                <Button onClick={addCustomTeam} className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>

            {/* List Custom Teams */}
            {customTeams.filter(t => t.sport === sport).map((team) => (
              <div key={team.id} className="p-4 border rounded-lg space-y-3">
                {editingTeam?.id === team.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editingTeam.name}
                      onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                    />
                    <Input
                      value={editingTeam.logo}
                      onChange={(e) => setEditingTeam({ ...editingTeam, logo: e.target.value })}
                    />
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        value={editingTeam.color}
                        onChange={(e) => setEditingTeam({ ...editingTeam, color: e.target.value })}
                        className="w-20 h-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => updateCustomTeam(editingTeam)} size="sm" className="flex-1">
                        Sauvegarder
                      </Button>
                      <Button onClick={() => setEditingTeam(null)} size="sm" variant="outline" className="flex-1">
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain" />
                      <span className="font-semibold">{team.name}</span>
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: team.color }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setEditingTeam(team)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteCustomTeam(team.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reset Button */}
          <Button onClick={onReset} variant="destructive" className="w-full">
            Reset Break
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
