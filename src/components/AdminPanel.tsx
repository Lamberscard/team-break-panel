import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { Sport } from "@/data/teams";

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
}

export const AdminPanel = ({
  sport,
  onSportChange,
  customPanels,
  onCustomPanelsChange,
  userLogo,
  onUserLogoChange,
  onReset,
}: AdminPanelProps) => {
  const [logoInput, setLogoInput] = useState(userLogo || "");

  const updatePanel = (index: number, updates: Partial<CustomPanel>) => {
    const newPanels = [...customPanels];
    newPanels[index] = { ...newPanels[index], ...updates };
    onCustomPanelsChange(newPanels);
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

          {/* Reset Button */}
          <Button onClick={onReset} variant="destructive" className="w-full">
            Reset Break
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
