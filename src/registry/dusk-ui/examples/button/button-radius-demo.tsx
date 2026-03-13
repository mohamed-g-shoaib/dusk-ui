import { Button } from "@/registry/dusk-ui/ui/button";

export function ButtonRadiusDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button radius="none">Dusk UI Button</Button>
      <Button radius="sm">Dusk UI Button</Button>
      <Button radius="default">Dusk UI Button</Button>
      <Button radius="lg">Dusk UI Button</Button>
      <Button radius="xl">Dusk UI Button</Button>
      <Button radius="full">Dusk UI Button</Button>
    </div>
  );
}
