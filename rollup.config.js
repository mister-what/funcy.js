import path from "path";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default [
  {
    input: { full: "src/export_all.js", core: "src/export_core.js" },
    plugins: [resolve(), babel()],
    output: [
      {
        entryFileNames: "[name].js",
        chunkFileNames: "chunk.[hash].js",
        dir: path.resolve(__dirname, "dist", "cjs"),
        name: "funcyjs",
        format: "cjs"
      },
      {
        entryFileNames: "[name].mjs",
        chunkFileNames: "chunk.[hash].mjs",
        dir: path.resolve(__dirname, "dist", "esm"),
        format: "esm"
      }
    ]
  },
  {
    input: { full: "src/export_all.js", core: "src/export_core.js" },
    plugins: [resolve(), babel(), terser({ sourcemap: true })],
    output: [
      {
        entryFileNames: "[name].min.js",
        dir: path.resolve(__dirname, "dist", "cjs"),
        chunkFileNames: "chunk.[hash].min.js",
        name: "funcyjs",
        format: "cjs",
        sourcemap: true
      },
      {
        entryFileNames: "[name].min.mjs",
        chunkFileNames: "chunk.[hash].min.mjs",
        dir: path.resolve(__dirname, "dist", "esm"),
        format: "esm",
        sourcemap: true
      }
    ]
  },
  {
    input:"src/export_all.js",
    plugins: [resolve(), babel(), terser({ sourcemap: true })],
    output: {
      file: path.resolve(__dirname, "dist", "umd", "full.min.js"),
      name: "funcyjs",
      format: "umd",
      sourcemap: true
    }
  },
  {
    input:"src/export_core.js",
    plugins: [resolve(), babel(), terser({ sourcemap: true })],
    output: {
      file: path.resolve(__dirname, "dist", "umd", "core.min.js"),
      name: "funcyjs",
      format: "umd",
      sourcemap: true
    }
  },
];
