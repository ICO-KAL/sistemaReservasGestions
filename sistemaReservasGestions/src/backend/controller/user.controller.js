import userModels from '../models/userModels.js';
import { autentic } from '../helpers/autentic.js';
import bcrypt from 'bcryptjs';

export default new class UserController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name?.trim() || !email?.trim() || !password) {
                return res.status(400).json({ message: 'Completa todos los campos.' });
            }
            const normalizedEmail = email.trim().toLowerCase();
            if(await userModels.getUserOne({ email: normalizedEmail })) return res.status(409).json({ message: 'Ya existe una cuenta con ese correo.' });

            const hashedPassword = await bcrypt.hash(password, 12);
            await userModels.createUser({
                usuario: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
            });

            return res.status(201).json({ message: 'Cuenta creada correctamente.' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            const isValidationError = error.name === 'ValidationError';
            return res.status(isValidationError ? 400 : 500).json({
                message: isValidationError ? error.message : 'No se pudo crear la cuenta.',
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email?.trim() || !password) {
                return res.status(400).json({ message: 'Ingresa tu correo y contraseña.' });
            }

            const normalizedEmail = email.trim().toLowerCase();
            const user = await userModels.getUserOne({ email: normalizedEmail });
            if (!user || !user.isActive) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
            }

            const passwordMatches = await bcrypt.compare(password, user.password);
            if (!passwordMatches) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
            }

            const token = await autentic(user.email);
            if (!token) {
                return res.status(500).json({ message: 'No se pudo iniciar sesión.' });
            }

            return res.status(200).json({
                message: 'Inicio de sesión correcto.',
                token,
                user: {
                    id: user.id,
                    name: user.usuario,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({ message: 'No se pudo iniciar sesión.' });
        }
    }

    async upDateUser(req,res){
         try{
           const {name,email,passwoard} = req.body;
           if(!await userModels.getUserOne({email})) return res.status(401).json({Error: "usuario no existe"});
            
           const encrydataPasswoard = await bcrypt.hash(passwoard,20);
           const updateUser = await userModels.upDateUser({
            usuario: name,
            email,
            passwoard: encrydataPasswoard
           })
           res.status(202).json({message: "usuario actualizado"},updateUser);
        }
        catch(e){
            console.log('Error al actualizar el usuario: ',e);
            return res.status(500).json({message: "Error interno del servidor", error: e.message});
        }
    }
    async deteleUser(req,res){
         try{
           const {email} = req.body;
           if(!await userModels.getUserOne({email})) return res.status(404).json({message: "usuario no encontrado"});
           
           const eliminar = await userModels.deleteUser({email});

           res.status(202).json({
                message: "Usuario Eliminado",
                data: eliminar
            });
        }
        catch(e){
           console.error('Error al eliminar usuario: ', e);
           return res.status(500).json({ message: "Error interno del servidor", error: e.message });
        }
    }
}