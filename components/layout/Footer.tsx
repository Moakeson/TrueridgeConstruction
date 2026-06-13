import Link from "next/link";
import { Instagram } from "lucide-react";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-brand-black/10 bg-brand-black text-brand-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-semibold">{SITE.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-white/70">
              We bring pride and passion to every project we undertake, and
              look forward to building your vision.
            </p>
            <div className="mt-4">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-white/80 transition-colors hover:text-brand-white"
                aria-label="Follow True Ridge Construction on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden />
                Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-white/70">
              Services
            </p>
            <ul className="mt-4 space-y-1">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="inline-flex min-h-11 items-center text-sm text-brand-white/80 hover:text-brand-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/our-work"
                  className="inline-flex min-h-11 items-center text-sm text-brand-white/80 hover:text-brand-white"
                >
                  Our Work
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-white/70">
              Contact
            </p>
            <ul className="mt-4 space-y-1 text-sm text-brand-white/80">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-11 items-center hover:text-brand-white"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="inline-flex min-h-11 items-center hover:text-brand-white"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="pt-2 text-brand-white/70">
                Servicing {SITE.serviceArea}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-brand-white/70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name} LLC</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1" aria-label="Footer">
            {NAV_LINKS.filter((l) => !("children" in l)).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center hover:text-brand-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center hover:text-brand-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
