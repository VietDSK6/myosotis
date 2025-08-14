import { useState } from 'react';
import { useAICloneStore } from '../store';
import { useAuthStore } from '../../auth/store';
import { createVideoWithFullText, createVideoFromTopic, getVideoUrl } from '../api';

export default function Step3Preview() {
  const { user } = useAuthStore();
  const {
    characterPhoto,
    characterPhotoPreview,
    referenceAudio,
    referenceText,
    scriptMode,
    manualScript,
    topic,
    keywords,
    description,
    finalScript,
    generatedVideoUrl,
    isGenerating,
    updateData,
    prevStep,
    reset,
  } = useAICloneStore();

  const [error, setError] = useState<string>('');
  const [currentScript, setCurrentScript] = useState<string>(
    finalScript || (scriptMode === 'manual' ? manualScript || '' : '')
  );

  const generateVideo = async () => {
    if (!characterPhoto || !referenceAudio || !referenceText) {
      setError('Missing required character data. Please go back and complete all steps.');
      return;
    }

    if (!user?.id) {
      setError('User not authenticated. Please log in again.');
      return;
    }

    setError('');
    updateData({ isGenerating: true });

    try {
      let response;
      
      if (scriptMode === 'manual') {
        response = await createVideoWithFullText({
          user_id: user.id,
          image: characterPhoto,
          reference_audio: referenceAudio,
          reference_text: referenceText,
          target_text: currentScript,
          language: 'english',
        });
      } else {
        response = await createVideoFromTopic({
          user_id: user.id,
          image: characterPhoto,
          reference_audio: referenceAudio,
          reference_text: referenceText,
          topic: topic || '',
          keywords,
          description,
          language: 'english',
        });
        
        // If AI generated text, update the current script
        if (response.generated_target_text) {
          setCurrentScript(response.generated_target_text);
          updateData({ finalScript: response.generated_target_text });
        }
      }

      if (response.success && response.video_url) {
        updateData({
          generatedVideoUrl: getVideoUrl(response.video_url),
          finalScript: currentScript,
        });
      } else {
        setError(response.error || 'Failed to generate video. Please try again.');
      }
    } catch (err) {
      console.error('Video generation error:', err);
      setError('An error occurred while generating the video. Please try again.');
    } finally {
      updateData({ isGenerating: false });
    }
  };

  const saveMemory = () => {
    // TODO: Implement save to user's memory collection
    alert('Memory saved successfully!');
    reset();
  };

  const handleScriptEdit = (text: string) => {
    setCurrentScript(text);
    updateData({ finalScript: text });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Preview Your Living Memory</h2>
        <p className="text-lg text-gray-600">Review and finalize your AI character</p>
      </div>

      {/* Preview Area */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Preview */}
          <div className="lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Preview</h3>
            
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              {generatedVideoUrl ? (
                <video
                  src={generatedVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={characterPhotoPreview}
                >
                  Your browser does not support the video tag.
                </video>
              ) : isGenerating ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-lg font-medium">AI is generating your video...</p>
                    <p className="text-sm text-gray-300 mt-2">This may take a few minutes</p>
                  </div>
                </div>
              ) : characterPhotoPreview ? (
                <div className="relative h-full">
                  <img
                    src={characterPhotoPreview}
                    alt="Character"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <button
                      onClick={generateVideo}
                      disabled={isGenerating}
                      className="w-20 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>No character image available</p>
                </div>
              )}
            </div>

            {/* Character Info */}
            {characterPhoto && (
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Image:</strong> {characterPhoto.name}</p>
                {referenceAudio && (
                  <p><strong>Voice:</strong> {referenceAudio.name}</p>
                )}
              </div>
            )}
          </div>

          {/* Script Editor */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Script</h3>
              {scriptMode === 'ai-generated' && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  AI Generated
                </span>
              )}
            </div>
            
            <textarea
              value={currentScript}
              onChange={(e) => handleScriptEdit(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Your script will appear here..."
            />
            
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>You can edit the script before generating</span>
              <span>{currentScript.length} characters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Edit Script
        </button>

        <div className="space-x-4">
          {!generatedVideoUrl && !isGenerating && (
            <button
              onClick={generateVideo}
              disabled={!currentScript.trim() || isGenerating}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                currentScript.trim() && !isGenerating
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Generate Video
            </button>
          )}

          {generatedVideoUrl && (
            <button
              onClick={saveMemory}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Memory
            </button>
          )}
        </div>
      </div>

      {/* Progress Info */}
      {isGenerating && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                Generating your AI character video. This process may take several minutes depending on the script length.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
