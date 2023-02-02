import { Window, WebpackChunk } from "./lib/webpack";

export default function patcher() {
    const patches = Window.oceanFlow.getPatches();
    
    Window.webpackChunk.originalPush = Window.webpackChunk.push;
    
    Window.webpackChunk.push = (...chunks: WebpackChunk[]) => {
        for (const chunk of chunks) {
            console.log("Chunk: ", chunk[0]);
            
            for (const [id, module] of Object.entries(chunk[1])) {
                const moduleCode = module.toString();
                
                for (const patch of patches) {
                    if (!patch.find.test(moduleCode)) continue;
                    
                    console.log("Patching", patch.name);
                    
                    const newModuleCode = moduleCode.replace(patch.find, patch.replace);
                    
                    chunk[1][parseInt(id)] = (0, eval)(newModuleCode);
                }
            }
        }
        
        return Window.webpackChunk.originalPush(...chunks);
    };
}