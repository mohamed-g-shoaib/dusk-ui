import { Switch } from "@/registry/dusk-ui/ui/switch";
import { Label } from "@/registry/dusk-ui/ui/label";

export function SwitchInteractiveDemo() {
  return (
    <Label className="cursor-pointer">
      <Switch isInteractive />
      <span>Enable notifications</span>
    </Label>
  );
}
