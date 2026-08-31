const express = require('express');
const {Router} = require('express');
const path = require('path');


const router = Router();
const app = express();

// configuracion
app.set('frontend',path.join(__dirname,'frontend'));

//middleware
app.use(express.static(app.get('fronted')))

router.get('/',(req,res)=>{
    
})

export default router;
