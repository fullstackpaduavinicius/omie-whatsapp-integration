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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("API de envio de mensagens", () => {
    it("deve retornar erro ao enviar uma requisição sem dados", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/enviar-mensagem").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("erro");
    }));
    it("deve retornar erro se faltar número ou mensagem", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(server_1.default).post("/enviar-mensagem").send({ numero: "123456789" });
        expect(response1.status).toBe(400);
        const response2 = yield (0, supertest_1.default)(server_1.default).post("/enviar-mensagem").send({ mensagem: "Olá" });
        expect(response2.status).toBe(400);
    }));
});
