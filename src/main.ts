import { WebpackChunks } from "./lib/webpack";
import OceanFlow from "./lib/oceanFlow";
import patcher from "./patcher";

import premiumSpoof from "./plugins/premiumSpoof";

(function main() {
    window.oceanFlow = new OceanFlow();
    
    window.oceanFlow.addPlugin(
        premiumSpoof
    );
    
    Object.defineProperty(Window, "webpackChunk_tidal_web", {
        get() {
            return window.webpackChunk;
        },
        
        set(chunks: WebpackChunks) {
            window.webpackChunk = chunks;
            if (!window.webpackChunk.originalPush) patcher();
        }
    });
})();