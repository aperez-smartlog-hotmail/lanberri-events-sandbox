(async () => {

    const response = await fetch("txomin.json");
    const site = await response.json();

    if (site.menuTitulo?.trim()) {

        document.getElementById("site-title").textContent =
            site.menuTitulo;
    }
    else {

        document
            .getElementById("sidebar-header")
            ?.remove();
    }

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    menuToggle.textContent =
        site.menuAbrir;

    const menuContainer = document.getElementById("menu");

    function renderItem(item) {

        document.title = item.titulo;

        document.getElementById("item-title").textContent =
            item.titulo;

        document.getElementById("item-description").innerHTML =
            item.descripcion ?? "";

        document
            .querySelectorAll("#menu a")
            .forEach(x => x.classList.remove("active"));

        const activeLink =
            document.querySelector(
                `#menu a[data-menu-id="${item.id}"]`
            );

        if (activeLink) {

            activeLink.classList.add("active");
        }

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

        //animateContent();
        animateElements();  
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

        link.dataset.menuId = item.id;

        link.addEventListener("click", e => {

            e.preventDefault();

            renderItem(item);

            updateUrl(item);

            if (window.innerWidth <= 768) {

                sidebar.classList.remove("open");

                menuToggle.textContent =
                    site.menuAbrir;
            }
        });

        menuContainer.appendChild(link);
    }

    function loadCurrentItem() {

        const params =
            new URLSearchParams(window.location.search);

        const id = params.get("id");

        let item;

        if (id) {

            item =
                site.menus.find(x => x.id === id);
        }
        else {

            item =
                site.menus.find(x => x.id === "programa")
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

    menuToggle.addEventListener("click", () => {

        sidebar.classList.toggle("open");

        menuToggle.textContent =
            sidebar.classList.contains("open")
                ? site.menuCerrar
                : site.menuAbrir;
    });

    // function animateContent() {

    //     const content =
    //         document.getElementById("content");

    //     content.classList.remove(
    //         "content-enter",
    //         "content-enter-active"
    //     );

    //     void content.offsetWidth;

    //     content.classList.add("content-enter");

    //     requestAnimationFrame(() => {

    //         content.classList.add(
    //             "content-enter-active"
    //         );
    //     });
    // }

//     function animateContent() {

//     const content =
//         document.getElementById("content");

//     content.classList.remove(
//         "content-slide-in",
//         "content-slide-in-active"
//     );

//     void content.offsetWidth;

//     content.classList.add("content-slide-in");

//     requestAnimationFrame(() => {

//         content.classList.add(
//             "content-slide-in-active"
//         );
//     });
// }

function animateElements() {

    const elements =
        document.querySelectorAll(
            "#item-title, #item-description, #links, #gallery"
        );

    elements.forEach((e, index) => {

        e.classList.remove("show");
        e.classList.add("animate-item");

        setTimeout(() => {

            e.classList.add("show");

        }, index * 120);
    });
}
})();