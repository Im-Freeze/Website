import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import compress from "vite-plugin-compress";
import twig from "vite-plugin-twig";

export default defineConfig({
    plugins: [
        twig(),
        compress(),
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
    server: {
        fs: {
            allow: [".."],
        },
    },
});
