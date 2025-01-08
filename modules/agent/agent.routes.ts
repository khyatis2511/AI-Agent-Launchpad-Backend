import { Router } from 'express';
import isAuthenticated from '../../middleware/autheticate.middleware';
import agentController from './agent.controller';

const applyAgentRoutes = (app : Router) => {
  app.post('/', isAuthenticated, agentController.createAgent);
  app.post('/:agentId/chat', isAuthenticated, agentController.sendAIResponse);
  app.get('/:agentId/chat', isAuthenticated, agentController.getAgentChat);
  app.get('/', isAuthenticated, agentController.getAgentChatHistory);    
  return app;
};

export default applyAgentRoutes;