function start_up() {
    return new Promise((resolve, reject) => {
        const util_script = document.createElement("script");
        util_script.src = "./js/utils.js";
        util_script.onload = () => {
            try {
                const container = utils.elem_id("onload-data-container");
                if (!container) throw new Error("missing #onload-data-container");

                const items = utils.elem_descendants(container);

                items.forEach(el => {
                    const [type, payload] = el.textContent.split("|");

                    switch (type) {
                        case "font": {
                            const wrapper = utils.elem_create("div");
                            wrapper.innerHTML = payload;
                            utils.elem_append(document.head, wrapper.firstElementChild);
                            break;
                        }
                        case "scripttag": {
                            const s = utils.elem_create("script");
                            s.src = payload;
                            utils.elem_append(document.body, s);
                            break;
                        }
                        case "linkcsstag": {
                            const link = utils.elem_create("link");
                            link.rel = "stylesheet";
                            link.href = payload;
                            utils.elem_append(document.head, link);
                            break;
                        }
                        case "linkfavicontag": {
                            const link = utils.elem_create("link");
                            link.rel = "icon";
                            link.type = "image/x-icon";
                            link.href = payload;
                            utils.elem_append(document.head, link);
                            break;
                        }
                        default:
                            console.warn(`unknown on‑load directive: ${type}`);
                    }
                });
                resolve(true);
            } catch (err) {
                console.error("start_up error:", err);
                reject(err);
            }
        };
        util_script.onerror = e => reject(new Error("failed to load utils.js"));
        document.body.appendChild(util_script);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    start_up();
});