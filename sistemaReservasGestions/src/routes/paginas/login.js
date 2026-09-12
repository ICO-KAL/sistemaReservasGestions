import express from 'express';
import userController from '../../backend/controller/user.controller';

const router = express.Router();

// middleware
router.post('/register',userController.register());
router.post('/login',userController.login());

// rutas

