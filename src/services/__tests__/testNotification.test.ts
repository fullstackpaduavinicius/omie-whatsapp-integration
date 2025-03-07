// testNotification.ts
import { verificarEEnviarNotificacao } from "../notificationLogic";

// Mock das funções externas
const mockVerificarStatusPedido = jest.fn();
const mockEnviarMensagem = jest.fn();

describe("Testes de Notificação", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa mocks antes de cada teste
  });

  test("Deve enviar notificação para pedido aprovado", async () => {
    mockVerificarStatusPedido.mockResolvedValue("Aprovado");

    console.log("Executando teste de notificação para pedido aprovado...");
    const result = await verificarEEnviarNotificacao("1234", "5511999999999", mockVerificarStatusPedido, mockEnviarMensagem);

    expect(mockVerificarStatusPedido).toHaveBeenCalledWith("1234");
    expect(mockEnviarMensagem).toHaveBeenCalledWith("5511999999999", expect.stringContaining("aprovado"));
    expect(result.success).toBe(true);
    console.log("Teste de notificação para pedido aprovado passou.");
  });

  test("Não deve enviar notificação para status irrelevante", async () => {
    mockVerificarStatusPedido.mockResolvedValue("Cancelado");

    console.log("Executando teste de notificação para status irrelevante...");
    const result = await verificarEEnviarNotificacao("5678", "5511999999999", mockVerificarStatusPedido, mockEnviarMensagem);

    expect(mockVerificarStatusPedido).toHaveBeenCalledWith("5678");
    expect(mockEnviarMensagem).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    console.log("Teste de notificação para status irrelevante passou.");
  });

  test("Deve lidar com erro ao verificar status", async () => {
    mockVerificarStatusPedido.mockRejectedValue(new Error("Erro ao verificar status"));

    console.log("Executando teste de erro ao verificar status...");
    const result = await verificarEEnviarNotificacao("9999", "5511999999999", mockVerificarStatusPedido, mockEnviarMensagem);

    expect(mockVerificarStatusPedido).toHaveBeenCalledWith("9999");
    expect(mockEnviarMensagem).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    console.log("Teste de erro ao verificar status passou.");
  });
});
