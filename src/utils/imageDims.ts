import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { imageSize } from 'image-size';

// Build-time lookup of intrinsic dimensions for assets in /public,
// so rendered <img> tags reserve space and avoid layout shift.
const cache = new Map<string, { width: number; height: number } | null>();

export function getImageDims(publicPath: string): { width: number; height: number } | null {
  if (cache.has(publicPath)) return cache.get(publicPath) ?? null;
  let dims: { width: number; height: number } | null = null;
  try {
    const filePath = join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
    const result = imageSize(readFileSync(filePath));
    if (result.width && result.height) {
      dims = { width: result.width, height: result.height };
    }
  } catch {
    dims = null;
  }
  cache.set(publicPath, dims);
  return dims;
}
