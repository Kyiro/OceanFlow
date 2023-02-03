import { pathname } from "../src/main";

if (typeof browser == "undefined") {
    // @ts-ignore
    var browser = chrome;
}

function injectScript(name: string) {
    const script = document.createElement("script");

    script.setAttribute("type", "module");
    script.setAttribute("src", browser.runtime.getURL(name));

    document.documentElement.appendChild(script);
}

console.trace("Injecting OceanFlow");
injectScript(pathname);
