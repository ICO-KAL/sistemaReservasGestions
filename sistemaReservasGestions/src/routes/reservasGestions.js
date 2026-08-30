const express = require('express');

const app = express();

// requerimientos de las demas paginas
const inicio = require('./paginas/inicio');

// configuraciones
app.set('pagina web',inicio);

// middleware
app.use(inicio);
app.use();