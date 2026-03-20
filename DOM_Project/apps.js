// 1. Seleccionamos el body y los botones por su ID
const cuerpo = document.body;
const botonRojo = document.getElementById('btnRojo');
const botonAzul = document.getElementById('btnAzul');
const botonVerde = document.getElementById('btnVerde');

// 2. Creamos las funciones de cambio
botonRojo.addEventListener('click', () => {
    cuerpo.style.backgroundColor = '#ff4d4d';
});

botonAzul.addEventListener('click', () => {
    cuerpo.style.backgroundColor = '#4d94ff';
});

botonVerde.addEventListener('click', () => {
    cuerpo.style.backgroundColor = '#4dff88';
});