const con = require("../lib/conexionbd");

function obtenerGeneros(req, res) {

  let pedidoSql = "SELECT * FROM genero";

  con.query(pedidoSql, (error, result) => {
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
