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
        // Vamos combinar as informações de clientes e pedidos, por exemplo.
        const clientes = yield (0, omieService_1.listarClientes)();
        const pedidos = yield (0, omieService_1.listarPedidos)();
        // Suponha que estamos enviando uma notificação para todos os clientes com base em seus pedidos
        const clientesComNotificacao = clientes === null || clientes === void 0 ? void 0 : clientes.map((cliente) => {
            const clientePedidos = pedidos.filter((pedido) => pedido.cliente_id === cliente.id);
            const message = `Você tem ${clientePedidos.length} novos pedidos.`;
            return (0, whatsappService_1.enviarMensagem)(cliente.telefone, message); // Enviar a mensagem via WhatsApp
        });
        // Espera todas as mensagens serem enviadas
        yield Promise.all(clientesComNotificacao);
        res.status(200).send("Notificações enviadas com sucesso!");
    }
    catch (error) {
        console.error("Erro ao enviar notificações:", error);
        res.status(500).send("Erro ao enviar notificações.");
    }
}));
exports.default = router;
