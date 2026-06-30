import Link from "next/link";
import dynamic from "next/dynamic";
import { projects } from "@/lib/our-work";
import { Container } from "@/components/ui/Container";

const ProjectCarousel = dynamic(
  () =>
    import("@/components/sections/ProjectCarousel").then(
      (mod) => mod.ProjectCarousel,
    ),
  {
    loading: () => (
      <div
        className="h-[50vh] min-h-[320px] animate-pulse bg-brand-black/80 md:h-[65vh]"
        aria-hidden
      />
    ),
  },
);

export function ProjectGallery() {
  return (
    <section aria-labelledby="projects-heading" className="bg-brand-black">
      <Container className="py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="projects-heading"
              className="font-heading text-3xl font-semibold text-brand-white sm:text-4xl"
            >
              Our Latest Projects
            </h2>
            <p className="mt-2 text-brand-white/70">
              Quality craftsmanship across kitchens, bathrooms, basements, and
              more.
            </p>
          </div>
          <Link
            href="/our-work"
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-brand-accent hover:text-brand-accent/80"
          >
            View All Projects &rarr;
          </Link>
        </div>
      </Container>

      {projects.length > 0 ? (
        <ProjectCarousel projects={projects} />
      ) : (
        <p className="pb-10 text-center text-brand-white/70">
          Project photos are coming soon. Check back shortly.
        </p>
      )}
    </section>
  );
}
