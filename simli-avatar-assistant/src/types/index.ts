export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SimliConfig {
  apiKey: string;
  faceID: string;
  handleSilence: boolean;
  maxSessionLength?: number;
  maxIdleTime?: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  session_token?: string;
  SimliURL?: string;
  maxRetryAttempts?: number;
  retryDelay_ms?: number;
}

export interface OpenAIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface AvatarSettings {
  faceId: string;
  name: string;
  personality: string;
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
}

export interface VoiceSettings {
  enabled: boolean;
  language: string;
  voice: SpeechSynthesisVoice | null;
}

export interface EmotionState {
  emotion: 'neutral' | 'happy' | 'sad' | 'excited' | 'confused' | 'thinking';
  intensity: number;
}

export interface AppState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  messages: Message[];
  currentEmotion: EmotionState;
  isRecording: boolean;
  isAvatarSpeaking: boolean;
}