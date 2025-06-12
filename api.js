const express = require('express');
const path = require('path');
const cors = require('cors');  
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const server = express();
server.use(cors());
server.use(cookieParser());

server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'models'));
server.use(express.static(path.join(__dirname, 'style')));
server.use(express.static(path.join(__dirname, 'assets')));
server.use(express.static(path.join(__dirname, 'code')));

server.get('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('login');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return res.render('form', { usuario: decoded.usuario });
    } catch (err) {
        return res.render('login');
    }
});

server.get('/annotations', (req, res) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.render('login');
    }

    try {
        return res.render('annotations');
    } catch (err) {
        return res.render('login');
    }
});

server.get('/error', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('login');
    }

    try {
        return res.render('404');
    } catch (err) {
        return res.render('login');
    }
});

server.listen(process.env.PORT, () => {
    console.log('Servidor iniciado');
});
