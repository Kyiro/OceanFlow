import OceanFlow from "@/lib/oceanFlow";
import { WebpackChunks } from "@/lib/webpack";

declare global {
    interface Window {
        oceanFlow: OceanFlow;
        webpackChunk: WebpackChunks;
        get webpackChunk_tidal_web(): WebpackChunks;
        set webpackChunk_tidal_web(chunks: WebpackChunks);
    }
}
