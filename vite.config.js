import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        search: resolve(__dirname, "src/search/index.html"),
        recipe_detail: resolve(__dirname, "src/recipe-detail/index.html"),
        collections: resolve(__dirname, "src/collections/index.html"),
        profile: resolve(__dirname, "src/profile/index.html"),
      },
    },
  },
});
