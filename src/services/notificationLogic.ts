// src/services/notificationLogic.ts
import { verificarStatusPedido } from "./omieService";
import { enviarMensagem } from "./whatsappService"; // Função de envio de WhatsApp

// Função que decide quando enviar a notificação
export const verificarEEnviarNotificacao = async (codigoPedido: string, numeroWhatsApp: string) => {
  try {
    const status = await verificarStatusPedido(codigoPedido);

    // Lógica de decisão para enviar notificação
    let mensagem = "";
    if (status === "Aprovado") {
      mensagem = `Olá, seu pedido #${codigoPedido} foi aprovado! ✅`;
    } else if (status === "Enviado") {
      mensagem = `Seu pedido #${codigoPedido} foi enviado e está a caminho! 🚚`;
    } else {
      console.log(`❌ O pedido #${codigoPedido} não está no status de envio ou aprovação, não será enviada notificação.`);
      return;
    }

    // Enviar a mensagem via WhatsApp
    if (mensagem) {
      await enviarMensagem(numeroWhatsApp, mensagem);
      console.log(`📢 Notificação enviada para ${numeroWhatsApp}: ${mensagem} ✅`);
    }
  } catch (error) {
    console.error("Erro ao verificar o status do pedido ou enviar notificação:", error);
  }
};
