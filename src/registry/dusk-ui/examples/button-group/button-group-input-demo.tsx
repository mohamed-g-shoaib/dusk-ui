import { SearchIcon } from "lucide-react";

import { Button } from "@/registry/dusk-ui/ui/button";
import { ButtonGroup } from "@/registry/dusk-ui/ui/button-group";
import { Input } from "@/registry/dusk-ui/ui/input";

export function ButtonGroupInputDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
