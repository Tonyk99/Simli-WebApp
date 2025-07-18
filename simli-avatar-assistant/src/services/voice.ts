import { VoiceSettings } from '../types';

// Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class VoiceService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis;
  private isListening: boolean = false;
  private settings: VoiceSettings;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.settings = {
      enabled: true,
      language: 'en-US',
      voice: null,
    };

    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    }

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.settings.language;
    }
  }

  async getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      let voices = this.synthesis.getVoices();
      
      if (voices.length === 0) {
        this.synthesis.onvoiceschanged = () => {
          voices = this.synthesis.getVoices();
          resolve(voices);
        };
      } else {
        resolve(voices);
      }
    });
  }

  async setVoice(voiceName: string): Promise<void> {
    const voices = await this.getAvailableVoices();
    const selectedVoice = voices.find(voice => voice.name === voiceName);
    
    if (selectedVoice) {
      this.settings.voice = selectedVoice;
    }
  }

  async speak(text: string, options?: { 
    rate?: number; 
    pitch?: number; 
    volume?: number; 
    onEnd?: () => void;
    onStart?: () => void;
  }): Promise<void> {
    if (!this.settings.enabled) return;

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = options?.rate || 1;
      utterance.pitch = options?.pitch || 1;
      utterance.volume = options?.volume || 1;
      utterance.lang = this.settings.language;
      
      if (this.settings.voice) {
        utterance.voice = this.settings.voice;
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        reject(error);
      };

      this.synthesis.speak(utterance);
    });
  }

  async startListening(
    onResult: (transcript: string) => void,
    onError?: (error: any) => void
  ): Promise<void> {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    if (this.isListening) {
      return;
    }

    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not available'));
        return;
      }

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onerror = (error: any) => {
        console.error('Speech recognition error:', error);
        this.isListening = false;
        onError?.(error);
        reject(error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        resolve();
      };

      this.recognition.onstart = () => {
        this.isListening = true;
        resolve();
      };

      this.recognition.start();
    });
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  isCurrentlySpeaking(): boolean {
    return this.synthesis.speaking;
  }

  setLanguage(language: string): void {
    this.settings.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  setEnabled(enabled: boolean): void {
    this.settings.enabled = enabled;
    if (!enabled) {
      this.stopListening();
      this.stopSpeaking();
    }
  }

  getSettings(): VoiceSettings {
    return { ...this.settings };
  }
}