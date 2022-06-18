import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
    plugins: [
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    title: "SharkMC",
                    description:
                        "Vzdelávajte, Informujte, Budujte sa! S www.dobrefakty.gq získate všetky potrebné informácie!",
                    url: "https://www.dobrefakty.gq/",
                    buttonText: "Klikni pre načítanie stránky",
                },
            },
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
