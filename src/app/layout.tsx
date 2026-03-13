import type { Metadata } from "next";

import "@/styles/globals.css";
import { cn } from "@/lib/classes";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/core/providers";
import { ToastProvider } from "@/registry/dusk-ui/ui/toast";

import { Analytics } from "@/core/events/umami";

export const metadata: Metadata = {
  title: "Dusk UI",
  description: "A modern React UI component library built on Base UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontVariables,
          "overscroll-none antialiased font-sans h-full"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ToastProvider position="bottom-right">{children}</ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
