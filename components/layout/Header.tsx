"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn, withBasePath } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#141414]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="flex min-h-11 min-w-11 items-center gap-3"
        >
          <Image
            src={withBasePath("/logo.svg")}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
            aria-hidden
          />
          <span className="hidden font-heading text-sm font-semibold tracking-wide text-brand-white sm:block sm:text-base">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) =>
            "children" in link ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-brand-white/90 transition-colors hover:text-brand-white"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[220px] rounded-sm border border-white/10 bg-[#141414] py-2 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block min-h-11 px-4 py-2.5 text-sm text-brand-white/80 hover:bg-white/5 hover:text-brand-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-white/90 transition-colors hover:text-brand-white"
              >
                {link.label}
              </Link>
            ),
          )}
          <Button href="/contact" size="md">
            Schedule a Consultation
          </Button>
        </nav>

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
