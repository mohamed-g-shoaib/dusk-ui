"use client";

import { Tabs } from "@base-ui/react/tabs";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import type { ExtendedDuskUIFile } from "@/lib/registry/component-processor";
import { SourcePreview } from "../component-showcase/source-preview";
import { ComponentCodePreviewHeader } from "./component-code-peview-header";

interface ComponentCodePreviewClientProps {
  processedFiles: ExtendedDuskUIFile[];
  dependencyNames: string[];
  name: string;
}

function formatDependencyName(name: string) {
  return name
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function ComponentCodePreviewClient({
  processedFiles,
  dependencyNames,
  name,
}: ComponentCodePreviewClientProps) {
  const [activeTab, setActiveTab] = useState<string>("0");

  // Convert active tab string to index for backward compatibility
  const activeFileIndex = useMemo(() => {
    return parseInt(activeTab, 10) || 0;
  }, [activeTab]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // Generate tab values based on file index
  const tabValues = useMemo(() => {
    return processedFiles.map((_, index) => index.toString());
  }, [processedFiles]);

  if (!processedFiles || processedFiles.length === 0) {
    return null;
  }

  const dependencyLabels = dependencyNames.map(formatDependencyName);

  // If there's only one file, render without tabs
  if (processedFiles.length === 1) {
    return (
      <div className="mt-3">
        {dependencyLabels.length > 0 && (
          <div className="mb-3 rounded-2xl border border-border/80 bg-muted/40 px-4 py-3">
            <p className="text-sm font-medium text-foreground">
              This component also needs these Dusk UI files.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Copy them too so the local imports resolve correctly.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dependencyLabels.map((label, index) => (
                <Link
                  key={dependencyNames[index]}
                  href={`/docs/components/${dependencyNames[index]}`}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl bg-code/50 border border-border relative bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_2px_1px_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-2xl)+4px)] after:border after:border-border/50 after:bg-clip-padding">
          <div className="showcase max-h-[min(80vh,900px)] overflow-y-auto overflow-hidden rounded-2xl">
            <SourcePreview currentFile={processedFiles[0]} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {dependencyLabels.length > 0 && (
        <div className="mb-3 rounded-2xl border border-border/80 bg-muted/40 px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            This component also needs these Dusk UI files.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy them too so the local imports resolve correctly.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {dependencyLabels.map((label, index) => (
              <Link
                key={dependencyNames[index]}
                href={`/docs/components/${dependencyNames[index]}`}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative border border-border bg-muted rounded-xl overflow-hidden">
        <LayoutGroup>
          <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
            <div className="flex flex-col">
              {/* Header with tabs */}
              <ComponentCodePreviewHeader
                componentSources={processedFiles}
                activeFileIndex={activeFileIndex}
              />

              {/* Content area - Using base UI tabs for proper height management */}
              <div className="border-t border-border relative -top-px">
                <MotionConfig
                  transition={{
                    duration: 0.3,
                    ease: [0.55, 0.055, 0.675, 0.19],
                  }}
                >
                  <AnimatePresence mode="wait">
                    {tabValues.map((tabValue) => {
                      const fileIndex = parseInt(tabValue, 10);
                      const file = processedFiles[fileIndex];

                      return (
                        <Tabs.Panel key={tabValue} value={tabValue} keepMounted>
                          {activeTab === tabValue && (
                            <motion.div
                              key={`${name}-${tabValue}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.55, 0.055, 0.675, 0.19],
                              }}
                              className="relative [will-change:transform,opacity]"
                            >
                              <div className="showcase max-h-[min(80vh,900px)] overflow-y-auto">
                                <SourcePreview currentFile={file} />
                              </div>
                            </motion.div>
                          )}
                        </Tabs.Panel>
                      );
                    })}
                  </AnimatePresence>
                </MotionConfig>
              </div>
            </div>
          </Tabs.Root>
        </LayoutGroup>
      </div>
    </div>
  );
}
