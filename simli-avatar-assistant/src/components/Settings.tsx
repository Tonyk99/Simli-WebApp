import React, { useState, useEffect } from 'react';
import { AvatarSettings, VoiceSettings } from '../types';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  avatarSettings: AvatarSettings;
  voiceSettings: VoiceSettings;
  onAvatarSettingsChange: (settings: AvatarSettings) => void;
  onVoiceSettingsChange: (settings: VoiceSettings) => void;
  availableVoices: SpeechSynthesisVoice[];
}

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  avatarSettings,
  voiceSettings,
  onAvatarSettingsChange,
  onVoiceSettingsChange,
  availableVoices,
}) => {
  const [localAvatarSettings, setLocalAvatarSettings] = useState(avatarSettings);
  const [localVoiceSettings, setLocalVoiceSettings] = useState(voiceSettings);

  useEffect(() => {
    setLocalAvatarSettings(avatarSettings);
    setLocalVoiceSettings(voiceSettings);
  }, [avatarSettings, voiceSettings]);

  const handleSave = () => {
    onAvatarSettingsChange(localAvatarSettings);
    onVoiceSettingsChange(localVoiceSettings);
    onClose();
  };

  const handleCancel = () => {
    setLocalAvatarSettings(avatarSettings);
    setLocalVoiceSettings(voiceSettings);
    onClose();
  };

  const availableAvatars = [
    { id: 'tmp9i8bbq7c', name: 'Jenna', description: 'Friendly and professional' },
    { id: '5514e24d-6086-46a3-ace4-6a7264e5cb7c', name: 'Frank', description: 'Casual and approachable' },
    { id: 'tmp_avatar_1', name: 'Maya', description: 'Energetic and cheerful' },
    { id: 'tmp_avatar_2', name: 'Alex', description: 'Calm and thoughtful' },
  ];

  const openaiVoices = [
    { id: 'alloy', name: 'Alloy', description: 'Neutral and clear' },
    { id: 'echo', name: 'Echo', description: 'Warm and friendly' },
    { id: 'fable', name: 'Fable', description: 'Expressive and engaging' },
    { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
    { id: 'nova', name: 'Nova', description: 'Bright and energetic' },
    { id: 'shimmer', name: 'Shimmer', description: 'Soft and gentle' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Settings</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-text transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {/* Avatar Settings */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Avatar Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Avatar Name
                  </label>
                  <input
                    type="text"
                    value={localAvatarSettings.name}
                    onChange={(e) => setLocalAvatarSettings({
                      ...localAvatarSettings,
                      name: e.target.value
                    })}
                    className="input-field w-full"
                    placeholder="Enter avatar name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Avatar Face
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableAvatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          localAvatarSettings.faceId === avatar.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => setLocalAvatarSettings({
                          ...localAvatarSettings,
                          faceId: avatar.id
                        })}
                      >
                        <div className="font-medium text-text">{avatar.name}</div>
                        <div className="text-xs text-text/60">{avatar.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Personality
                  </label>
                  <textarea
                    value={localAvatarSettings.personality}
                    onChange={(e) => setLocalAvatarSettings({
                      ...localAvatarSettings,
                      personality: e.target.value
                    })}
                    className="input-field w-full h-24 resize-none"
                    placeholder="Describe your avatar's personality..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    OpenAI Voice
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {openaiVoices.map((voice) => (
                      <div
                        key={voice.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          localAvatarSettings.voice === voice.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => setLocalAvatarSettings({
                          ...localAvatarSettings,
                          voice: voice.id as any
                        })}
                      >
                        <div className="font-medium text-text">{voice.name}</div>
                        <div className="text-xs text-text/60">{voice.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Settings */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Voice Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text">
                    Enable Voice Input/Output
                  </label>
                  <button
                    onClick={() => setLocalVoiceSettings({
                      ...localVoiceSettings,
                      enabled: !localVoiceSettings.enabled
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localVoiceSettings.enabled ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localVoiceSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Language
                  </label>
                  <select
                    value={localVoiceSettings.language}
                    onChange={(e) => setLocalVoiceSettings({
                      ...localVoiceSettings,
                      language: e.target.value
                    })}
                    className="input-field w-full"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="it-IT">Italian</option>
                    <option value="ja-JP">Japanese</option>
                    <option value="ko-KR">Korean</option>
                    <option value="zh-CN">Chinese (Simplified)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Browser Voice (for fallback)
                  </label>
                  <select
                    value={localVoiceSettings.voice?.name || ''}
                    onChange={(e) => {
                      const selectedVoice = availableVoices.find(v => v.name === e.target.value);
                      setLocalVoiceSettings({
                        ...localVoiceSettings,
                        voice: selectedVoice || null
                      });
                    }}
                    className="input-field w-full"
                  >
                    <option value="">Default</option>
                    {availableVoices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-600">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-text hover:text-text/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;