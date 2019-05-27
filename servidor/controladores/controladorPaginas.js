const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")
const app = express();
const path = require("path")

app.use(bodyParser.json());


function pedirPaginaRaiz(req, res){
    res.sendFile(path.join(__dirname, "../../cliente/html/index.html"));
};

function pedirPaginaError(req, res){
    res.sendFile(path.join(__dirname, "../../cliente/html/error.html"));
};

function pedirPaginaInfo(req, res){
    res.sendFile(path.join(__dirname, "../../cliente/html/info.html"));
};

module.exports = {
    pedirPaginaRaiz:pedirPaginaRaiz,
    pedirPaginaError: pedirPaginaError,
    pedirPaginaInfo: pedirPaginaInfo
}