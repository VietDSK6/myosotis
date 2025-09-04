import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { ProtectedRoute } from '../features/auth';
import { getMMSEHistory, getMMSEDetailedHistory, type MMSEHistoryItem, type MMSEDetailedHistoryItem } from '../api/mmse';
import { LoadingSpinner } from '../components';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

const SEVERITY_BANDS = [
  { min: 24, max: 27, label: 'No cognitive impairment', color: '#10b981', bgColor: '#dcfce7' },
  { min: 20, max: 23, label: 'Mild cognitive impairment', color: '#f59e0b', bgColor: '#fef3c7' },
  { min: 14, max: 19, label: 'Moderate cognitive impairment', color: '#f97316', bgColor: '#fed7aa' },
  { min: 0, max: 13, label: 'Severe cognitive impairment', color: '#ef4444', bgColor: '#fecaca' }
];

interface TooltipPayload {
  payload: MMSEHistoryItem & {
    testNumber: number;
    formattedDate: string;
    shortDate: string;
  };
}

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const severityBand = SEVERITY_BANDS.find(band => 
      data.total_score >= band.min && data.total_score <= band.max
    );
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">Test #{data.assessment_id}</p>
        <p className="text-sm text-gray-600 mb-1">Date: {data.formattedDate}</p>
        <p className="text-sm text-gray-600 mb-1">Score: {data.total_score}/{data.max_score}</p>
        <p className="text-sm text-gray-600 mb-1">Percentage: {data.percentage.toFixed(1)}%</p>
        {severityBand && (
          <p className="text-sm font-medium" style={{ color: severityBand.color }}>
            {severityBand.label}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function MMSEHistoryPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<MMSEHistoryItem[]>([]);
  const [detailedHistory, setDetailedHistory] = useState<MMSEDetailedHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTests, setSelectedTests] = useState<{ test1: number; test2: number }>({ test1: 0, test2: 1 });
  const [activeTab, setActiveTab] = useState<'line' | 'radar'>('line');

  const fetchHistory = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const [historyResponse, detailedResponse] = await Promise.all([
        getMMSEHistory(user.id),
        getMMSEDetailedHistory(user.id)
      ]);
      setHistory(historyResponse.data || []);
      setDetailedHistory(detailedResponse.data || []);
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

  const chartData = history
    .sort((a, b) => new Date(a.test_date).getTime() - new Date(b.test_date).getTime())
    .map((item, index) => ({
      ...item,
      testNumber: index + 1,
      formattedDate: new Date(item.test_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      shortDate: new Date(item.test_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }));

  const processRadarData = () => {
    if (detailedHistory.length < 2) return { radarData: [], availableTests: [] };

    const sortedDetailed = detailedHistory
      .sort((a, b) => new Date(a.test_date).getTime() - new Date(b.test_date).getTime());

    const test1 = sortedDetailed[selectedTests.test1];
    const test2 = sortedDetailed[selectedTests.test2];

    if (!test1 || !test2) return { radarData: [], availableTests: sortedDetailed };

    const getSectionPercentages = (test: MMSEDetailedHistoryItem) => {
      const sectionStats: Record<string, { earned: number; total: number }> = {};
      
      test.question_details.forEach(q => {
        if (!sectionStats[q.section_name]) {
          sectionStats[q.section_name] = { earned: 0, total: 0 };
        }
        sectionStats[q.section_name].earned += q.points_earned;
        sectionStats[q.section_name].total += q.max_points;
      });

      return Object.entries(sectionStats).map(([name, stats]) => ({
        section: name,
        percentage: (stats.earned / stats.total) * 100
      }));
    };

    const test1Sections = getSectionPercentages(test1);
    const test2Sections = getSectionPercentages(test2);

    const allSections = [...new Set([
      ...test1Sections.map(s => s.section),
      ...test2Sections.map(s => s.section)
    ])];

    const radarData = allSections.map(section => {
      const test1Data = test1Sections.find(s => s.section === section) || { percentage: 0 };
      const test2Data = test2Sections.find(s => s.section === section) || { percentage: 0 };
      
      return {
        section: section.length > 20 ? section.substring(0, 20) + '...' : section,
        fullSection: section,
        test1: test1Data.percentage,
        test2: test2Data.percentage
      };
    });

    return { radarData, availableTests: sortedDetailed };
  };

  const { radarData, availableTests } = processRadarData();

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MMSE Score Progression</h1>
          <p className="text-gray-600">Track your cognitive assessment scores over time</p>
        </div>

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
            {/* Chart Section with Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Assessment Analytics</h2>
                <p className="text-gray-600 text-sm">View your cognitive assessment data through different visualizations</p>
              </div>

              {/* Tab Navigation */}
              <div className="mb-6">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('line')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'line'
                          ? 'border-cyan-500 text-cyan-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Score Trend
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('radar')}
                      disabled={detailedHistory.length < 2}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'radar' && detailedHistory.length >= 2
                          ? 'border-cyan-500 text-cyan-600'
                          : detailedHistory.length < 2
                          ? 'border-transparent text-gray-300 cursor-not-allowed'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Domain Comparison
                        {detailedHistory.length < 2 && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                            Need 2+ tests
                          </span>
                        )}
                      </div>
                    </button>
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'line' && (
                <>
                  {/* Severity Legend */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-4 text-sm">
                      {SEVERITY_BANDS.map((band) => (
                        <div key={band.label} className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: band.color }}
                          ></div>
                          <span className="text-gray-700">
                            {band.label} ({band.min}-{band.max === 27 ? '27' : band.max})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        
                        <ReferenceLine y={24} stroke="#10b981" strokeDasharray="5 5" strokeOpacity={0.7} />
                        <ReferenceLine y={20} stroke="#f59e0b" strokeDasharray="5 5" strokeOpacity={0.7} />
                        <ReferenceLine y={14} stroke="#f97316" strokeDasharray="5 5" strokeOpacity={0.7} />
                        
                        <XAxis 
                          dataKey="shortDate"
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          interval={0}
                        />
                        <YAxis 
                          domain={[0, 27]}
                          tick={{ fontSize: 12 }}
                          label={{ value: 'MMSE Score', angle: -90, position: 'insideLeft' }}
                        />
                        
                        <Tooltip content={<CustomTooltip />} />
                        
                        <Line 
                          type="monotone" 
                          dataKey="total_score" 
                          stroke="#0891b2"
                          strokeWidth={3}
                          dot={{ fill: '#0891b2', strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: '#0891b2', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>• Higher scores indicate better cognitive function</p>
                    <p>• Dotted lines represent severity thresholds for cognitive impairment</p>
                  </div>
                </>
              )}

              {activeTab === 'radar' && detailedHistory.length >= 2 && (
                <>
                  {/* Test Selection */}
                  <div className="mb-6 flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-48">
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Test</label>
                      <select 
                        value={selectedTests.test1}
                        onChange={(e) => setSelectedTests(prev => ({ ...prev, test1: parseInt(e.target.value) }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        {availableTests.map((test, index) => (
                          <option key={test.assessment_id} value={index}>
                            Test #{test.assessment_id} - {new Date(test.test_date).toLocaleDateString()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 min-w-48">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Second Test</label>
                      <select 
                        value={selectedTests.test2}
                        onChange={(e) => setSelectedTests(prev => ({ ...prev, test2: parseInt(e.target.value) }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        {availableTests.map((test, index) => (
                          <option key={test.assessment_id} value={index}>
                            Test #{test.assessment_id} - {new Date(test.test_date).toLocaleDateString()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                        <PolarGrid />
                        <PolarAngleAxis 
                          dataKey="section" 
                          tick={{ fontSize: 12 }}
                          className="text-xs"
                        />
                        <PolarRadiusAxis 
                          domain={[0, 100]} 
                          tick={{ fontSize: 10 }}
                          tickCount={6}
                        />
                        <Radar
                          name={`Test #${availableTests[selectedTests.test1]?.assessment_id || ''}`}
                          dataKey="test1"
                          stroke="#0891b2"
                          fill="#0891b2"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Radar
                          name={`Test #${availableTests[selectedTests.test2]?.assessment_id || ''}`}
                          dataKey="test2"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Legend />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                  <p className="font-semibold text-gray-900 mb-2">{data.fullSection}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value?.toFixed(1)}%
                                    </p>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>• Each axis represents a cognitive domain from the MMSE test</p>
                    <p>• Percentages show correct answers within each domain</p>
                    <p>• Compare the two colored areas to see which domains improved or declined</p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Test Details</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {chartData.slice(-5).reverse().map((test) => {
                      const severityBand = SEVERITY_BANDS.find(band => 
                        test.total_score >= band.min && test.total_score <= band.max
                      );
                      return (
                        <tr key={test.assessment_id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Test #{test.assessment_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {test.formattedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {test.total_score}/{test.max_score}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({test.percentage.toFixed(1)}%)
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {severityBand && (
                              <span 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                style={{ 
                                  backgroundColor: severityBand.bgColor,
                                  color: severityBand.color 
                                }}
                              >
                                {severityBand.label}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
