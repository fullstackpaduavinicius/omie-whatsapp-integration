import axios from "axios";
import { enviarMensagem } from "../whatsappService";

jest.mock("axios");

describe("WhatsAppService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve enviar mensagem com sucesso", async () => {
    const mockResponse = { success: true };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await enviarMensagem("5511999999999", "Olá, teste!");

    expect(result).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      {
        phone: "5511999999999",
        message: "Olá, teste!",
        token: expect.any(String),
      },
      { timeout: 5000 }
    );
  });

  it("deve lidar com erro ao enviar mensagem", async () => {
    // Mock do erro da API
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { error: "Erro na API" } },
    });

    const result = await enviarMensagem("5511999999999", "Olá, teste!");

    // Ajuste na expectativa
    expect(result).toEqual({ success: false, error: "Erro na API" });
  });
});