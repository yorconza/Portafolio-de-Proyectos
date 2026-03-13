const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// CAMBIO AQUÍ: Usamos createPool en lugar de createConnection
const db = mysql.createPool({
  host: "host.docker.internal",
  user: "root",
  password: "admin123",
  database: "formulario",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificamos la conexión
db.getConnection((err, connection) => {
  if (err) {
    console.error(" Error conectando a MySQL:", err.message);
    return;
  }
  console.log("Conectado a MySQL a través del Pool");
  connection.release(); // Liberamos la conexión de prueba
});

app.post("/guardar", (req, res) => {
    const { nombre, email, passwords, celular, direccion, fecha, genero } = req.body;
    const sql = "INSERT INTO usuarios (nombre, email, passwords, celular, direccion, fecha, genero) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nombre, email, passwords, celular, direccion, fecha, genero], (err, result) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            return res.status(500).send(err.message);
        }
        res.send("Usuario guardado correctamente");
    });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});