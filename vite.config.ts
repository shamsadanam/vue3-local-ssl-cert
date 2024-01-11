import { readFileSync } from "fs";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "dev.local",
    port: 8080,
    // disableHostCheck: true,
    https: {
      key: readFileSync("./certs/dev.local+4-key.pem"),
      cert: readFileSync("./certs/dev.local+4.pem"),
      //ca: readFileSync('./certs/my-ca.crt')
    },
    proxy: {
      "^/api": {
        target: "http://localhost:1337",
        changeOrigin: true,
      },
    },
  },
});
