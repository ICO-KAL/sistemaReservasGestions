import dbClient from '../config/dbConfig.js';
import mongoose, { mongo } from 'mongoose';

const userSchemes = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        maxlength: [50, 'El apellido no puede exceder los 50 caracteres']
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
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
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