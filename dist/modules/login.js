"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginToSpotify = void 0;
const utils_1 = require("../utils");
const fs = __importStar(require("fs"));
const loginToSpotify = async (page) => {
    const accounts = JSON.parse(fs.readFileSync('./dist/accounts/accounts.json', 'utf-8'));
    for (const account of accounts) {
        try {
            await page.goto('https://accounts.spotify.com/login', { waitUntil: 'domcontentloaded', timeout: 3000 });
            await page.waitForSelector('#login-username', { visible: false, timeout: 500 });
            await page.type('#login-username', account.username);
            await page.type('#login-password', account.password);
            await (0, utils_1.delay)(1000);
            await page.click('.ButtonFocus-sc-2hq6ey-0.csWrjt');
            await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 3000 });
            return;
        }
        catch (error) {
            console.error(`Error en el inicio de sesión para la cuenta ${account.username}: ${error.message}`);
        }
        ;
    }
    ;
    throw new Error('Ninguna cuenta pudo iniciar sesión exitosamente');
};
exports.loginToSpotify = loginToSpotify;
//# sourceMappingURL=login.js.map