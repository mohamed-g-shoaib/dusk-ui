import { Button } from "@/registry/dusk-ui/ui/button";
import { Kbd } from "@/registry/dusk-ui/ui/kbd";

export function KbdButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  );
}
