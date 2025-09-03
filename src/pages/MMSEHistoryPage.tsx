import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { ProtectedRoute } from '../features/auth';
import { getMMSEHistory, type MMSEHistoryItem } from '../api/mmse';
import { LoadingSpinner } from '../components';

export default function MMSEHistoryPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<MMSEHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
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
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchHistory();
    }
  }, [user?.id, fetchHistory]);

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
          <LoadingSpinner text="Loading test history..." />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-5xl mx-auto">

        {history.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Test History</h2>
              <p className="text-gray-600 mb-6">Take your first MMSE test to start tracking your cognitive health</p>
              <button
                onClick={() => navigate('/mmse-test')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Take Your First Test
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-3xl font-bold text-cyan-600 mb-2">{history.length}</div>
                <div className="text-gray-600">Total Tests</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(history.reduce((sum, test) => sum + test.total_score, 0) / history.length)}
                </div>
                <div className="text-gray-600">Average Score</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatDate(history[0].test_date).split(',')[0]}
                </div>
                <div className="text-gray-600">Latest Test</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Test History</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {history.map((test) => {
                  const badge = getInterpretationBadge(test.interpretation.level);
                  return (
                    <div key={test.assessment_id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-lg font-semibold text-gray-900 mb-1">
                            Test #{test.assessment_id}
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatDate(test.test_date)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getScoreColor(test.total_score).split(' ')[0]}`}>
                            {test.total_score}/{test.max_score}
                          </div>
                          <div className="text-sm text-gray-600">
                            {test.percentage.toFixed(1)}% Score
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                          {badge.text}
                        </span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(test.total_score)}`}
                          style={{ width: `${test.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
