import mongoose from "mongoose";
import admin from "../schemes/admin";

const createAdmin = async (data) =>{
    return await admin.create(data);
}

const deleteAdmin = async(id) =>{
    return await admin.findByIdAndDelete(new mongoose.Types.ObjectId(id));
}

const updateAdmin = async(id,name) =>{
    return await admin.findByIdAndUpdate(new mongoose.Types.ObjectId(id),name,{new:true, runValidators:true});
}

const getAdmin = async(id) => {
    return await admin.findById(new mongoose.Types.ObjectId(id));
}

const getAllAdmin = async() => {
    return await admin.find();
}

export default {createAdmin,deleteAdmin,updateAdmin,getAdmin,getAllAdmin}