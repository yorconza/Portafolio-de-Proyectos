const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta actual
app.use(express.static(__dirname));

// --- CONFIGURACIÓN DE LA BASE DE DATOS ---
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 19495, // Usa el puerto de Aiven
    ssl: { rejectUnauthorized: false } 
});

// --- AUTO-CREACIÓN DE TABLA ---
const sqlCreateTable = `
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    passwords VARCHAR(255),
    celular VARCHAR(20),
    direccion VARCHAR(255),
    fecha DATE,
    genero VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(sqlCreateTable, (err) => {
    if (err) {
        console.error("❌ Error verificando/creando tabla:", err.message);
    } else {
        console.log("✅ Estructura de tabla 'usuarios' lista en Aiven.");
    }
});

// --- RUTA: Página Principal (AQUÍ ESTÁ EL CAMBIO) ---
app.get("/", (req, res) => {
    // Cambiado de 'inicio.html' a 'index.html' para que coincida con tu repo
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- RUTA: Guardar Usuario (POST) ---
app.post("/guardar", (req, res) => {
    const { nombre, email, passwords, celular, direccion, fecha, genero } = req.body;
    const sql = "INSERT INTO usuarios (nombre, email, passwords, celular, direccion, fecha, genero) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nombre, email, passwords, celular, direccion, fecha, genero], (err) => {
        if (err) {
            console.error("❌ Error en INSERT:", err.message);
            return res.status(500).json({ error: "Error al guardar en BD" });
        }
        console.log(`✅ Usuario ${nombre} guardado correctamente.`);
        res.status(200).json({ mensaje: "Usuario guardado con éxito" });
    });
});

// --- RUTA: Consultar Usuario (GET) ---
app.get("/consultar/:nombre", (req, res) => {
    const nombreBusqueda = req.params.nombre.trim();
    const sql = "SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?)";
    
    db.query(sql, [nombreBusqueda], (err, results) => {
        if (err) {
            console.error("❌ Error en SELECT:", err.message);
            return res.status(500).json({ error: "Error en la consulta" });
        }
        if (results.length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    });
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Knight Records activo en el puerto ${PORT}`);
});