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
// testNotification.ts
const notificationLogic_1 = require("../notificationLogic");
// Mock das funções externas
const mockVerificarStatusPedido = jest.fn();
const mockEnviarMensagem = jest.fn();
describe("Testes de Notificação", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa mocks antes de cada teste
    });
    test("Deve enviar notificação para pedido aprovado", () => __awaiter(void 0, void 0, void 0, function* () {
        mockVerificarStatusPedido.mockResolvedValue("Aprovado");
        console.log("Executando teste de notificação para pedido aprovado...");
        const result = yield (0, notificationLogic_1.verificarEEnviarNotificacao)("1234", "5511999999999", mockVerificarStatusPedido, mockEnviarMensagem);
        expect(mockVerificarStatusPedido).toHaveBeenCalledWith("1234");
        expect(mockEnviarMensagem).toHaveBeenCalledWith("5511999999999", expect.stringContaining("aprovado"));
        expect(result.success).toBe(true);
        console.log("Teste de notificação para pedido aprovado passou.");
    }));
    test("Não deve enviar notificação para status irrelevante", () => __awaiter(void 0, void 0, void 0, function* () {
        mockVerificarStatusPedido.mockResolvedValue("Cancelado");
        console.log("Executando teste de notificação para status irrelevante...");
        const result = yield (0, notificationLogic_1.verificarEEnviarNotificacao)("5678", "5511999999999", mockVerificarStatusPedido, mockEnviarMensagem);
        expect(mockVerificarStatusPedido).toHaveBeenCalledWith("5678");
        expect(mockEnviarMensagem).not.toHaveBeenCalled();
        expect(result.success).toBe(false);
        console.log("Teste de notificação para status irrelevante passou.");
    }));
    test("Deve lidar com erro ao verificar status", () => __awaiter(void 0, void 0, void 0, function* () {
        mockVerificarStatusPedido.mockRejectedValue(new Error("Erro ao verificar status"));
        console.log("Executando teste de erro ao verificar status...");
        const result = yield (0, notificationLogic_1.verificarEEnviarNotificacao)("9999", "5511999999999", mockVerificarStatusPedido, mockEnviarMensagem);
        expect(mockVerificarStatusPedido).toHaveBeenCalledWith("9999");
        expect(mockEnviarMensagem).not.toHaveBeenCalled();
        expect(result.success).toBe(false);
        console.log("Teste de erro ao verificar status passou.");
    }));
});
