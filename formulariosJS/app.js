// --- LÓGICA DE CONSULTA (consulta.html) ---
const btnConsultar = document.getElementById("btnConsultar");
const inputNombre = document.getElementById("nombreBusqueda");

if (btnConsultar && inputNombre) {
    btnConsultar.addEventListener("click", async () => {
        const valor = inputNombre.value.toLowerCase().trim();

        if (!valor) {
            alert("Escribe un nombre primero");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/consultar/${encodeURIComponent(valor)}`);
            const datosPersona = document.getElementById("datosPersona");
            
            if (response.ok) {
                const data = await response.json();
                
                // --- AQUÍ PONEMOS EL ESTILO FACTURA ---
                datosPersona.innerHTML = `
                    <div class="factura-row">
                        <div class="factura-etiqueta">Nombre del Usuario:</div>
                        <div class="factura-value">${data.nombre}</div>
                    </div>
                    <div class="factura-row">
                        <div class="factura-etiqueta">Teléfono:</div>
                        <div class="factura-value">${data.celular}</div>
                    </div>
                    <div class="factura-row">
                        <div class="factura-etiqueta">Género:</div>
                        <div class="factura-value">${data.genero}</div>
                    </div>
                    <div class="factura-row">
                        <div class="factura-etiqueta">Dirección:</div>
                        <div class="factura-value">${data.direccion}</div>
                    </div>
                    <div class="factura-row">
                        <div class="factura-etiqueta">Correo Electrónico:</div>
                        <div class="factura-value">${data.email || 'No registrado'}</div>
                    </div>
                `;
            } else {
                datosPersona.innerHTML = `<p style="color:red; text-align:center; margin-top:20px;">⚠️ No se encontró al usuario: <b>${valor}</b></p>`;
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error al conectar con el servidor");
        }
    });
}