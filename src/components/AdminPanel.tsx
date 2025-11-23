import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Settings, Plus, Trash2, Edit } from "lucide-react";
import { Sport, Team } from "@/data/teams";

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
  showLogoBg: boolean;
  onShowLogoBgChange: (show: boolean) => void;
  bgColor: string;
  onBgColorChange: (color: string) => void;
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
  showLogoBg,
  onShowLogoBgChange,
  bgColor,
  onBgColorChange,
}: AdminPanelProps) => {
  const [logoInput, setLogoInput] = useState(userLogo || "");
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
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

          {/* Logo Background Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label>Fond noir des logos</Label>
              <p className="text-sm text-muted-foreground">Afficher un fond noir derrière les logos des équipes</p>
            </div>
            <Switch
              checked={showLogoBg}
              onCheckedChange={onShowLogoBgChange}
            />
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <Label>Couleur de fond</Label>
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
