import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import twig from "vite-plugin-twig";

export default defineConfig({
    plugins: [
        twig(),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: "./index.html",
                //example1: "./example1.html",
                //example2: "./example2/index.html",
                // ...
                // List all files you want in your build
            },
        },
    },
    publicDir: "assets",
    base: "./",
    server: {
        fs: {
            allow: [".."],
        },
    },
});
