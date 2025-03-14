import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Define as rotas principais
app.use('/api', notificationRoutes);

export default app;
