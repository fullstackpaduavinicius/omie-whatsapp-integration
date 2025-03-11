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
// __tests__/whatsappService.test.ts
const whatsappService_1 = require("../whatsappService");
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockedAxios = axios_1.default;
describe("WhatsApp Service", () => {
    test("Deve enviar mensagem com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockResolvedValue({ data: { success: true } });
        const response = yield (0, whatsappService_1.enviarMensagem)("5511999999999", "Teste de mensagem");
        expect(response.success).toBe(true);
    }));
    test("Erro na API do WhatsApp", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue({ response: { data: { error: "Erro na API" } } });
        const response = yield (0, whatsappService_1.enviarMensagem)("5511999999999", "Teste de erro");
        expect(response.success).toBe(false);
        expect(response.error).toBe("Erro na API");
    }));
    test("Erro desconhecido no WhatsApp", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue(new Error("Erro desconhecido"));
        const response = yield (0, whatsappService_1.enviarMensagem)("5511999999999", "Teste erro desconhecido");
        expect(response.success).toBe(false);
        expect(response.error).toBe("Erro na API");
    }));
    test("Timeout na API do WhatsApp", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.post.mockRejectedValue({ code: "ECONNABORTED" });
        const response = yield (0, whatsappService_1.enviarMensagem)("5511999999999", "Teste timeout");
        expect(response.success).toBe(false);
        expect(response.error).toBe("Erro na API");
    }));
});
