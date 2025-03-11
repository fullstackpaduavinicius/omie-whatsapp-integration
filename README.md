# omie-whatsapp-integration

# ✨ Omie + WhatsApp Integration ✨

 [![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/) ![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

## 📄 Sobre o Projeto
Este projeto tem como objetivo integrar o **Omie** e o **WhatsApp**, permitindo o envio automático de notificações para clientes sobre **status de pedidos, cobranças e notas fiscais**.

## 🌍 Tecnologias Utilizadas
- **Node.js** + **Express** - Para criar a API backend
- **TypeScript** - Para tipagem e segurança no código
- **Axios** - Para consumo das APIs do Omie e WhatsApp
- **Dotenv** - Para gerenciamento de credenciais sensíveis
- **Jest + Supertest** - Para testes automatizados
- **Nodemon / tsx** - Para desenvolvimento dinâmico

## ✅ Funcionalidades Principais
- ✨ Integração com a API do Omie para buscar informações de pedidos e clientes.
- 📞 Envio automático de mensagens via WhatsApp (Twilio, Meta API ou Z-API).
- 🔄 Lógica de negócio para decidir quando notificar clientes.
- ✅ Logs detalhados para monitoramento e depuração.

## 🚀 Instalação e Configuração
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/fullstackpaduavinicius/omie-whatsapp-integration.git
   cd omie-whatsapp-integration
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Crie e configure o arquivo `.env`** com as credenciais:
   ```env
   OMIE_APP_KEY=SEU_APP_KEY
   OMIE_APP_SECRET=SEU_APP_SECRET
   WHATSAPP_API_URL=URL_DA_API_DO_WHATSAPP
   WHATSAPP_API_TOKEN=SEU_TOKEN
   ```
4. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Para compilar e rodar a versão de produção:**
   ```bash
   npm run build
   npm start
   ```

## 🛠️ Endpoints da API
### 📡 `POST /send-notification`
**Descrição:** Envia uma notificação para um cliente via WhatsApp.

**Exemplo de Requisição:**
```json
{
  "client_id": "12345",
  "order_id": "67890",
  "message": "Seu pedido #67890 foi enviado!"
}
```

**Resposta Esperada:**
```json
{
  "status": "success",
  "message": "Notificação enviada com sucesso!"
}
```

## 📈 Estrutura do Projeto
```
omie-whatsapp-integration/
├── src/
│   ├── controllers/
│   │   ├── omieController.ts
│   │   ├── whatsappController.ts
│   ├── services/
│   │   ├── omieService.ts
│   │   ├── whatsappService.ts
│   ├── routes/
│   │   ├── notificationRoutes.ts
│   ├── config/
│   │   ├── database.ts
│   ├── utils/
│   │   ├── logger.ts
│   ├── server.ts
├── tests/
│   ├── notification.test.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 💪 Contribuição
Contribuições são bem-vindas! Para contribuir:
1. **Fork** o repositório.
2. Crie um **branch** com sua funcionalidade (`git checkout -b feature-minha-feature`).
3. **Commit** suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. **Push** para o repositório (`git push origin feature-minha-feature`).
5. Crie um **Pull Request**.



---

Desenvolvido por [@fullstackpaduavinicius](https://github.com/fullstackpaduavinicius) 🚀


