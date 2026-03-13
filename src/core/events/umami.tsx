export function Analytics() {
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim();
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction || !scriptUrl || !websiteId) return null;

  return (
    <script
      defer
      src="/metrics/lib.js"
      data-website-id={websiteId}
      data-host-url="/metrics"
    />
  );
}
