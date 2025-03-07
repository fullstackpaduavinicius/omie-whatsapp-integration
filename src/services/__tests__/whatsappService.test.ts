// __tests__/whatsappService.test.ts
import { enviarMensagem } from "../whatsappService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WhatsApp Service", () => {
  test("Deve enviar mensagem com sucesso", async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } });
    const response = await enviarMensagem("5511999999999", "Teste de mensagem");
    expect(response.success).toBe(true);
  });

  test("Erro na API do WhatsApp", async () => {
    mockedAxios.post.mockRejectedValue({ response: { data: { error: "Erro na API" } } });
    const response = await enviarMensagem("5511999999999", "Teste de erro");
    expect(response.success).toBe(false);
    expect(response.error).toBe("Erro na API");
  });

  test("Erro desconhecido no WhatsApp", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Erro desconhecido"));
    const response = await enviarMensagem("5511999999999", "Teste erro desconhecido");
    expect(response.success).toBe(false);
    expect(response.error).toBe("Erro na API");
  });

  test("Timeout na API do WhatsApp", async () => {
    mockedAxios.post.mockRejectedValue({ code: "ECONNABORTED" });
    const response = await enviarMensagem("5511999999999", "Teste timeout");
    expect(response.success).toBe(false);
    expect(response.error).toBe("Erro na API");
  });
});
