// src/services/notificationService.ts
import { listarPedidos } from "./omieService";
import { enviarMensagem } from "./whatsappService"; // Aqui você pode integrar com o seu serviço de envio de WhatsApp

// Função que processa as notificações dos pedidos
export const processNotifications = async () => {
  const pedidos = await listarPedidos();

  for (const pedido of pedidos) {
    let message = "";

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
      await enviarMensagem(pedido.cliente.telefone, message);
      console.log(`📢 Notificação enviada para ${pedido.cliente.telefone}: ${message}`);
    }
  }
};
