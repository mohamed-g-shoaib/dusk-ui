import type { NextRequest } from "next/server";

import { registry } from "@/registry/dusk-ui/registry";

export const revalidate = 3600;

const excludedTypes = new Set([
  "registry:example",
  "registry:style",
  "registry:lib",
]);

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(request: NextRequest) {
  const baseUrl = new URL(request.url).origin;
  const now = new Date().toUTCString();

  const items = registry.items
    .filter((item) => !excludedTypes.has(item.type))
    .map((item) => {
      const title = item.title ?? item.name;
      const description = item.description ?? `Dusk UI ${item.name} update`;
      const link = `${baseUrl}/docs/components/${item.name}`;

      return [
        "<item>",
        `<title>${escapeXml(title)}</title>`,
        `<description>${escapeXml(description)}</description>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid>${escapeXml(link)}</guid>`,
        `<pubDate>${now}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const rssXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>@dusk-ui</title>",
    "<description>Subscribe to @dusk-ui updates</description>",
    `<link>${escapeXml(baseUrl)}</link>`,
    `<lastBuildDate>${now}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}