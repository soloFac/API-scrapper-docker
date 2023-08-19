"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const { Router } = require('express');
const { check } = require('express-validator');
const { searchImg } = require('../controller/img');
const { validarCampos } = require('../middlewares/validar-campos');
// const { searchImg } = require( '../controller/img' )
exports.router = Router();
// I'll get images from diferents sites
// word: spanish or english
// category: in order to search that word more especifically
exports.router.post('/', [
    check('word', 'word is necesary').not().isEmpty(),
    check('category', 'word is necesary').not().isEmpty(),
    validarCampos
], searchImg);
