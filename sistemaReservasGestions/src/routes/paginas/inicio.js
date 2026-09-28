import { Router } from 'express';
import { verificToken } from '../../backend/helpers/autentic.js';

const router = Router();

// configuracion

// middleware
router.get('/incio'); // dashoard 
router.get('/'); // anuncios

export default router;
