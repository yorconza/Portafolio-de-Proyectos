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

// Configuración de la Base de Datos
const db = mysql.createPool({
  host: "mySQL", 
  user: "root",
  password: "admin123", 
  database: "formulario",
  port: 3306
});

// --- RUTA: Guardar Usuario ---
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

// --- RUTA: Consultar Usuario ---
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

// Escuchar en 0.0.0.0 es clave para Docker
// Cambia esto al final de tu server.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
});