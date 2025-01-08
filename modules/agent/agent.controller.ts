import { Request, Response } from 'express';
import agent from './agent.service';

const agentController = {
  createAgent: (req: Request, res: Response) => {
    agent.createAgent(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  sendAIResponse: (req: Request, res: Response) => {
    agent.sendAIResponse(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  getAgentChat: (req: Request, res: Response) => {
    agent.getAgentChat(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  getAgentChatHistory: (req: Request, res: Response) => {
    agent.getAgentChatHistory(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
};

export default agentController;