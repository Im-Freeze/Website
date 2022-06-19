import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import viteImagemin from "vite-plugin-imagemin";
import twig from "vite-plugin-twig";

export default defineConfig({
    plugins: [
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox",
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false,
                    },
                ],
            },
        }),
        twig(),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: "./index.html",
                downloads: "./downloads.html",
                //example1: "./example1.html",
                //example2: "./example2/index.html",
                // ...
                // List all files you want in your build
            },
        },
    },
    publicDir: "public",
    base: "./",
    server: {
        fs: {
            allow: [".."],
        },
    },
});
