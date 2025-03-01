import dotenv from "dotenv";

dotenv.config();

export const OMIE_API_KEY = process.env.OMIE_API_KEY || "";
export const OMIE_APP_SECRET = process.env.OMIE_APP_SECRET || "";
export const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || "";
export const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "";
