const btnModo = document.getElementById("modoOscuroBtn");

btnModo.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Guardar preferencia
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("modo", "oscuro");
        btnModo.textContent = "☀️";
    } else {
        localStorage.setItem("modo", "claro");
        btnModo.textContent = "🌙";
    }
});

// Cargar preferencia al entrar
document.addEventListener("DOMContentLoaded", () => {
    const modoGuardado = localStorage.getItem("modo");

    if (modoGuardado === "oscuro") {
        document.body.classList.add("dark-mode");
        btnModo.textContent = "☀️";
    }
});