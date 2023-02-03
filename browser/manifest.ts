import pkg from "../package.json";

type WebExtensionManifest = browser._manifest.WebExtensionManifest;

function defineManifest(manifest: WebExtensionManifest): WebExtensionManifest {
    return manifest;
}

export default defineManifest({
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    manifest_version: 3,

    host_permissions: ["*://listen.tidal.com/*", "*://desktop.tidal.com/*"],
    permissions: ["declarativeNetRequest"],

    content_scripts: [
        {
            run_at: "document_start",
            matches: ["*://*.tidal.com/*"],
            js: ["browser/content.ts"]
        }
    ],

    web_accessible_resources: [
        {
            resources: ["src/main.ts"],
            matches: ["*://*.tidal.com/*"]
        }
    ],

    declarative_net_request: {
        rule_resources: [
            {
                id: "modifyResponseHeaders",
                enabled: true,
                path: "modifyResponseHeaders.json"
            }
        ]
    }
});
