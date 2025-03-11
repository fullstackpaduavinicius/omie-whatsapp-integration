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
exports.verificarEEnviarNotificacao = void 0;
const omieService_1 = require("./omieService");
const whatsappService_1 = require("./whatsappService");
// Refatorando para facilitar os testes
const verificarEEnviarNotificacao = (codigoPedido_1, numeroWhatsApp_1, ...args_1) => __awaiter(void 0, [codigoPedido_1, numeroWhatsApp_1, ...args_1], void 0, function* (codigoPedido, numeroWhatsApp, statusPedidoFn = omieService_1.verificarStatusPedido, enviarMensagemFn = whatsappService_1.enviarMensagem) {
    try {
        console.log(`Verificando status do pedido #${codigoPedido}...`);
        const status = yield statusPedidoFn(codigoPedido);
        console.log(`Status do pedido #${codigoPedido}: ${status}`);
        let mensagem = "";
        if (status === "Aprovado") {
            mensagem = `Olá, seu pedido #${codigoPedido} foi aprovado! ✅`;
        }
        else if (status === "Enviado") {
            mensagem = `Seu pedido #${codigoPedido} foi enviado e está a caminho! 🚚`;
        }
        else {
            console.log(`Status do pedido #${codigoPedido} não requer notificação.`);
            return { success: false, message: "Status não requer notificação." };
        }
        console.log(`Enviando mensagem: ${mensagem} para ${numeroWhatsApp}...`);
        yield enviarMensagemFn(numeroWhatsApp, mensagem);
        console.log(`Mensagem enviada para ${numeroWhatsApp}: ${mensagem}`);
        return { success: true, message: `Notificação enviada: ${mensagem}` };
    }
    catch (error) {
        console.error(`Erro ao verificar e enviar notificação para o pedido #${codigoPedido}:`, error);
        return { success: false, error };
    }
});
exports.verificarEEnviarNotificacao = verificarEEnviarNotificacao;
