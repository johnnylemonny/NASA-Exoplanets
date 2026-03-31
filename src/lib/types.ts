export type ThemeMode = "light" | "dark";

export type SizeClass =
  | "unknown"
  | "terrestrial"
  | "super-earth"
  | "mini-neptune"
  | "neptune-like"
  | "gas-giant";

export type ThermalClass = "unknown" | "icy" | "temperate" | "warm" | "extreme";

export interface PlanetRecord {
  slug: string;
  name: string;
  hostName: string;
  discoveryMethod: string;
  discoveryYear: number | null;
  discoveryFacility: string;
  systemStars: number;
  systemPlanets: number;
  orbitalPeriodDays: number | null;
  orbitAu: number | null;
  radiusEarth: number | null;
  massEarth: number | null;
  equilibriumTempK: number | null;
  insolationEarth: number | null;
  distanceLightYears: number | null;
  stellarTemperatureK: number | null;
  stellarRadiusSolar: number | null;
  stellarMassSolar: number | null;
  stellarType: string;
  releaseDate: string;
  sizeClass: SizeClass;
  thermalClass: ThermalClass;
  isPotentiallyTemperate: boolean;
}

export interface FeaturedWorld {
  id: string;
  eyebrow: string;
  label: string;
  description: string;
  metric: string;
  planet: PlanetRecord;
}

export interface ExplorerDataset {
  generatedAt: string;
  source: {
    csvFile: string;
    csvUrl: string;
    archivedRowCount: number;
    defaultRowCount: number;
  };
  summary: {
    planetCount: number;
    hostCount: number;
    methodCount: number;
    facilityCount: number;
    minDiscoveryYear: number | null;
    maxDiscoveryYear: number | null;
  };
  filterOptions: {
    years: number[];
    methods: string[];
    facilities: string[];
    hostNames: string[];
  };
  featuredWorlds: FeaturedWorld[];
  planets: PlanetRecord[];
}

export interface FilterState {
  presetId: string | null;
  discoveryYear: string;
  discoveryMethod: string;
  discoveryFacility: string;
  hostQuery: string;
  distanceBand: string;
  temperatureBand: string;
}

export type SortKey =
  | "name"
  | "discoveryYear"
  | "discoveryMethod"
  | "distanceLightYears"
  | "radiusEarth"
  | "massEarth"
  | "equilibriumTempK";

export interface SortState {
  key: SortKey;
  direction: "asc" | "desc";
}
