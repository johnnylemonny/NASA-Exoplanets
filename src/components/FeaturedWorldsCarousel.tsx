import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useMemo, useRef } from "react";

import { buildOverviewUrl, formatDistance, formatRadius, formatTemperature, summarizePlanet } from "@/lib/explorer";
import type { FeaturedWorld } from "@/lib/types";

interface Props {
  items: FeaturedWorld[];
}

function scrollByAmount(element: HTMLDivElement | null, direction: number) {
  if (!element) return;
  element.scrollBy({
    left: element.clientWidth * 0.85 * direction,
    behavior: "smooth"
  });
}

const CARD_LAYOUTS = [
  "md:-translate-y-2 md:min-w-[20.5rem] md:max-w-[22rem] lg:min-w-[22rem]",
  "md:translate-y-4 md:min-w-[20.5rem] md:max-w-[22rem] lg:min-w-[22rem]",
  "md:-translate-y-1 md:min-w-[20.5rem] md:max-w-[22rem] lg:min-w-[22rem]",
  "md:translate-y-6 md:min-w-[20.5rem] md:max-w-[22rem] lg:min-w-[22rem]"
];

export function FeaturedWorldsCarousel({ items }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const cards = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Each featured world is picked from the live build snapshot to show a different edge of the archive: scale, heat, distance, and system architecture.
        </p>
        <div className="hidden items-center gap-2 md:flex">
          <button type="button" className="icon-button" onClick={() => scrollByAmount(railRef.current, -1)}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" className="icon-button" onClick={() => scrollByAmount(railRef.current, 1)}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={railRef} className="scrollbar-hidden -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
        {cards.map((item, index) => (
          <article
            key={item.id}
            className={`glass-panel group flex min-h-[24rem] min-w-[18rem] snap-start flex-col justify-between overflow-hidden p-6 md:flex-none ${CARD_LAYOUTS[index % CARD_LAYOUTS.length]}`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">{item.eyebrow}</span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-[var(--muted)]">
                  {item.metric}
                </span>
              </div>

              <div>
                <p className="text-balance font-display text-2xl leading-tight text-[var(--foreground)]">{item.planet.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Hosted by {item.planet.hostName}</p>
              </div>

              <p className="text-sm leading-6 text-[var(--foreground-soft)]">{item.description}</p>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-sm">
                  <dt className="data-label">Distance</dt>
                  <dd className="mt-1 font-display text-lg text-[var(--foreground)]">{formatDistance(item.planet.distanceLightYears)}</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-sm">
                  <dt className="data-label">Heat</dt>
                  <dd className="mt-1 font-display text-lg text-[var(--foreground)]">{formatTemperature(item.planet.equilibriumTempK)}</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-sm">
                  <dt className="data-label">Radius</dt>
                  <dd className="mt-1 font-display text-lg text-[var(--foreground)]">{formatRadius(item.planet.radiusEarth)}</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur-sm">
                  <dt className="data-label">Discovery</dt>
                  <dd className="mt-1 font-display text-lg text-[var(--foreground)]">{item.planet.discoveryYear ?? "Unknown"}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm text-[var(--muted)]">{summarizePlanet(item.planet)}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#explorer"
                  className="action-button-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    window.dispatchEvent(new CustomEvent("focus-planet", { detail: { slug: item.planet.slug } }));
                    document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Open in explorer
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <a href={buildOverviewUrl(item.planet.name)} target="_blank" rel="noreferrer" className="action-button-secondary">
                  NASA overview
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
