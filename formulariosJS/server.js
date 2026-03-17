const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "host.docker.internal",
  user: "root",
  password: "admin123", // Tu contraseña
  database: "formulario",
  port: 3306
});

// --- RUTA POST (Ya la tenías) ---
app.post("/guardar", (req, res) => {
    const { nombre, email, passwords, celular, direccion, fecha, genero } = req.body;
    const sql = "INSERT INTO usuarios (nombre, email, passwords, celular, direccion, fecha, genero) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, email, passwords, celular, direccion, fecha, genero], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send("Usuario guardado");
    });
});

// --- RUTA GET (La que te faltaba) ---
app.get("/consultar/:nombre", (req, res) => {
    const nombreBusqueda = req.params.nombre.trim();
    // Usamos LOWER para que no importe si es Mayúscula o Minúscula
    const sql = "SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(?)";
    
    db.query(sql, [nombreBusqueda], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ mensaje: "No encontrado" });
        }
    });
});

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));