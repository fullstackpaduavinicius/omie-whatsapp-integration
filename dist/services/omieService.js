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
exports.listarRecebimentoNotaFiscal = exports.listarContasAReceber = exports.listarClientes = exports.verificarStatusPedido = exports.listarPedidos = void 0;
// src/services/omieService.ts
const axios_1 = __importDefault(require("axios"));
const OMIE_API_KEY = process.env.OMIE_API_KEY;
const OMIE_APP_SECRET = process.env.OMIE_APP_SECRET;
const OMIE_BASE_URL = "https://app.omie.com.br/api/v1/";
// Função que lista os pedidos
const listarPedidos = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarPedidos",
        app_key: OMIE_API_KEY,
        app_secret: OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        console.log("Buscando pedidos...");
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
        console.log(`Pedidos encontrados: ${response.data.length}`);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar pedidos:", error);
        throw new Error("Erro ao listar pedidos: Erro na API");
    }
});
exports.listarPedidos = listarPedidos;
// Função que verifica o status de um pedido
const verificarStatusPedido = (codigoPedido) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = {
        call: "ListarPedidos",
        app_key: OMIE_API_KEY,
        app_secret: OMIE_APP_SECRET,
        param: [{ codigo_pedido: codigoPedido }],
    };
    try {
        console.log(`Verificando status do pedido: ${codigoPedido}`);
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
        const pedido = response.data[0]; // Supondo que o pedido esteja na primeira posição do array
        if (pedido) {
            console.log(`Status do pedido ${codigoPedido}: ${pedido.status}`);
            return pedido.status; // Retorna o status do pedido
        }
        else {
            throw new Error("Pedido não encontrado.");
        }
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Erro ao verificar status do pedido:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error("Erro ao verificar status do pedido: " + error.message);
        }
        console.error("Erro desconhecido:", error);
        throw new Error("Erro desconhecido ao verificar status do pedido.");
    }
});
exports.verificarStatusPedido = verificarStatusPedido;
// Função que lista os clientes cadastrados
const listarClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarClientes",
        app_key: OMIE_API_KEY,
        app_secret: OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}geral/clientes/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar clientes:", error);
        throw new Error("Erro ao listar clientes: Erro na API");
    }
});
exports.listarClientes = listarClientes;
// Função que lista as contas a receber
const listarContasAReceber = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarContasReceber",
        app_key: OMIE_API_KEY,
        app_secret: OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}financas/contareceber/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar contas a receber:", error);
        throw new Error("Erro ao listar contas a receber: Erro na API");
    }
});
exports.listarContasAReceber = listarContasAReceber;
// Função que lista os recebimentos de notas fiscais
const listarRecebimentoNotaFiscal = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarRecebimentos",
        app_key: OMIE_API_KEY,
        app_secret: OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}financas/recebimentos/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar recebimentos de notas fiscais:", error);
        throw new Error("Erro ao listar recebimentos de notas fiscais: Erro na API");
    }
});
exports.listarRecebimentoNotaFiscal = listarRecebimentoNotaFiscal;
