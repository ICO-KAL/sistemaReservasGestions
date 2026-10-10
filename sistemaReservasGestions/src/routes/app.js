import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import process from 'node:process';
import '../backend/config/dbConfig.js';
import login from './paginas/login.js';

const app = express();
const frontendBuildPath = path.resolve(import.meta.dirname, '../../dist');

app.use(express.json());
app.use('/api', login);
app.use('/api', (req, res) => {
    res.status(404).json({ message: 'Ruta de API no encontrada.' });
});

app.use(express.static(frontendBuildPath));
app.get('/{*path}', (req, res, next) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'), (error) => {
        if (error) next(error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});