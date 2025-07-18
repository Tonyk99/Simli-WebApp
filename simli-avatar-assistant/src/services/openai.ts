import OpenAI from 'openai';
import { EmotionState } from '../types';

export class OpenAIService {
  private client: OpenAI;
  private assistant: any;
  private thread: any;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async initialize(
    instructions: string = `You are Aria, a friendly and intelligent AI assistant with an anime-inspired personality. You are helpful, cheerful, and engaging in your conversations.

Key traits:
- Be enthusiastic and expressive in your responses
- Use emotive language that reflects your current mood
- Keep responses concise but engaging (1-3 sentences typically)
- Show curiosity about the user's interests
- Be supportive and encouraging
- Occasionally use light anime-style expressions like "Eh?", "Hmm~", or "That's amazing!"

Remember to be natural and conversational while maintaining your cheerful personality.`
  ) {
    try {
      // Create an assistant
      this.assistant = await this.client.beta.assistants.create({
        name: "Aria - Anime AI Assistant",
        instructions,
        tools: [],
        model: "gpt-4-turbo-preview",
      });

      // Create a thread
      this.thread = await this.client.beta.threads.create();
      
      return true;
    } catch (error) {
      console.error('Failed to initialize OpenAI assistant:', error);
      return false;
    }
  }

  async getResponse(userMessage: string): Promise<{ content: string; emotion: EmotionState }> {
    if (!this.assistant || !this.thread) {
      throw new Error("Assistant not initialized. Call initialize() first.");
    }

    try {
      // Add user message to thread
      await this.client.beta.threads.messages.create(this.thread.id, {
        role: "user",
        content: userMessage,
      });

      // Create and run the assistant
      const run = await this.client.beta.threads.runs.createAndPoll(
        this.thread.id,
        { assistant_id: this.assistant.id }
      );

      if (run.status === "completed") {
        // Get the assistant's response
        const messages = await this.client.beta.threads.messages.list(
          this.thread.id
        );

        // Get the latest assistant message
        const lastMessage = messages.data.filter(
          (msg) => msg.role === "assistant"
        )[0];

        if (lastMessage && lastMessage.content[0].type === "text") {
          const content = lastMessage.content[0].text.value;
          const emotion = this.extractEmotion(content);
          return { content, emotion };
        }
      }

      return { 
        content: "I'm sorry, I couldn't process your request right now. Please try again!", 
        emotion: { emotion: 'confused', intensity: 0.5 }
      };
    } catch (error) {
      console.error('Error getting response from OpenAI:', error);
      return { 
        content: "Oops! Something went wrong. Let me try to help you again!", 
        emotion: { emotion: 'confused', intensity: 0.7 }
      };
    }
  }

  private extractEmotion(content: string): EmotionState {
    const lowerContent = content.toLowerCase();
    
    // Simple emotion detection based on keywords and punctuation
    if (lowerContent.includes('!') || lowerContent.includes('amazing') || lowerContent.includes('great') || lowerContent.includes('wonderful')) {
      return { emotion: 'excited', intensity: 0.8 };
    } else if (lowerContent.includes('happy') || lowerContent.includes('glad') || lowerContent.includes('joy')) {
      return { emotion: 'happy', intensity: 0.7 };
    } else if (lowerContent.includes('sorry') || lowerContent.includes('sad') || lowerContent.includes('unfortunately')) {
      return { emotion: 'sad', intensity: 0.6 };
    } else if (lowerContent.includes('?') || lowerContent.includes('hmm') || lowerContent.includes('think')) {
      return { emotion: 'thinking', intensity: 0.5 };
    } else if (lowerContent.includes('confused') || lowerContent.includes('unclear') || lowerContent.includes('eh?')) {
      return { emotion: 'confused', intensity: 0.6 };
    } else {
      return { emotion: 'neutral', intensity: 0.3 };
    }
  }

  async generateSpeech(text: string, voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'nova'): Promise<ArrayBuffer> {
    try {
      const response = await this.client.audio.speech.create({
        model: 'tts-1',
        voice: voice,
        input: text,
        response_format: 'mp3',
      });

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }
}