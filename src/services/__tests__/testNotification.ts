import { verificarEEnviarNotificacao } from './services/notificationLogic';

// Teste manual: vamos verificar a notificação de um pedido específico.
(async () => {
  await verificarEEnviarNotificacao('1234', '5511999999999');
})();
