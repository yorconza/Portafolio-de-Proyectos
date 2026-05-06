const infoProvincias = {
    "San José": {
        nombre: "Sucursal Central",
        desc: "Nuestra sede principal ubicada en la capital, equipada con todos los servicios: venta de vehículos, financiamiento personalizado y atención especializada para cada cliente.",
        tel: "1111-1111",
        correo: "fysanjo@gmail.com",
        img: "../img/mapa/sanjose.jpg"
    },
    "Alajuela": {
        nombre: "Sucursal Alajuela",
        desc: "Sucursal estratégica cerca del aeropuerto, ideal para una atención rápida. Contamos con amplia disponibilidad de vehículos y asesoría inmediata.",
        tel: "2222-2222",
        correo: "fyalajuela@gmail.com",
        img: "../img/mapa/alajuela.jpg"
    },
    "Cartago": {
        nombre: "Sucursal Cartago",
        desc: "Especialistas en financiamiento accesible, ofreciendo opciones adaptadas a cada cliente con procesos ágiles y seguros.",
        tel: "3333-3333",
        correo: "fycartago@gmail.com",
        img: "../img/mapa/cartago.png"
    },
    "Heredia": {
        nombre: "Sucursal Heredia",
        desc: "Centro moderno con gran variedad de vehículos, atención personalizada y asesoramiento completo durante todo el proceso de compra.",
        tel: "4444-4444",
        correo: "fyheredia@gmail.com",
        img: "../img/mapa/heredia.jpg"
    },
    "Guanacaste": {
        nombre: "Sucursal Guanacaste",
        desc: "Pensada para clientes turísticos y locales, con opciones ideales para viajes, alquiler y compra de vehículos resistentes y cómodos.",
        tel: "5555-5555",
        correo: "fyguanacaste@gmail.com",
        img: "../img/mapa/guana.jpg"
    },
    "Puntarenas": {
        nombre: "Sucursal Puntarenas",
        desc: "Especializada en vehículos para zonas costeras, con modelos adaptados a terrenos difíciles y condiciones de playa.",
        tel: "6666-6666",
        correo: "fypuntarenas@gmail.com",
        img: "../img/mapa/puerto.jpeg"
    },
    "Limón": {
        nombre: "Sucursal Limón",
        desc: "Servicio completo con atención especializada en la región caribeña, ofreciendo soluciones de transporte confiables y eficientes.",
        tel: "7777-7777",
        correo: "fylimon@gmail.com",
        img: "../img/mapa/limon.jpg"
    },
    "Coco": {
        nombre: "Sucursal Isla del Coco",
        desc: "Cobertura simbólica en todo el país, representando nuestro compromiso de servicio sin importar la ubicación del cliente.",
        tel: "8888-8888",
        correo: "fycoco@gmail.com",
        img: "../img/mapa/coco.jpeg"
    }
};

const mapas = {
    "San José": "https://www.google.com/maps?q=San+Jose+Costa+Rica&output=embed",
    "Alajuela": "https://www.google.com/maps?q=Alajuela+Costa+Rica&output=embed",
    "Cartago": "https://www.google.com/maps?q=Cartago+Costa+Rica&output=embed",
    "Heredia": "https://www.google.com/maps?q=Heredia+Costa+Rica&output=embed",
    "Guanacaste": "https://www.google.com/maps?q=Guanacaste+Costa+Rica&output=embed",
    "Puntarenas": "https://www.google.com/maps?q=Puntarenas+Costa+Rica&output=embed",
    "Limón": "https://www.google.com/maps?q=Limon+Costa+Rica&output=embed",
    "Coco": "https://www.google.com/maps?q=Isla+del+Coco&output=embed"
};

document.querySelectorAll('area').forEach(area => {
        area.addEventListener('mouseover', () => {
            area.style.cursor = 'pointer';
        });
});

function mostrarProvincia(provincia) {

    const data = infoProvincias[provincia];

    if (!data) return;

    document.getElementById("mapFrame").src = mapas[provincia];
    document.getElementById("tituloProvincia").innerText = provincia;
    document.getElementById("nombreSucursal").innerText = data.nombre;
    document.getElementById("descProvincia").innerText = data.desc;
    document.getElementById("numCelular").innerText = data.tel;
    document.getElementById("emailProv").innerText = data.correo;
    document.getElementById("imgProvincia").src = data.img;

    const offcanvas = new bootstrap.Offcanvas(document.getElementById('panelProvincia'));
    offcanvas.show();
}

window.onload = function() {
    imageMapResize();
}