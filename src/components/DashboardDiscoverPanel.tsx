import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  bgColor: string;
  textColor: string;
  integratedFeature?: React.ReactNode;
}

interface DashboardDiscoverPanelProps {
  features: Feature[];
}

export const DashboardDiscoverPanel: React.FC<DashboardDiscoverPanelProps> = ({ features }) => {
  const [activeFeature, setActiveFeature] = React.useState<string | null>(null);

  const handleFeatureClick = (feature: Feature) => {
    if (feature.integratedFeature) {
      setActiveFeature(activeFeature === feature.title ? null : feature.title);
    } else {
      feature.onClick();
    }
  };

  const handleBack = () => {
    setActiveFeature(null);
  };

  
  if (activeFeature) {
    const feature = features.find(f => f.title === activeFeature);
    if (feature?.integratedFeature) {
      return (
        <div className="p-4 lg:p-6 mb-4 lg:mb-6">
          <div className="mb-6 flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Back to features"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-1">{feature.title}</h3>
              <p className="text-[#888888]">{feature.description}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {feature.integratedFeature}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="p-4 lg:p-6 mb-4 lg:mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[#333333] mb-2">Your Health Tools</h3>
        <p className="text-[#888888]">Access all features and tools to support your mental health journey</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleFeatureClick(feature)}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`h-12 w-12 rounded-xl ${feature.bgColor} ${feature.textColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-lg text-gray-600 mb-4">{feature.description}</p>
            <div className="flex items-center text-cyan-600 font-medium group-hover:text-cyan-700">
              <span>Open</span>
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
