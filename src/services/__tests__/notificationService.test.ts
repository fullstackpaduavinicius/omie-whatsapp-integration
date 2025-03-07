import { processNotifications } from "../notificationService";
import { listarPedidos } from "../omieService";
import { enviarMensagem } from "../whatsappService";

// Mock das funções externas
jest.mock("../omieService");
jest.mock("../whatsappService");

describe("NotificationService", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it("deve processar notificações corretamente para pedidos aprovados", async () => {
    // Mock da função listarPedidos
    (listarPedidos as jest.Mock).mockResolvedValue([
      {
        codigo_pedido: "123",
        status: "Aprovado",
        cliente: { telefone: "5579988199339" },
      },
    ]);

    // Mock da função enviarMensagem
    (enviarMensagem as jest.Mock).mockResolvedValue({ success: true });

    await processNotifications();

    // Verifica se a função enviarMensagem foi chamada corretamente
    expect(enviarMensagem).toHaveBeenCalledWith(
      "5579988199339",
      "Olá, seu pedido 123 foi aprovado! ✅"
    );
  });

  it("não deve enviar mensagem se o status do pedido não for reconhecido", async () => {
    // Mock da função listarPedidos
    (listarPedidos as jest.Mock).mockResolvedValue([
      {
        codigo_pedido: "456",
        status: "Cancelado",
        cliente: { telefone: "5579988199339" },
      },
    ]);

    await processNotifications();

    // Verifica se a função enviarMensagem NÃO foi chamada
    expect(enviarMensagem).not.toHaveBeenCalled();
  });
});