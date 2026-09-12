import express from 'express';
import path from 'path';
import dashoard from '../../frontend/dashoard.jsx';

const app = express();

// configuracion
app.set('frontend', path.join(import.meta.dirname, 'frontend'));

// middleware
app.use(dashoard);

// rutas funcionalidad de validacion 