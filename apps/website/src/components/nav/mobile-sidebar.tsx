// apps/website/src/app/docs/_components/mobile-sidebar.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "../brand/logo";
import { docsConfig } from "@/data/docs";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm">
        <div className="flex items-center gap-3 py-4 border-b mb-4">
          <Logo />
        </div>
        <nav className="flex flex-col gap-2">
          {docsConfig.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}