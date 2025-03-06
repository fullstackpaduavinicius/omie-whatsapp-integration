import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();
app.use(express.json());

// Rota de exemplo para enviar mensagem
app.post('/enviar-mensagem', async (req: Request, res: Response) => {
  try {
    const { numero, mensagem } = req.body;

    if (!numero || !mensagem) {
      return res.status(400).json({ erro: 'Número e mensagem são obrigatórios!' });
    }

    const apiUrl = process.env.WHATSAPP_API_URL;
    if (!apiUrl) {
      return res.status(500).json({ erro: 'A variável WHATSAPP_API_URL não está configurada.' });
    }

    // Envia a mensagem usando a API
    const response = await axios.post(
      apiUrl,
      { phone: numero, message: mensagem },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.json({ sucesso: response.data });
  } catch (error: any) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    return res.status(500).json({ erro: 'Erro ao enviar mensagem.' });
  }
});

// Inicia o servidor somente se for executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exporta o app para testes
export default app;