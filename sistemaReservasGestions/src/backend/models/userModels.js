import mongoose from 'mongoose';
import userSchemes from '../schemes/userSchemes';

   const createUser = async (user) =>{
       return await userSchemes.create(user);
    }
   const deleteUser = async (id)=>{
        return await userSchemes.deleteOne({_id: new mongoose.Types.ObjectId(id)});
    }
    const getUserOne = async (filter) =>{ // monstrar el usuario ingresado 
        return await userSchemes.findOne(filter);
    }
    const getUserById = async (id) =>{ // leer a 1 por su id
        return await userSchemes.findById({_id: new mongoose.Types.ObjectId(id)});
    }
    const upDateUser = async(id,user) =>{
        return await userSchemes.updateOne({_id: new mongoose.Types.ObjectId(id)},user,{new: true});
    }

export default {createUser,deleteUser,getAllUser,getUserById,getUserOne,upDateUser};