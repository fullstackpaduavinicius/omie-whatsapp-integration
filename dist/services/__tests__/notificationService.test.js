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
Object.defineProperty(exports, "__esModule", { value: true });
const notificationService_1 = require("../notificationService");
const omieService_1 = require("../omieService");
const whatsappService_1 = require("../whatsappService");
// Mock das funções externas
jest.mock("../omieService");
jest.mock("../whatsappService");
describe("NotificationService", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });
    it("deve processar notificações corretamente para pedidos aprovados", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock da função listarPedidos
        omieService_1.listarPedidos.mockResolvedValue([
            {
                codigo_pedido: "123",
                status: "Aprovado",
                cliente: { telefone: "5579988199339" },
            },
        ]);
        // Mock da função enviarMensagem
        whatsappService_1.enviarMensagem.mockResolvedValue({ success: true });
        yield (0, notificationService_1.processNotifications)();
        // Verifica se a função enviarMensagem foi chamada corretamente
        expect(whatsappService_1.enviarMensagem).toHaveBeenCalledWith("5579988199339", "Olá, seu pedido 123 foi aprovado! ✅");
    }));
    it("não deve enviar mensagem se o status do pedido não for reconhecido", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock da função listarPedidos
        omieService_1.listarPedidos.mockResolvedValue([
            {
                codigo_pedido: "456",
                status: "Cancelado",
                cliente: { telefone: "5579988199339" },
            },
        ]);
        yield (0, notificationService_1.processNotifications)();
        // Verifica se a função enviarMensagem NÃO foi chamada
        expect(whatsappService_1.enviarMensagem).not.toHaveBeenCalled();
    }));
});
