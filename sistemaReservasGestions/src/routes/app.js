import 'dotenv/config';
import express from 'express';
import process from 'node:process';
import '../backend/config/dbConfig.js';
import login from './paginas/login.js';
import dashoard from './paginas/dashoard.js';

const app = express();

app.use(express.json());
app.use('/api', login);
app.use('/dashoard',dashoard);
/* 
 implementar todas las paginas que se debe ser requeridas hasta el momento

 app.use('/calendario');
 app.use('/detalleProducto');
 app.use('/misReservas');
 app.use('/panelAdministracion');
 app.use('/perfil');
 app.use('/productos');
 app.use('/registro');
 app.use('/resumenCheckout');
 app.use(timeSlots);
 
 implementar las siguientes cuando este todo preparado

*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});