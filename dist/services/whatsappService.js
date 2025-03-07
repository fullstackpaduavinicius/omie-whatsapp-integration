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
exports.enviarMensagem = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const enviarMensagem = (phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const data = {
        phone,
        message,
        token: env_1.WHATSAPP_API_KEY,
    };
    try {
        const response = yield axios_1.default.post(env_1.WHATSAPP_API_URL, data, {
            timeout: 5000, // Timeout de 5 segundos
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Erro ao enviar mensagem:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            // Retornar a mensagem de erro da API
            return {
                success: false,
                error: ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || "Erro na API", // Alinhado com a expectativa do teste
            };
        }
        console.error("Erro desconhecido:", error);
        return { success: false, error: "Erro na API" }; // Alinhado com a expectativa do teste
    }
});
exports.enviarMensagem = enviarMensagem;
