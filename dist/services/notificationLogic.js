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
// src/services/notificationLogic.ts
const omieService_1 = require("./omieService");
const whatsappService_1 = require("./whatsappService"); // Função de envio de WhatsApp
// Função que decide quando enviar a notificação
const verificarEEnviarNotificacao = (codigoPedido, numeroWhatsApp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, omieService_1.verificarStatusPedido)(codigoPedido);
        // Lógica de decisão para enviar notificação
        let mensagem = "";
        if (status === "Aprovado") {
            mensagem = `Olá, seu pedido #${codigoPedido} foi aprovado! ✅`;
        }
        else if (status === "Enviado") {
            mensagem = `Seu pedido #${codigoPedido} foi enviado e está a caminho! 🚚`;
        }
        else {
            console.log(`❌ O pedido #${codigoPedido} não está no status de envio ou aprovação, não será enviada notificação.`);
            return;
        }
        // Enviar a mensagem via WhatsApp
        if (mensagem) {
            yield (0, whatsappService_1.enviarMensagem)(numeroWhatsApp, mensagem);
            console.log(`📢 Notificação enviada para ${numeroWhatsApp}: ${mensagem} ✅`);
        }
    }
    catch (error) {
        console.error("Erro ao verificar o status do pedido ou enviar notificação:", error);
    }
});
exports.verificarEEnviarNotificacao = verificarEEnviarNotificacao;
