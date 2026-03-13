import { Label } from "@/registry/dusk-ui/ui/label";
import { Radio, RadioGroup } from "@/registry/dusk-ui/ui/radio-group";

export function RadioGroupBasicDemo() {
  return (
    <RadioGroup defaultValue="light">
      <Label>
        <Radio value="light" /> Light Theme
      </Label>
      <Label>
        <Radio value="dark" /> Dark Theme
      </Label>
      <Label>
        <Radio value="system" /> System Default
      </Label>
    </RadioGroup>
  );
}
