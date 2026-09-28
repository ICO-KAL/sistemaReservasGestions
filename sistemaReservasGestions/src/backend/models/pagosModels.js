import mongoose from "mongoose";
import pago from "../schemes/pago";

const createPago = async (data) =>{
    return await pago.create(data);
}

const getPago = async (filter = {}) =>{
    return await pago.findOne(filter);
}

const getAllPagos = async (filter = {}) =>{
    return await pago.find(filter);
}

const getByIdPago = async (id) =>{
    return await pago.findById(new mongoose.Types.ObjectId(id));
}

const updatePago = async (id, data) =>{
    return await pago.findByIdAndUpdate(new mongoose.Types.ObjectId(id), data, {new: true, runValidators: true});
}

const deletePago = async (id) =>{
    return await pago.findByIdAndDelete(new mongoose.Types.ObjectId(id));
}

export default {createPago,getPago,getAllPagos,getByIdPago,updatePago,deletePago}