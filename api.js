const express = require('express');
const path = require('path');
const cors = require('cors');  
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

require('dotenv').config();

const server = express();
server.use(cors());

server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "'unsafe-inline'" // necessário para alguns scripts inline, remova se possível
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://sistemalumafrontend.onrender.com"
        ],
        fontSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://sistemalumafrontend.onrender.com"
        ],
        connectSrc: [
          "'self'",
          "https://sistemalumabackend.onrender.com"
        ],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'models'));
server.use(express.static(path.join(__dirname, 'style')));
server.use(express.static(path.join(__dirname, 'assets')));
server.use(express.static(path.join(__dirname, 'code')));

server.get('/', (req, res) => {
    res.render('login');
});

server.get('/luma', (req, res) => {
    res.render('form');
});

server.get('/validate', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.status(200).json({ success: true, usuario: decoded.usuario });
  } catch (err) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
});

server.get('/annotations', (req, res) => {
   res.render('annotations');
});

server.get('/error', (req, res) => {
    res.render('404');
});

server.listen(process.env.PORT, () => {
    console.log('Servidor iniciado');
});
