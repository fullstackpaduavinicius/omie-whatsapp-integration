import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import app from './app'; // Importa o app já configurado

dotenv.config();

// Define a porta corretamente
const PORT = process.env.PORT || 3000;

// Rota de status para verificar se a API está online
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 API Omie-WhatsApp está rodando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
