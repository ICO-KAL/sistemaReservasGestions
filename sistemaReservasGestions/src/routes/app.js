import express from 'express';
import inicio from './paginas/inicio.js';

const app = express();

// configuraciones
app.set('pagina web', inicio);

// middleware
app.use(inicio);