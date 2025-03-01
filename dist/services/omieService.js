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
exports.listarPedidos = exports.listarContasAReceber = exports.listarRecebimentoNotaFiscal = exports.listarClientes = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const OMIE_BASE_URL = "https://app.omie.com.br/api/v1/";
// Função para listar clientes
const listarClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarClientes",
        app_key: env_1.OMIE_API_KEY,
        app_secret: env_1.OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}geral/clientes/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar clientes:", error);
        throw error;
    }
});
exports.listarClientes = listarClientes;
// Função para listar recebimentos de nota fiscal
const listarRecebimentoNotaFiscal = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "RecebimentoNFE",
        app_key: env_1.OMIE_API_KEY,
        app_secret: env_1.OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}produtos/recebimentonfe/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar recebimento de nota fiscal:", error);
        throw error;
    }
});
exports.listarRecebimentoNotaFiscal = listarRecebimentoNotaFiscal;
// Função para listar contas a receber
const listarContasAReceber = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarContasAReceber",
        app_key: env_1.OMIE_API_KEY,
        app_secret: env_1.OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}financas/contareceber/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar contas a receber:", error);
        throw error;
    }
});
exports.listarContasAReceber = listarContasAReceber;
// Função para listar pedidos
const listarPedidos = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        call: "ListarPedidos",
        app_key: env_1.OMIE_API_KEY,
        app_secret: env_1.OMIE_APP_SECRET,
        param: [{ pagina: 1, registros_por_pagina: 50 }],
    };
    try {
        const response = yield axios_1.default.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao listar pedidos:", error);
        throw error;
    }
});
exports.listarPedidos = listarPedidos;
