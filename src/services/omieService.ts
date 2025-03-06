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
    const response = await axios.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
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
    const response = await axios.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
    const pedido = response.data[0]; // Supondo que o pedido esteja na primeira posição do array

    if (pedido) {
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
