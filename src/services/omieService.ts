// src/services/omieService.ts
import axios from "axios";

const OMIE_API_KEY = process.env.OMIE_API_KEY;
const OMIE_APP_SECRET = process.env.OMIE_APP_SECRET;

const OMIE_BASE_URL = "https://app.omie.com.br/api/v1/";

// Função que lista os pedidos
export const listarPedidos = async () => {
  const data = {
    call: "ListarPedidos",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    console.log("Buscando pedidos...");
    const response = await axios.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
    console.log(`Pedidos encontrados: ${response.data.length}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    throw new Error("Erro ao listar pedidos: Erro na API");
  }
};

// Função que verifica o status de um pedido
export const verificarStatusPedido = async (codigoPedido: string) => {
  const data = {
    call: "ListarPedidos",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ codigo_pedido: codigoPedido }],
  };

  try {
    console.log(`Verificando status do pedido: ${codigoPedido}`);
    const response = await axios.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
    const pedido = response.data[0]; // Supondo que o pedido esteja na primeira posição do array

    if (pedido) {
      console.log(`Status do pedido ${codigoPedido}: ${pedido.status}`);
      return pedido.status; // Retorna o status do pedido
    } else {
      throw new Error("Pedido não encontrado.");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao verificar status do pedido:", error.response?.data || error.message);
      throw new Error("Erro ao verificar status do pedido: " + error.message);
    }
    console.error("Erro desconhecido:", error);
    throw new Error("Erro desconhecido ao verificar status do pedido.");
  }
};

// Função que lista os clientes cadastrados
export const listarClientes = async () => {
  const data = {
    call: "ListarClientes",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    const response = await axios.post(`${OMIE_BASE_URL}geral/clientes/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    throw new Error("Erro ao listar clientes: Erro na API");
  }
};

// Função que lista as contas a receber
export const listarContasAReceber = async () => {
  const data = {
    call: "ListarContasReceber",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    const response = await axios.post(`${OMIE_BASE_URL}financas/contareceber/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar contas a receber:", error);
    throw new Error("Erro ao listar contas a receber: Erro na API");
  }
};

// Função que lista os recebimentos de notas fiscais
export const listarRecebimentoNotaFiscal = async () => {
  const data = {
    call: "ListarRecebimentos",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    const response = await axios.post(`${OMIE_BASE_URL}financas/recebimentos/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar recebimentos de notas fiscais:", error);
    throw new Error("Erro ao listar recebimentos de notas fiscais: Erro na API");
  }
};
