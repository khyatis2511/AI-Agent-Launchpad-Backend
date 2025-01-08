import { huggingFaceClient } from '../../services/openai.config';

const openaiService = {
  summarize: async (text: string) => {
    try {
      const result = await huggingFaceClient.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: text,
      });
      console.log('result : ', result);
      return result.summary_text;
    } catch (error) {
      console.error('Error in summarization:', error);
      throw new Error('Failed to summarize text');
    }
  },

  questionAnswer: async (question: string, context: string) => {
    try {
      const result = await huggingFaceClient.questionAnswering({
        model: 'distilbert-base-cased-distilled-squad',
        inputs: { question, context },
      });
      return result.answer;
    } catch (error) {
      console.error('Error in question answering:', error);
      throw new Error('Failed to answer question');
    }
  },

  generateText: async (prompt: string) => {
    try {
      const result = await huggingFaceClient.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: { max_new_tokens: 50 },
      });
      console.log('generateText : ', result);
      return result.generated_text;
    } catch (error) {
      console.error('Error in text generation:', error);
      throw new Error('Failed to generate text');
    }
  },

  generateChatText: async (history: string[], newMessage: string) => {
    try {
      const prompt = [...history, `User: ${newMessage}`, "AI:"].join("\n");
      const result = await huggingFaceClient.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: { max_new_tokens: 50 },
      });
      console.log('result: ', result);
      const responseText = result.generated_text.split("\n")[0];
      return responseText;
    } catch (error) {
      console.error('Error in text generation:', error);
      throw new Error('Failed to generate text');
    }
  },
};

export default openaiService;



// const openaiService = {
//   summarization: async (message: string) => {
//     try {
//       console.log('message : ', message);
//       // const response = await openaiAPIClient.complete({
//       //   engine: "gpt-4o-mini", // Use the correct engine
//       //   prompt: message,
//       //   maxTokens: 100,
//       // })
//       const response = await huggingFaceClient.textGeneration({
//         model: 'bigcode/starcoder',
//         inputs: message,
//         parameters: { max_new_tokens: 100 },
//       });
//       // const response = await openaiClient.chat.completions.create({
//       //   model: "gpt-4",
//       //   messages: [
//       //       {
//       //           role: "user",
//       //           content: message,
//       //       },
//       //   ],
//       // });


//       return response.generated_text;
//     } catch (error: any) {
//       console.error('[ summarization error : ]',error.response.data.error);
//     }
//   }
// };
