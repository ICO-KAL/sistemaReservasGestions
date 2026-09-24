import mongoose from "mongoose";
import recursos from '../schemes/recursos';


const createRecursos = async () =>{
    return await recursos.create();
}

const getRecursos = async (id) =>{
    return await recursos.findById({_id: new mongoose.Types.ObjectId(id)});
}

const updateRecursos = async (id,name) => {
    return await recursos.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)},name,{new:true});
}

const deleteRecursos = async (id) => {
    return await recursos.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
}

const getAllRecursos = async (filter) =>{
    return await recursos.find(filter);
}

export default {createRecursos,getRecursos,updateRecursos,getAllRecursos,deleteRecursos}