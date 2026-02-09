# Simli WebApp

A comprehensive React web application that integrates Simli API with OpenAI's Assistant API to create an interactive 3D anime avatar powered by AI conversations. The application provides real-time voice and text interactions with emotion detection and synchronized avatar responses.

## Overview

This project demonstrates a production-ready implementation of a real-time AI avatar system that combines multiple advanced APIs to deliver an engaging conversational experience with visual feedback through a 3D avatar.

## Key Features

### 3D Avatar Display
- Real-time 3D avatar rendering using Simli API
- WebRTC-based streaming for low latency
- Emotion visualization with colored borders and labels
- Connection status indicators
- Loading states and error handling

### AI Conversation System
- OpenAI Assistant API integration
- Intelligent conversation flow with context awareness
- Emotion detection from AI responses
- Personality customization through system prompts
- Real-time response generation

### Voice Integration
- Web Speech API for speech recognition
- OpenAI TTS for high-quality voice synthesis
- Real-time audio processing and PCM conversion
- Multi-language support
- Voice input/output controls

### Chat Interface
- Real-time messaging with message history
- Voice and text input modes
- Typing indicators and status displays
- Scrollable chat history with timestamps
- Responsive design with TailwindCSS

### Settings and Customization
- Avatar selection from available faces (Jenna, Frank, Maya, Alex)
- Voice customization with 6 OpenAI voices
- Personality configuration
- Language settings for speech recognition
- Voice enable/disable controls

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS 3.4
- **Avatar API**: Simli Client (v1.2.11)
- **AI**: OpenAI API (v5.10)
- **Build Tool**: React Scripts 5.0
- **Voice**: Web Speech API + OpenAI TTS

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Simli API Key (from simli.com)
- OpenAI API Key (from platform.openai.com)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tonyk99/Simli-WebApp.git
cd Simli-WebApp/simli-avatar-assistant
