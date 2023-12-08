"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const checkInvitation_1 = require("./modules/checkInvitation");
const validateLink_1 = require("./utils/validateLink");
const getMLCID_1 = require("./modules/getMLCID");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.disable('x-powered-by');
app.post('/invitacion/:link(*)', async (req, res) => {
    const { link } = req.params;
    const validationResult = (0, validateLink_1.validateSpotifyLink)(link);
    if (!validationResult.isValid) {
        return res.status(400).json({ message: validationResult.message });
    }
    const spotifyInviteLink = validationResult.spotifyInviteLink;
    try {
        const groupStatus = await (0, checkInvitation_1.checkGroupStatus)(spotifyInviteLink);
        res.status(200).json({ message: groupStatus });
    }
    catch (error) {
        res.status(500).json({ message: `Error al verificar el estado del grupo (endpoint): ${error.message}` });
    }
});
app.get('/scrape/:mlcID', async (req, res) => {
    const mlcID = req.params.mlcID;
    const mlcid = await (0, getMLCID_1.getMLCID)(mlcID);
    if (mlcid) {
        res.json({ MLCID: mlcid });
    }
    else {
        res.status(404).json({ error: 'No se encontró el MLCID' });
    }
});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//# sourceMappingURL=server.js.map