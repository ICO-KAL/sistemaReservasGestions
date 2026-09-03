import express from 'express';
import path from 'path';
import login from '../../frontend/login.jsx';

const app = express();

// configuracion
app.set('frontend', path.join(import.meta.dirname, 'frontend'));

// middleware
app.use(login);