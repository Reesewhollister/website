export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }

  const normalized = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

