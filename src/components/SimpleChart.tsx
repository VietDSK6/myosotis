import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getMMSEHistory } from '../api/mmse';
import { useAuthStore } from '../features/auth/store';

interface SimpleChartProps {
  onNavigateToChart: () => void;
}

interface ChartDataPoint {
  name: string;
  score: number;
  date: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({ onNavigateToChart }) => {
  const { user } = useAuthStore();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestScore, setLatestScore] = useState<{ score: number; maxScore: number } | null>(null);

  useEffect(() => {
    const fetchMMSEHistory = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getMMSEHistory(user.id);
        const history = response.data || [];
        
        if (history.length > 0) {
          
          const sortedHistory = history
            .sort((a, b) => new Date(a.test_date).getTime() - new Date(b.test_date).getTime())
            .slice(-4);

          const processedData = sortedHistory.map((item, index) => ({
            name: `Test ${index + 1}`,
            score: item.total_score,
            date: new Date(item.test_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })
          }));

          setChartData(processedData);
          
          
          const latestTest = sortedHistory[sortedHistory.length - 1];
          setLatestScore({
            score: latestTest.total_score,
            maxScore: latestTest.max_score
          });
        }
      } catch (error) {
        console.error('Failed to fetch MMSE history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMMSEHistory();
  }, [user?.id]);

  
  const getTrend = () => {
    if (chartData.length < 2) return null;
    const latest = chartData[chartData.length - 1].score;
    const previous = chartData[chartData.length - 2].score;
    if (latest > previous) return { text: 'Improving', icon: '↗', color: 'text-green-600' };
    if (latest < previous) return { text: 'Declining', icon: '↘', color: 'text-red-600' };
    return { text: 'Stable', icon: '→', color: 'text-blue-600' };
  };

  const trend = getTrend();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Progress</h3>
          <p className="text-sm text-gray-600">Your latest cognitive assessment trends</p>
        </div>
        <button
          onClick={onNavigateToChart}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          View Full Chart
        </button>
      </div>
      
      {isLoading ? (
        <div className="h-32 w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-32 w-full flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-500 text-sm">No test data available</p>
            <p className="text-gray-400 text-xs mt-1">Take your first MMSE test to see progress</p>
          </div>
        </div>
      ) : (
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#0891b2" 
                strokeWidth={2}
                dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between text-sm">
        {latestScore ? (
          <>
            <span className="text-gray-600">
              Latest Score: <span className="font-semibold text-gray-900">{latestScore.score}/{latestScore.maxScore}</span>
            </span>
            {trend && (
              <span className={`font-medium ${trend.color}`}>
                {trend.icon} {trend.text}
              </span>
            )}
          </>
        ) : (
          <span className="text-gray-500">No test data available</span>
        )}
      </div>
    </div>
  );
};
