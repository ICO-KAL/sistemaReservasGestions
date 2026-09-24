import mongoose from "mongoose";
import pago from "../schemes/pago";

const getPago = async ()=>{
    return await pago.findOne();
}

const upDatePago = async () =>{
    return await pago.updateOne();
}

const getByIdPago = async (id,Pago) =>{
    return await pago.findById({_id: new mongoose.Types.ObjectId(id)},Pago,{new: true});
}

export default {getPago,upDatePago,getByIdPago}