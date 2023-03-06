// Importaciones
require('dotenv').config();
const Server = require('./models/server');

// Instanciando servidor de arranque
const servidorIniciado = new Server();

// Levantando el servidor con el metodo 'listen'
servidorIniciado.listen();