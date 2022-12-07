import { resolve } from "path";

export default {
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "The Claw Webring Widget",
      formats: ["es", "cjs"],
      fileName: "the-claw-webring-widget",
    },
  },
};
