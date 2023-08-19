"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const translate_1 = require("../controller/translate");
exports.router = Router();
// I'll get images from diferents sites
// word: spanish or english
// category: in order to search that word more especifically
exports.router.post('/', [
    check('word', 'word is necessary').not().isEmpty(),
    check('src', 'src is necessary').not().isEmpty(),
    check('dest', 'dest is necessary').not().isEmpty(),
    check('translator', 'word is necessary').not().isEmpty(),
    validarCampos
], translate_1.translate);
