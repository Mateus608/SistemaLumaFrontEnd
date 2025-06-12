const express = require('express');
const path = require('path');
const cors = require('cors');  
const jwt = require('jsonwebtoken');

require('dotenv').config();

const server = express();
server.use(cors());

server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'models'));
server.use(express.static(path.join(__dirname, 'style')));
server.use(express.static(path.join(__dirname, 'assets')));
server.use(express.static(path.join(__dirname, 'code')));

function verificarToken(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (err) {
        return null;
    }
}

server.get('/', (req, res) => {
    const decoded = verificarToken(req);
    if (!decoded) {
        return res.render('login');
    }

    return res.render('form', { usuario: decoded.usuario });
});

server.get('/annotations', (req, res) => {
    const decoded = verificarToken(req);
    if (!decoded) {
        return res.render('login');
    }

    return res.render('annotations');
});

server.get('/error', (req, res) => {
    const decoded = verificarToken(req);
    if (!decoded) {
        return res.render('login');
    }

    return res.render('404');
});

server.listen(process.env.PORT, () => {
    console.log('Servidor iniciado');
});
