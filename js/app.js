(async () => {

    const response = await fetch("txomin.json");
    const site = await response.json();

    document.title = site.titulo;

    document.getElementById("site-title").textContent =
        site.menuHeader;

    const menu = document.getElementById("menu");

    const homeLink = document.createElement("a");

    homeLink.href = site.menuPrincipal.url;
    homeLink.textContent = site.menuPrincipal.texto;

    menu.appendChild(homeLink);

    for (const event of site.eventos) {

        const link = document.createElement("a");

        link.href = `evento.html?id=${encodeURIComponent(event.id)}`;
        link.textContent = `${event.titulo}`;

        menu.appendChild(link);
    }

    const gallery = document.getElementById("gallery");

    for (const image of site.portada) {

        const img = document.createElement("img");

        img.src = `portada/${image}`;
        img.alt = image;

        gallery.appendChild(img);
    }

})();