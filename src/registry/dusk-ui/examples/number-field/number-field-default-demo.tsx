import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/dusk-ui/ui/number-field";
import { Label } from "@/registry/dusk-ui/ui/label";

export function NumberFieldDefaultDemo() {
  return (
    <NumberField defaultValue={0} id="quantity">
      <NumberFieldScrubArea>
        <Label htmlFor="quantity" className="cursor-ew-resize">
          Quantity
        </Label>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
