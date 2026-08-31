const express = require('express');
const path = require('path');

const app =express();
const login = require('../../frontend/login')

// configuracion
app.set('frontend', path.join(__dirname,'frontend'));

// middleware

app.use(login);