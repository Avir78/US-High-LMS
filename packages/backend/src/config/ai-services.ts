import axios from 'axios';
import logger from '../utils/logger';

interface AIServiceConfig {
  provider: 'openai' | 'claude' | 'gemini';
  apiKey: string;
  baseURL: string;
  model: string;
}

const aiConfigs: Record<string, AIServiceConfig> = {
  openai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-4-turbo',
  },
  claude: {
    provider: 'claude',
    apiKey: process.env.CLAUDE_API_KEY || '',
    baseURL: 'https://api.anthropic.com/v1',
    model: 'claude-3-opus-20240229',
  },
  gemini: {
    provider: 'gemini',
    apiKey: process.env.GEMINI_API_KEY || '',
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    model: 'gemini-pro',
  },
};

export const getAIClient = (provider: 'openai' | 'claude' | 'gemini' = 'openai') => {
  const config = aiConfigs[provider];

  if (!config.apiKey) {
    logger.warn(`${provider} API key not configured`);
  }

  return {
    config,
    generateText: async (prompt: string) => {
      try {
        if (provider === 'openai') {
          const response = await axios.post(
            `${config.baseURL}/chat/completions`,
            {
              model: config.model,
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              max_tokens: 1000,
            },
            {
              headers: {
                Authorization: `Bearer ${config.apiKey}`,
              },
            }
          );
          return response.data.choices[0].message.content;
        } else if (provider === 'claude') {
          const response = await axios.post(
            `${config.baseURL}/messages`,
            {
              model: config.model,
              max_tokens: 1000,
              messages: [{ role: 'user', content: prompt }],
            },
            {
              headers: {
                'anthropic-version': '2023-06-01',
                'x-api-key': config.apiKey,
              },
            }
          );
          return response.data.content[0].text;
        } else if (provider === 'gemini') {
          const response = await axios.post(
            `${config.baseURL}/models/${config.model}:generateContent?key=${config.apiKey}`,
            {
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            }
          );
          return response.data.candidates[0].content.parts[0].text;
        }
      } catch (error: any) {
        logger.error(`AI service error (${provider}):`, error.message);
        throw error;
      }
    },
  };
};

export default getAIClient;
