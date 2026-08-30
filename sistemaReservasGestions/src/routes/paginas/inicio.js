const {Router}= require('express');
const path = require('path');
const fs = require('fs');

const app = Router();
const buscar = path.join(__dirname,'ruta archivos');
const leer = fs.readFile(buscar,'utf-8',(error,data) =>{
    if(error){return console.log('hubo un error en el proyecto',error)}
    console.log(data);
});

app.get('/',(req,res)=>{
    
})

export default app;
