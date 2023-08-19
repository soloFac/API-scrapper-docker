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
exports.searchImgScrapper = void 0;
const browser_1 = require("./browser");
const searchImgScrapper = (word, numberImgs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield (0, browser_1.startBrowser)();
        // TODO: Hacer que la busqueda sea mas especifica
        // TODO: Encapsular scrapper en una funcion
        const page = yield browser.newPage();
        yield page.goto('https://www.google.com/imghp?hl=es', { waitUntil: 'domcontentloaded' });
        const textareaSelector = 'textarea[jsname="yZiJbe"]'; // Selecciona el textarea por el atributo jsname
        yield page.waitForSelector(textareaSelector);
        yield page.type(textareaSelector, word); // Escribe el texto en el textarea
        yield page.keyboard.press('Enter');
        // SELECIONAR TODAS LAS IMAGENES
        yield page.waitForSelector('.rg_i.Q4LuWd');
        const imgs = yield page.$$('.rg_i.Q4LuWd');
        if (numberImgs > imgs.length) {
            throw new Error('la cantidad de imagenes a buscar es mayor a la cantidad de imagenes que se pueden mostrar');
        }
        const imagenes = [];
        for (let i = 0; i < numberImgs; i++) {
            imgs[i].click();
            const imgSelector = '.r48jcc.pT0Scc.iPVvYb';
            // Esperar 2 segundos
            yield page.waitForTimeout(1000);
            yield page.waitForSelector(imgSelector);
            const src = yield page.$eval(imgSelector, (img) => img.src);
            imagenes.push(src);
        }
        yield browser.close();
        return imagenes;
    }
    catch (error) {
        console.error(error);
    }
    return [];
});
exports.searchImgScrapper = searchImgScrapper;
