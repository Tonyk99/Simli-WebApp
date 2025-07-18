# API Setup Guide

This guide will help you obtain and configure the necessary API keys for the Simli Avatar Assistant.

## Required API Keys

You'll need two API keys to run this application:
1. **Simli API Key** - For 3D avatar rendering
2. **OpenAI API Key** - For AI conversation capabilities

## Getting Your Simli API Key

### Step 1: Sign Up for Simli
1. Visit [simli.com](https://simli.com)
2. Click "Get API Access" or "Sign Up"
3. Create an account using:
   - Google account (recommended)
   - Email and password
   - Apple ID

### Step 2: Access Your Dashboard
1. After signing up, you'll be redirected to your dashboard
2. Look for the "API Keys" section
3. Your API key will be displayed there

### Step 3: Copy Your API Key
1. Click the copy icon next to your API key
2. Store it securely - you'll need it for the `.env` file

### Simli Pricing
- **Free Tier**: $10 credit on signup + 50 minutes monthly
- **Pay-as-you-go**: Volume discounts available
- Check [simli.com/pricing](https://simli.com/pricing) for current rates

## Getting Your OpenAI API Key

### Step 1: Create OpenAI Account
1. Visit [platform.openai.com](https://platform.openai.com)
2. Click "Sign up" if you don't have an account
3. Verify your email address

### Step 2: Add Payment Method
1. Go to "Billing" in your dashboard
2. Add a payment method (credit card required)
3. OpenAI requires a payment method even for free tier usage

### Step 3: Generate API Key
1. Navigate to "API Keys" in the left sidebar
2. Click "Create new secret key"
3. Give it a descriptive name (e.g., "Simli Avatar Assistant")
4. Copy the key immediately - you won't be able to see it again!

### Step 4: Set Usage Limits (Recommended)
1. Go to "Billing" → "Usage limits"
2. Set a monthly spending limit to avoid unexpected charges
3. Recommended: Start with $5-10 for testing

### OpenAI Pricing
- **GPT-4 Turbo**: ~$0.01 per 1K tokens (input) / ~$0.03 per 1K tokens (output)
- **TTS**: ~$0.015 per 1K characters
- **Assistants API**: Additional processing fees may apply
- Check [openai.com/pricing](https://openai.com/pricing) for current rates

## Environment Configuration

### Step 1: Create .env File
In your project root, create a `.env` file:

```bash
cp .env.example .env
```

### Step 2: Add Your API Keys
Edit the `.env` file and add your keys:

```env
REACT_APP_SIMLI_API_KEY=your_simli_api_key_here
REACT_APP_OPENAI_API_KEY=sk-your_openai_api_key_here
```

### Step 3: Verify Configuration
1. Save the `.env` file
2. Restart your development server
3. Check the browser console for any API-related errors

## Security Best Practices

### API Key Security
- **Never commit** API keys to version control
- **Never share** your API keys publicly
- **Use environment variables** for production deployment
- **Rotate keys regularly** for enhanced security

### Rate Limiting
- Both APIs have rate limits
- Implement proper error handling for rate limit responses
- Consider caching responses when appropriate

### Cost Management
- Monitor your API usage regularly
- Set up billing alerts in both platforms
- Test with smaller limits before scaling up

## Troubleshooting

### Common Issues

#### Simli API Issues
1. **"Invalid API Key"**
   - Double-check your API key is correct
   - Ensure no extra spaces or characters
   - Try regenerating the key

2. **"Face ID not found"**
   - Use one of the available face IDs from Simli's documentation
   - Check if the face ID is still active

3. **"Connection failed"**
   - Check your internet connection
   - Verify WebRTC is supported in your browser
   - Try using HTTPS instead of HTTP

#### OpenAI API Issues
1. **"Insufficient quota"**
   - Add a payment method to your OpenAI account
   - Check your billing dashboard for usage limits

2. **"Rate limit exceeded"**
   - Wait a few minutes before trying again
   - Implement exponential backoff in your requests

3. **"Model not found"**
   - Ensure you're using a supported model name
   - Check if you have access to the specific model

### Testing Your Setup

#### Test Simli Connection
1. Open browser developer tools
2. Look for Simli connection messages in console
3. Check if video element receives stream

#### Test OpenAI Integration
1. Send a simple message in the chat
2. Check console for API response logs
3. Verify assistant creates responses

## Production Deployment

### Environment Variables
When deploying to production, ensure these environment variables are set:

**Vercel:**
```bash
vercel env add REACT_APP_SIMLI_API_KEY
vercel env add REACT_APP_OPENAI_API_KEY
```

**Netlify:**
```bash
netlify env:set REACT_APP_SIMLI_API_KEY "your_key_here"
netlify env:set REACT_APP_OPENAI_API_KEY "your_key_here"
```

**AWS/Other Platforms:**
Set environment variables through your platform's dashboard or CLI tools.

### Security Considerations
- Use HTTPS in production
- Implement proper CORS settings
- Consider using a backend proxy for API calls
- Monitor API usage and costs

## Support Resources

### Simli Support
- [Documentation](https://docs.simli.com)
- [Discord Community](https://discord.gg/simli)
- [Support Email](mailto:support@simli.com)

### OpenAI Support
- [Documentation](https://platform.openai.com/docs)
- [Community Forum](https://community.openai.com)
- [Support Center](https://help.openai.com)

### General Resources
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Cost Estimation

### Typical Usage Costs
For a moderate usage scenario (100 conversations/month):

**Simli API:**
- ~$5-15/month depending on session length

**OpenAI API:**
- GPT-4 Turbo: ~$2-5/month
- TTS: ~$1-3/month
- **Total**: ~$3-8/month

### Cost Optimization Tips
1. Use shorter assistant responses when possible
2. Implement caching for repeated requests
3. Use lower-cost models for simple interactions
4. Monitor usage through API dashboards
5. Set up billing alerts

Remember to monitor your actual usage and adjust limits accordingly!