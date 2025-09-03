import { useNavigate } from 'react-router-dom';
import { DashboardDiscoverPanel } from '../../components/DashboardDiscoverPanel';
import DashboardHeader from '../../components/DashboardHeader';

export default function DashboardDiscoverPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Living Memories",
      description: "Create AI avatars with your loved one's voice",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => navigate('/dashboard/ai-clone'),
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      title: "Memory Test (MMSE)",
      description: "Take cognitive assessment tests",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      onClick: () => navigate('/dashboard/mmse-test'),
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Memory Films",
      description: "View your photos and memories",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
        </svg>
      ),
      onClick: () => navigate('/dashboard/memory-film'),
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-700"
    },
    {
      title: "Score Analysis",
      description: "View your MMSE test results and track your progress",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
          <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
          <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
        </svg>
      ),
      onClick: () => navigate('/dashboard/mmse-history'),
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Care Companion",
      description: "Chat with your AI companion",
      icon: <img src="/chat.png" alt="Care Companion" className="h-8 w-8" />,
      onClick: () => navigate('/dashboard/chatbot'),
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-700"
    }
  ];

  return (
    <div className="lg:col-span-10">
      <DashboardHeader 
        title="Discover" 
        description="Explore all available features and tools"
      />
      <DashboardDiscoverPanel features={features} />
    </div>
  );
}
