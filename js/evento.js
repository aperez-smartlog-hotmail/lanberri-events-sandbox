(async () => {

    const response = await fetch("txomin.json");
    const site = await response.json();

    document.getElementById("site-title").textContent =
        site.menuHeader;

    const menu = document.getElementById("menu");

    const homeLink = document.createElement("a");

    homeLink.href = site.menuPrincipal.url;
    homeLink.textContent = site.menuPrincipal.texto;

    menu.appendChild(homeLink);

    for (const item of site.eventos) {

        const link = document.createElement("a");

        link.href = `evento.html?id=${encodeURIComponent(item.id)}`;
        link.textContent = `${item.titulo}`;

        menu.appendChild(link);
    }

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");

    const event = site.eventos.find(x => x.id === eventId);

    if (!event) {

        document.title = site.titulo;

        document.getElementById("content").innerHTML =
            "<h1>Evento no encontrado</h1>";

        return;
    }

    //document.title = `${event.titulo} - ${site.titulo}`;
    document.title = `${event.titulo}`;

    document.getElementById("event-title").textContent =
        event.titulo;

    if (event.descripcion) {

    document.getElementById("event-description").innerHTML =
        event.descripcion;
}

    const gallery = document.getElementById("gallery");

    for (const image of event.imagenes) {

        const img = document.createElement("img");

        img.src = `eventos/${event.id}/${image}`;
        img.alt = image;

        gallery.appendChild(img);
    }

    if (event.enlaces?.length) {

    const links = document.getElementById("links");

    for (const enlace of event.enlaces) {

        const button = document.createElement("a");

        button.href = enlace.url;
        button.target = "_blank";
        button.rel = "noopener noreferrer";
        button.className = "link-button";
        button.textContent = enlace.texto;

        links.appendChild(button);
    }
}

})();