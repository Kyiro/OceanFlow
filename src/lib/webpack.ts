export type WebpackModule = {
    [id: number]: Function;
};

export type WebpackChunk = [id: number[], module: WebpackModule, webpackRequire?: Function];

export type WebpackChunks = WebpackChunk[] & {
    push(...chunks: WebpackChunk[]): number;
    originalPush(...chunks: WebpackChunk[]): number;
};
