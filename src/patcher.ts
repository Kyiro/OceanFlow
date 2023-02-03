import { WebpackChunk } from "./lib/webpack";

export default function patcher() {
    const patches = window.oceanFlow.getPatches();

    window.webpackChunk.originalPush = window.webpackChunk.push;

    window.webpackChunk.push = (...chunks: WebpackChunk[]) => {
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

        return window.webpackChunk.originalPush(...chunks);
    };
}
