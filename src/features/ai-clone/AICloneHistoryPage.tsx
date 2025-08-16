import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute, useAuthStore } from '../auth';
import { PageHeader, LoadingSpinner, EmptyState } from '../../components';
import { getUserVideos, getVideoUrl } from './api';
import type { AICloneVideo } from './types';

export default function AICloneHistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [videos, setVideos] = useState<AICloneVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await getUserVideos(user.id);
        if (response.success) {
          
          const successfulVideos = response.videos.filter(video => video.status !== 'failed');
          setVideos(successfulVideos);
        } else {
          setError('Failed to load video history');
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load video history');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Living Memories History"
          showBackButton={true}
          backTo="/ai-clone"
          rightActions={
            <button
              onClick={() => navigate('/ai-clone')}
              className="flex items-center gap-2 px-4 py-2 bg-[#92d7e7] hover:bg-[#7bc7d9] text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New
            </button>
          }
        />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">{error}</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : videos.length === 0 ? (
            <EmptyState
              title="No Living Memories Yet"
              description="You haven't created any AI clone videos yet. Start by creating your first living memory!"
              actionText="Create Living Memory"
              onAction={() => navigate('/ai-clone')}
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Your Living Memories ({videos.length})
                </h1>
                <button
                  onClick={() => navigate('/ai-clone')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create New
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                          {getStatusText(video.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(video.created_at)}
                        </span>
                      </div>

                      {video.status === 'completed' && (video.video_filename || video.video_url) && (
                        <div className="mb-6">
                          <video 
                            className="w-full h-64 object-cover rounded-lg bg-gray-100"
                            controls
                            src={video.video_filename ? getVideoUrl(video.video_filename) : getVideoUrl(video.video_url!)}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}

                      {video.status === 'processing' && (
                        <div className="mb-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <LoadingSpinner size="sm" />
                            <p className="text-sm text-gray-600 mt-2">Processing video...</p>
                          </div>
                        </div>
                      )}

                      {video.status === 'failed' && (
                        <div className="mb-6 h-64 bg-red-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <svg className="w-8 h-8 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-600">Video generation failed</p>
                            {video.error_message && (
                              <p className="text-xs text-red-500 mt-1">{video.error_message}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        {video.topic && (
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Topic</h3>
                            <p className="text-sm text-gray-600">{video.topic}</p>
                          </div>
                        )}

                        {video.keywords && (
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Keywords</h3>
                            <p className="text-sm text-gray-600">{video.keywords}</p>
                          </div>
                        )}
                      </div>

                      {video.status === 'completed' && (video.video_filename || video.video_url) && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <a
                            href={video.video_filename ? getVideoUrl(video.video_filename) : getVideoUrl(video.video_url!)}
                            download={video.video_filename || `living-memory-${video.id}.mp4`}
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Video
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}