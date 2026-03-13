import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@/registry/dusk-ui/ui/switch";
import { Label } from "@/registry/dusk-ui/ui/label";

export function SwitchWithIconsDemo() {
  return (
    <Label className="cursor-pointer">
      <Switch />
      <span>Dark Mode</span>
    </Label>
  );
}
