import axios, { AxiosError } from "axios";
import { WHATSAPP_API_KEY, WHATSAPP_API_URL } from "../config/env";

// Definição do tipo de resposta esperada da API do WhatsApp
interface WhatsAppResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const enviarMensagem = async (
  phone: string,
  message: string
): Promise<WhatsAppResponse> => {
  const data = {
    phone,
    message,
    token: WHATSAPP_API_KEY,
  };

  try {
    console.log(`Enviando mensagem para ${phone}: ${message}...`);
    const response = await axios.post<WhatsAppResponse>(WHATSAPP_API_URL, data, {
      timeout: 5000, // Timeout de 5 segundos
    });

    console.log("Mensagem enviada com sucesso:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erro ao enviar mensagem para WhatsApp:",
        error.response?.data || error.message
      );

      // Retornar a mensagem de erro da API
      return {
        success: false,
        error: error.response?.data?.error || "Erro na API",
      };
    }

    console.error("Erro desconhecido:", error);
    return { success: false, error: "Erro na API" }; // Alinhado com a expectativa do teste
  }
};
