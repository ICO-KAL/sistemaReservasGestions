import express, { Router } from 'express';
import path from 'path';

const router = Router();
const app = express();

// configuracion
app.set('frontend', path.join(import.meta.dirname, 'frontend'));

// middleware
app.use(express.static(app.get('frontend')));

router.get('/', (req, res) => {
    
});

export default router;
