import { Tabs } from "@base-ui/react/tabs";
import { motion } from "motion/react";
import { type SVGProps, useMemo } from "react";

import {
  CSSIcon,
  ReactIcon,
  TypescriptOfficialIcon,
} from "@/core/icons/extension-file-icons";
import { cn } from "@/lib/classes";
import type { RegistryItemFile } from "@/lib/registry/schemas";

export type ProcessedComponentSource = RegistryItemFile & {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  displayName: string;
  extension: string;
};

interface ComponentFilesProps {
  componentSources: RegistryItemFile[];
  activeFileIndex?: number;
}

// File extension to icon mapping
const getFileIcon = (path: string) => {
  const extension = path.split(".").pop()?.toLowerCase() || "";

  switch (extension) {
    case "tsx":
    case "jsx":
      return ReactIcon;
    case "ts":
      return TypescriptOfficialIcon;
    case "js":
      return TypescriptOfficialIcon;
    case "css":
    case "scss":
    case "sass":
    case "less":
      return CSSIcon;
  }
};

// Get file name without extension for display
const getFileName = (path: string) => {
  const parts = path.split("/");
  const fileName = parts.at(-1) || path;

  if (!fileName.startsWith("index.")) {
    return fileName;
  }

  const extension = fileName.split(".").pop();
  const parentDirectory = parts.at(-2);

  if (!parentDirectory || !extension) {
    return fileName;
  }

  return `${parentDirectory}.${extension}`;
};

export function ComponentCodePreviewHeader({
  componentSources,
  activeFileIndex,
}: ComponentFilesProps) {
  // Process file sources to include icon and display name
  const processedSources = useMemo(() => {
    return componentSources.map((source) => ({
      ...source,
      icon: getFileIcon(source.path),
      displayName: getFileName(source.path),
      extension: source.path.split(".").pop()?.toLowerCase() || "",
    })) as ProcessedComponentSource[];
  }, [componentSources]);

  return (
    <Tabs.List className="relative flex items-center gap-3 pr-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] z-2 overflow-x-auto shrink-0">
      {processedSources.map((source, index) => {
        const tabValue = index.toString();
        const isActive = activeFileIndex === index;
        const IconComponent = source.icon;

        return (
          <Tabs.Tab
            key={source.path}
            value={tabValue}
            className={cn(
              "relative z-2 flex items-center gap-2 px-4 py-2.5 text-sm font-medium [transition:color_0.05s] ease-spring-soft whitespace-nowrap cursor-pointer shrink-0 [will-change:transform]",
              "before:absolute before:left-[-0.375rem] before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-border/70 first:before:hidden",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <div className="relative flex items-center gap-2 z-10">
              {IconComponent && (
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    color: isActive ? "var(--color-primary)" : "currentColor",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <IconComponent
                    className={cn(
                      "size-4 transition-colors duration-200",
                      isActive
                        ? "text-primary grayscale-0"
                        : "text-muted-foreground/70 grayscale-100",
                    )}
                  />
                </motion.div>
              )}

              <span className="font-medium">{source.displayName}</span>
            </div>
          </Tabs.Tab>
        );
      })}

      <Tabs.Indicator className="absolute left-0 top-1/2 z-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 bg-muted transition-all duration-200 ease-in-out" />
    </Tabs.List>
  );
}
