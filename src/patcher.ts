import { print, waitFor } from './utils';

import { Window, expose, Find, getExposed } from './webpack';

export interface IPatch {
    name?: string;
    moduleFlag: string;
    regex: RegExp;
    replacement: string;
}
export const patches: Set<IPatch> = new Set();

async function InitPatcher() {
    print("info", 'Patcher initialized');

    expose("originalWebpackChunktidalWebPush", Window.webpackChunk_tidal_web.push);
    
    expose("fetchHook", (...args: any[]): Promise<Response> | null => {
        console.log(args);
        
        return null;
    });
    
    patches.add({
        name: "Spoof Subscription",
        moduleFlag: "loadUser",
        regex: /subscriptionResponse: \((.*)\)/g,
        replacement: "subscriptionResponse: new Response(JSON.stringify({validUntil:'2040-02-01T12:17:31.256Z',status:'ACTIVE',subscription:{type:'HIFI',offlineGracePeriod:30},highestSoundQuality:'HI_RES',premiumAccess:!0,canGetTrial:!1,paymentType:'PARENT'}),{headers:{'Content-Type':'application/json'}});"
    });

    Window.webpackChunk_tidal_web.push = function (chunk: any) {

        Object.entries(chunk[1]).forEach(([ID, module]: any) => {

            const moduleCode = module.toString().replace(/\n/g, '');

            for (const patch of patches) {
                if (moduleCode.includes(patch.moduleFlag)) {
                    print("info", "module flag included");
                }
                
                if (patch.regex.test(moduleCode)) {
                    const match = moduleCode.match(patch.regex);
                    
                    if (match) {
                        print("info", "Found match: " + match[0]);
                        const newModuleCode = moduleCode.replace(patch.regex, patch.replacement);
                        chunk[1][ID] = (0, eval)(newModuleCode);
                    }
                }
                else {
                    print("info", "nope");
                }
            }
        });

        getExposed<Function>("originalWebpackChunktidalWebPush")(chunk);
    }
}

export function UltimateDiscordExperience() {
    waitFor(() => Window?.webpackChunk_tidal_web?.push).then(async () => {
        print("info", "Webpack is loaded starting patcher");

        await InitPatcher();

        expose('findByProps', Find.ByProps);
        expose('findByCode', Find.ByCode);
    });
}

export function Debug() {

}