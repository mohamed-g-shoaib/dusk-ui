export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <script
      defer
      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
    />
  );
}