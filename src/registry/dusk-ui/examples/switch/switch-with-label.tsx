import { Switch } from "@/registry/dusk-ui/ui/switch";
import { Label } from "@/registry/dusk-ui/ui/label";

export function SwitchWithLabel() {
  return (
    <Label className="cursor-pointer">
      <Switch />
      <span>Enable notifications</span>
    </Label>
  );
}
