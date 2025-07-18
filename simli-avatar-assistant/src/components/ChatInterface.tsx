import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onStartVoiceInput: () => void;
  onStopVoiceInput: () => void;
  isRecording: boolean;
  isLoading: boolean;
  isAvatarSpeaking: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onStartVoiceInput,
  onStopVoiceInput,
  isRecording,
  isLoading,
  isAvatarSpeaking,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      onStopVoiceInput();
    } else {
      onStartVoiceInput();
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full max-h-96 bg-surface rounded-lg shadow-lg">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-text/60 py-8">
            <p>Start a conversation with your AI assistant!</p>
            <p className="text-sm mt-2">You can type or use voice input.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`chat-bubble ${
                  message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        
        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble chat-bubble-assistant">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-text/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-text/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-text/60 ml-2">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-600 p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder={isRecording ? "Listening..." : "Type your message..."}
              className="input-field w-full pr-12"
              disabled={isLoading || isRecording}
            />
            
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              disabled={isLoading || isAvatarSpeaking}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-primary hover:bg-primary/90 text-white'
              } ${(isLoading || isAvatarSpeaking) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isRecording ? 'Stop recording' : 'Start voice input'}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isRecording ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading || isRecording}
            className={`btn-primary px-4 py-2 ${
              (!inputText.trim() || isLoading || isRecording) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
        
        {/* Status Indicators */}
        <div className="flex items-center justify-between mt-2 text-xs text-text/60">
          <div className="flex items-center space-x-4">
            {isRecording && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Recording...</span>
              </div>
            )}
            {isAvatarSpeaking && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span>Avatar speaking...</span>
              </div>
            )}
            {isTyping && !isRecording && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Typing...</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <span>{messages.length} messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;