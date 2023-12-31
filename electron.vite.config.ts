import path, { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: { entry: path.join(__dirname, "/src/electron/main.ts") },
      outDir: "dist/electron",
    },
    resolve: {
      alias: {
        "@/electron": resolve("src/electron"),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/preload",
    },
    resolve: {
      alias: {
        "@/electron": resolve("src/electron"),
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        "@/renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [vue()],
    build: {
      outDir: "dist/renderer",
    },
  },
});
