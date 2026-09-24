import mongoose, { get } from "mongoose";
import admin from "../schemes/admin";

const createAdmin = async () =>{
    return await admin.create();
}

const deleteAdmin = async(id) =>{
    return await admin.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
}

const updateAdmin = async(id,name) =>{
    return await admin.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)},name,{new:true});
}

const getAdmin = async(id) => {
    return await admin.findById({_id: new mongoose.Types.ObjectId(id)});
}

const getAllAdmin = async() => {
    return await admin.find();
}

export default {createAdmin,deleteAdmin,updateAdmin,getAdmin,getAllAdmin}