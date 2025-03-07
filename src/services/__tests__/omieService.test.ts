// __tests__/omieService.test.ts
import { listarPedidos, listarClientes, listarContasAReceber, listarRecebimentoNotaFiscal } from "../omieService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Omie Service", () => {
  test("Deve listar pedidos com sucesso", async () => {
    mockedAxios.post.mockResolvedValue({ data: [{ codigo_pedido: "123", status: "Aprovado" }] });
    const pedidos = await listarPedidos();
    expect(pedidos).toEqual([{ codigo_pedido: "123", status: "Aprovado" }]);
  });

  test("Erro ao listar pedidos", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
    await expect(listarPedidos()).rejects.toThrow("Erro na API");
  });

  test("Deve listar clientes com sucesso", async () => {
    mockedAxios.post.mockResolvedValue({ data: [{ nome: "Cliente Teste" }] });
    const clientes = await listarClientes();
    expect(clientes).toEqual([{ nome: "Cliente Teste" }]);
  });

  test("Erro ao listar clientes", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
    await expect(listarClientes()).rejects.toThrow("Erro na API");
  });

  test("Deve listar contas a receber com sucesso", async () => {
    mockedAxios.post.mockResolvedValue({ data: [{ valor: 100 }] });
    const contas = await listarContasAReceber();
    expect(contas).toEqual([{ valor: 100 }]);
  });

  test("Erro ao listar contas a receber", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
    await expect(listarContasAReceber()).rejects.toThrow("Erro na API");
  });

  test("Deve listar recebimentos de notas fiscais com sucesso", async () => {
    mockedAxios.post.mockResolvedValue({ data: [{ valor: 200 }] });
    const recebimentos = await listarRecebimentoNotaFiscal();
    expect(recebimentos).toEqual([{ valor: 200 }]);
  });

  test("Erro ao listar recebimentos de notas fiscais", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
    await expect(listarRecebimentoNotaFiscal()).rejects.toThrow("Erro na API");
  });
});