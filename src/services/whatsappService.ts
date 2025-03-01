import axios from "axios";
import { WHATSAPP_API_KEY, WHATSAPP_API_URL } from "../config/env";

export const enviarMensagem = async (phone: string, message: string) => {
  const data = {
    phone: phone,
    message: message,
    token: WHATSAPP_API_KEY,
  };

  try {
    const response = await axios.post(WHATSAPP_API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
};
