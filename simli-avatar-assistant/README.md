# Simli Avatar Assistant

A React web application that integrates Simli API with OpenAI's Assistant API to create an interactive 3D anime avatar powered by AI conversations.

## Features

### Core Features
- **3D Avatar Display**: Real-time interactive 3D anime avatar using Simli API
- **AI Conversations**: Powered by OpenAI's Assistant API for intelligent responses
- **Voice Input**: Web Speech API integration for voice-to-text input
- **Text-to-Speech**: OpenAI TTS integration for natural avatar speech
- **Emotion Mapping**: Dynamic emotion detection and visual feedback
- **Real-time Sync**: Low-latency audio-visual synchronization

### Bonus Features
- **Multiple Avatars**: Support for different avatar faces and personalities
- **Voice Customization**: Multiple OpenAI voice options (Alloy, Echo, Fable, Onyx, Nova, Shimmer)
- **Settings Panel**: Customizable avatar settings and voice preferences
- **Responsive Design**: Modern UI with TailwindCSS styling
- **Error Handling**: Comprehensive error handling and fallback mechanisms

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom components
- **Avatar**: Simli API/SDK for 3D avatar rendering
- **AI**: OpenAI Assistant API for conversation logic
- **Voice**: Web Speech API + OpenAI TTS
- **Audio Processing**: Web Audio API for real-time audio handling

## Prerequisites

Before running the application, you'll need:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn** package manager
3. **Simli API Key** - Sign up at [simli.com](https://simli.com)
4. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simli-avatar-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   REACT_APP_SIMLI_API_KEY=your_simli_api_key_here
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Configuration

### Avatar Settings
- **Face ID**: Choose from available Simli avatar faces
- **Name**: Customize your avatar's name
- **Personality**: Define the avatar's personality traits
- **Voice**: Select OpenAI voice for speech synthesis

### Voice Settings
- **Language**: Set the language for speech recognition
- **Voice Input**: Enable/disable voice input functionality
- **Browser Voice**: Fallback voice for Web Speech API

## Usage

### Basic Interaction
1. **Text Chat**: Type messages in the chat interface
2. **Voice Input**: Click the microphone button to speak
3. **Avatar Response**: Watch the avatar respond with synchronized speech and emotions

### Advanced Features
1. **Settings**: Click the settings button to customize avatar and voice options
2. **Emotion Feedback**: Observe real-time emotion changes in the avatar
3. **Voice Switching**: Try different OpenAI voices for varied experiences

## API Integration

### Simli API
The application uses Simli's WebRTC client for real-time avatar rendering:
- Real-time video streaming
- Audio synchronization
- Lip-sync technology
- Emotion expression

### OpenAI Assistant API
Conversation logic is powered by OpenAI's Assistant API:
- Intelligent responses
- Context awareness
- Personality customization
- Emotion detection

### Web Speech API
Voice functionality uses browser APIs:
- Speech recognition for input
- Speech synthesis for output
- Language support
- Voice customization

## Project Structure

```
src/
├── components/          # React components
│   ├── Avatar.tsx      # 3D avatar display
│   ├── ChatInterface.tsx # Chat UI
│   └── Settings.tsx    # Settings modal
├── services/           # API services
│   ├── openai.ts      # OpenAI integration
│   ├── simli.ts       # Simli integration
│   └── voice.ts       # Voice services
├── types/             # TypeScript definitions
│   └── index.ts       # Type definitions
├── App.tsx            # Main application
└── index.css          # Styles
```

## Troubleshooting

### Common Issues

1. **Avatar not loading**
   - Check Simli API key is correct
   - Verify internet connection
   - Check browser console for errors

2. **Voice input not working**
   - Ensure microphone permissions are granted
   - Check if Web Speech API is supported in your browser
   - Try using HTTPS (required for some browsers)

3. **AI responses not working**
   - Verify OpenAI API key is valid
   - Check API quota and billing
   - Review console logs for error messages

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Limited Web Speech API support
- **Safari**: Partial support
- **Edge**: Full support

## Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding New Features
1. Create new components in `src/components/`
2. Add services in `src/services/`
3. Update types in `src/types/`
4. Integrate in `App.tsx`

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Ensure the following environment variables are set:
- `REACT_APP_SIMLI_API_KEY`
- `REACT_APP_OPENAI_API_KEY`

### Hosting Options
- **Vercel**: Easy deployment with environment variable support
- **Netlify**: Static site hosting with form handling
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Review [Simli Documentation](https://docs.simli.com)
- Consult [OpenAI Documentation](https://platform.openai.com/docs)

## Acknowledgments

- [Simli](https://simli.com) for the amazing 3D avatar technology
- [OpenAI](https://openai.com) for the powerful AI assistant capabilities
- [React](https://reactjs.org) for the excellent frontend framework
- [TailwindCSS](https://tailwindcss.com) for the beautiful styling system
