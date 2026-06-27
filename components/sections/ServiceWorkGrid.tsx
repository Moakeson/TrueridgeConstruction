import Image from "next/image";
import type { ServiceGallery } from "@/lib/service-gallery";
import { Container } from "@/components/ui/Container";
import { withBasePath } from "@/lib/utils";

interface ServiceWorkGridProps {
  gallery: ServiceGallery;
}

export function ServiceWorkGrid({ gallery }: ServiceWorkGridProps) {
  return (
    <section className="bg-brand-surface">
      <Container className="py-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-brand-accent-text">{gallery.titleAccent}</span>{" "}
            <span className="text-brand-black">{gallery.titleRest}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            {gallery.subtitle}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {gallery.items.map((item) => (
            <li key={item.image}>
              <article className="flex flex-col items-center">
                <div className="relative aspect-4/3 w-full max-w-sm overflow-hidden rounded-sm border border-brand-black/10 sm:max-w-md lg:max-w-lg">
                  <Image
                    src={withBasePath(item.image)}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32rem"
                  />
                </div>
                <h3 className="mt-5 text-center font-heading text-xl font-semibold text-brand-accent-text">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-brand-muted">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
