console.log("APP JS CARGADO");
const form = document.getElementById("formulario");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("FORMULARIO ENVIADO");
    
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked');

    if (!generoSeleccionado) {
        alert("Seleccione un género");
        return;
    }

    const datos = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        passwords: document.getElementById("passwords").value,
        celular: document.getElementById("celular").value,
        direccion: document.getElementById("direccion").value,
        fecha: document.getElementById("fecha").value,
        genero: generoSeleccionado.value
    };

    try {
        const response = await fetch("http://localhost:3000/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const data = await response.text();
        alert(data);
        form.reset();
    } catch (error) {
        console.error("Error al enviar:", error);
        alert("No se pudo conectar con el servidor");
    }
}); // <-- Aquí terminaba el error, quité el "app" que tenías de más