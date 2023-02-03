class OceanFlow {
  plugins = /* @__PURE__ */ new Set();
  addPlugin(...plugins) {
    for (const plugin of plugins) {
      this.plugins.add(plugin);
    }
  }
  getPatches() {
    const patches = [];
    for (const plugin of this.plugins) {
      if (!plugin.patches)
        continue;
      for (const patch of plugin.patches) {
        patches.push(patch);
      }
    }
    return patches;
  }
}
function patcher() {
  const patches = window.oceanFlow.getPatches();
  window.webpackChunk.originalPush = window.webpackChunk.push;
  window.webpackChunk.push = (...chunks) => {
    for (const chunk of chunks) {
      console.log("Chunk: ", chunk[0]);
      for (const [id, module] of Object.entries(chunk[1])) {
        const moduleCode = module.toString();
        for (const patch of patches) {
          if (!patch.find.test(moduleCode))
            continue;
          console.log("Patching", patch.name);
          const newModuleCode = moduleCode.replace(patch.find, patch.replace);
          chunk[1][parseInt(id)] = (0, eval)(newModuleCode);
        }
      }
    }
    return window.webpackChunk.originalPush(...chunks);
  };
}
function definePlugin(pluginOptions) {
  return pluginOptions;
}
const premiumSpoof = definePlugin({
  name: "PremiumSpoof",
  patches: [
    {
      name: "Change Subscription Type",
      find: /(subscriptionResponse):\s?\(.*\)/g,
      replace: "$1: new Response(JSON.stringify({validUntil:'2040-02-01T12:17:31.256Z',status:'ACTIVE',subscription:{type:'HIFI',offlineGracePeriod:30},highestSoundQuality:'HI_RES',premiumAccess:!0,canGetTrial:!1,paymentType:'PARENT'}),{headers:{'Content-Type':'application/json'}})"
    }
  ]
});
console.trace("Loading OceanFlow");
window.oceanFlow = new OceanFlow();
window.oceanFlow.addPlugin(premiumSpoof);
Object.defineProperty(window, "webpackChunk_tidal_web", {
  get() {
    return window.webpackChunk;
  },
  set(chunks) {
    window.webpackChunk = chunks;
    if (!window.webpackChunk.originalPush)
      patcher();
  },
  configurable: true
});
