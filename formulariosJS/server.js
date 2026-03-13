const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// conexión MySQL
const db = mysql.createConnection({
  host: "host.docker.internal",
  user: "root",
  password: "admin123",
  database: "formulario",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.log("Error conectando:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// endpoint API
app.post("/guardar", (req, res) => {
    const { nombre, email, passwords, celular, direccion, fecha, genero } = req.body;

    const sql = "INSERT INTO usuarios (nombre, email, passwords, celular, direccion, fecha, genero) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [nombre, email, passwords, celular, direccion, fecha, genero], (err, result) => {
        if (err) {
            // ESTO ES LO IMPORTANTE: Imprime el error en la consola de la terminal
            console.log("❌ ERROR DE MYSQL DETECTADO:");
            console.log("Código de error:", err.code);
            console.log("Mensaje detallado:", err.sqlMessage);
            
            // Envía el mensaje al navegador para que lo veas en el alert
            return res.status(500).send("Error del servidor: " + err.sqlMessage);
        }
        res.send("¡Usuario guardado con éxito!");
    });
});

app.listen(3000, () => {
  console.log("API ejecutando en puerto 3000");
});