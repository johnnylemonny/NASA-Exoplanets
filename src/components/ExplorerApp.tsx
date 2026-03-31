import { ArrowDown, ArrowUp, ArrowUpDown, ExternalLink, Orbit, RefreshCcw, Search, Sparkles, Telescope, Thermometer, Ruler, Scale, Star } from "lucide-react";
import { startTransition, useEffect, useMemo, useState } from "react";

import {
  buildOverviewUrl,
  DEFAULT_FILTER_STATE,
  DEFAULT_SORT_STATE,
  EXPLORER_PRESETS,
  filterPlanets,
  formatCompact,
  formatDistance,
  formatMass,
  formatNumber,
  formatOrbit,
  formatPeriod,
  formatReleaseDate,
  formatRadius,
  formatTemperature,
  sortLabel,
  sortPlanets,
  summarizePlanet,
  toggleSort
} from "@/lib/explorer";
import type { ExplorerDataset, FilterState, PlanetRecord, SortKey } from "@/lib/types";

interface Props {
  dataUrl: string;
}

const PAGE_SIZE = 18;

function hasCriteria(state: FilterState) {
  return Boolean(state.presetId || state.discoveryYear || state.discoveryMethod || state.discoveryFacility || state.hostQuery.trim() || state.distanceBand || state.temperatureBand);
}

function columnIcon(active: boolean, direction: "asc" | "desc") {
  if (!active) return <ArrowUpDown className="h-3.5 w-3.5" />;
  return direction === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />;
}

function comparisonValue(label: string, value: string) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
      <dt className="data-label">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-[var(--foreground)]">{value}</dd>
    </div>
  );
}

export function ExplorerApp({ dataUrl }: Props) {
  const [dataset, setDataset] = useState<ExplorerDataset | null>(null);
  const [loadingError, setLoadingError] = useState("");
  const [draftFilters, setDraftFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [activeFilters, setActiveFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [sortState, setSortState] = useState(DEFAULT_SORT_STATE);
  const [hasSearched, setHasSearched] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Dataset request failed with ${response.status}`);
        }
        return response.json() as Promise<ExplorerDataset>;
      })
      .then((payload) => {
        if (cancelled) return;
        setDataset(payload);
        setSelectedSlug(payload.featuredWorlds[0]?.planet.slug ?? payload.planets[0]?.slug ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadingError("The explorer dataset could not be loaded.");
      });

    return () => {
      cancelled = true;
    };
  }, [dataUrl]);

  useEffect(() => {
    const handler = (event: Event) => {
      const nextSlug = (event as CustomEvent<{ slug?: string }>).detail?.slug;
      if (!nextSlug) return;

      startTransition(() => {
        setDraftFilters(DEFAULT_FILTER_STATE);
        setActiveFilters(DEFAULT_FILTER_STATE);
        setHasSearched(true);
        setValidationError("");
        setSelectedSlug(nextSlug);
        setPage(1);
      });
    };

    window.addEventListener("focus-planet", handler as EventListener);
    return () => window.removeEventListener("focus-planet", handler as EventListener);
  }, []);

  const resultSet = useMemo(() => {
    if (!dataset || !hasSearched) return [] as PlanetRecord[];
    return sortPlanets(filterPlanets(dataset.planets, activeFilters), sortState);
  }, [activeFilters, dataset, hasSearched, sortState]);

  const totalPages = Math.max(1, Math.ceil(resultSet.length / PAGE_SIZE));
  const paginatedResults = useMemo(() => resultSet.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [page, resultSet]);
  const selectedPlanet = useMemo(() => {
    if (!dataset) return null;
    return resultSet.find((planet) => planet.slug === selectedSlug) ?? dataset.planets.find((planet) => planet.slug === selectedSlug) ?? null;
  }, [dataset, resultSet, selectedSlug]);
  const comparePlanets = useMemo(() => {
    if (!dataset) return [] as PlanetRecord[];
    return compareSlugs.map((slug) => dataset.planets.find((planet) => planet.slug === slug)).filter(Boolean) as PlanetRecord[];
  }, [compareSlugs, dataset]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (!hasSearched || resultSet.length === 0) {
      return;
    }

    if (!selectedPlanet || !resultSet.some((planet) => planet.slug === selectedPlanet.slug)) {
      setSelectedSlug(resultSet[0]?.slug ?? null);
    }
  }, [hasSearched, resultSet, selectedPlanet]);

  function applySearch(nextState: FilterState) {
    if (!hasCriteria(nextState)) {
      setValidationError("Choose at least one filter or preset before searching the archive.");
      setHasSearched(false);
      return;
    }

    startTransition(() => {
      setValidationError("");
      setActiveFilters(nextState);
      setHasSearched(true);
      setPage(1);
    });
  }

  function setField<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setDraftFilters((current) => ({ ...current, [key]: value }));
  }

  function togglePreset(presetId: string) {
    const nextState = { ...draftFilters, presetId: draftFilters.presetId === presetId ? null : presetId };
    setDraftFilters(nextState);
    applySearch(nextState);
  }

  function clearSearch() {
    startTransition(() => {
      setDraftFilters(DEFAULT_FILTER_STATE);
      setActiveFilters(DEFAULT_FILTER_STATE);
      setHasSearched(false);
      setValidationError("");
      setPage(1);
      setCompareSlugs([]);
      setSelectedSlug(dataset?.featuredWorlds[0]?.planet.slug ?? dataset?.planets[0]?.slug ?? null);
    });
  }

  function toggleCompare(slug: string) {
    setCompareSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }
      if (current.length >= 3) {
        return [...current.slice(1), slug];
      }
      return [...current, slug];
    });
  }

  if (loadingError) {
    return <div className="glass-panel p-6 text-sm text-rose-200">{loadingError}</div>;
  }

  if (!dataset) {
    return (
      <div className="glass-panel p-6 md:p-7">
        <span className="eyebrow">Explorer booting</span>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">Loading the generated archive snapshot and preparing the filters, compare tray, and detail panel.</p>
      </div>
    );
  }

  const activePreset = EXPLORER_PRESETS.find((preset) => preset.id === activeFilters.presetId);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.9fr)]">
      <div className="space-y-6">
        <section className="glass-panel space-y-6 p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Explorer controls</span>
              <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">Tune a query, then scan the archive at speed.</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="action-button-secondary" onClick={clearSearch}><RefreshCcw className="h-4 w-4" />Clear</button>
              <button type="button" className="action-button-primary" onClick={() => applySearch(draftFilters)}><Search className="h-4 w-4" />Search archive</button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <label className="field-shell"><span className="data-label">Discovery year</span><select value={draftFilters.discoveryYear} onChange={(event) => setField("discoveryYear", event.target.value)}><option value="">Any year</option>{dataset.filterOptions.years.map((year) => <option key={year} value={String(year)}>{year}</option>)}</select></label>
            <label className="field-shell"><span className="data-label">Discovery method</span><select value={draftFilters.discoveryMethod} onChange={(event) => setField("discoveryMethod", event.target.value)}><option value="">Any method</option>{dataset.filterOptions.methods.map((method) => <option key={method} value={method}>{method}</option>)}</select></label>
            <label className="field-shell"><span className="data-label">Discovery facility</span><select value={draftFilters.discoveryFacility} onChange={(event) => setField("discoveryFacility", event.target.value)}><option value="">Any facility</option>{dataset.filterOptions.facilities.map((facility) => <option key={facility} value={facility}>{facility}</option>)}</select></label>
            <label className="field-shell"><span className="data-label">Host name</span><input list="host-options" value={draftFilters.hostQuery} placeholder="Search host star" onChange={(event) => setField("hostQuery", event.target.value)} /><datalist id="host-options">{dataset.filterOptions.hostNames.map((host) => <option key={host} value={host} />)}</datalist></label>
          </div>

          <details className="rounded-[1.75rem] border border-white/12 bg-white/5 p-5 open:bg-white/7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--foreground)]">More range filters<span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-[var(--muted)]">Distance + heat</span></summary>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="field-shell"><span className="data-label">Distance band</span><select value={draftFilters.distanceBand} onChange={(event) => setField("distanceBand", event.target.value)}><option value="">Any distance</option><option value="nearby">Nearby (0-50 ly)</option><option value="mid">Regional (50-300 ly)</option><option value="far">Deep field (300+ ly)</option></select></label>
              <label className="field-shell"><span className="data-label">Temperature band</span><select value={draftFilters.temperatureBand} onChange={(event) => setField("temperatureBand", event.target.value)}><option value="">Any temperature</option><option value="cold">Cold (&lt;180 K)</option><option value="temperate">Temperate (180-320 K)</option><option value="warm">Warm (320-800 K)</option><option value="extreme">Extreme (800+ K)</option></select></label>
            </div>
          </details>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="eyebrow">Preset filters</span>
              {activePreset ? <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Live preset: {activePreset.label}</p> : null}
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {EXPLORER_PRESETS.map((preset) => {
                const active = draftFilters.presetId === preset.id;
                return (
                  <button key={preset.id} type="button" className={`preset-card ${active ? "preset-card-active" : ""}`} onClick={() => togglePreset(preset.id)}>
                    <span className="eyebrow">{preset.eyebrow}</span>
                    <span className="mt-2 block font-display text-xl text-[var(--foreground)]">{preset.label}</span>
                    <span className="mt-2 block text-sm leading-6 text-[var(--foreground-soft)]">{preset.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {validationError ? <p className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{validationError}</p> : null}
        </section>

        <section className="glass-panel p-6 md:p-7">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Results panel</span>
              <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">{hasSearched ? `${formatCompact(resultSet.length)} matches ready to inspect` : "Run a query or tap a preset to begin"}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-soft)]">{hasSearched ? "Sort the current slice, open a detail card, or pin up to three planets into compare mode." : "The explorer stays quiet until you ask for a slice of the archive, keeping the UI focused instead of noisy."}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              <span className="rounded-full border border-white/12 px-3 py-2">Sort: {sortLabel(sortState.key)}</span>
              <span className="rounded-full border border-white/12 px-3 py-2">Direction: {sortState.direction}</span>
              <span className="rounded-full border border-white/12 px-3 py-2">Compare: {comparePlanets.length}/3</span>
            </div>
          </div>

          {comparePlanets.length > 0 ? <div className="mt-6 space-y-4 rounded-[1.75rem] border border-white/12 bg-white/6 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><span className="eyebrow">Compare mode</span><p className="mt-2 text-sm text-[var(--foreground-soft)]">Side-by-side checkpoints for the planets you pinned from the results list.</p></div><button type="button" className="action-button-secondary" onClick={() => setCompareSlugs([])}>Clear compare</button></div><div className="grid gap-4 lg:grid-cols-3">{comparePlanets.map((planet) => <article key={planet.slug} className="rounded-[1.5rem] border border-white/10 bg-[color:var(--surface-strong)] p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-display text-xl text-[var(--foreground)]">{planet.name}</p><p className="text-sm text-[var(--muted)]">{planet.hostName}</p></div><button type="button" className="icon-button" onClick={() => toggleCompare(planet.slug)}><RefreshCcw className="h-4 w-4" /></button></div><dl className="mt-4 grid gap-3">{comparisonValue("Distance", formatDistance(planet.distanceLightYears))}{comparisonValue("Radius", formatRadius(planet.radiusEarth))}{comparisonValue("Mass", formatMass(planet.massEarth))}{comparisonValue("Heat", formatTemperature(planet.equilibriumTempK))}</dl></article>)}</div></div> : null}

          {hasSearched && resultSet.length === 0 ? <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/12 bg-white/4 p-8 text-center"><Sparkles className="mx-auto h-10 w-10 text-[var(--accent)]" /><p className="mt-4 font-display text-2xl text-[var(--foreground)]">No planets matched this slice.</p><p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">Try clearing one filter, switching presets, or widening the distance and temperature bands.</p></div> : null}
          {!hasSearched ? <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/12 bg-white/4 p-8 text-center"><Telescope className="mx-auto h-10 w-10 text-[var(--accent)]" /><p className="mt-4 font-display text-2xl text-[var(--foreground)]">The archive is waiting for a query.</p><p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">Use the filter panel above or jump in through one of the curated presets to keep the first interaction simple.</p></div> : null}

          {hasSearched && resultSet.length > 0 ? <><div className="mt-6 hidden overflow-hidden rounded-[1.75rem] border border-white/10 xl:block"><table className="planet-table"><thead><tr><th aria-label="Compare">Pick</th>{([["name", "Planet"],["discoveryYear", "Year"],["discoveryMethod", "Method"],["distanceLightYears", "Distance"],["radiusEarth", "Radius"],["equilibriumTempK", "Heat"]] as [SortKey, string][]).map(([key, label]) => <th key={key}><button type="button" className="table-sort-button" onClick={() => setSortState((current) => toggleSort(current, key))}>{label}{columnIcon(sortState.key === key, sortState.direction)}</button></th>)}</tr></thead><tbody>{paginatedResults.map((planet) => { const active = planet.slug === selectedSlug; const compared = compareSlugs.includes(planet.slug); return <tr key={planet.slug} className={active ? "is-active" : ""} onClick={() => setSelectedSlug(planet.slug)}><td><input aria-label={`Compare ${planet.name}`} type="checkbox" checked={compared} onChange={() => toggleCompare(planet.slug)} onClick={(event) => event.stopPropagation()} /></td><td><div><p className="font-semibold text-[var(--foreground)]">{planet.name}</p><p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{planet.hostName}</p></div></td><td>{planet.discoveryYear ?? "Unknown"}</td><td>{planet.discoveryMethod}</td><td>{formatDistance(planet.distanceLightYears)}</td><td>{formatRadius(planet.radiusEarth)}</td><td>{formatTemperature(planet.equilibriumTempK)}</td></tr>; })}</tbody></table></div><div className="mt-6 grid gap-4 xl:hidden">{paginatedResults.map((planet) => { const compared = compareSlugs.includes(planet.slug); return <article key={planet.slug} className={`rounded-[1.5rem] border p-5 ${planet.slug === selectedSlug ? "border-[var(--accent)]/40 bg-white/10" : "border-white/10 bg-white/5"}`}><div className="flex items-start justify-between gap-4"><div><p className="font-display text-2xl text-[var(--foreground)]">{planet.name}</p><p className="mt-1 text-sm text-[var(--muted)]">{planet.hostName}</p></div><button type="button" className={`tag-button ${compared ? "tag-button-active" : ""}`} onClick={() => toggleCompare(planet.slug)}>Compare</button></div><dl className="mt-5 grid grid-cols-2 gap-3">{comparisonValue("Distance", formatDistance(planet.distanceLightYears))}{comparisonValue("Heat", formatTemperature(planet.equilibriumTempK))}{comparisonValue("Radius", formatRadius(planet.radiusEarth))}{comparisonValue("Year", planet.discoveryYear ? String(planet.discoveryYear) : "Unknown")}</dl><button type="button" className="mt-5 action-button-secondary" onClick={() => setSelectedSlug(planet.slug)}>Open detail panel</button></article>; })}</div><div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--foreground-soft)]"><p>Page {page} of {totalPages}. Showing {paginatedResults.length} planets from the current slice.</p><div className="flex items-center gap-2"><button type="button" className="action-button-secondary" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button><button type="button" className="action-button-secondary" disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next</button></div></div></> : null}
        </section>
      </div>

      <aside className="xl:sticky xl:top-24 xl:self-start">
        <section className="glass-panel overflow-hidden p-6 md:p-7">{selectedPlanet ? <><div className="flex items-start justify-between gap-4"><div><span className="eyebrow">Detail panel</span><h3 className="mt-3 font-display text-3xl leading-tight text-[var(--foreground)]">{selectedPlanet.name}</h3><p className="mt-2 text-sm text-[var(--muted)]">Hosted by {selectedPlanet.hostName}</p></div><button type="button" className={`tag-button ${compareSlugs.includes(selectedPlanet.slug) ? "tag-button-active" : ""}`} onClick={() => toggleCompare(selectedPlanet.slug)}>{compareSlugs.includes(selectedPlanet.slug) ? "Pinned" : "Pin"}</button></div><p className="mt-5 text-sm leading-6 text-[var(--foreground-soft)]">{summarizePlanet(selectedPlanet)}. Open the NASA page for the full archive context, or keep browsing here for a cleaner interface.</p><div className="mt-6 flex flex-wrap gap-3"><a href={buildOverviewUrl(selectedPlanet.name)} target="_blank" rel="noreferrer" className="action-button-primary">NASA overview<ExternalLink className="h-4 w-4" /></a><span className="action-chip">Released {formatReleaseDate(selectedPlanet.releaseDate)}</span></div><dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">{comparisonValue("Discovery method", selectedPlanet.discoveryMethod)}{comparisonValue("Discovery facility", selectedPlanet.discoveryFacility)}{comparisonValue("Discovery year", selectedPlanet.discoveryYear ? String(selectedPlanet.discoveryYear) : "Unknown")}{comparisonValue("System layout", `${selectedPlanet.systemPlanets} planets / ${selectedPlanet.systemStars} stars`)}{comparisonValue("Orbital period", formatPeriod(selectedPlanet.orbitalPeriodDays))}{comparisonValue("Orbital separation", formatOrbit(selectedPlanet.orbitAu))}{comparisonValue("Planet radius", formatRadius(selectedPlanet.radiusEarth))}{comparisonValue("Planet mass", formatMass(selectedPlanet.massEarth))}{comparisonValue("Equilibrium temperature", formatTemperature(selectedPlanet.equilibriumTempK))}{comparisonValue("Distance", formatDistance(selectedPlanet.distanceLightYears))}{comparisonValue("Star temperature", formatTemperature(selectedPlanet.stellarTemperatureK))}{comparisonValue("Star mass", formatNumber(selectedPlanet.stellarMassSolar, "M?", 2))}</dl><div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[color:var(--surface-strong)] p-4"><div className="flex items-center gap-3 text-[var(--foreground)]"><Orbit className="h-5 w-5 text-[var(--accent)]" /><p className="font-semibold">Quick read</p></div><ul className="mt-4 grid gap-3 text-sm text-[var(--foreground-soft)]"><li className="flex items-start gap-3"><Ruler className="mt-0.5 h-4 w-4 text-[var(--accent)]" />Size class: {selectedPlanet.sizeClass.replace(/-/g, " ")}</li><li className="flex items-start gap-3"><Thermometer className="mt-0.5 h-4 w-4 text-[var(--accent)]" />Thermal class: {selectedPlanet.thermalClass}</li><li className="flex items-start gap-3"><Scale className="mt-0.5 h-4 w-4 text-[var(--accent)]" />Mass estimate: {formatMass(selectedPlanet.massEarth)}</li><li className="flex items-start gap-3"><Star className="mt-0.5 h-4 w-4 text-[var(--accent)]" />Potentially temperate heuristic: {selectedPlanet.isPotentiallyTemperate ? "Yes" : "No"}</li></ul></div></> : <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/4 p-8 text-center"><Orbit className="mx-auto h-10 w-10 text-[var(--accent)]" /><p className="mt-4 font-display text-2xl text-[var(--foreground)]">Pick a planet to inspect.</p><p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">The detail panel will stay synced with the result list as you sort, filter, and compare.</p></div>}</section>
      </aside>
    </div>
  );
}
