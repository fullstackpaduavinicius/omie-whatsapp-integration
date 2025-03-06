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
const omieService_1 = require("../services/omieService");
const whatsappService_1 = require("../services/whatsappService");
const router = express_1.default.Router();
router.post("/enviar-notificacao", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield (0, omieService_1.listarClientes)();
        const pedidos = yield (0, omieService_1.listarPedidos)();
        const notificacoes = clientes.map((cliente) => {
            const clientePedidos = pedidos.filter((pedido) => pedido.cliente.id === cliente.codigo_cliente_omie);
            if (clientePedidos.length > 0) {
                const message = `Olá ${cliente.nome_fantasia}, você tem ${clientePedidos.length} novos pedidos em nosso sistema.`;
                return (0, whatsappService_1.enviarMensagem)(cliente.telefone1, message);
            }
        });
        yield Promise.all(notificacoes);
        res.status(200).send("Notificações enviadas com sucesso!");
    }
    catch (error) {
        console.error("Erro ao enviar notificações:", error);
        res.status(500).send("Erro ao enviar notificações.");
    }
}));
router.get("/clientes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield (0, omieService_1.listarClientes)();
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(500).send("Erro ao listar clientes.");
    }
}));
router.get("/pedidos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidos = yield (0, omieService_1.listarPedidos)();
        res.status(200).json(pedidos);
    }
    catch (error) {
        res.status(500).send("Erro ao listar pedidos.");
    }
}));
router.get("/contas-a-receber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contas = yield (0, omieService_1.listarContasAReceber)();
        res.status(200).json(contas);
    }
    catch (error) {
        res.status(500).send("Erro ao listar contas a receber.");
    }
}));
router.get("/recebimento-nota-fiscal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recebimentos = yield (0, omieService_1.listarRecebimentoNotaFiscal)();
        res.status(200).json(recebimentos);
    }
    catch (error) {
        res.status(500).send("Erro ao listar recebimento de nota fiscal.");
    }
}));
exports.default = router;
