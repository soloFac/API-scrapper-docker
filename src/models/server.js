"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require('express');
const cors = require('cors');
const img_1 = require("../routes/img");
const translate_1 = require("../routes/translate");
class Server {
    constructor() {
        this.funcRoutes = {
            img: img_1.router,
            translate: translate_1.router
        };
        this.app = express();
        this.port = process.env.PORT;
        // PATHS
        this.paths = {
            img: '/api/img',
            translate: '/api/translate',
        };
        // Conectar a DB
        // this.conectarDB()
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    // async conectarDB () {
    //   await dbConnection()
    // }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body - Cualquier informacion que venga aqui la va a intentar serializar a un JSON
        this.app.use(express.json());
        // Directorio Publico
        this.app.use(express.static('public'));
    }
    routes() {
        // Defino las rutas
        this.app.use(this.paths.img, this.funcRoutes.img);
        this.app.use(this.paths.translate, this.funcRoutes.translate);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}
exports.Server = Server;
module.exports = Server;
