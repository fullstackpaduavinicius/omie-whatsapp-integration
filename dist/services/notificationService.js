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
exports.processNotifications = void 0;
const omieService_1 = require("./omieService");
const whatsappService_1 = require("./whatsappService"); // Aqui você pode integrar com o seu serviço de envio de WhatsApp
// Função que processa as notificações dos pedidos
const processNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Iniciando o processamento das notificações de pedidos...");
    const pedidos = yield (0, omieService_1.listarPedidos)();
    for (const pedido of pedidos) {
        let message = "";
        console.log(`Processando pedido ${pedido.codigo_pedido}...`);
        switch (pedido.status) {
            case "Aprovado":
                message = `Olá, seu pedido ${pedido.codigo_pedido} foi aprovado! ✅`;
                break;
            case "Enviado":
                message = `Seu pedido ${pedido.codigo_pedido} foi enviado e está a caminho! 🚚`;
                break;
            case "Atrasado":
                message = `Atenção! Seu pedido ${pedido.codigo_pedido} está com pagamento atrasado. Entre em contato.`;
                break;
            default:
                console.log(`Status desconhecido para o pedido ${pedido.codigo_pedido}`);
                continue;
        }
        if (message) {
            // Envia a mensagem via WhatsApp
            console.log(`Enviando mensagem: "${message}" para ${pedido.cliente.telefone}`);
            yield (0, whatsappService_1.enviarMensagem)(pedido.cliente.telefone, message);
            console.log(`📢 Notificação enviada para ${pedido.cliente.telefone}: ${message}`);
        }
    }
});
exports.processNotifications = processNotifications;
