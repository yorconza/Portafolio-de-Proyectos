let ordenOriginal = [];

document.addEventListener("DOMContentLoaded", () => {
    const row = document.querySelector('.row');
    ordenOriginal = Array.from(row.querySelectorAll('.col'));

    const radioOriginal = document.querySelector('input[name="orden"][value="original"]');
    if (radioOriginal) {
        radioOriginal.checked = true;
    }

    generarFiltroMarcas();
    activarEventos();
    actualizarVehiculos();
});

function normalizarMarca(nombreCompleto) {
    const primeraPalabra = nombreCompleto.split(' ')[0].trim().toLowerCase();

    if (primeraPalabra === "mercedes-benz" || primeraPalabra === "mercedes") {
        return "Mercedes";
    }

    if (primeraPalabra === "vw") {
        return "Volkswagen";
    }

    return primeraPalabra.charAt(0).toUpperCase() + primeraPalabra.slice(1);
}

function generarFiltroMarcas() {
    const cards = Array.from(document.querySelectorAll('.row .col'));
    const contenedor = document.getElementById('filtroMarcas');

    const marcasUnicas = [...new Set(
        cards.map(card => {
            const nombre = card.querySelector('.card-title').textContent.trim();
            return normalizarMarca(nombre);
        })
    )].sort((a, b) => a.localeCompare(b));

    let html = `
        <label><input type="radio" name="marca" value="todas" checked> Todas</label>
    `;

    marcasUnicas.forEach(marca => {
        html += `
            <label><input type="radio" name="marca" value="${marca}"> ${marca}</label>
        `;
    });

    contenedor.innerHTML = html;
}

function activarEventos() {
    document.querySelectorAll('input[name="orden"], input[name="marca"]').forEach(radio => {
        radio.addEventListener('change', actualizarVehiculos);
    });
}

function actualizarVehiculos() {
    const ordenSeleccionado = document.querySelector('input[name="orden"]:checked');
    const marcaSeleccionadaInput = document.querySelector('input[name="marca"]:checked');

    const criterio = ordenSeleccionado ? ordenSeleccionado.value : "original";
    const marcaSeleccionada = marcaSeleccionadaInput ? marcaSeleccionadaInput.value : "todas";

    const row = document.querySelector('.row');
    const cards = Array.from(row.querySelectorAll('.col'));

    cards.forEach(card => {
        const nombre = card.querySelector('.card-title').textContent.trim();
        const marca = normalizarMarca(nombre);

        if (marcaSeleccionada === "todas" || marca === marcaSeleccionada) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    let visibles = cards.filter(card => card.style.display !== "none");

    if (criterio === "original") {
        visibles = ordenOriginal.filter(card => card.style.display !== "none");
    } else {
        visibles.sort((a, b) => {
            const nombreA = a.querySelector('.card-title').textContent.trim();
            const nombreB = b.querySelector('.card-title').textContent.trim();

            const precioA = parseInt(a.querySelector('.fw-bold').textContent.replace(/[^\d]/g, ''));
            const precioB = parseInt(b.querySelector('.fw-bold').textContent.replace(/[^\d]/g, ''));

            if (criterio === 'nombre-az') return nombreA.localeCompare(nombreB);
            if (criterio === 'nombre-za') return nombreB.localeCompare(nombreA);
            if (criterio === 'precio-asc') return precioA - precioB;
            if (criterio === 'precio-desc') return precioB - precioA;

            return 0;
        });
    }

    visibles.forEach(card => row.appendChild(card));
}