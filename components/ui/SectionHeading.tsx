import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  id?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  dark = false,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl",
          dark ? "text-brand-white" : "text-brand-black",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-brand-white/80" : "text-brand-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
