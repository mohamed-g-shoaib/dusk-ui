export function getAppUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://dusk-ui.vercel.app";
  }

  return "http://localhost:3001";
}
