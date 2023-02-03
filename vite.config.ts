import { defineConfig } from "vite";
import webExtension from "@samrum/vite-plugin-web-extension";
import manifest from "./browser/manifest";
import path from "path";

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            webExtension({
                manifest
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        build: {
            minify: mode == "production"
        }
    };
});
