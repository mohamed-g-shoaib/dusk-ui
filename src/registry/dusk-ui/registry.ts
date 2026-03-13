import { registryItemSchema, type Registry } from "shadcn/schema";
import { z } from "zod";

import { duskUIComponents } from "./ui/_registry";
import { duskUILib } from "./lib/_registry";
import { duskUICompExamples } from "./examples/_registry";
import { duskUIBlocks } from "./blocks/_registry";

const DUSK_UI_STYLE = {
  type: "registry:style",
  dependencies: ["lucide-react", "tailwind-variants"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["classes"],
  cssVars: {},
  files: [],
};

export const registry = {
  name: "Dusk UI",
  homepage: "https://dusk-ui.vercel.app",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...DUSK_UI_STYLE,
    },
    ...duskUIComponents,
    ...duskUILib,
    ...duskUICompExamples,
    ...duskUIBlocks,
  ]),
} satisfies Registry;
