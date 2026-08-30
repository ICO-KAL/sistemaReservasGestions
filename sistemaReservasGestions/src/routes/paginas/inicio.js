const express = require('express');
const {Router} = require('express');
const path = require('path');


const router = Router();
const app = express();
const buscar = path.join(__dirname,'frontend');

// configuracion
app.set('frontend',buscar);

//middleware
app.use(express.static(app.get('fronted')))

router.get('/',(req,res)=>{
    
})

export default router;
