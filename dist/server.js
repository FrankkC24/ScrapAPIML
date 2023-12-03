"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const fullGroup_1 = require("./modules/fullGroup");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.disable('x-powered-by');
app.post('/invitacion/:link(*)', async (req, res) => {
    const { link } = req.params;
    if (!link || typeof link !== 'string') {
        return res.status(400).json({ message: 'El enlace ingresado no corresponde a una invitación de Spotify, ingrese una invitación correcta.' });
    }
    try {
        const groupStatus = await (0, fullGroup_1.checkGroupStatus)(link);
        res.status(200).json({ message: groupStatus });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al verificar el estado del grupo.' });
    }
});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//# sourceMappingURL=server.js.map