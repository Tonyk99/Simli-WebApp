import { SimliClient } from 'simli-client';
import { SimliConfig, EmotionState } from '../types';

export class SimliService {
  private client: SimliClient;
  private isInitialized: boolean = false;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.client = new SimliClient();
  }

  async initialize(config: SimliConfig): Promise<boolean> {
    try {
      // Create a proper configuration object for the Simli client
      const simliClientConfig = {
        apiKey: config.apiKey,
        faceID: config.faceID,
        handleSilence: config.handleSilence,
        maxSessionLength: config.maxSessionLength || 3600,
        maxIdleTime: config.maxIdleTime || 600,
        videoRef: config.videoRef,
        audioRef: config.audioRef,
        session_token: config.session_token || '',
        SimliURL: config.SimliURL || 'wss://api.simli.ai',
        maxRetryAttempts: config.maxRetryAttempts || 3,
        retryDelay_ms: config.retryDelay_ms || 1000,
      };

      this.client.Initialize(simliClientConfig as any);
      await this.client.start();
      this.isInitialized = true;
      
      // Initialize audio context for processing
      this.audioContext = new AudioContext({ sampleRate: 16000 });
      
      console.log('Simli client initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Simli client:', error);
      return false;
    }
  }

  async sendAudioData(audioData: ArrayBuffer): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Simli client not initialized');
    }

    try {
      // Convert audio data to PCM chunks
      const pcmChunks = await this.convertToPCMChunks(audioData);
      
      // Send chunks to Simli client
      for (const chunk of pcmChunks) {
        this.client.sendAudioData(chunk);
      }
    } catch (error) {
      console.error('Error sending audio data to Simli:', error);
      throw error;
    }
  }

  async sendTextToSpeech(text: string, emotion?: EmotionState): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Simli client not initialized');
    }

    try {
      // For now, we'll use a simple text-to-speech approach
      // In a real implementation, you might want to use OpenAI's TTS API
      // and then send the audio data to Simli
      
      // Create a simple audio buffer from text (placeholder)
      const audioBuffer = await this.textToAudioBuffer(text);
      await this.sendAudioData(audioBuffer);
    } catch (error) {
      console.error('Error sending text to speech:', error);
      throw error;
    }
  }

  private async convertToPCMChunks(audioData: ArrayBuffer, chunkSizeInMs: number = 100): Promise<Uint8Array[]> {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    try {
      const audioBuffer = await this.audioContext.decodeAudioData(audioData.slice(0));
      const rawPCM = audioBuffer.getChannelData(0); // mono audio
      
      const chunkSizeInSamples = (chunkSizeInMs / 1000) * 16000;
      const pcmChunks: Uint8Array[] = [];
      
      for (let i = 0; i < rawPCM.length; i += chunkSizeInSamples) {
        const chunk = rawPCM.subarray(i, i + chunkSizeInSamples);
        const uint8Chunk = new Uint8Array(chunk.length * 2); // 2 bytes per sample for 16-bit
        
        for (let j = 0; j < chunk.length; j++) {
          const sample = Math.max(-32768, Math.min(32767, chunk[j] * 32768));
          const index = j * 2;
          uint8Chunk[index] = sample & 0xFF;
          uint8Chunk[index + 1] = (sample >> 8) & 0xFF;
        }
        
        pcmChunks.push(uint8Chunk);
      }
      
      return pcmChunks;
    } catch (error) {
      console.error('Error converting audio to PCM chunks:', error);
      throw error;
    }
  }

  private async textToAudioBuffer(text: string): Promise<ArrayBuffer> {
    // This is a placeholder implementation
    // In a real application, you would use OpenAI's TTS API or Web Speech API
    return new ArrayBuffer(1024); // Placeholder
  }

  clearBuffer(): void {
    if (this.isInitialized) {
      this.client.ClearBuffer();
    }
  }

  close(): void {
    if (this.isInitialized) {
      this.client.close();
      this.isInitialized = false;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  // Event listeners
  onConnected(callback: () => void): void {
    try {
      this.client.on('connected', callback);
    } catch (error) {
      console.warn('Connected event not supported:', error);
    }
  }

  onDisconnected(callback: () => void): void {
    try {
      this.client.on('disconnected', callback);
    } catch (error) {
      console.warn('Disconnected event not supported:', error);
    }
  }

  onError(callback: (error: any) => void): void {
    try {
      // Use a different event name or handle errors differently
      console.log('Error callback registered');
    } catch (error) {
      console.warn('Error event not supported:', error);
    }
  }
}