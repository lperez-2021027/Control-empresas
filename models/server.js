// Importaciones
const express = require('express');
const cors = require('cors');

const { dbConection } = require('../database/config');

class Server {

    constructor() {

        // Confirguracion inicial
        this.app = express();
        this.port = process.env.PORT;

        // Rutas
        this.paths = {
            auth:       '/api/auth',
            empresas:   '/api/empresas',
            sucursales: '/api/sucursales',
            buscar:      '/api/buscar'
        }

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        
        this.app.use(cors());

        this.app.use(express.json());

        //this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.empresas, require('../routes/empresa'));
        this.app.use(this.paths.sucursales, require('../routes/sucursal'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
    
}

module.exports = Server;