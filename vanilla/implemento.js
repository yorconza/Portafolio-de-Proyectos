async function cargarAuto(){

    const response = await fetch("http://127.0.0.1:5000/autos");
    
    const json = await response.json();

    let autos = [];

    autos = json.data;

    const lista = document.getElementById("listaAutos");

    lista.innerHTML = "";

    autos.forEach(auto => {

        const li = document.createElement("li");

        li.textContent = auto.marca + " " + auto.modelo;

        lista.appendChild(li);

    });

}

cargarAuto();