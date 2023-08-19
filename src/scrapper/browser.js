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
exports.startBrowser = void 0;
const puppeteer = require('puppeteer');
require('dotenv').config();
const startBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    try {
        console.log('Opening the browser......');
        browser = yield puppeteer.launch({
            // headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--single-process',
                '--no-zygote'
            ],
            // 'ignoreHTTPSErrors': true,
            executablePath: process.env.NODE_ENV === 'production'
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath()
        });
    }
    catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }
    return browser;
});
exports.startBrowser = startBrowser;
