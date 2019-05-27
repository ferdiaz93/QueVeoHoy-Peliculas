const con = require("../lib/conexionbd");

function obtenerPeliculas(req, res) {

  // Pedido base
  let sql = "SELECT *, (contador) FROM pelicula";

  // Se inicializa el array que va a contener los filtros
  const filtros = [];

  // Se agregan al array los filtros si fueron pasados por query
  if (req.query.titulo) filtros.push(`titulo LIKE '%${req.query.titulo}%'`);
  if (req.query.genero) filtros.push(`genero_id = ${req.query.genero}`);
  if (req.query.anio) filtros.push(`anio = ${req.query.anio}`);

  // Si se pasaron filtros, estos son concatenados al pedido
  if (filtros.length) {
    sql += " WHERE ";
    for (let i = 0; i < filtros.length; i++) {
      sql += filtros[i];

      // Si NO es el último, se prepara para concatenar el siguiente
      if (i < filtros.length - 1) {
        sql += " AND ";
      }
    }
  }

  // Se genera la sub-query contador y se inserta dentro de la query final
  let contador =  '(' + sql.replace('*, (contador)', 'COUNT(id)') + ') AS total';
  sql = sql.replace('(contador)', contador);

  // Se agregan el orden y el limite al pedido
  let orden = ` ORDER BY ${req.query.columna_orden} ${req.query.tipo_orden}`;
  sql += orden;
  let limite = ` LIMIT ${(req.query.pagina - 1) * req.query.cantidad}, ${req.query.cantidad}`;
  sql += limite;

  // Se envía la query
  con.query(sql, (error, result) => {
    if (error) res.send(error);

    const response = {
      peliculas: result,
      total: result.length ? result[0].total : 0
    };

    res.send(response);
  });
};

function obtenerInfoPelicula(req, res) {

  const id = req.params.id;

  let sql = 'SELECT pelicula.*, genero.nombre FROM pelicula '
  + 'JOIN genero ON pelicula.genero_id = genero.id '
  + 'WHERE pelicula.id = ' + id;

  con.query(sql, (error, result) => {
    if(error) res.send(error);

    const pelicula = result[0];
    const genero = result[0].nombre;

    sql = 'SELECT actor.nombre FROM actor '
    + 'JOIN actor_pelicula ON actor.id = actor_pelicula.actor_id '
    + 'WHERE actor_pelicula.pelicula_id = ' + id;

    con.query(sql, (error, result) => {
      if (error) res.send(error);

      const actores = result.map(element => element.nombre);

      const response = {
        pelicula: pelicula,
        genero: genero,
        actores: actores
      };

      res.send(response);
    });
  });
};

function recomendarPelicula(req, res) {

  // Pedido base
  let sql = 'SELECT pelicula.*, genero.nombre FROM pelicula JOIN genero ON pelicula.genero_id = genero.id';

  // Se inicializa el array que va a contener los filtros
  const filtros = []

  // Se agregan al array los filtros si fueron pasados por query
  if (req.query.anio_inicio) filtros.push(`pelicula.anio >= ${req.query.anio_inicio}`);
  if (req.query.anio_fin) filtros.push(`pelicula.anio <= ${req.query.anio_fin}`);
  if (req.query.puntuacion) filtros.push(`pelicula.puntuacion >= ${req.query.puntuacion}`);
  if (req.query.genero) filtros.push(`genero.nombre = '${req.query.genero}'`);

  // Si se pasaron filtros, estos son concatenados al pedido
  if (filtros.length) {
    sql = sql.concat(" WHERE ");
    for (let i = 0; i < filtros.length; i++) {
      sql = sql.concat(filtros[i]);

      // Si NO es el último, se prepara para concatenar el siguiente
      if (i < filtros.length - 1) {
        sql = sql.concat(" AND ");
      }
    }
  }

  con.query(sql, (error, result) => {
    if (error) res.send(error);

    let response = {
      peliculas: result
    };

    res.send(response);
  })
}

module.exports = {
  obtenerPeliculas: obtenerPeliculas,
  obtenerInfoPelicula: obtenerInfoPelicula,
  recomendarPelicula: recomendarPelicula
};
