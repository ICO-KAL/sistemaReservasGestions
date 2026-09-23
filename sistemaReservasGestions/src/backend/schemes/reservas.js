import mongoose from "mongoose";

const reservasSchemes = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    recurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recursos",
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFinal: {
        type: String,
        required: true
    },
    cantidadPersonas: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: [
            "pendiente",
            "confirmada",
            "cancelada",
            "completada"
        ],
        default: "pendiente"
    },
    PrecioTotal: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})