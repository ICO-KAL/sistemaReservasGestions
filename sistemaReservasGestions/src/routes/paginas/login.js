import express from 'express';
import userController from '../../backend/controller/user.controller';
import { verificToken } from '../../backend/helpers/autentic';

const router = express.Router();

// middleware
router.post('/register',userController.register()); // rutas de registro
router.post('/login',verificToken,userController.login()); // ruta de login

// rutas

export default router;