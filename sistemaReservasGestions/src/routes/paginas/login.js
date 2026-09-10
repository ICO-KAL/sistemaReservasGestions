import express from 'express';
import path from 'path';
import userModels from '../../backend/models/userModels';

const router = express();

// configuracion
router.set('frontend', path.join(import.meta.dirname, 'frontend'));

// middleware
router.use(login);

// rutas

export default new router.post('/:id', async(req,res) =>{
     try{ 
        const [name,passwoard] = req.body;



        res.status(200).json({
            message: "usuario accedio correctamente",
        })
     }
     catch(e){
        console.log(e);
     }
});

