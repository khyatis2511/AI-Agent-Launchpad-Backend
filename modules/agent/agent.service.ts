/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskType } from '@prisma/client';
import { Request } from 'express';
import { Session } from 'express-session';
import prisma from '../../prisma/prisma.service';
import { msgs, returnRes } from '../../utils/messages';
import aiService from '../ai/ai.service';


const agentService = {
  createAgent: async (req : Request) => {
    const { name, taskType } = req.body;
    const userId = (req.session as Session & { userId?: string }).userId ?? "";
    try {
      const agentDetails = await prisma.agent.create({
        data: { userId, name, taskType },
      });
      if (agentDetails) {
        return returnRes(200, msgs.agent.create, agentDetails);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ createAgent error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  sendAIResponse: async (req : Request) => {
    const agentId = req.params.agentId;
    const { message } = req.body;
    try {
      const agentDetails = await prisma.agent.findFirst({where: {
        id: agentId
      }});
      let AIResponse = '';
      if (agentDetails?.taskType === TaskType.summarization){
        AIResponse = await aiService.summarize(message);
      } else if (agentDetails?.taskType === TaskType.question_answering){
        AIResponse = await aiService.questionAnswer(message, message);
      } else {
        AIResponse = await aiService.generateText(message);
      }
      console.log('AIResponse : ', AIResponse);
      const agentChatResponse = await prisma.chat.create({
        data: { agentId, message, AIResponse: AIResponse ?? '' },
      });
      if (agentChatResponse) {
        return returnRes(200, msgs.agent.create, agentChatResponse);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ createAgentChat error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  getAgentChat: async (req: Request) => {
    try {
      const chatResponse = await prisma.chat.findMany({
        where: { agentId: req.params.agentId },
        orderBy: { createdAt: 'asc' },
      });
      if (chatResponse) {
        return returnRes(200, msgs.dataSent, chatResponse);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  getAgentChatHistory: async (req: Request) => {
    try {
      const userId = (req.session as Session & { userId?: string }).userId ?? "";
      const chatHistory = await prisma.agent.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'asc' },
      });
      if (chatHistory) {
        return returnRes(200, msgs.dataSent, chatHistory);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
};

export default agentService;