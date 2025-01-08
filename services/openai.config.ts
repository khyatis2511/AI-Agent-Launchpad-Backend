// import OpenAI from  'openai'; // official 
import { HfInference } from '@huggingface/inference';
import dotenv from "dotenv";
import OpenAI from 'openai-api'; // npm package

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

// export const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// export const openaiClient = new OpenAI();


export const openaiAPIClient = new OpenAI(OPENAI_API_KEY);

export const huggingFaceClient = new HfInference(process.env.HUGGINGFACE_API_KEY ?? '');
