import 'dotenv/config';
import express from 'express';
import process from 'node:process';
import '../backend/config/dbConfig.js';
import login from './paginas/login.js';

const app = express();

app.use(express.json());
app.use('/api', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});