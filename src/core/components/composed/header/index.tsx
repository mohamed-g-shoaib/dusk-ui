import Link from "next/link";

import { cn } from "@/lib/classes";
import { DuskUILogo } from "../logo";
import { ThemeToggle } from "../theme-toggle";
import { GithubButton } from "./github-button";
import { HeaderNav } from "./header-nav";
import { DuskUISidebarToggleButton } from "./sidebar-toggle-button";

export function Header() {
  return (
    <header className="fixed top-0 z-40 w-full backdrop-blur-lg border-b bg-sidebar">
      <div className="mx-auto w-full max-w-full">
        <div className="flex h-16 items-center justify-between gap-2 md:gap-4 px-6">
          <div className="mr-6 sm:mr-12 flex gap-2 md:gap-0">
            <DuskUISidebarToggleButton />

            <div className="flex items-center gap-1 max-md:hidden">
              <Link href="/" className="flex items-center gap-1">
                <DuskUILogo
                  aria-hidden="true"
                  className="h-6 w-auto shrink-0"
                />
                <div
                  className={cn(
                    "[--text-color:linear-gradient(180deg,#555_0%,#000_100%)] dark:[--text-color:linear-gradient(180deg,#fff_0%,#adadad_100%)]",
                    "bg-clip-text text-transparent bg-(image:--text-color) font-semibold relative text-xl font-chillax",
                  )}
                >
                  Dusk UI
                </div>
              </Link>
            </div>
          </div>

          <HeaderNav />

          <div className="flex items-center gap-4">
            <GithubButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
