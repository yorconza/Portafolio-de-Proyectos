const form = document.getElementById("formulario");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const passwords = document.getElementById("passwords").value;

  const response = await fetch("http://localhost:3000/guardar", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      nombre: nombre,
      email: email,
      passwords: passwords
    })

  });

  const data = await response.text();

  alert(data);

});