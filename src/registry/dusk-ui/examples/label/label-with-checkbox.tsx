import { Checkbox } from "@/registry/dusk-ui/ui/checkbox";
import { Label } from "@/registry/dusk-ui/ui/label";

export function LabelWithCheckbox() {
  return (
    <Label>
      <Checkbox />
      Accept terms and conditions
    </Label>
  );
}
