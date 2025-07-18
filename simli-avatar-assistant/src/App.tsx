import React, { useState, useEffect, useRef, useCallback } from 'react';
import Avatar from './components/Avatar';
import ChatInterface from './components/ChatInterface';
import Settings from './components/Settings';
import { OpenAIService } from './services/openai';
import { SimliService } from './services/simli';
import { VoiceService } from './services/voice';
import { 
  Message, 
  AppState, 
  AvatarSettings, 
  VoiceSettings, 
  EmotionState,
  SimliConfig 
} from './types';
import './App.css';

const App: React.FC = () => {
  // Services
  const [openaiService] = useState(() => new OpenAIService(process.env.REACT_APP_OPENAI_API_KEY || ''));
  const [simliService] = useState(() => new SimliService());
  const [voiceService] = useState(() => new VoiceService());

  // Refs for video and audio elements
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // App state
  const [appState, setAppState] = useState<AppState>({
    isConnected: false,
    isLoading: false,
    error: null,
    messages: [],
    currentEmotion: { emotion: 'neutral', intensity: 0.3 },
    isRecording: false,
    isAvatarSpeaking: false,
  });

  // Settings state
  const [avatarSettings, setAvatarSettings] = useState<AvatarSettings>({
    faceId: 'tmp9i8bbq7c',
    name: 'Aria',
    personality: 'You are Aria, a friendly and intelligent AI assistant with an anime-inspired personality.',
    voice: 'nova',
  });

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    language: 'en-US',
    voice: null,
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize services
  useEffect(() => {
    initializeServices();
    loadAvailableVoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep empty dependency array since we want this to run only once on mount

  const initializeServices = useCallback(async () => {
    setAppState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Initialize OpenAI service
      const openaiInitialized = await openaiService.initialize(
        `${avatarSettings.personality}\n\nYour name is ${avatarSettings.name}. Be engaging and expressive in your responses.`
      );

      if (!openaiInitialized) {
        throw new Error('Failed to initialize OpenAI service');
      }

      // Initialize Simli service
      if (videoRef.current && audioRef.current) {
        const simliConfig: SimliConfig = {
          apiKey: process.env.REACT_APP_SIMLI_API_KEY || '',
          faceID: avatarSettings.faceId,
          handleSilence: true,
          maxSessionLength: 3600,
          maxIdleTime: 600,
          videoRef: videoRef,
          audioRef: audioRef,
        };

        const simliInitialized = await simliService.initialize(simliConfig);

        if (!simliInitialized) {
          throw new Error('Failed to initialize Simli service');
        }

        // Set up Simli event listeners
        simliService.onConnected(() => {
          setAppState(prev => ({ ...prev, isConnected: true }));
        });

        simliService.onDisconnected(() => {
          setAppState(prev => ({ ...prev, isConnected: false }));
        });

        simliService.onError((error) => {
          setAppState(prev => ({ ...prev, error: error.message }));
        });
      }

      setAppState(prev => ({ ...prev, isLoading: false, isConnected: true }));
    } catch (error) {
      console.error('Failed to initialize services:', error);
      setAppState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to initialize services' 
      }));
    }
  }, [avatarSettings.personality, avatarSettings.name, avatarSettings.faceId, openaiService, simliService]);

  const loadAvailableVoices = useCallback(async () => {
    try {
      const voices = await voiceService.getAvailableVoices();
      setAvailableVoices(voices);
    } catch (error) {
      console.error('Failed to load available voices:', error);
    }
  }, [voiceService]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setAppState(prev => ({ 
      ...prev, 
      messages: [...prev.messages, userMessage],
      isLoading: true 
    }));

    try {
      // Get response from OpenAI
      const { content: aiResponse, emotion } = await openaiService.getResponse(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      setAppState(prev => ({ 
        ...prev, 
        messages: [...prev.messages, assistantMessage],
        currentEmotion: emotion,
        isLoading: false,
        isAvatarSpeaking: true
      }));

      // Generate speech and send to avatar
      await handleTextToSpeech(aiResponse, emotion);

    } catch (error) {
      console.error('Failed to get AI response:', error);
      setAppState(prev => ({ 
        ...prev, 
        error: 'Failed to get response from AI assistant',
        isLoading: false 
      }));
    }
  };

  const handleTextToSpeech = async (text: string, emotion: EmotionState) => {
    try {
      if (voiceSettings.enabled) {
        // Use OpenAI TTS for higher quality
        const audioBuffer = await openaiService.generateSpeech(text, avatarSettings.voice);
        await simliService.sendAudioData(audioBuffer);
      } else {
        // Fallback to browser TTS
        await voiceService.speak(text, {
          onEnd: () => {
            setAppState(prev => ({ ...prev, isAvatarSpeaking: false }));
          }
        });
      }
    } catch (error) {
      console.error('Failed to generate speech:', error);
      // Fallback to browser TTS
      try {
        await voiceService.speak(text, {
          onEnd: () => {
            setAppState(prev => ({ ...prev, isAvatarSpeaking: false }));
          }
        });
      } catch (fallbackError) {
        console.error('Fallback TTS also failed:', fallbackError);
        setAppState(prev => ({ ...prev, isAvatarSpeaking: false }));
      }
    }
  };

  const handleStartVoiceInput = async () => {
    try {
      setAppState(prev => ({ ...prev, isRecording: true }));
      
      await voiceService.startListening(
        (transcript) => {
          setAppState(prev => ({ ...prev, isRecording: false }));
          if (transcript.trim()) {
            handleSendMessage(transcript);
          }
        },
        (error) => {
          console.error('Voice input error:', error);
          setAppState(prev => ({ 
            ...prev, 
            isRecording: false, 
            error: 'Voice input failed' 
          }));
        }
      );
    } catch (error) {
      console.error('Failed to start voice input:', error);
      setAppState(prev => ({ 
        ...prev, 
        isRecording: false, 
        error: 'Voice input not supported' 
      }));
    }
  };

  const handleStopVoiceInput = () => {
    voiceService.stopListening();
    setAppState(prev => ({ ...prev, isRecording: false }));
  };

  const handleVideoRef = useCallback((ref: React.RefObject<HTMLVideoElement | null>) => {
    videoRef.current = ref.current;
  }, []);

  const handleAudioRef = useCallback((ref: React.RefObject<HTMLAudioElement | null>) => {
    audioRef.current = ref.current;
  }, []);

  const handleAvatarSettingsChange = (newSettings: AvatarSettings) => {
    setAvatarSettings(newSettings);
    // Reinitialize services with new settings
    // This would typically require reconnecting to Simli with new face ID
    // For now, we'll just update the local state
  };

  const handleVoiceSettingsChange = (newSettings: VoiceSettings) => {
    setVoiceSettings(newSettings);
    voiceService.setEnabled(newSettings.enabled);
    voiceService.setLanguage(newSettings.language);
  };

  const handleReconnect = () => {
    initializeServices();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text">
              {avatarSettings.name} - AI Avatar Assistant
            </h1>
            <p className="text-text/70 mt-2">
              Powered by Simli API & OpenAI Assistant
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="btn-secondary"
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {!appState.isConnected && !appState.isLoading && (
              <button
                onClick={handleReconnect}
                className="btn-primary"
              >
                Reconnect
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {appState.error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <span>{appState.error}</span>
              <button
                onClick={() => setAppState(prev => ({ ...prev, error: null }))}
                className="text-red-200 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-text mb-4">Avatar</h2>
              <Avatar
                isConnected={appState.isConnected}
                isLoading={appState.isLoading}
                emotion={appState.currentEmotion}
                onVideoRef={handleVideoRef}
                onAudioRef={handleAudioRef}
              />
            </div>

            {/* Avatar Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-2">Current Emotion</h3>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm text-text/70 mb-1">
                    <span className="capitalize">{appState.currentEmotion.emotion}</span>
                    <span>{Math.round(appState.currentEmotion.intensity * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${appState.currentEmotion.intensity * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-text mb-4">Chat</h2>
              <ChatInterface
                messages={appState.messages}
                onSendMessage={handleSendMessage}
                onStartVoiceInput={handleStartVoiceInput}
                onStopVoiceInput={handleStopVoiceInput}
                isRecording={appState.isRecording}
                isLoading={appState.isLoading}
                isAvatarSpeaking={appState.isAvatarSpeaking}
              />
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <Settings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          avatarSettings={avatarSettings}
          voiceSettings={voiceSettings}
          onAvatarSettingsChange={handleAvatarSettingsChange}
          onVoiceSettingsChange={handleVoiceSettingsChange}
          availableVoices={availableVoices}
        />
      </div>
    </div>
  );
};

export default App;
