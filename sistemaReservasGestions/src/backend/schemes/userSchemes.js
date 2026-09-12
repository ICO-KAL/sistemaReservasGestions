import dbClient from '../config/dbConfig.js';
import mongoose, { mongo } from 'mongoose';

const userSchemes = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un formato de correo válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    phone: {
        type: String,
        required: [false, 'El teléfono es opcional'], // Cambia a true si es obligatorio
        trim: true,
        // Expresión regular básica para validar números telefónicos (permite +, espacios, guiones y números)
        match: [/^[0-9\+\-\s\(\)]*$/, 'Por favor ingrese un número de teléfono válido']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: 'throw',
})

export default mongoose.model('userSchemes', userSchemes);