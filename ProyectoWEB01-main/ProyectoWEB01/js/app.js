const btnEnviar = document.getElementById('btnEnviar');
const formulario = document.getElementById('formContacto');

const validacion = (e) => {
    e.preventDefault();
    
    // Capturamos los atributos del HTML
    const nameUser = document.getElementById('name');
    const fullnameUser = document.getElementById('fullname');
    const cellPhoneUser = document.getElementById('cellphone');
    const emailUser = document.getElementById('email');
    const comments = document.getElementById('comment');
    const TC = document.getElementById('aceptoTerminos');

   
    const nombre = nameUser.value.trim();
    const apellidos = fullnameUser.value.trim();
    const telefono = cellPhoneUser.value.trim();
    const correo = emailUser.value.trim();
    const comentario = comments.value.trim();

    //validaciones
    if (nombre === "") {
        alert("Por favor, digite su nombre.");
        nameUser.focus();
        return;
    }

    if (apellidos === "") {
        alert("Por favor, digite sus apellidos.");
        fullnameUser.focus();
        return;
    }

    const phoneCorrect = /^[0-9]{8}$/;
    if (!phoneCorrect.test(telefono)) {
        alert("El número telefónico debe tener 8 dígitos.");
        cellPhoneUser.focus();
        return;
    }

    const correctEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo === "" || !correctEmail.test(correo)) {
        alert("Por favor, escriba un correo electrónico válido.");
        emailUser.focus();
        return;
    }

    if (comentario === "") {
        alert("Por favor, digite su comentario.");
        comments.focus();
        return;
    }

    if (!TC.checked) {
        alert("Debes aceptar los términos y condiciones para continuar.");
        TC.focus();
        return;
    }

    alert("¡Datos validados!");
    formulario.submit(); 
}

btnEnviar.addEventListener('click', validacion);