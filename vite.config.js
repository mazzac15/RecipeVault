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
        recipe: resolve(__dirname, "src/recipe-detail/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        signup: resolve(__dirname, "src/signup/index.html"),
      },
    },
  },
});
