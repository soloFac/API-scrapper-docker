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
exports.translate = void 0;
const translate_1 = require("../scrapper/translate");
const TranslatorEnum_1 = require("../types/TranslatorEnum");
// import { Traduccion } from '../types/Traduccion'
const translate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { word, src, dest, translator } = req.body;
    let traduccion;
    switch (translator) {
        // case translatorsEnum.google:
        case TranslatorEnum_1.TranslatorEnum.google:
            traduccion = yield (0, translate_1.translateScrapperGoogle)(word, src, dest);
            break;
        // case translatorsEnum.deepl:
        default:
            throw new Error('None of the translators are available');
            break;
    }
    console.log(traduccion);
    console.log(traduccion.length);
    res.status(400).json({
        traduccion
    });
});
exports.translate = translate;
