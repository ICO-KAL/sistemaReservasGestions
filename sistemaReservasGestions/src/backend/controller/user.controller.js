import userModels from '../models/userModels';
import bcrypt from 'bcryptjs';

export default  new class user{
    constructor(){

    }
    
    // crud
    async register(req,res){
         try{
           const {name, email, passwoard,} = req.body;

           const readUser= userModels.getUserOne({email}); // buscar
           if(readUser){res.status(400).json({Error: "usuario existe"})} // compara si hay un usuario creado

           const encrydataPasswoard = await bcrypt.hash(passwoard,20); // encryta el passwoard hasta cierta longitud
           const registerCreate = await userModels.createUser({ 
             name,
             email,
             passwoard: encrydataPasswoard,
           });

           res.status(202).send('crear el primer usuario',registerCreate)
        }
        catch(e){
            console.log(e);
        }
    }
    async login(req,res){
        try{
            const {email,passwoard} = req.body;
            const readUser = userModels.getUserOne({email}); // buscar
            
            if(!readUser) res.status(400).json({Error: "usuario incorrecto"}); // si no encontro el usuario
  
            const userCompare = await bcrypt.compare(passwoard,readUser.passwoard);// validacion de si el usuario puso bien el passwoard
            res.status(202).send('login correcto', userCompare);
        }
        catch(e){
            console.log(e)
        }
    }

    async upDate(req,res){
         try{
           res.status(202).send('ver por id el primer usuario')
        }
        catch(e){
            console.log('error por esto',e)
        }
    }
    async detele(req,res){
         try{
           res.status(202).send('ver por id el primer usuario')
        }
        catch(e){
            console.log('error: ', e);
        }
    }
}