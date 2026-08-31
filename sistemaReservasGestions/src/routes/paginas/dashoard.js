const express = require('express');
const path = require('path');

const app = express();
const dashoard = require('../../frontend/dashoard')

// configuracion
app.set('fronted',path.join(__dirname,'fronted'))

//middleware
app.use(dashoard)

// rutas funcionalidad de validacion 