import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserva",
        required: true
    },

    monto: {
        type: Number,
        required: true
    },

    metodo: {
        type: String,
        enum: ["efectivo", "tarjeta", "transferencia"],
        required: true
    },

    estado: {
        type: String,
        enum: ["pendiente", "pagado", "cancelado"],
        default: "pendiente"
    },

    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});