import { Effect } from "effect";
import { processFilesWithErrorCollection } from "@/lib/registry/component-processor";
import { getComponentRegistryItemCached } from "@/lib/registry/process-registry";
import { ComponentCodePreviewClient } from "./component-code-preview.client";

interface ComponentCodePreviewProps {
  name: string;
}

async function collectComponentBundle(
  name: string,
  visited = new Set<string>(),
) {
  if (visited.has(name)) {
    return [];
  }

  visited.add(name);

  const item = await getComponentRegistryItemCached(name);

  if (!item) {
    return [];
  }

  const dependencyItems = await Promise.all(
    (item.registryDependencies ?? [])
      .filter((dependency) => dependency !== "classes")
      .map((dependency) => collectComponentBundle(dependency, visited)),
  );

  return [item, ...dependencyItems.flat()];
}

export async function ComponentCodePreview({
  name,
}: ComponentCodePreviewProps) {
  const bundleItems = await collectComponentBundle(name);
  const [item, ...dependencyItems] = bundleItems;

  if (!item || !item.files) {
    return <div>Component not found</div>;
  }

  const files = bundleItems
    .flatMap((bundleItem) => bundleItem.files ?? [])
    .filter(
      (file, index, array) =>
        array.findIndex((entry) => entry.path === file.path) === index,
    );

  // Process files with error collection
  const result = await Effect.runPromise(
    processFilesWithErrorCollection(files),
  );

  return (
    <ComponentCodePreviewClient
      processedFiles={result.successful}
      dependencyNames={dependencyItems.map((dependency) => dependency.name)}
      name={name}
    />
  );
}
