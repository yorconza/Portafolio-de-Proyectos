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
  database: "formulario"
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

  const { nombre, email, passwords } = req.body;

  const sql = "INSERT INTO usuarios (nombre,email,passwords) VALUES (?,?,?)";

  db.query(sql, [nombre, email, passwords], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error al guardar");
    } else {
      res.send("Usuario guardado");
    }

  });

});

app.listen(3000, () => {
  console.log("API corriendo en puerto 3000");
});