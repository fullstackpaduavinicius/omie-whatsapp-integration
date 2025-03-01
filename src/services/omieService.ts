import axios from "axios";
import { OMIE_API_KEY, OMIE_APP_SECRET } from "../config/env";

const OMIE_BASE_URL = "https://app.omie.com.br/api/v1/";

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
    throw error;
  }
};

export const listarRecebimentoNotaFiscal = async () => {
  const data = {
    call: "RecebimentoNFE",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ nIdReceb: 0, cChaveNfe: "", cEtapa: "", pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    const response = await axios.post(`${OMIE_BASE_URL}produtos/recebimentonfe/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar recebimento de nota fiscal:", error);
    throw error;
  }
};

export const listarContasAReceber = async () => {
  const data = {
    call: "ListarContasAReceber",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    const response = await axios.post(`${OMIE_BASE_URL}financas/contareceber/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar contas a receber:", error);
    throw error;
  }
};

export const listarPedidos = async () => {
  const data = {
    call: "ListarPedidos",
    app_key: OMIE_API_KEY,
    app_secret: OMIE_APP_SECRET,
    param: [{ codigo_pedido: 0, codigo_pedido_integracao: "", codigo_rastreio: "", previsao_entrega: "", obs_venda: "", pagina: 1, registros_por_pagina: 50 }],
  };

  try {
    const response = await axios.post(`${OMIE_BASE_URL}produtos/pedido/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    throw error;
  }
};
