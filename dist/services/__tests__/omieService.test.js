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
const axios_1 = __importDefault(require("axios"));
const omieService_1 = require("../omieService");
jest.mock("axios");
describe("OmieService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("deve listar pedidos corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = {
            data: [{ codigo_pedido: "123", status: "Aprovado" }],
        };
        axios_1.default.post.mockResolvedValue(mockResponse);
        const result = yield (0, omieService_1.listarPedidos)();
        expect(result).toEqual(mockResponse.data);
        expect(axios_1.default.post).toHaveBeenCalledWith("https://app.omie.com.br/api/v1/produtos/pedido/", expect.any(Object));
    }));
    it("deve lidar com erro ao listar pedidos", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do erro da API
        const error = new Error("Erro na API");
        axios_1.default.post.mockRejectedValue(error);
        // Ajuste na expectativa: Espera-se que o erro lançado tenha a mensagem "Erro ao listar pedidos: Erro na API"
        yield expect((0, omieService_1.listarPedidos)()).rejects.toThrow("Erro ao listar pedidos: Erro na API");
    }));
});
