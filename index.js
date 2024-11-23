const bodyparser = require("body-parser");
const express = require("express");
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Corregir typo en 'bycrypt'

const app = express();
const port = 3000;

// Importar controladores
const Clientecontrollers = require("./controllers/Cliente");
const basicosLimpiezaController = require("./controllers/Basicos_Limpieza");

// Middleware
app.use(bodyparser.json());

// Rutas
app.get("/Cliente", Clientecontrollers.getClientes);
app.get("/Cliente/:nombre_cliente", Clientecontrollers.getCliente);
app.get("/Basicos_Limpieza", basicosLimpiezaController.getLimpieza);
app.get("/Basicos_Limpieza/:id_producto", basicosLimpiezaController.getBasicosLimpieza);
// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',        // Cambia por el host de tu base de datos
  user: 'root',             // Cambia por tu usuario de MySQL
  password: 'Admin123.',  // Cambia por tu contraseña
  database: 'Integradora'   // Cambia por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Escuchar en el puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});