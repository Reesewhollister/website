import airlinesJson from '../../public/african-airlines/data/airlines.json';
import statsJson from '../../public/african-airlines/data/stats.json';

export interface AirlineDestination {
  city?: string | null;
  city_country?: string | null;
  scope?: string | null;
  note?: string | null;
}

export interface AirlineDetail {
  entry_number?: string | null;
  airline_name?: string | null;
  base_city?: string | null;
  aircraft?: string | null;
  people?: string | null;
  predecessor?: string | null;
  successor?: string | null;
  fate?: string | null;
  national_carrier?: string | null;
  summary?: string | null;
}

export interface ProvenanceField {
  value?: string | number | null;
  label?: string | null;
  note?: string | null;
}

export interface AirlineProvenance {
  source?: string | null;
  book_page?: number | null;
  pdf_page?: number | null;
  confidence?: string | null;
  fields?: Record<string, ProvenanceField>;
}

export interface AirlineRecord {
  entry: number;
  name: string;
  country: string;
  colonial_power?: string | null;
  settler?: string | null;
  decolonization?: string | null;
  year_founded?: number | null;
  year_ceased?: number | null;
  lifespan?: number | null;
  ownership?: string | null;
  government?: string | null;
  fleet_size?: number | null;
  employees?: number | null;
  scopes: string[];
  decade?: string | null;
  active?: boolean;
  is_stub?: boolean;
  detail?: AirlineDetail;
  destinations?: AirlineDestination[];
  provenance?: AirlineProvenance;
  review_flags?: string[];
}

export interface AfricanAirlinesStats {
  total: number;
  stubs: number;
  active_1998: number;
  ceased: number;
  total_routes: number;
  by_country: Record<string, number>;
  by_colonial_power: Record<string, number>;
  by_decolonization: Record<string, number>;
  by_settler: Record<string, number>;
}

export interface AirlinePageRecord extends AirlineRecord {
  slug: string;
  url: string;
}

export interface CountrySummary {
  country: string;
  slug: string;
  url: string;
  count: number;
  active1998: number;
  ceased: number;
  stubs: number;
  reviewFlagged: number;
  stateLinked: number;
  routes: number;
  scopes: string[];
  firstAirline?: AirlinePageRecord;
  airlines: AirlinePageRecord[];
}

export interface SourceSummary {
  stubs: number;
  reviewFlagged: number;
  missingFounded: number;
  missingBaseCity: number;
  missingDestinations: number;
  missingProvenance: number;
  confidence: Record<string, number>;
}

const rawAirlines = airlinesJson as AirlineRecord[];
export const africanAirlinesStats = statsJson as AfricanAirlinesStats;

export const africanAirlinesBasePath = '/african-airlines';
export const africanAirlinesAppBasePath = `${africanAirlinesBasePath}/`;
export const africanAirlinesYearRange = '1920-1998';
export const africanAirlinesSourceCitation = 'Ben Guttery, Encyclopedia of African Airlines (Jefferson, NC: McFarland, 1998).';
export const africanAirlinesDatasetCitation = `Reese Hollister, ed. African Airlines Atlas: From Colonies to Carriers. Structured dataset and digital atlas built from ${africanAirlinesSourceCitation} ${africanAirlinesYearRange}.`;

export function slugify(value: string): string {
  const slug = String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'record';
}

function airlineSlugBase(name: string): string {
  const normalized = name
    .replace(/\(([A-Z]{2,})\)/g, '')
    .replace(/\(([^)]*)\)/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim();
  return slugify(normalized);
}

function makeAirlinePages(records: AirlineRecord[]): AirlinePageRecord[] {
  const bases = records.map((record) => airlineSlugBase(record.name));
  const counts = bases.reduce((map, base) => {
    map.set(base, (map.get(base) ?? 0) + 1);
    return map;
  }, new Map<string, number>());

  return records
    .map((record, index) => {
      const base = bases[index] ?? 'record';
      const slug = counts.get(base) === 1 ? base : `${base}-${record.entry}`;
      return {
        ...record,
        slug,
        url: `${africanAirlinesBasePath}/airlines/${slug}`
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name) || a.entry - b.entry);
}

export const africanAirlines = makeAirlinePages(rawAirlines);

export const airlineBySlug = new Map(africanAirlines.map((airline) => [airline.slug, airline]));
export const airlineByEntry = new Map(africanAirlines.map((airline) => [airline.entry, airline]));

export function isStateLinked(record: AirlineRecord): boolean {
  const text = [record.ownership, record.government].filter(Boolean).join(' ');
  return /(state|government|parastatal|public|mixed|joint|consortium|national|full|high)/i.test(text)
    && !/^none$/i.test(record.government || '');
}

function compareFounded(a?: AirlinePageRecord, b?: AirlinePageRecord): AirlinePageRecord | undefined {
  if (!a) return b;
  if (!b) return a;
  const ay = a.year_founded ?? Number.POSITIVE_INFINITY;
  const by = b.year_founded ?? Number.POSITIVE_INFINITY;
  if (ay !== by) return ay < by ? a : b;
  return a.name.localeCompare(b.name) <= 0 ? a : b;
}

function makeCountrySummaries(records: AirlinePageRecord[]): CountrySummary[] {
  const grouped = records.reduce((map, record) => {
    if (!map.has(record.country)) map.set(record.country, []);
    map.get(record.country)?.push(record);
    return map;
  }, new Map<string, AirlinePageRecord[]>());

  return Array.from(grouped.entries())
    .map(([country, rows]) => {
      const slug = slugify(country);
      const scopes = Array.from(new Set(rows.flatMap((row) => row.scopes || []).filter(Boolean))).sort();
      const firstAirline = rows.reduce<AirlinePageRecord | undefined>((first, row) => compareFounded(first, row), undefined);
      return {
        country,
        slug,
        url: `${africanAirlinesBasePath}/countries/${slug}`,
        count: rows.length,
        active1998: rows.filter((row) => row.active).length,
        ceased: rows.filter((row) => !row.active).length,
        stubs: rows.filter((row) => row.is_stub).length,
        reviewFlagged: rows.filter((row) => row.review_flags && row.review_flags.length > 0).length,
        stateLinked: rows.filter(isStateLinked).length,
        routes: rows.reduce((sum, row) => sum + (row.destinations?.length ?? 0), 0),
        scopes,
        firstAirline,
        airlines: rows.slice().sort((a, b) =>
          (a.year_founded ?? 9999) - (b.year_founded ?? 9999) || a.name.localeCompare(b.name)
        )
      };
    })
    .sort((a, b) => a.country.localeCompare(b.country));
}

export const africanAirlineCountries = makeCountrySummaries(africanAirlines);
export const countryBySlug = new Map(africanAirlineCountries.map((country) => [country.slug, country]));

export const sourceSummary: SourceSummary = {
  stubs: africanAirlines.filter((airline) => airline.is_stub).length,
  reviewFlagged: africanAirlines.filter((airline) => airline.review_flags && airline.review_flags.length > 0).length,
  missingFounded: africanAirlines.filter((airline) => !airline.year_founded).length,
  missingBaseCity: africanAirlines.filter((airline) => !(airline.detail && airline.detail.base_city)).length,
  missingDestinations: africanAirlines.filter((airline) => !(airline.destinations && airline.destinations.length)).length,
  missingProvenance: africanAirlines.filter((airline) => !airline.provenance).length,
  confidence: africanAirlines.reduce((out, airline) => {
    const key = airline.provenance?.confidence || 'not recorded';
    out[key] = (out[key] || 0) + 1;
    return out;
  }, {} as Record<string, number>)
};

export function formatNumber(value?: number | null): string {
  if (value == null) return 'Not stated';
  return value.toLocaleString('en-US');
}

export function formatYears(record: AirlineRecord): string {
  const founded = record.year_founded ?? 'Unknown';
  const ceased = record.year_ceased ?? (record.active ? 'operating at 1998 survey horizon' : 'unknown');
  return `${founded} to ${ceased}`;
}

export function formatScopeList(scopes?: string[]): string {
  if (!scopes || scopes.length === 0) return 'Not stated';
  return scopes.join(', ');
}

export function formatField(value?: string | number | null): string {
  if (value == null || value === '') return 'Not stated';
  return String(value);
}

export function confidenceLabel(record: AirlineRecord): string {
  return record.provenance?.confidence || 'not recorded';
}

export function entryCitation(record: AirlineRecord): string {
  const page = record.provenance?.book_page ? `, p. ${record.provenance.book_page}` : '';
  return `${record.name} (${record.country}). In Ben Guttery, Encyclopedia of African Airlines (Jefferson, NC: McFarland, 1998)${page}. Via African Airlines Atlas / From Colonies to Carriers dataset, ed. Reese Hollister.`;
}

export function countryCitation(country: CountrySummary): string {
  return `Reese Hollister, ed., African Airlines Atlas, ${country.country} country page, ${country.count} airline records from the From Colonies to Carriers dataset, built from Ben Guttery, Encyclopedia of African Airlines (McFarland, 1998).`;
}

export function getFeaturedAirlines(): AirlinePageRecord[] {
  const preferred = [338, 3, 401, 190, 573];
  const picked = preferred
    .map((entry) => airlineByEntry.get(entry))
    .filter((record): record is AirlinePageRecord => Boolean(record));
  return picked.length ? picked : africanAirlines.slice(0, 5);
}

export function topCountries(limit = 8): CountrySummary[] {
  return africanAirlineCountries
    .slice()
    .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country))
    .slice(0, limit);
}

export function relatedAirlines(record: AirlinePageRecord, limit = 6): AirlinePageRecord[] {
  return africanAirlines
    .filter((airline) => airline.entry !== record.entry && airline.country === record.country)
    .slice(0, limit);
}

export function countryForAirline(record: AirlineRecord): CountrySummary | undefined {
  return africanAirlineCountries.find((country) => country.country === record.country);
}

export function appRoutePath(route: 'browse' | 'atlas' | 'networks' | 'variables' | 'institutions' | 'source-gaps'): string {
  return `${africanAirlinesBasePath}/${route}`;
}
