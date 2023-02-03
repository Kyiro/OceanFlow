import { WebpackChunks } from "./lib/webpack";
import OceanFlow from "./lib/oceanFlow";
import patcher from "./patcher";

import premiumSpoof from "./plugins/premiumSpoof";

export const pathname = new URL(import.meta.url).pathname;

function main() {
    console.trace("Loading OceanFlow");

    window.oceanFlow = new OceanFlow();
    window.oceanFlow.addPlugin(premiumSpoof);

    Object.defineProperty(window, "webpackChunk_tidal_web", {
        get() {
            return window.webpackChunk;
        },

        set(chunks: WebpackChunks) {
            window.webpackChunk = chunks;
            if (!window.webpackChunk.originalPush) patcher();
        },

        configurable: true
    });
}

if (typeof browser == "undefined" && typeof chrome.runtime == "undefined") main();
