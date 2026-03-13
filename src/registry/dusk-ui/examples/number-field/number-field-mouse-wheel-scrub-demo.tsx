import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/dusk-ui/ui/number-field";
import { Label } from "@/registry/dusk-ui/ui/label";

export function NumberFieldMouseWheelScrubDemo() {
  return (
    <div className="flex flex-col gap-5">
      <NumberField defaultValue={0} allowWheelScrub id="marks">
        <NumberFieldScrubArea>
          <Label htmlFor="marks" className="cursor-ew-resize">
            Marks
          </Label>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
