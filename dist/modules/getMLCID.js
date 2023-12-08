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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMLCID = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const baseURL = 'https://www.mercadolibre.cl/p/';
const getMLCID = async (mlcID) => {
    try {
        let formattedMLCID = mlcID;
        if (mlcID.startsWith('MLC-'))
            formattedMLCID = mlcID.substring(4);
        const result = { MLCID: formattedMLCID };
        fs_1.default.writeFileSync('result.json', JSON.stringify(result, null, 2));
        if (mlcID.startsWith('MLC-'))
            return formattedMLCID;
        const url = baseURL + formattedMLCID;
        const response = await axios_1.default.get(url);
        const $ = cheerio.load(response.data, { xmlMode: false, decodeEntities: false });
        let content;
        const metaTag = $('meta[name="twitter:app:url:iphone"]');
        if (metaTag.length > 0)
            content = metaTag.attr('content');
        if (content) {
            const regex = /id=MLC(\d+)/;
            const mlcidMatch = regex.exec(content);
            if (mlcidMatch)
                return mlcidMatch[1];
        }
        return formattedMLCID;
    }
    catch (error) {
        console.error('Error buscando MLCID', error);
        return null;
    }
};
exports.getMLCID = getMLCID;
//# sourceMappingURL=getMLCID.js.map