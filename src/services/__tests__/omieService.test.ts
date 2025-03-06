import axios from "axios";
import { listarPedidos } from "../omieService";

jest.mock("axios");

describe("OmieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve listar pedidos corretamente", async () => {
    const mockResponse = {
      data: [{ codigo_pedido: "123", status: "Aprovado" }],
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await listarPedidos();

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      "https://app.omie.com.br/api/v1/produtos/pedido/",
      expect.any(Object)
    );
  });

  it("deve lidar com erro ao listar pedidos", async () => {
    // Mock do erro da API
    const error = new Error("Erro na API");
    (axios.post as jest.Mock).mockRejectedValue(error);

    // Ajuste na expectativa: Espera-se que o erro lançado tenha a mensagem "Erro ao listar pedidos: Erro na API"
    await expect(listarPedidos()).rejects.toThrow("Erro ao listar pedidos: Erro na API");
  });
});
