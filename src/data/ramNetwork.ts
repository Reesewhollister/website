// Royal Air Maroc early postcolinial network — the data behind the route map on
// the From Colonies to Carriers project. Coordinates are real (lon/lat) and the
// opening years are approximate, curated from the project research. Ported from
// the "Route Map Engine" design prototype so the map is generated, not drawn by
// hand. Projection is equirectangular over the network's bounding region.

export type RamRegion = 'EUR' | 'MAG' | 'WAF';

export interface RamCity {
  code: string;
  lon: number;
  lat: number;
  /** Approximate year the route opened — drives optional era filtering. */
  year: number;
  region: RamRegion;
  name: string;
}

export const RAM_HUB = { code: 'CMN', lon: -7.62, lat: 33.57, name: 'Casablanca' } as const;

export const RAM_REGION_COLORS: Record<RamRegion, string> = {
  EUR: 'var(--sys-brass)',
  MAG: 'var(--sys-ember)',
  WAF: '#6fb0a0'
};

export const RAM_REGION_LABELS: { key: RamRegion; label: string; color: string }[] = [
  { key: 'EUR', label: 'Europe', color: 'var(--sys-brass)' },
  { key: 'MAG', label: 'Maghreb / N. Africa', color: 'var(--sys-ember)' },
  { key: 'WAF', label: 'West Africa', color: '#6fb0a0' }
];

// [code, lon, lat, openedYear, region, name]
export const RAM_CITIES: RamCity[] = [
  { code: 'ORY', lon: 2.35, lat: 48.85, year: 1957, region: 'EUR', name: 'Paris' },
  { code: 'MRS', lon: 5.37, lat: 43.30, year: 1957, region: 'EUR', name: 'Marseille' },
  { code: 'MAD', lon: -3.57, lat: 40.47, year: 1957, region: 'EUR', name: 'Madrid' },
  { code: 'LIS', lon: -9.13, lat: 38.77, year: 1958, region: 'EUR', name: 'Lisbon' },
  { code: 'BOD', lon: -0.57, lat: 44.84, year: 1958, region: 'EUR', name: 'Bordeaux' },
  { code: 'GVA', lon: 6.14, lat: 46.20, year: 1960, region: 'EUR', name: 'Geneva' },
  { code: 'BRU', lon: 4.35, lat: 50.85, year: 1961, region: 'EUR', name: 'Brussels' },
  { code: 'FRA', lon: 8.68, lat: 50.11, year: 1962, region: 'EUR', name: 'Frankfurt' },
  { code: 'LON', lon: -0.45, lat: 51.47, year: 1963, region: 'EUR', name: 'London' },
  { code: 'LPA', lon: -15.43, lat: 28.00, year: 1957, region: 'EUR', name: 'Las Palmas' },
  { code: 'FCO', lon: 12.25, lat: 41.80, year: 1965, region: 'EUR', name: 'Rome' },
  { code: 'TNG', lon: -5.92, lat: 35.73, year: 1957, region: 'MAG', name: 'Tangier' },
  { code: 'RAK', lon: -8.00, lat: 31.60, year: 1957, region: 'MAG', name: 'Marrakech' },
  { code: 'AGA', lon: -9.41, lat: 30.33, year: 1958, region: 'MAG', name: 'Agadir' },
  { code: 'OUD', lon: -1.92, lat: 34.79, year: 1959, region: 'MAG', name: 'Oujda' },
  { code: 'ALG', lon: 3.21, lat: 36.69, year: 1958, region: 'MAG', name: 'Algiers' },
  { code: 'TUN', lon: 10.23, lat: 36.85, year: 1959, region: 'MAG', name: 'Tunis' },
  { code: 'TIP', lon: 13.28, lat: 32.66, year: 1965, region: 'MAG', name: 'Tripoli' },
  { code: 'CAI', lon: 31.40, lat: 30.12, year: 1966, region: 'MAG', name: 'Cairo' },
  { code: 'DKR', lon: -17.07, lat: 14.74, year: 1961, region: 'WAF', name: 'Dakar' },
  { code: 'NKC', lon: -15.95, lat: 18.10, year: 1967, region: 'WAF', name: 'Nouakchott' },
  { code: 'BKO', lon: -7.95, lat: 12.53, year: 1968, region: 'WAF', name: 'Bamako' },
  { code: 'CKY', lon: -13.60, lat: 9.60, year: 1969, region: 'WAF', name: 'Conakry' },
  { code: 'ABJ', lon: -3.93, lat: 5.26, year: 1970, region: 'WAF', name: 'Abidjan' }
];

// --- equirectangular projection over the network's bounding region ----------
const LON0 = -20, LON1 = 34, LAT0 = 3, LAT1 = 53, K = 0.843, S = 15;
export const RAM_MAP_W = Math.round((LON1 - LON0) * K * S); // ~683
export const RAM_MAP_H = Math.round((LAT1 - LAT0) * S); // 750
export const px = (lon: number): number => (lon - LON0) * K * S;
export const py = (lat: number): number => (LAT1 - lat) * S;

// Coastline polylines (lon/lat) for light geographic context.
export const COAST_AFRICA: [number, number][] = [
  [-17, 14.7], [-16, 18], [-15, 21.5], [-13.2, 23.7], [-13, 27.7], [-11, 28.8], [-9.8, 30.4],
  [-9.4, 32], [-9.3, 33.7], [-6.8, 34], [-5.9, 35.8], [-3, 35.4], [-1, 35.3], [0.6, 36],
  [3, 36.8], [5, 36.8], [6.9, 37.1], [8.6, 37.2], [10.3, 37], [10.6, 35.8], [10, 34.2],
  [11, 33.5], [13.2, 32.9], [15.3, 31.3], [18, 30.4], [20.1, 32], [23, 32.2], [25, 31.5],
  [27, 31], [29.9, 31.2], [31.2, 31.4]
];
export const COAST_EUROPE: [number, number][] = [
  [-9, 43.4], [-8.9, 41.1], [-9.1, 38.7], [-8.9, 37], [-7.4, 37.2], [-6.3, 36.2], [-5.6, 36],
  [-4.4, 36.7], [-2.1, 36.7], [-0.5, 37.6], [0, 38.8], [0.6, 40], [1.5, 41.1], [3.2, 41.9],
  [3.1, 42.4], [4.8, 43.3], [6.5, 43.1], [7.5, 43.7], [9.5, 44]
];
