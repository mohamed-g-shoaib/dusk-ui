import { Textarea } from "@/registry/dusk-ui/ui/textarea";

export function TextareaLargeSizeDemo() {
  return (
    <Textarea
      size="lg"
      placeholder="Type your message here"
      className="max-w-72"
    />
  );
}
