import type { FilterState, PlanetRecord, SortKey, SortState } from "@/lib/types";

export const THEME_STORAGE_KEY = "exovault-theme";

export interface ExplorerPreset {
  id: string;
  label: string;
  description: string;
  eyebrow: string;
}

export const EXPLORER_PRESETS: ExplorerPreset[] = [
  {
    id: "temperate",
    label: "Temperate candidates",
    description: "Worlds whose size and heat profile sit near a survivable middle band.",
    eyebrow: "Balanced climate"
  },
  {
    id: "nearest",
    label: "Nearest systems",
    description: "The closest mapped planets in the archive, ideal for a first pass through the catalog.",
    eyebrow: "Cosmic neighborhood"
  },
  {
    id: "hot",
    label: "Furnace worlds",
    description: "Extreme-temperature planets shaped by searing radiation and tight orbits.",
    eyebrow: "Heat seekers"
  },
  {
    id: "earth-sized",
    label: "Earth-sized",
    description: "Compact worlds on the smaller end of the radius scale.",
    eyebrow: "Similar scale"
  },
  {
    id: "giants",
    label: "Gas giants",
    description: "The archive's oversized planets with swollen radii or huge inferred masses.",
    eyebrow: "Heavyweights"
  },
  {
    id: "busy-systems",
    label: "Crowded systems",
    description: "Planetary systems with four or more confirmed planets in the default dataset.",
    eyebrow: "System architecture"
  },
  {
    id: "recent",
    label: "Fresh discoveries",
    description: "Recently published discoveries that signal how fast the archive keeps growing.",
    eyebrow: "New arrivals"
  }
];

export const DEFAULT_FILTER_STATE: FilterState = {
  presetId: null,
  discoveryYear: "",
  discoveryMethod: "",
  discoveryFacility: "",
  hostQuery: "",
  distanceBand: "",
  temperatureBand: ""
};

export const DEFAULT_SORT_STATE: SortState = {
  key: "discoveryYear",
  direction: "desc"
};

export function buildOverviewUrl(planetName: string) {
  return `https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(planetName)}`;
}

export function sortLabel(sortKey: SortKey) {
  switch (sortKey) {
    case "name":
      return "Planet";
    case "discoveryYear":
      return "Year";
    case "discoveryMethod":
      return "Method";
    case "distanceLightYears":
      return "Distance";
    case "radiusEarth":
      return "Radius";
    case "massEarth":
      return "Mass";
    case "equilibriumTempK":
      return "Heat";
    default:
      return sortKey;
  }
}

export function formatNumber(value: number | null, unit?: string, maximumFractionDigits = 1) {
  if (value === null) {
    return "Unknown";
  }

  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatCompact(value: number | null, unit?: string) {
  if (value === null) {
    return "Unknown";
  }

  const formatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatDistance(value: number | null) {
  return value === null ? "Unknown" : `${formatNumber(value, "ly", value < 100 ? 1 : 0)}`;
}

export function formatTemperature(value: number | null) {
  return value === null ? "Unknown" : `${formatNumber(value, "K", 0)}`;
}

export function formatRadius(value: number | null) {
  return value === null ? "Unknown" : `${formatNumber(value, "R?", 2)}`;
}

export function formatMass(value: number | null) {
  return value === null ? "Unknown" : `${formatNumber(value, "M?", 2)}`;
}

export function formatOrbit(value: number | null) {
  return value === null ? "Unknown" : `${formatNumber(value, "AU", 3)}`;
}

export function formatPeriod(value: number | null) {
  return value === null ? "Unknown" : `${formatNumber(value, "days", value > 100 ? 0 : 2)}`;
}

export function formatReleaseDate(value: string) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function summarizePlanet(planet: PlanetRecord) {
  if (planet.isPotentiallyTemperate) {
    return "Balanced size and heat profile";
  }

  if (planet.thermalClass === "extreme") {
    return "Extreme thermal signature";
  }

  if (planet.sizeClass === "gas-giant") {
    return "Gas giant on an outsized scale";
  }

  if (planet.systemPlanets >= 4) {
    return "Part of a dense planetary system";
  }

  return "Representative archive discovery";
}

function matchesPreset(planet: PlanetRecord, presetId: string | null) {
  switch (presetId) {
    case "temperate":
      return planet.isPotentiallyTemperate;
    case "nearest":
      return planet.distanceLightYears !== null && planet.distanceLightYears <= 50;
    case "hot":
      return planet.equilibriumTempK !== null && planet.equilibriumTempK >= 1000;
    case "earth-sized":
      return planet.radiusEarth !== null && planet.radiusEarth >= 0.7 && planet.radiusEarth <= 1.5;
    case "giants":
      return planet.sizeClass === "gas-giant" || (planet.massEarth !== null && planet.massEarth >= 95);
    case "busy-systems":
      return planet.systemPlanets >= 4;
    case "recent":
      return planet.discoveryYear !== null && planet.discoveryYear >= 2023;
    default:
      return true;
  }
}

function matchesDistanceBand(planet: PlanetRecord, band: string) {
  if (!band) return true;
  if (planet.distanceLightYears === null) return false;

  switch (band) {
    case "nearby":
      return planet.distanceLightYears <= 50;
    case "mid":
      return planet.distanceLightYears > 50 && planet.distanceLightYears <= 300;
    case "far":
      return planet.distanceLightYears > 300;
    default:
      return true;
  }
}

function matchesTemperatureBand(planet: PlanetRecord, band: string) {
  if (!band) return true;
  if (planet.equilibriumTempK === null) return false;

  switch (band) {
    case "cold":
      return planet.equilibriumTempK < 180;
    case "temperate":
      return planet.equilibriumTempK >= 180 && planet.equilibriumTempK <= 320;
    case "warm":
      return planet.equilibriumTempK > 320 && planet.equilibriumTempK <= 800;
    case "extreme":
      return planet.equilibriumTempK > 800;
    default:
      return true;
  }
}

export function filterPlanets(planets: PlanetRecord[], state: FilterState) {
  const hostQuery = state.hostQuery.trim().toLowerCase();

  return planets.filter((planet) => {
    if (!matchesPreset(planet, state.presetId)) return false;
    if (state.discoveryYear && String(planet.discoveryYear ?? "") !== state.discoveryYear) return false;
    if (state.discoveryMethod && planet.discoveryMethod !== state.discoveryMethod) return false;
    if (state.discoveryFacility && planet.discoveryFacility !== state.discoveryFacility) return false;
    if (hostQuery && !planet.hostName.toLowerCase().includes(hostQuery)) return false;
    if (!matchesDistanceBand(planet, state.distanceBand)) return false;
    if (!matchesTemperatureBand(planet, state.temperatureBand)) return false;
    return true;
  });
}

function compareNullable(aValue: number | string | null, bValue: number | string | null, direction: "asc" | "desc") {
  if (aValue === null && bValue === null) return 0;
  if (aValue === null) return 1;
  if (bValue === null) return -1;

  const result =
    typeof aValue === "number" && typeof bValue === "number"
      ? aValue - bValue
      : String(aValue).localeCompare(String(bValue));

  return direction === "asc" ? result : -result;
}

export function sortPlanets(planets: PlanetRecord[], sort: SortState) {
  return [...planets].sort((a, b) => {
    const diff = compareNullable(a[sort.key], b[sort.key], sort.direction);
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });
}

export function toggleSort(previous: SortState, key: SortKey): SortState {
  if (previous.key === key) {
    return {
      key,
      direction: previous.direction === "asc" ? "desc" : "asc"
    };
  }

  return {
    key,
    direction: key === "name" || key === "discoveryMethod" ? "asc" : "desc"
  };
}
