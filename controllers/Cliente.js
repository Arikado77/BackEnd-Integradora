const mysql = require("mysql2");

const connectionObject = {
  host: "localhost",
  user: "root",
  password: "Admin123.",
  database: "Integradora",
};

module.exports = {
  getClientes: (req, res) => {
    let Clientes = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM Cliente", (err, results) => {
        if (!err) {
          Clientes = results;
          res.json(Clientes);
        } else {
          res.json({ message: "Error al obtener a los clientes" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener a los clientes" });
    }
  },
  getCliente: (req, res) => {
    const { nombre_cliente } = req.params;
    let query = "SELECT * FROM Cliente WHERE nombre_cliente = ?";
    let queryParams = [nombre_cliente]; // Aquí solo se pasa el parámetro si existe

    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, queryParams, (err, results) => {
        if (!err) {
          if (results.length > 0) {
            res.json(results);
          } else {
            res.status(404).json({ message: "Cliente no encontrado" });
          }
        } else {
          res.status(500).json({ message: "Error al obtener los datos del cliente" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Error al obtener los datos del cliente" });
    }
  },
};