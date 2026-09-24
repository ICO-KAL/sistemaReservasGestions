import express from 'express';
import inicio from './paginas/inicio.js';
import dotenv from 'dotenv/config';
import dbConfig from '../backend/config/dbConfig.js';
import login from './paginas/login.js';

const app = express();

// middleware
app.use(inicio);
app.use(login);

try{
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
    process.exit(0);
});