import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

const { publicVars } = loadEnv({ prefixes: ['FESSIOR_'] });

export default defineConfig({
  source: {
    define: publicVars,
  },
  plugins: [ pluginReact(), pluginSvgr() ],
  server: {
    port: 3000,
  },
  output: {
    distPath: {
      root: 'build',
    },
  },
});


