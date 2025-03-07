import { verificarStatusPedido } from "./omieService";
import { enviarMensagem } from "./whatsappService";

// Refatorando para facilitar os testes
export const verificarEEnviarNotificacao = async (
  codigoPedido: string,
  numeroWhatsApp: string,
  statusPedidoFn = verificarStatusPedido,
  enviarMensagemFn = enviarMensagem
) => {
  try {
    console.log(`Verificando status do pedido #${codigoPedido}...`);
    const status = await statusPedidoFn(codigoPedido);
    console.log(`Status do pedido #${codigoPedido}: ${status}`);
    
    let mensagem = "";

    if (status === "Aprovado") {
      mensagem = `Olá, seu pedido #${codigoPedido} foi aprovado! ✅`;
    } else if (status === "Enviado") {
      mensagem = `Seu pedido #${codigoPedido} foi enviado e está a caminho! 🚚`;
    } else {
      console.log(`Status do pedido #${codigoPedido} não requer notificação.`);
      return { success: false, message: "Status não requer notificação." };
    }

    console.log(`Enviando mensagem: ${mensagem} para ${numeroWhatsApp}...`);
    await enviarMensagemFn(numeroWhatsApp, mensagem);
    console.log(`Mensagem enviada para ${numeroWhatsApp}: ${mensagem}`);
    return { success: true, message: `Notificação enviada: ${mensagem}` };
  } catch (error) {
    console.error(`Erro ao verificar e enviar notificação para o pedido #${codigoPedido}:`, error);
    return { success: false, error };
  }
};
