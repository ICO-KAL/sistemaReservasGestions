import userModels from '../models/userModels';
import autentic from '../helpers/autentic';
import bcrypt from 'bcryptjs';

export default new class user{
    constructor(){}
    
    // crud
    async register(req,res){
         try{
           const {name, email, passwoard,} = req.body;

           const readUser= userModels.getUserOne({email}); // buscar
           if(readUser){res.status(400).json({Error: "usuario existe"})} // compara si hay un usuario creado

           const encrydataPasswoard = await bcrypt.hash(passwoard,20); // encryta el passwoard hasta cierta longitud
           const registerCreate = await userModels.createUser({ 
             usuario: name,
             email,
             passwoard: encrydataPasswoard,
           });

           res.status(202).json({
            message: "usuario creado",
            registerCreate
           })
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
            const token = await autentic(email);
            res.status(202).json({
                message: "Login correcto",
                userCompare,
                token
            });
        }
        catch(e){
            console.log(e)
        }
    }

    async upDateUser(req,res){
         try{
           const {name,email,passwoard} = req.body;
           const readUser = await userModels.getUserOne({email});

           if(!readUser) return res.status(401).json({Error: "usuario no existe"});
            
           const encrydataPasswoard = await bcrypt.hash(passwoard,20);
           const updateUser = await userModels.upDateUser({
            usuario: name,
            email,
            passwoard: encrydataPasswoard
           })
           res.status(202).json({message: "usuario actualizado"},updateUser);
        }
        catch(e){
            console.log('Error al actualizar el usuario: ',e);
            return res.status(500).json({message: "Error interno del servidor", error: e.message});
        }
    }
    async deteleUser(req,res){
         try{
           const {email} = req.body;
           const readUser = await userModels.getUserOne({email});
           if(!readUser) return res.status(404).json({message: "usuario no encontrado"});
           
           const eliminar = await userModels.deleteUser({email});

           res.status(202).json({
                message: "Usuario Eliminado",
                data: eliminar
            });
        }
        catch(e){
           console.error('Error al eliminar usuario: ', e);
           return res.status(500).json({ message: "Error interno del servidor", error: e.message });
        }
    }
}