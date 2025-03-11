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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// __tests__/omieService.test.ts
const omieService_1 = require("../omieService");
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockedAxios = axios_1.default;
describe("Omie Service", () => {
    test("Deve listar pedidos com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockResolvedValue({ data: [{ codigo_pedido: "123", status: "Aprovado" }] });
        const pedidos = yield (0, omieService_1.listarPedidos)();
        expect(pedidos).toEqual([{ codigo_pedido: "123", status: "Aprovado" }]);
    }));
    test("Erro ao listar pedidos", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
        yield expect((0, omieService_1.listarPedidos)()).rejects.toThrow("Erro na API");
    }));
    test("Deve listar clientes com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockResolvedValue({ data: [{ nome: "Cliente Teste" }] });
        const clientes = yield (0, omieService_1.listarClientes)();
        expect(clientes).toEqual([{ nome: "Cliente Teste" }]);
    }));
    test("Erro ao listar clientes", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
        yield expect((0, omieService_1.listarClientes)()).rejects.toThrow("Erro na API");
    }));
    test("Deve listar contas a receber com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockResolvedValue({ data: [{ valor: 100 }] });
        const contas = yield (0, omieService_1.listarContasAReceber)();
        expect(contas).toEqual([{ valor: 100 }]);
    }));
    test("Erro ao listar contas a receber", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
        yield expect((0, omieService_1.listarContasAReceber)()).rejects.toThrow("Erro na API");
    }));
    test("Deve listar recebimentos de notas fiscais com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockResolvedValue({ data: [{ valor: 200 }] });
        const recebimentos = yield (0, omieService_1.listarRecebimentoNotaFiscal)();
        expect(recebimentos).toEqual([{ valor: 200 }]);
    }));
    test("Erro ao listar recebimentos de notas fiscais", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue(new Error("Erro na API"));
        yield expect((0, omieService_1.listarRecebimentoNotaFiscal)()).rejects.toThrow("Erro na API");
    }));
});
