"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchImg = void 0;
const searchImg_1 = require("../scrapper/searchImg");
const { response, request } = require('express');
const searchImg = (req = request, res = response) => __awaiter(void 0, void 0, void 0, function* () {
    const { word, category } = req.body;
    const NUMBERIMGS = 5;
    try {
        const imgs = yield (0, searchImg_1.searchImgScrapper)(word, NUMBERIMGS);
        if (!imgs) {
            // estado de error
            res.status(400).json({ msg: 'No se encontraron las imagenes' });
        }
        // Todo: Guardar estas imagenes en la base de datos
        // Cerrar el navegador
        res.status(400).json({
            word,
            category,
            imgs
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchImg = searchImg;
