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
exports.checkGroupStatus = void 0;
const puppeteer = __importStar(require("puppeteer"));
const login_1 = require("./login");
const checkGroupStatus = async (link) => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox', '--incognito'],
    });
    const page = await browser.newPage();
    try {
        await (0, login_1.loginToSpotify)(page);
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 3000 });
        await page.waitForSelector('#plan-already-full-error-page', { visible: false, timeout: 500 });
        return 'Grupo lleno';
    }
    catch (error) {
        try {
            await page.waitForSelector('#invitation-expired-error-page', { visible: true, timeout: 500 });
            return 'Invitación expirada';
        }
        catch (expirationError) {
            try {
                await page.waitForSelector('#general-error-page', { visible: true, timeout: 500 });
                return 'Invitación no válida';
            }
            catch (invalidError) {
                return 'Grupo con espacio';
            }
            finally {
                if (page) {
                    await browser.close();
                }
                ;
            }
            ;
        }
        ;
    }
    ;
};
exports.checkGroupStatus = checkGroupStatus;
//# sourceMappingURL=fullGroup.js.map