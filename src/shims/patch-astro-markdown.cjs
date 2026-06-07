const fs = require('node:fs');
const path = require('node:path');

const baseSchemaPath = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'dist',
  'core',
  'config',
  'schemas',
  'base.js'
);
const configEntrypointPath = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'dist',
  'config',
  'entrypoint.js'
);
const serverPluginPath = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'dist',
  'vite-plugin-astro-server',
  'plugin.js'
);
const eventsIndexPath = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'dist',
  'events',
  'index.js'
);
const integrationHooksPath = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'dist',
  'integrations',
  'hooks.js'
);
const settingsPath = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'dist',
  'core',
  'config',
  'settings.js'
);

if (!fs.existsSync(baseSchemaPath)) {
  process.exit(0);
}

const originalImports = `import { markdownConfigDefaults, syntaxHighlightDefaults } from "@astrojs/markdown-remark";
import { bundledThemes } from "shiki";`;

const lightweightDefaults = `const syntaxHighlightDefaults = { type: false, excludeLangs: [] };
const markdownConfigDefaults = {
  syntaxHighlight: false,
  shikiConfig: {
    langs: [],
    theme: "github-dark",
    themes: {},
    wrap: false,
    transformers: [],
    langAlias: {}
  },
  remarkPlugins: [],
  rehypePlugins: [],
  remarkRehype: {},
  gfm: false,
  smartypants: false
};
const bundledThemes = { "github-dark": "github-dark" };`;

const source = fs.readFileSync(baseSchemaPath, 'utf8');

if (source.includes(lightweightDefaults)) {
  patchConfigEntrypoint();
  process.exit(0);
}

if (!source.includes(originalImports)) {
  console.warn('Astro markdown schema patch skipped: expected import block was not found.');
  process.exit(0);
}

fs.writeFileSync(baseSchemaPath, source.replace(originalImports, lightweightDefaults));
console.log('Patched Astro markdown schema eager imports.');

patchConfigEntrypoint();

function patchConfigEntrypoint() {
  if (!fs.existsSync(configEntrypointPath)) {
    return;
  }

  const heavyConfigImport = 'import { defineConfig, getViteConfig } from "./index.js";';
  const lightweightConfigHelpers = `function defineConfig(config) {
  return config;
}
function getViteConfig(config) {
  return config;
}`;

  const entrypointSource = fs.readFileSync(configEntrypointPath, 'utf8');

  if (entrypointSource.includes(lightweightConfigHelpers)) {
    patchServerPlugin();
    patchTelemetry();
    patchIntegrationHooks();
    patchSettings();
    return;
  }

  if (!entrypointSource.includes(heavyConfigImport)) {
    console.warn('Astro config entrypoint patch skipped: expected import was not found.');
    patchServerPlugin();
    patchTelemetry();
    patchIntegrationHooks();
    patchSettings();
    return;
  }

  fs.writeFileSync(configEntrypointPath, entrypointSource.replace(heavyConfigImport, lightweightConfigHelpers));
  console.log('Patched Astro config entrypoint eager import.');

  patchServerPlugin();
  patchTelemetry();
  patchIntegrationHooks();
  patchSettings();
}

function patchServerPlugin() {
  if (!fs.existsSync(serverPluginPath)) {
    return;
  }

  const pluginSource = fs.readFileSync(serverPluginPath, 'utf8');
  if (pluginSource.includes('Lightweight static-build server plugin shim')) {
    return;
  }

  const lightweightServerPlugin = `// Lightweight static-build server plugin shim for this portfolio.
import { createKey, getEnvironmentKey, hasEnvironmentKey } from "../core/encryption.js";

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  return next();
};

function createVitePluginAstroServer() {
  return {
    name: "astro:server"
  };
}

function createDevelopmentManifest(settings) {
  return {
    hrefRoot: settings.config.root.toString(),
    srcDir: settings.config.srcDir,
    cacheDir: settings.config.cacheDir,
    outDir: settings.config.outDir,
    buildServerDir: settings.config.build.server,
    buildClientDir: settings.config.build.client,
    publicDir: settings.config.publicDir,
    trailingSlash: settings.config.trailingSlash,
    buildFormat: settings.config.build.format,
    compressHTML: settings.config.compressHTML,
    assets: new Set(),
    entryModules: {},
    routes: [],
    adapterName: settings?.adapter?.name || "",
    clientDirectives: settings.clientDirectives,
    renderers: [],
    base: settings.config.base,
    userAssetsBase: settings.config?.vite?.base,
    assetsPrefix: settings.config.build.assetsPrefix,
    site: settings.config.site,
    componentMetadata: new Map(),
    inlinedScripts: new Map(),
    i18n: undefined,
    checkOrigin: false,
    key: hasEnvironmentKey() ? getEnvironmentKey() : createKey(),
    middleware() {
      return {
        onRequest: NOOP_MIDDLEWARE_FN
      };
    },
    sessionConfig: undefined
  };
}

export {
  createDevelopmentManifest,
  createVitePluginAstroServer as default
};
`;

  fs.writeFileSync(serverPluginPath, lightweightServerPlugin);
  console.log('Patched Astro dev-server plugin eager imports.');
}

function patchTelemetry() {
  if (!fs.existsSync(eventsIndexPath)) {
    return;
  }

  const eventsSource = fs.readFileSync(eventsIndexPath, 'utf8');
  if (eventsSource.includes('Lightweight telemetry shim')) {
    return;
  }

  const lightweightEvents = `// Lightweight telemetry shim for this portfolio.
const telemetry = {
  record() {},
  async notify() {},
  async flush() {}
};

export * from "./error.js";
export * from "./session.js";
export {
  telemetry
};
`;

  fs.writeFileSync(eventsIndexPath, lightweightEvents);
  console.log('Patched Astro telemetry eager import.');
}

function patchIntegrationHooks() {
  if (!fs.existsSync(integrationHooksPath)) {
    return;
  }

  const hooksSource = fs.readFileSync(integrationHooksPath, 'utf8');
  if (hooksSource.includes('Lightweight integration hook shim')) {
    return;
  }

  const lightweightHooks = `// Lightweight integration hook shim for this portfolio.
function getToolbarServerCommunicationHelpers() {
  return {
    send() {},
    on() {},
    onAppInitialized() {},
    onAppToggled() {}
  };
}

function normalizeCodegenDir(integrationName) {
  return \`./integrations/\${String(integrationName).replace(/[^\\w.-]/g, "_")}/\`;
}

function normalizeInjectedTypeFilename(filename, integrationName) {
  return \`\${normalizeCodegenDir(integrationName)}\${String(filename).replace(/[^\\w.-]/g, "_")}\`;
}

async function runHookConfigSetup({ settings }) {
  return settings;
}
async function runHookConfigDone() {}
async function runHookServerSetup() {}
async function runHookServerStart() {}
async function runHookServerDone() {}
async function runHookBuildStart() {}
async function runHookBuildSetup(options) {
  return options;
}
async function runHookBuildSsr(options) {
  return options;
}
async function runHookBuildGenerated() {}
async function runHookBuildDone() {}
async function runHookRouteSetup(options) {
  return options?.route;
}
async function runHookRoutesResolved() {}

export {
  getToolbarServerCommunicationHelpers,
  normalizeCodegenDir,
  normalizeInjectedTypeFilename,
  runHookBuildDone,
  runHookBuildGenerated,
  runHookBuildSetup,
  runHookBuildSsr,
  runHookBuildStart,
  runHookConfigDone,
  runHookConfigSetup,
  runHookRouteSetup,
  runHookRoutesResolved,
  runHookServerDone,
  runHookServerSetup,
  runHookServerStart
};
`;

  fs.writeFileSync(integrationHooksPath, lightweightHooks);
  console.log('Patched Astro integration hook eager imports.');
}

function patchSettings() {
  if (!fs.existsSync(settingsPath)) {
    return;
  }

  const settingsSource = fs.readFileSync(settingsPath, 'utf8');
  if (settingsSource.includes('Lightweight static settings shim')) {
    return;
  }

  const lightweightSettings = `// Lightweight static settings shim for this portfolio.
import { fileURLToPath, pathToFileURL } from "node:url";

class AstroTimer {
  start() {}
  end() {}
}

function createBaseSettings(config) {
  const dotAstroDir = new URL(".astro/", config.root);
  return {
    config,
    preferences: {},
    tsConfig: undefined,
    tsConfigPath: undefined,
    adapter: undefined,
    injectedRoutes: [],
    resolvedInjectedRoutes: [],
    serverIslandMap: new Map(),
    serverIslandNameMap: new Map(),
    pageExtensions: [".astro", ".html"],
    contentEntryTypes: [],
    dataEntryTypes: [],
    renderers: [],
    scripts: [],
    clientDirectives: new Map(),
    middlewares: { pre: [], post: [] },
    watchFiles: [],
    devToolbarApps: [],
    timer: new AstroTimer(),
    dotAstroDir,
    latestAstroVersion: undefined,
    injectedTypes: [],
    buildOutput: undefined
  };
}

async function createSettings(config, cwd) {
  const settings = createBaseSettings(config);
  if (cwd) {
    settings.watchFiles = [fileURLToPath(new URL("./package.json", pathToFileURL(cwd)))];
  }
  return settings;
}

export {
  createBaseSettings,
  createSettings
};
`;

  fs.writeFileSync(settingsPath, lightweightSettings);
  console.log('Patched Astro settings eager imports.');
}
