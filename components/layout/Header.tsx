import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { withBasePath } from "@/lib/utils";
import { MobileMenuShell } from "@/components/layout/MobileMenuShell";

function LogoLink() {
  return (
    <Link href="/" className="flex min-h-11 min-w-11 items-center gap-3">
      <Image
        src={withBasePath("/logo.svg")}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10"
        aria-hidden
      />
      <span className="sr-only">{SITE.name} home</span>
      <span className="hidden font-heading text-sm font-semibold tracking-wide text-brand-white sm:block sm:text-base">
        {SITE.name}
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
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
  );
}

export function Header() {
  return (
    <MobileMenuShell logo={<LogoLink />} desktopNav={<DesktopNav />} />
  );
}
