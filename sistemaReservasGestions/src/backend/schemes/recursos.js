import mongoose from "mongoose";

const recursos = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    capacidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ["disponible","ocupado","mantenimiento"],
        default: "disponible"
    }
},{
    timestamps:true
});