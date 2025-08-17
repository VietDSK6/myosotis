import { Link } from 'react-router-dom';

export default function LandingPage() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
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
            
            {/* Feature Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('ai-memories')}
                className="text-sm font-medium text-gray-600 hover:text-[#92d7e7] transition-colors"
              >
                AI Memories
              </button>
              <button
                onClick={() => scrollToSection('ai-companion')}
                className="text-sm font-medium text-gray-600 hover:text-[#92d7e7] transition-colors"
              >
                AI Companion
              </button>
              <button
                onClick={() => scrollToSection('memory-book')}
                className="text-sm font-medium text-gray-600 hover:text-[#92d7e7] transition-colors"
              >
                Memory Book
              </button>
              <button
                onClick={() => scrollToSection('cognitive-assessment')}
                className="text-sm font-medium text-gray-600 hover:text-[#92d7e7] transition-colors"
              >
                Assessment
              </button>
              <button
                onClick={() => scrollToSection('emergency-support')}
                className="text-sm font-medium text-gray-600 hover:text-[#92d7e7] transition-colors"
              >
                Emergency
              </button>
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
              <div className="rounded-2xl shadow-2xl">
                <img 
                  src="/holding-hand.jpg" 
                  alt="Caring hands holding together - representing family connection and support"
                  className="w-full h-[28rem] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Digital Care for Alzheimer's Families
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Myosotis is more than just an app—it's a complete ecosystem designed to support both patients and their families throughout the Alzheimer's journey. Our platform combines cutting-edge AI technology with compassionate care features to preserve memories, maintain connections, and provide peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Patients</h3>
              <p className="text-gray-600">
                Interactive memory exercises, AI companionship, and cognitive assessments to maintain mental engagement and track progress.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Families</h3>
              <p className="text-gray-600">
                Collaborative memory books, emergency contacts management, and real-time progress monitoring to stay connected and informed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#92d7e7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Caregivers</h3>
              <p className="text-gray-600">
                Emergency response systems, caregiver guidance, and 24/7 AI support to ensure comprehensive care and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MVP Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our MVP Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our core features designed to make a real difference in Alzheimer's care. Each feature has been carefully crafted based on real family needs and clinical insights.
            </p>
          </div>

          {/* Feature 1: AI Living Memories */}
          <div id="ai-memories" className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">AI Living Memories</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Bring Loved Ones Back to Life
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Transform cherished photos and voice recordings into interactive AI avatars. With just one photo and a short voice sample, create lifelike talking memories that can tell stories, share wisdom, or provide comfort—preserving the essence of your loved ones forever.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Deep neural voice synthesis technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Natural lip-sync and facial expressions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Custom scripts or AI-generated content</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-fit">
                  <div className="bg-gray-700 rounded-xl overflow-hidden" style={{width: '512px', height: '512px'}}>
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

          <div id="ai-companion" className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
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
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">AI Care Companion</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  24/7 Caring Companion
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  An intelligent, always-available companion that understands and responds with empathy. Powered by SEA-LION AI for culturally-aware conversations in local languages, providing comfort, guidance, and friendly chat whenever needed.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">SEA-LION AI for local language support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Contextual memory for natural conversations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Personalized responses based on user profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Digital Memory Book */}
          <div id="memory-book" className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">Digital Memory Book</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Collaborative Family Storybook
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Build a rich, interactive timeline where families come together to preserve memories. Add photos, write stories, and mark important life events in a beautiful, secure digital space that keeps precious memories alive for generations.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Collaborative storytelling for families</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Interactive timeline with photos and events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Secure, private family space</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src="/memory.png" 
                    alt="Digital Memory Book interface showing timeline of family memories and life events"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="cognitive-assessment" className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src="/test-res.png" 
                    alt="MMSE cognitive assessment interface showing test results and progress tracking"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">Cognitive Assessment</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Track Mental Health Progress
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Regular, gentle cognitive assessments help monitor progress and provide valuable insights for healthcare providers. Our digital MMSE tests are designed to be engaging and stress-free while providing accurate measurements.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Standardized MMSE cognitive tests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Progress tracking and historical data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Easy-to-understand results for families</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5: Emergency Support */}
          <div id="emergency-support" className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#92d7e7] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <span className="text-sm font-semibold text-[#92d7e7] uppercase tracking-wide">Emergency Support</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Peace of Mind for Families
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Comprehensive emergency contact management and caregiver resources ensure help is always available. Quick access to important contacts, medical information, and care instructions provides security for both patients and families.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Emergency contact management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Caregiver guides and resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Quick access to medical information</span>
                  </div>
                </div>

              </div>

              <div>
                <div className="rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src="/emergency.png" 
                    alt="Emergency contact interface showing family contacts and caregiver information"
                    className="w-full h-80 object-cover"
                  />
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
