import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 10000; // Render exige process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 API Omie-WhatsApp está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;