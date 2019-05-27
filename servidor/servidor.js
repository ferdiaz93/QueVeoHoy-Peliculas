//paquetes necesarios para el proyecto
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controladorPeliculas = require('./controladores/controladorPeliculas');
const controladorGeneros = require('./controladores/controladorGeneros');
const controladorPaginas = require("./controladores/controladorPaginas")
const path = require("path");
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
//difinimos los documentos estaticos de nuestro proyecto
app.use(express.static(path.join(__dirname, "../cliente")));


//rutas de paginas
app.get("/", controladorPaginas.pedirPaginaRaiz);
app.get("/error", controladorPaginas.pedirPaginaError);
app.get("/info", controladorPaginas.pedirPaginaInfo);

//rutas de pedido de datos
app.get('/peliculas', controladorPeliculas.obtenerPeliculas);
app.get('/generos', controladorGeneros.obtenerGeneros);
app.get('/peliculas/:id', controladorPeliculas.obtenerInfoPelicula);
app.get('/recomendacion', controladorPeliculas.recomendarPelicula);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

