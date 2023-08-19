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
exports.translateScrapperGoogle = void 0;
// import { Traduccion } from '../types';
const browser_1 = require("./browser");
// Todo: Later it will get more than one translation, sinonism and examples, so return type will change
const translateScrapperGoogle = (word, src, target) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield (0, browser_1.startBrowser)();
        const page = yield browser.newPage();
        const url = `https://translate.google.com.ar/?hl=es&sl=${src}&tl=${target}&op=translate`;
        yield page.goto(url);
        //ESCRIBO LA PALABRA PARA TRADUCIRLA
        yield page.waitForSelector('[aria-label="Texto original"]');
        yield page.type('[aria-label="Texto original"]', word);
        // SI TIENE MAS DE UNA TRADUCCION LA GUARDO -- Translate of cat is gato/gata.
        const traducciones = [];
        // MULTIPLES TRADUCCIONES
        try {
            console.log('Esta por traducir varios');
            // Si tiene mas de una traducción utiliza la clase .HwtZe
            const classTraducciones = '.HwtZe';
            yield page.waitForSelector(classTraducciones, { timeout: 2000 });
            const translations = yield page.$$eval(classTraducciones, (spans) => {
                return spans.map((span) => span.innerText);
            });
            traducciones.push(...translations);
        }
        catch (error) {
            console.error('Error al encontrar las traducciones: ', error);
        }
        // -UNICA TRADUCCION
        try {
            // Si tiene una única traducción utiliza la clase .ryNqvb ( Más traducciones tambien utiliza esas clases )
            const classTraduccion = '.ryNqvb';
            yield page.waitForSelector(classTraduccion);
            const translation = yield page.$eval(classTraduccion, (span) => span.innerText);
            if (translation) {
                traducciones.push(translation);
            }
        }
        catch (error) {
            console.error('Error al encontrar la traduccion: ', error);
        }
        yield browser.close();
        return traducciones;
        yield page.waitForTimeout(200000);
        const translated = [];
        //Puede contener mas de una traduccion como puede ser en el caso de que sea
        //de ingles a español con la palabra cat, que devuelve dos traducciones: gato y gata
        for (const property in traducciones) {
            const indTrad = traducciones[property].__incrementalDOMData.key.split('-').length - 1;
            const element = traducciones[property].__incrementalDOMData.key.split('-')[indTrad];
            translated.push(element);
        }
        if (translated.length > 0) {
            return translated;
        }
    }
    catch (error) {
        console.error(' Error in translateScrapperGoogle: ', error);
    }
    return [];
});
exports.translateScrapperGoogle = translateScrapperGoogle;
