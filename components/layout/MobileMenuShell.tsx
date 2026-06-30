"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileMenuShellProps {
  logo: ReactNode;
  desktopNav: ReactNode;
}

export function MobileMenuShell({ logo, desktopNav }: MobileMenuShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#141414]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {logo}
        {desktopNav}

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-brand-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-[#141414] md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) =>
            "children" in link ? (
              <div key={link.href}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-brand-white"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {servicesOpen && (
                  <div className="mb-2 ml-4 flex flex-col border-l border-white/10 pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="min-h-11 py-2.5 text-sm text-brand-white/80"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-brand-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
          <Button href="/contact" className="mt-4 w-full">
            Schedule a Consultation
          </Button>
        </nav>
      </div>
    </header>
  );
}
