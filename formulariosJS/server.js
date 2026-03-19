const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta actual
app.use(express.static(__dirname));

// --- CONFIGURACIÓN DE LA BASE DE DATOS (Usando variables de entorno de Render/Aiven) ---
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 19495,
    ssl: { rejectUnauthorized: false } // Requerido para conexiones seguras con Aiven
});

// --- RUTA: Página Principal ---
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'inicio.html'));
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
            res.json(results[0]); // Envía solo el JSON con los datos
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    });
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor activo en el puerto ${PORT}`);
});