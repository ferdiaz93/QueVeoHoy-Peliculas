const con = require("../lib/conexionbd");

function obtenerGeneros(req, res) {

  let sql = "SELECT * FROM genero";

  con.query(sql, (error, result) => {
    if (error) res.send(error);

    const response = {
      generos: result
    };

    res.send(response);
  });
}

module.exports = {
  obtenerGeneros: obtenerGeneros
};
