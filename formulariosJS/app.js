const formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked')?.value;

        const datos = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            passwords: document.getElementById("passwords").value,
            celular: document.getElementById("celular").value,
            direccion: document.getElementById("direccion").value,
            fecha: document.getElementById("fecha").value,
            genero: generoSeleccionado
        };

        try {
            const response = await fetch('/guardar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resData = await response.json();
            alert(response.ok ? "✅ " + resData.mensaje : "⚠️ Error: " + resData.error);
            if (response.ok) formulario.reset();
        } catch (error) {
            console.error("Error registro:", error);
        }
    });
}

// ==========================================
// PARTE 2: LÓGICA DE CONSULTA (consulta.html)
// ==========================================
const btnConsultar = document.getElementById("btnConsultar");
if (btnConsultar) {
    btnConsultar.addEventListener("click", async () => {
        const inputNombre = document.getElementById("nombreBusqueda");
        const datosPersona = document.getElementById("datosPersona");
        const nombreParaBuscar = inputNombre.value.trim();

        if (!nombreParaBuscar) return alert("⚠️ Ingresa un nombre.");

        try {
            const response = await fetch(`/consultar/${nombreParaBuscar}`);
            const data = await response.json();

            if (response.ok) {
                datosPersona.innerHTML = `
                    <div class="detalle-factura">
                        <h3>✅ Usuario Encontrado</h3>
                        <p><strong>Nombre:</strong> ${data.nombre}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Celular:</strong> ${data.celular}</p>
                        <p><strong>Dirección:</strong> ${data.direccion}</p>
                        <p><strong>Género:</strong> ${data.genero}</p>
                    </div>`;
            } else {
                datosPersona.innerHTML = `<p>❌ ${data.mensaje}</p>`;
            }
        } catch (error) {
            console.error("Error consulta:", error);
        }
    });
}