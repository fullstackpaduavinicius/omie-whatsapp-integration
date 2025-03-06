import axios from "axios";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

async function enviarMensagem(numero: string, mensagem: string) {
    const apiUrl = `${process.env.WHATSAPP_API_URL}`;  // Usando a URL do .env
    
    try {
        const response = await axios.post(apiUrl, {
            phone: numero,
            message: mensagem
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Sucesso:", response.data);
    } catch (error: any) {
        console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
    }
}

// Teste
enviarMensagem("5579988199339", "Testando envio pelo código");
