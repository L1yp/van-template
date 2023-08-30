import {configSvgIconsPlugin} from "./svg-icon-vite-plugin"
import vue from '@vitejs/plugin-vue';
import buildCompression from 'vite-plugin-compression'
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from 'vite-svg-loader'

export function createVitePlugins(viteEnv: Record<string, string>, isBuild: boolean) {
  const plugins = [
    vue(),
    svgLoader(),
  ];
  plugins.push(configSvgIconsPlugin(isBuild));
  const gzipPlugin = buildCompression({
    threshold: 102400
  })
  plugins.push(gzipPlugin)
  plugins.push(vueJsx())
  return plugins;
}