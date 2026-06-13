(async () => {

    const response = await fetch("txomin.json");
    const site = await response.json();

    document.getElementById("site-title").textContent =
        site.menuHeader;

    const menuContainer = document.getElementById("menu");

    function renderItem(item) {

        document.title = item.titulo;

        document.getElementById("item-title").textContent =
            item.titulo;

        document.getElementById("item-description").innerHTML =
            item.descripcion ?? "";

        const gallery = document.getElementById("gallery");

        gallery.innerHTML = "";

        for (const image of item.imagenes ?? []) {

            const img = document.createElement("img");

            img.src = `menus/${item.id}/${image}`;
            img.alt = image;

            gallery.appendChild(img);
        }

        const links = document.getElementById("links");

        links.innerHTML = "";

        for (const enlace of item.enlaces ?? []) {

            const button = document.createElement("a");

            button.href = enlace.url;
            button.target = "_blank";
            button.rel = "noopener noreferrer";
            button.className = "link-button";
            button.textContent = enlace.texto;

            links.appendChild(button);
        }
    }

    function updateUrl(item) {

        const isHome = item.id === "programa";

        history.pushState(
            null,
            "",
            isHome
                ? window.location.pathname
                : `?id=${encodeURIComponent(item.id)}`
        );
    }

    for (const item of site.menus) {

        const link = document.createElement("a");

        const isHome = item.id === "programa";

        link.href = isHome
            ? "."
            : `?id=${encodeURIComponent(item.id)}`;

        link.textContent = item.titulo;

        link.addEventListener("click", e => {

            e.preventDefault();

            renderItem(item);

            updateUrl(item);
        });

        menuContainer.appendChild(link);
    }

    function loadCurrentItem() {

        const params = new URLSearchParams(window.location.search);

        const id = params.get("id");

        let item;

        if (id) {

            item = site.menus.find(x => x.id === id);
        }
        else {

            item = site.menus.find(x => x.id === "programa")
                ?? site.menus[0];
        }

        if (!item) {

            item = site.menus[0];
        }

        renderItem(item);
    }

    loadCurrentItem();

    window.addEventListener("popstate", () => {

        loadCurrentItem();
    });

})();