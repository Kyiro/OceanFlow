import { Window } from "./lib/webpack";
import { WebpackChunks } from "./lib/webpack";
import OceanFlow from "./lib/oceanFlow";
import patcher from "./patcher";

import premiumSpoof from "./plugins/premiumSpoof";

(function main() {
    Window.oceanFlow = new OceanFlow();
    
    Window.oceanFlow.addPlugin(
        premiumSpoof
    );
    
    Object.defineProperty(Window, "webpackChunk_tidal_web", {
        get() {
            return Window.webpackChunk;
        },
        
        set(chunks: WebpackChunks) {
            Window.webpackChunk = chunks;
            if (!Window.webpackChunk.originalPush) patcher();
        }
    });
})();