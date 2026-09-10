import express from 'express';
import inicio from './paginas/inicio.js';
import path from 'path';
import dotenv from 'dotenv';
import {fileURLToPath} from 'node:url';
import dbConfig from '../backend/config/dbConfig.js';

const app = express();

// configuraciones
app.set('pagina web', inicio);

// middleware
app.use(inicio);

try{
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(_filename);
    const envDirname = path.join(_dirname, '../','reservas.env');
    dotenv.config({path: envPath});
    const PORT = process.env.PORT;
    app.listen(PORT,()=>{
    console.log('el puerto abrio en el localHost: ',PORT);   
})
} catch(e){
    console.log(e);
}

process.on('SIGABRT',async()=>{
    await dbConfig.disconnect(),
    await process.exit(0);
});