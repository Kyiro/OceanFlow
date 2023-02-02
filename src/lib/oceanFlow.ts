import { IPlugin, IPatch } from "./plugin";

export default class OceanFlow {
    plugins = new Set<IPlugin>();
    
    addPlugin(...plugins: IPlugin[]) {
        for (const plugin of plugins) {
            this.plugins.add(plugin);
        }
    }
    
    getPatches(): IPatch[] {
        const patches: IPatch[] = [];
        
        for (const plugin of this.plugins) {
            if (!plugin.patches) continue;
            
            for (const patch of plugin.patches) {
                patches.push(patch);
            }
        }
        
        return patches;
    }
}