const mysql = require("mysql2");

const connectionObject = {
    host: "localhost",
    user: "root",
    password: "Admin123.",
    database: "Integradora",
  };
  
module.exports = {
    getLimpieza: (req, res) => {
        let Limpieza = [];
        try {
          const connection = mysql.createConnection(connectionObject);
          connection.query("SELECT * FROM Basicos_Limpieza", (err, results) => {
            if (!err) {
              Limpieza = results;
              res.json(Limpieza);
            } else {
              res.json({ message: "Error al obtener a los basicos de limpieza" });
            }
            connection.end();
          });
        } catch (e) {
          console.log(e);
          res.json({ message: "Error al obtener a los basicos de limpieza" });
        }
      },
      getBasicosLimpieza: (req, res) => {
        const { id } = req.params;
        let query = "select * from Basicos_Limpieza";
        let queryParams = [];
        if (id) {
            query += " where id_producto = ?";
            queryParams.push(id);
        }
        try {
            const connection = mysql.createConnection(connectionObject);
            connection.query(query, queryParams, (err, results, fields) => {
                if (!err) {
                    res.json(results);
                } else {
                    res.status(500).json({ message: "Error al obtener los usuarios" });
                }
                connection.end();
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error al obtener a los usuarios" });
        }
    },
  };