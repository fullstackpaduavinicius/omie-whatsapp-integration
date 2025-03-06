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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar variáveis de ambiente
dotenv_1.default.config();
// Inicializa o app Express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rota de exemplo para enviar mensagem
app.post('/enviar-mensagem', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { numero, mensagem } = req.body;
        if (!numero || !mensagem) {
            return res.status(400).json({ erro: 'Número e mensagem são obrigatórios!' });
        }
        const apiUrl = process.env.WHATSAPP_API_URL;
        if (!apiUrl) {
            return res.status(500).json({ erro: 'A variável WHATSAPP_API_URL não está configurada.' });
        }
        // Envia a mensagem usando a API
        const response = yield axios_1.default.post(apiUrl, { phone: numero, message: mensagem }, { headers: { 'Content-Type': 'application/json' } });
        return res.json({ sucesso: response.data });
    }
    catch (error) {
        console.error('Erro ao enviar mensagem:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return res.status(500).json({ erro: 'Erro ao enviar mensagem.' });
    }
}));
// Inicia o servidor somente se for executado diretamente
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
// Exporta o app para testes
exports.default = app;
