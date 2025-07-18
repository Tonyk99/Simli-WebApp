# Demo Guide - Simli Avatar Assistant

This guide will walk you through using the Simli Avatar Assistant application.

## Getting Started

1. **Set up your API keys** (see `API_SETUP.md` for detailed instructions)
2. **Start the application**: `npm start`
3. **Open your browser** to `http://localhost:3000`

## Application Overview

The application consists of two main sections:

### Left Panel - Avatar Display
- **3D Avatar**: Shows the interactive anime avatar
- **Connection Status**: Green dot indicates connection status
- **Emotion Ring**: Colored border showing current emotion
- **Emotion Label**: Displays current emotion state
- **Emotion Meter**: Shows emotion intensity percentage

### Right Panel - Chat Interface
- **Message History**: Scrollable chat history
- **Text Input**: Type messages to the avatar
- **Voice Input**: Click microphone to speak
- **Send Button**: Send text messages
- **Status Indicators**: Shows recording, avatar speaking, and typing states

## How to Use

### Text Chat
1. Type a message in the text input field
2. Click the send button (arrow icon) or press Enter
3. Watch the avatar respond with synchronized speech and emotions

### Voice Chat
1. Click the microphone button in the input field
2. Speak your message clearly
3. The system will convert your speech to text
4. The avatar will respond with voice and animations

### Settings
1. Click the settings gear icon in the top right
2. Customize:
   - **Avatar Name**: Change the assistant's name
   - **Avatar Face**: Choose from available faces
   - **Personality**: Modify the AI's personality traits
   - **OpenAI Voice**: Select voice for speech synthesis
   - **Language**: Set speech recognition language
   - **Voice Settings**: Enable/disable voice features

## Features Demonstration

### Basic Conversation
Try these sample conversations:

**Greeting:**
- "Hello! What's your name?"
- "How are you feeling today?"

**Questions:**
- "What can you help me with?"
- "Tell me a joke"
- "What's the weather like?"

**Emotional Responses:**
- "I'm feeling sad today"
- "That's amazing news!"
- "I'm confused about something"

### Voice Features
1. **Speech Recognition**: Click mic and speak
2. **Text-to-Speech**: Avatar speaks responses
3. **Emotion Detection**: Watch emotion changes
4. **Real-time Sync**: Audio and visual sync

### Avatar Customization
1. **Face Selection**: Choose different avatar faces
2. **Voice Selection**: Pick from 6 OpenAI voices
3. **Personality**: Customize AI behavior
4. **Language**: Multi-language support

## Troubleshooting

### Common Issues

**Avatar not appearing:**
- Check Simli API key is correct
- Verify internet connection
- Look for errors in browser console

**Voice not working:**
- Grant microphone permissions
- Check browser compatibility
- Ensure HTTPS connection (required for some browsers)

**No AI responses:**
- Verify OpenAI API key
- Check API quota/billing
- Review console for errors

### Browser Compatibility
- **Chrome**: Full support ✅
- **Firefox**: Limited voice support ⚠️
- **Safari**: Partial support ⚠️
- **Edge**: Full support ✅

## Advanced Usage

### Emotion System
The avatar displays emotions based on:
- **Keywords**: Detected emotional words
- **Punctuation**: Exclamation marks, questions
- **Context**: Conversation flow
- **Intensity**: Measured 0-100%

### Voice Customization
Available OpenAI voices:
- **Alloy**: Neutral and clear
- **Echo**: Warm and friendly
- **Fable**: Expressive and engaging
- **Onyx**: Deep and authoritative
- **Nova**: Bright and energetic
- **Shimmer**: Soft and gentle

### Performance Tips
- **Shorter messages**: Faster response times
- **Clear speech**: Better voice recognition
- **Stable connection**: Smoother avatar rendering
- **Modern browser**: Best compatibility

## Example Conversations

### Casual Chat
```
You: "Hi there! How's it going?"
Avatar: "Hello! I'm doing great, thanks for asking! How are you today?"
Emotion: Happy 😊

You: "I'm having a tough day"
Avatar: "I'm sorry to hear that. Is there anything I can help you with?"
Emotion: Sad 😔
```

### Educational
```
You: "Can you explain quantum physics?"
Avatar: "Hmm, that's a fascinating topic! Quantum physics deals with..."
Emotion: Thinking 🤔

You: "That's amazing!"
Avatar: "Right?! Science is incredible! What else would you like to know?"
Emotion: Excited 🎉
```

### Technical Support
```
You: "I'm confused about this code"
Avatar: "No worries! I'd be happy to help. What specific part is confusing you?"
Emotion: Neutral 😐

You: "Never mind, I figured it out!"
Avatar: "That's wonderful! Great job solving it yourself!"
Emotion: Happy 😊
```

## Development Notes

### Architecture
- **Frontend**: React with TypeScript
- **Styling**: TailwindCSS
- **Avatar**: Simli WebRTC client
- **AI**: OpenAI Assistant API
- **Voice**: Web Speech API + OpenAI TTS

### API Integration
- **Real-time**: WebRTC for low latency
- **Streaming**: Audio chunks for sync
- **Emotion**: AI-powered detection
- **Voice**: Dual TTS system

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify API keys are correct
3. Review the troubleshooting section
4. Check browser compatibility
5. Ensure stable internet connection

For more help, refer to:
- `README.md` - Full documentation
- `API_SETUP.md` - API configuration
- Browser developer tools
- Simli and OpenAI documentation

## Tips for Best Experience

1. **Use Chrome** for full feature support
2. **Speak clearly** for voice recognition
3. **Keep messages conversational** for better emotions
4. **Experiment with settings** to find your preference
5. **Use HTTPS** for voice features
6. **Grant permissions** for microphone access

Enjoy your conversation with your AI avatar assistant! 🚀