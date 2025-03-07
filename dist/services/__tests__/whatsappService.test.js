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
const whatsappService_1 = require("../whatsappService");
jest.mock("axios");
describe("WhatsAppService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("deve enviar mensagem com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = { success: true };
        axios_1.default.post.mockResolvedValue({ data: mockResponse });
        const result = yield (0, whatsappService_1.enviarMensagem)("5511999999999", "Olá, teste!");
        expect(result).toEqual(mockResponse);
        expect(axios_1.default.post).toHaveBeenCalledWith(expect.any(String), {
            phone: "5511999999999",
            message: "Olá, teste!",
            token: expect.any(String),
        }, { timeout: 5000 });
    }));
    it("deve lidar com erro ao enviar mensagem", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock do erro da API
        axios_1.default.post.mockRejectedValue({
            response: { data: { error: "Erro na API" } },
        });
        const result = yield (0, whatsappService_1.enviarMensagem)("5511999999999", "Olá, teste!");
        // Ajuste na expectativa
        expect(result).toEqual({ success: false, error: "Erro na API" });
    }));
});
