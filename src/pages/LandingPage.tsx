import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function LandingPage() {
  const { t, i18n } = useTranslation(['landing', 'common']);
  
  const currentLanguage = i18n.language || 'en';
  const getFeatureImagePath = (imageName: string) => {
    return `/feat-${currentLanguage}/${imageName}`;
  };
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white antialiased text-base sm:text-lg">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                <img 
                  src="/favicon-32x32.png" 
                  alt="Myosotis Logo" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900">
                {t('common:common.myosotis')}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <LanguageSwitcher />
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 sm:px-6 py-2 text-sm sm:text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                {t('common:buttons.signIn')}
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-4 py-2 text-sm sm:text-lg font-medium text-white bg-[#92d7e7] hover:bg-[#7bc9db] rounded-xl transition-all shadow-sm"
              >
                {t('common:buttons.getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                {t('landing:hero.title').split('<highlight>').map((part, index) => {
                  if (index === 0) return part;
                  const [highlighted, rest] = part.split('</highlight>');
                  return (
                    <span key={index}>
                      <span className="text-[#92d7e7]">{highlighted}</span>
                      {rest}
                    </span>
                  );
                })}
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                {t('landing:hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToFeatures}
                  className="px-6 py-3 text-base sm:text-lg font-semibold text-white bg-[#92d7e7] hover:bg-[#7bc9db] rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t('landing:hero.cta')}
                </button>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="rounded-2xl shadow-2xl">
                <img 
                  src="/holding-hand.jpg" 
                  alt="Caring hands holding together - representing family connection and support"
                  className="w-full h-64 sm:h-80 lg:h-[28rem] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('landing:overview.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {t('landing:overview.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('landing:overview.forPatients.title')}</h3>
              <p className="text-gray-600">
                {t('landing:overview.forPatients.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('landing:overview.forFamilies.title')}</h3>
              <p className="text-gray-600">
                {t('landing:overview.forFamilies.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('landing:overview.forCaregivers.title')}</h3>
              <p className="text-gray-600">
                {t('landing:overview.forCaregivers.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('landing:features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing:features.subtitle')}
            </p>
          </div>

          <div id="ai-memories" className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">{t('landing:features.aiMemories.label')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('landing:features.aiMemories.title')}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('landing:features.aiMemories.description')}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.aiMemories.features.voiceSynthesis')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.aiMemories.features.lipSync')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.aiMemories.features.customContent')}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center order-1 lg:order-2">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-fit">
                  <div className="bg-gray-700 rounded-xl overflow-hidden aspect-square w-full" style={{maxWidth: '512px'}}>
                    <video 
                      className="w-full h-full object-cover rounded-xl"
                      controls
                      preload="metadata"
                    >
                      <source src="/demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag. Please use a modern browser to view the AI Avatar demonstration.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="ai-companion" className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gray-900 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#92d7e7] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm sm:text-base">Myosotis Care Assistant</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Always here to help</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-[#92d7e7] text-white p-3 rounded-lg max-w-xs text-sm sm:text-base">
                        {t('landing:features.aiCompanion.chatExample.greeting')}
                      </div>
                      <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs ml-auto text-sm sm:text-base">
                        {t('landing:features.aiCompanion.chatExample.userResponse')}
                      </div>
                      <div className="bg-[#92d7e7] text-white p-3 rounded-lg max-w-xs text-sm sm:text-base">
                        {t('landing:features.aiCompanion.chatExample.aiResponse')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">{t('landing:features.aiCompanion.label')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('landing:features.aiCompanion.title')}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('landing:features.aiCompanion.description')}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.aiCompanion.features.seaLion')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.aiCompanion.features.contextualMemory')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.aiCompanion.features.personalizedResponses')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Digital Memory Book */}
          <div id="memory-book" className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">{t('landing:features.memoryBook.label')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('landing:features.memoryBook.title')}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('landing:features.memoryBook.description')}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.memoryBook.features.collaborative')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.memoryBook.features.timeline')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.memoryBook.features.secure')}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src={getFeatureImagePath('memory.png')}
                    alt="Digital Memory Book interface showing timeline of family memories and life events"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="cognitive-assessment" className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src={getFeatureImagePath('test-res.png')}
                    alt="MMSE cognitive assessment interface showing test results and progress tracking"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">{t('landing:features.cognitiveAssessment.label')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('landing:features.cognitiveAssessment.title')}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('landing:features.cognitiveAssessment.description')}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.cognitiveAssessment.features.mmse')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.cognitiveAssessment.features.tracking')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.cognitiveAssessment.features.familyFriendly')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5: Memory Map */}
          <div id="memory-map" className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">{t('landing:features.memoryMap.label')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('landing:features.memoryMap.title')}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('landing:features.memoryMap.description')}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.memoryMap.features.googleMaps')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.memoryMap.features.locationNotes')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.memoryMap.features.streetView')}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src={getFeatureImagePath('memory-map.png')}
                    alt="Interactive memory map showing location-based memories and navigation features"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 6: Mini Games */}
          <div id="mini-games" className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src={getFeatureImagePath('mini-games.png')}
                    alt="Mini games interface showing cognitive exercises like Sudoku and Picture Recall"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">6</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">{t('landing:features.miniGames.label')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('landing:features.miniGames.title')}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('landing:features.miniGames.description')}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.miniGames.features.sudoku')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.miniGames.features.pictureRecall')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{t('landing:features.miniGames.features.progressTracking')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('landing:howItWorks.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              {t('landing:howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('landing:howItWorks.steps.createProfile.title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('landing:howItWorks.steps.createProfile.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('landing:howItWorks.steps.buildPractice.title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('landing:howItWorks.steps.buildPractice.description')}
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('landing:howItWorks.steps.connectTrack.title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('landing:howItWorks.steps.connectTrack.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-[#92d7e7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            {t('landing:cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
            {t('landing:cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#92d7e7] bg-white hover:bg-gray-50 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              {t('landing:cta.primaryButton')}
            </Link>
            <button
              onClick={scrollToFeatures}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-[#92d7e7] rounded-xl transition-all"
            >
              {t('landing:cta.secondaryButton')}
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 sm:py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-0">
              <img 
                src="/favicon-32x32.png" 
                alt="Myosotis Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <div className="text-lg sm:text-xl font-semibold text-white">
                {t('common:common.myosotis')}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:space-x-6 sm:gap-0">
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                {t('common:navigation.signIn')}
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                {t('common:navigation.register')}
              </Link>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                {t('common:navigation.features')}
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              {t('common:common.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
