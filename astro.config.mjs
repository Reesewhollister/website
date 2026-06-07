import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://reesehollister.com';
const base = process.env.SITE_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  markdown: {
    syntaxHighlight: false
  },
  integrations: []
});
