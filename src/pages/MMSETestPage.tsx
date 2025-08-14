import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { ProtectedRoute } from '../features/auth';
import { getMMSEInfo, submitMMSETest, type MMSETestData, type MMSEAnswer, type MMSETestResult } from '../api/mmse';
import { PageHeader } from '../components/layout';


const getMediaUrl = (url: string): string => {
  if (url.startsWith('http')) {
    return url; 
  }
  const baseUrl = import.meta.env.VITE_API_URL
  return `${baseUrl}${url}`;
};

export default function MMSETestPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [testData, setTestData] = useState<MMSETestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MMSEAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [testResult, setTestResult] = useState<MMSETestResult | null>(null);

  useEffect(() => {
    fetchTestData();
  }, []);

  
  useEffect(() => {
    const existingAnswer = answers.find(
      a => a.section_index === currentSectionIndex && a.question_index === currentQuestionIndex
    );
    
    if (existingAnswer) {
      const question = getCurrentQuestion();
      if (question?.type === 'multi-select') {
        
        if (Array.isArray(existingAnswer.answer)) {
          setSelectedOptions(existingAnswer.answer);
        } else {
          
          setSelectedOptions(existingAnswer.answer.split(',').filter(v => v.length > 0));
        }
        setCurrentAnswer('');
      } else {
        
        setCurrentAnswer(Array.isArray(existingAnswer.answer) ? existingAnswer.answer[0] || '' : existingAnswer.answer);
        setSelectedOptions([]);
      }
    } else {
      setCurrentAnswer('');
      setSelectedOptions([]);
    }
  }, [currentSectionIndex, currentQuestionIndex, answers, testData]);

  const fetchTestData = async () => {
    try {
      setIsLoading(true);
      const response = await getMMSEInfo();
      setTestData(response.data);
    } catch (error) {
      console.error('Failed to fetch MMSE test data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentQuestion = () => {
    if (!testData) return null;
    return testData.sections[currentSectionIndex]?.questions[currentQuestionIndex];
  };

  const getCurrentSection = () => {
    if (!testData) return null;
    return testData.sections[currentSectionIndex];
  };

  const getTotalQuestions = () => {
    if (!testData) return 0;
    return testData.sections.reduce((total, section) => total + section.questions.length, 0);
  };

  const getCurrentQuestionNumber = () => {
    if (!testData) return 0;
    let count = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      count += testData.sections[i].questions.length;
    }
    return count + currentQuestionIndex + 1;
  };

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
    setSelectedOptions([value]);
  };

  const handleMultiSelectChange = (value: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const saveCurrentAnswer = () => {
    const question = getCurrentQuestion();
    if (!question) return;

    const answerValue = question.type === 'multi-select' 
      ? selectedOptions 
      : currentAnswer;   

    const newAnswer: MMSEAnswer = {
      section_index: currentSectionIndex,
      question_index: currentQuestionIndex,
      answer: answerValue
    };

    setAnswers(prev => {
      const filtered = prev.filter(
        a => !(a.section_index === currentSectionIndex && a.question_index === currentQuestionIndex)
      );
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    saveCurrentAnswer();
    
    if (!testData) return;

    const currentSection = testData.sections[currentSectionIndex];
    
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < testData.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleSubmitTest();
      return;
    }

    
    setCurrentAnswer('');
    setSelectedOptions([]);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = testData?.sections[currentSectionIndex - 1];
      if (prevSection) {
        setCurrentQuestionIndex(prevSection.questions.length - 1);
      }
    }
    
    
    setCurrentAnswer('');
    setSelectedOptions([]);
  };

  const handleSubmitTest = async () => {
    if (!user?.id) return;

    try {
      setIsSubmitting(true);
      
      
      saveCurrentAnswer(); 

      
      setTimeout(async () => {
        try {
          const finalAnswers = [...answers];
          
          
          const currentQuestion = getCurrentQuestion();
          if (currentQuestion) {
            const answerValue = currentQuestion.type === 'multi-select' 
              ? selectedOptions 
              : currentAnswer;   

            const currentAnswerExists = finalAnswers.some(
              a => a.section_index === currentSectionIndex && a.question_index === currentQuestionIndex
            );

            if (!currentAnswerExists && ((typeof answerValue === 'string' && answerValue.trim()) || (Array.isArray(answerValue) && answerValue.length > 0))) {
              finalAnswers.push({
                section_index: currentSectionIndex,
                question_index: currentQuestionIndex,
                answer: answerValue
              });
            }
          }

          const payload = {
            user_id: user.id,
            answers: finalAnswers
          };

          console.log('Submitting MMSE test with payload:', payload);
          const result = await submitMMSETest(payload);
          setTestResult(result.data);
          setTestComplete(true);
        } catch (error) {
          console.error('Failed to submit test:', error);
          setIsSubmitting(false);
        }
      }, 100);
      
    } catch (error) {
      console.error('Failed to submit test:', error);
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const question = getCurrentQuestion();
    if (!question) return null;

    const commonInputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg";

    switch (question.type) {
      case 'select':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="answer"
                  value={option.value}
                  checked={currentAnswer === option.value}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-5 h-5 text-cyan-600"
                />
                <span className="text-lg">{option.label}</span>
                {option.media && (
                  <img src={getMediaUrl(option.media.url)} alt={option.media.description} className="w-16 h-16 object-cover rounded" />
                )}
              </label>
            ))}
          </div>
        );

      case 'multi-select':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={(e) => handleMultiSelectChange(e.target.value)}
                  className="w-5 h-5 text-cyan-600"
                />
                <span className="text-lg">{option.label}</span>
                {option.media && (
                  <img src={getMediaUrl(option.media.url)} alt={option.media.description} className="w-16 h-16 object-cover rounded" />
                )}
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={question.placeholder || ''}
            className={commonInputClass}
          />
        );

      case 'text':
        return (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={question.placeholder || ''}
            className={commonInputClass}
          />
        );

      default:
        return null;
    }
  };

  const isAnswerValid = () => {
    const question = getCurrentQuestion();
    if (!question) return false;

    if (question.type === 'multi-select') {
      return selectedOptions.length > 0;
    }
    return currentAnswer.trim() !== '';
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading MMSE Test...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (testComplete && testResult) {
    const { data: result } = testResult;
    const scorePercentage = Math.round(result.percentage);
    const completedDate = new Date(result.completed_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const getScoreColor = (percentage: number) => {
      if (percentage >= 89) return 'text-green-600 bg-green-100';
      if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    const scoreColorClass = getScoreColor(scorePercentage);

    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-cyan-50">
          <PageHeader 
            title="MMSE Test Results"
            showBackButton={true}
            backTo="/dashboard"
          />

          <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Test Completed Successfully!</h2>
                    <p className="text-cyan-100">Completed on {completedDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{result.total_score}/{result.max_score}</div>
                    <div className="text-cyan-100">Total Score</div>
                  </div>
                </div>
              </div>


              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${scoreColorClass} mb-4`}>
                      <span className="text-2xl font-bold">{scorePercentage}%</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Score Percentage</h3>
                    <p className="text-gray-600">Your performance on this assessment</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 text-blue-800 px-6 py-4 rounded-lg mb-4">
                      <div className="text-xl font-semibold">{result.interpretation.level}</div>
                      <div className="text-sm text-blue-600 mt-1">Score Range: {result.interpretation.score_range}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Result</h3>
                    <p className="text-gray-600">Based on your responses</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Test Details</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Assessment ID</div>
                      <div className="font-semibold text-gray-900">#{result.assessment_id}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Questions Answered</div>
                      <div className="font-semibold text-gray-900">{getTotalQuestions()} questions</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Maximum Possible Score</div>
                      <div className="font-semibold text-gray-900">{result.max_score} points</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Data Status</div>
                      <div className="font-semibold text-green-600">
                        {result.saved_to_database ? 'Successfully Saved' : 'Not Saved'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate('/mmse-history')}
                      className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Test History
                    </button>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Return to Dashboard
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Take Test Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (!testData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600">Failed to load test data</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const question = getCurrentQuestion();
  const section = getCurrentSection();
  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion = currentSectionIndex === testData.sections.length - 1 && 
                         currentQuestionIndex === testData.sections[currentSectionIndex].questions.length - 1;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cyan-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <img 
                    src="/favicon-32x32.png" 
                    alt="Myosotis Logo" 
                    className="w-8 h-8"
                  />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">MMSE Test</h1>
              </div>
              <div className="text-sm text-gray-600">
                Question {getCurrentQuestionNumber()} of {getTotalQuestions()}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((getCurrentQuestionNumber() / getTotalQuestions()) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getCurrentQuestionNumber() / getTotalQuestions()) * 100}%` }}
              ></div>
            </div>
          </div>

          {section && (
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
              {section.instruction && (
                <p className="text-cyan-600 mt-2 font-medium">{section.instruction}</p>
              )}
              
              {section.media && section.media.length > 0 && (
                <div className="mt-4">
                  {section.media.map((media, index: number) => (
                    <div key={index} className="mb-4">
                      {media.type === 'audio' && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{media.description}</p>
                          <audio controls className="w-full">
                            <source src={getMediaUrl(media.url)} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                      {media.type === 'image' && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{media.description}</p>
                          <img 
                            src={getMediaUrl(media.url)} 
                            alt={media.description}
                            className="max-w-md mx-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {question && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {question.media && question.media.length > 0 && (
                <div className="mb-6">
                  {question.media.map((media, index) => (
                    <div key={index} className="mb-4">
                      {media.type === 'audio' && (
                        <audio controls className="w-full">
                          <source src={getMediaUrl(media.url)} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      {media.type === 'image' && (
                        <img 
                          src={getMediaUrl(media.url)} 
                          alt={media.description}
                          className="max-w-md mx-auto rounded-lg shadow-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.text}</h3>

              {renderQuestion()}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isFirstQuestion
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswerValid() || isSubmitting}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                !isAnswerValid() || isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-cyan-600 text-white hover:bg-cyan-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit Test' : 'Next'}
            </button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
