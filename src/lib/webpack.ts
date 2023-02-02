import { unsafeWindow } from "$";

export const Window = (unsafeWindow as Window);

export type WebpackModule = {
    [id: number]: Function
};

export type WebpackChunk = [
    id: number[],
    module: WebpackModule,
    webpackRequire?: Function
];

export type WebpackChunks = WebpackChunk[] & {
    push(...chunks: WebpackChunk[]): number,
    originalPush(...chunks: WebpackChunk[]): number
};

export var webpackChunks = Window.webpackChunk_tidal_web;