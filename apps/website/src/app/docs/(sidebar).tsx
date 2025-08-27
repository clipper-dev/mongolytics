"use client";

import { docsConfig } from "@/data/docs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full p-2 md:w-36 lg:w-48 shrink-0 border-r hidden md:block">
      <nav className="flex flex-col gap-2">
        {docsConfig.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-muted text-primary" // Active link style
                : "text-muted-foreground hover:bg-muted/50" // Inactive link style
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
