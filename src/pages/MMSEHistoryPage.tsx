import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { ProtectedRoute } from '../features/auth';
import { getMMSEHistory, type MMSEHistoryItem } from '../api/mmse';

export default function MMSEHistoryPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<MMSEHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchHistory();
    }
  }, [user?.id]);

  const fetchHistory = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const response = await getMMSEHistory(user.id);
      setHistory(response.data || []);
    } catch (error) {
      console.error('Failed to fetch MMSE history:', error);
    } finally {
      setIsLoading(false);  
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    
    if (score >= 24) return 'text-green-600 bg-green-50'; 
    if (score >= 20) return 'text-yellow-600 bg-yellow-50'; 
    if (score >= 14) return 'text-orange-600 bg-orange-50'; 
    return 'text-red-600 bg-red-50'; 
  };

  const getProgressBarColor = (score: number) => {
    
    if (score >= 24) return 'bg-green-500'; 
    if (score >= 20) return 'bg-yellow-500'; 
    if (score >= 14) return 'bg-orange-500'; 
    return 'bg-red-500'; 
  };

  const getInterpretationBadge = (interpretationLevel: string) => {
    
    const levelColorMap: { [key: string]: string } = {
      'No cognitive impairment': 'bg-green-100 text-green-800',
      'Mild cognitive impairment': 'bg-yellow-100 text-yellow-800',
      'Moderate cognitive impairment': 'bg-orange-100 text-orange-800',
      'Severe cognitive impairment': 'bg-red-100 text-red-800',
    };
    
    return {
      text: interpretationLevel,
      color: levelColorMap[interpretationLevel] || 'bg-gray-100 text-gray-800'
    };
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading test history...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cyan-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-xl font-semibold text-gray-900">MMSE Test History</h1>
              </div>
              <button
                onClick={() => navigate('/mmse-test')}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
              >
                Take New Test
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 lg:px-8">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Test History</h2>
              <p className="text-gray-600 mb-6">You haven't taken any MMSE tests yet.</p>
              <button
                onClick={() => navigate('/mmse-test')}
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
              >
                Take Your First Test
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Test Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">{history.length}</div>
                    <div className="text-sm text-gray-600">Tests Taken</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {history.length > 0 ? Math.round(history.reduce((sum, test) => sum + test.total_score, 0) / history.length) : 0}
                    </div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {history.length > 0 ? formatDate(history[0].test_date).split(',')[0] : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Latest Test</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {history.map((test) => {
                  const badge = getInterpretationBadge(test.interpretation.level);
                  return (
                    <div key={test.assessment_id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            MMSE Test #{test.assessment_id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(test.test_date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(test.total_score).split(' ')[0]}`}>
                            {test.total_score}/{test.max_score}
                          </div>
                          <div className="text-sm text-gray-600">
                            {test.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                            {badge.text}
                          </span>
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                        
                        {/* <div className="text-sm text-gray-600">
                          {test.interpretation.level}
                        </div> */}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Score Progress</span>
                          <span>{test.total_score} / {test.max_score} points</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(test.total_score)}`}
                            style={{ width: `${test.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
