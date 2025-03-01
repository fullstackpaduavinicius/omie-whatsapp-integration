import express from "express";
import { listarClientes, listarPedidos, listarContasAReceber, listarRecebimentoNotaFiscal } from "../services/omieService";
import { enviarMensagem } from "../services/whatsappService";

const router = express.Router();

router.post("/enviar-notificacao", async (req, res) => {
  try {
    const clientes = await listarClientes();
    const pedidos = await listarPedidos();
    
    const clientesComNotificacao = clientes?.map((cliente: any) => {
      const clientePedidos = pedidos.filter((pedido: any) => pedido.cliente_id === cliente.id);
      const message = `Você tem ${clientePedidos.length} novos pedidos.`;
      
      return enviarMensagem(cliente.telefone, message);  
    });

    await Promise.all(clientesComNotificacao);

    res.status(200).send("Notificações enviadas com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar notificações:", error);
    res.status(500).send("Erro ao enviar notificações.");
  }
});

router.get("/clientes", async (req, res) => {
  try {
    const clientes = await listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).send("Erro ao listar clientes.");
  }
});

router.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await listarPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).send("Erro ao listar pedidos.");
  }
});

router.get("/contas-a-receber", async (req, res) => {
  try {
    const contas = await listarContasAReceber();
    res.status(200).json(contas);
  } catch (error) {
    res.status(500).send("Erro ao listar contas a receber.");
  }
});

router.get("/recebimento-nota-fiscal", async (req, res) => {
  try {
    const recebimentos = await listarRecebimentoNotaFiscal();
    res.status(200).json(recebimentos);
  } catch (error) {
    res.status(500).send("Erro ao listar recebimento de nota fiscal.");
  }
});

export default router;
