const boton = document.getElementById('BtnCalcular');

boton.addEventListener('click', function() {
    const modelo = document.getElementById('idModeloAuto').value.trim();
    const precio = parsearCRC(document.getElementById('idPrecioAuto').value);
    const prima = parsearCRC(document.getElementById('idPrimaAuto').value);
    const tasaAnual = parseFloat(document.getElementById('idInteresRange').value);
    const meses = parseInt(document.getElementById('idPlazoMeses').value);

    //const modeloTexto = selectElement.options[selectElement.selectedIndex].text;
    //const modeloValue = selectElement.value; // Para validar si se seleccionó algo

  

    // Validación de campos vacíos
    if (!validarCampos(modelo, precio, prima, meses)) return;

    if (precio <= 0 || prima >= precio) {
        alert("El precio debe ser mayor a la prima.");
        return;
    }

    const montoPrestamo = precio - prima;
    const i = (tasaAnual / 100) / 12;
    const potencia = Math.pow(1 + i, meses);
    const cuota = (montoPrestamo * i * potencia) / (potencia - 1);

    document.getElementById('newModel').innerText = modelo;
    document.getElementById('NewMontoFinanciar').innerText = formatearCRC(montoPrestamo);
    document.getElementById('newTasa').innerText = tasaAnual + "%";
    document.getElementById('newCuotaFinal').innerText = formatearCRC(cuota);
    document.getElementById('ContenedorFactura').style.display = 'block';
});

function validarCampos(modelo, precio, prima, meses) {
    if (!modelo) {
        alert("Por favor ingresá el modelo del auto.");
        document.getElementById('idModeloAuto').focus();
        return false;
    }
    if (!precio || precio <= 0) {
        alert("Por favor ingresá el precio total del auto.");
        document.getElementById('idPrecioAuto').focus();
        return false;
    }
    if (!prima || prima <= 0) {
        alert("Por favor ingresá la prima.");
        document.getElementById('idPrimaAuto').focus();
        return false;
    }
    if (!meses || meses <= 0) {
        alert("Por favor seleccioná el plazo en meses.");
        document.getElementById('idPlazoMeses').focus();
        return false;
    }
    return true;
}

document.getElementById('idInteresRange').addEventListener('input', function() {
    document.getElementById('idTasaTexto').innerText = this.value;
});

function aplicarFormatoInput(inputId) {
    const input = document.getElementById(inputId);

    input.addEventListener('input', function() {
        const soloNumeros = this.value.replace(/\D/g, '');
        const numero = parseInt(soloNumeros) || 0;

        if (numero > 0) {
            this.value = new Intl.NumberFormat('es-CR').format(numero);
        } else {
            this.value = '';
        }
    });
}

function parsearCRC(valor) {
    return parseFloat(valor.replace(/[^\d]/g, '')) || 0;
}

function formatearCRC(valor) {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 0
    }).format(valor);
}

aplicarFormatoInput('idPrecioAuto');
aplicarFormatoInput('idPrimaAuto');