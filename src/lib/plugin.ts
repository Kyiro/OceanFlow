export interface IPatch {
    name?: string,
    find: RegExp,
    replace: string
}

export interface IPlugin {
    name: string,
    patches?: IPatch[],
    init?: () => void
}

export function definePlugin(pluginOptions: IPlugin) {
    return pluginOptions;
}