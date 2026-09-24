import mongoose from "mongoose";
import reservas from '../schemes/reservas';

const getAllReservas = async () =>{
    return await reservas.find();
}

const updateReservas = async (id,name) =>{
    return await reservas.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)},name,{new: true});
}

const deleteReservas = async(id) =>{
    return await reservas.findByIdAndDelete({id: new mongoose.Types.ObjectId(id)});
}

const createReservas = async(Reservas) =>{
    return await reservas.create(Reservas);
}

export default {getAllReservas,updateReservas,deleteReservas,createReservas};