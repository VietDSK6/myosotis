import { Link } from 'react-router-dom';

export default function LandingPage() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white antialiased text-[18px]">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img 
                  src="/favicon-32x32.png" 
                  alt="Myosotis Logo" 
                  className="w-8 h-8"
                />
              </div>
              <div className="text-xl font-semibold text-gray-900">
                Myosotis
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-lg font-medium text-white bg-[#92d7e7] hover:bg-[#7bc9db] rounded-xl transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Holistic Care, Preserving{' '}
                <span className="text-[#92d7e7]">Memories</span>{' '}
                for Your Loved Ones
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Myosotis is the digital companion for Alzheimer's patients and their families, 
                delivering peace of mind and connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToFeatures}
                  className="px-6 py-3 text-lg font-semibold text-white bg-[#92d7e7] hover:bg-[#7bc9db] rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Experience the Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl">
                <img 
                  src="/holding-hand.jpg" 
                  alt="Caring hands holding together - representing family connection and support"
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced AI-Powered Care Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary AI technology meets heartfelt care. Every feature is designed to bring families closer together through innovative memory preservation and compassionate support.
            </p>
          </div>

          <div className="mb-24 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Bring a Familiar Face and Voice Back to Life
              </h3>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                Memories feel closer when you can both see and hear someone you love. With just one photo and a short voice sample, our AI can recreate a lifelike talking avatar—speaking in the same familiar tone and expressing natural lip movements. This avatar can tell cherished stories, recall special places, or deliver daily encouragement, making memory care deeply personal and emotionally engaging.
              </p>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
                <div className="bg-gray-700 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">AI Character Clone Demo Video</p>
                    <p className="text-sm text-gray-300 mt-2">Watch a photo transform into a speaking avatar</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Deep Neural Voice Synthesis</h4>
                  <p className="text-sm text-gray-600">Captures tone, pitch, and emotion</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Talking Face Technology</h4>
                  <p className="text-sm text-gray-600">Photos become animated avatars</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">SEA-LION AI</h4>
                  <p className="text-sm text-gray-600">Culturally-adaptive conversations</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy-First Design</h4>
                  <p className="text-sm text-gray-600">All media and data remain secure</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                A Caring Companion, Available 24/7
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Living with dementia can be confusing and isolating - but no one should feel alone. Myosotis' Intelligent Care Chatbot is a warm, always-available companion that listens, responds, and guides with empathy. It speaks in your chosen local language, understands everyday conversation, and can offer gentle reminders, explain care instructions, or simply share a friendly chat to brighten the day.
              </p>
              
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#92d7e7] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Myosotis Care Assistant</p>
                      <p className="text-gray-400 text-sm">Always here to help</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#92d7e7] text-white p-3 rounded-lg max-w-xs">
                      Good morning! How are you feeling today?
                    </div>
                    <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs ml-auto">
                      I'm a bit confused about my medication schedule.
                    </div>
                    <div className="bg-[#92d7e7] text-white p-3 rounded-lg max-w-xs">
                      I understand. Let me help you with that. Your morning medication should be taken with breakfast...
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">SEA-LION for culturally- and linguistically-aware dialogue</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Contextual memory to maintain natural conversations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Personalization based on health data and family input</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Your Family's Living Storybook
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                This is the heart of Myosotis, where your family comes together to build a rich, interactive timeline. Collaboratively add photos, write down the stories behind them, and mark key life events. It's a beautiful way to preserve a legacy, share stories between generations, and create new moments of connection for your loved one.
              </p>
              
              <div className="bg-gray-50 rounded-2xl shadow-lg mt-13">
                <img 
                  src="/memory.png" 
                  alt="Life Storyboard interface showing timeline of memories and important life events"
                  className="w-full h-110 object-cover rounded-xl"
                />
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Collaborative storytelling for the whole family</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Interactive timeline view with photos and events</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">A secure, shared space to preserve a life's legacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting started with Myosotis is simple and stress-free
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Create a Profile
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Set up your loved one's profile and contacts in just a few minutes. 
                Secure and private by design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Build & Practice
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Work together to add memories and complete brain training exercises. 
                Make it a bonding experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Connect & Track
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Family connects through stories and tracks cognitive health progress. 
                Stay informed and involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#92d7e7]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Myosotis?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join families who are already creating meaningful connections and preserving precious memories. 
            Start your journey today with our comprehensive care platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 text-lg font-semibold text-[#92d7e7] bg-white hover:bg-gray-50 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Experience the Demo Now
            </Link>
            <button
              onClick={scrollToFeatures}
              className="px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-[#92d7e7] rounded-xl transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img 
                src="/favicon-32x32.png" 
                alt="Myosotis Logo" 
                className="w-8 h-8"
              />
              <div className="text-xl font-semibold text-white">
                Myosotis
              </div>
            </div>
            <div className="flex space-x-6">
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                Register
              </Link>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Myosotis. Caring for memories, supporting families.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
