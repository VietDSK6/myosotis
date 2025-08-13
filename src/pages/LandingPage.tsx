import { Link } from 'react-router-dom';

export default function LandingPage() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white antialiased text-[18px]">
      {/* Navigation Header */}
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
                className="px-6 py-3 text-lg font-medium text-white bg-[#92d7e7] hover:bg-[#7bc9db] rounded-xl transition-all shadow-sm"
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
                  className="px-8 py-4 text-lg font-semibold text-white bg-[#92d7e7] hover:bg-[#7bc9db] rounded-xl transition-all shadow-lg hover:shadow-xl"
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
              Comprehensive Care Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature is designed with love, care, and understanding of the unique challenges 
              faced by Alzheimer's patients and their families.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-2xl shadow-lg">
                <img 
                  src="/memory.png" 
                  alt="Life Storyboard interface showing timeline of memories and important life events"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Rebuild the Life Journey
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Easily create a digital timeline, saving important stories, images, and events. 
                Myosotis helps connect generations through priceless memories.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Interactive timeline with photos and stories
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Family collaboration tools
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Secure cloud storage
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Track Cognitive Health
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Provides short, specially designed tests to help families track and understand 
                cognitive decline levels in a gentle, pressure-free way.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  MMSE cognitive assessments
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Progress tracking over time
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Gentle, supportive interface
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-gray-50 rounded-2xl shadow-lg">
                <img 
                  src="/test.png" 
                  alt="Clean cognitive assessment interface on tablet showing gentle memory tests"
                  className="w-full h-100 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-50 rounded-2xl shadow-lg">
                <img 
                  src="/emergency.png" 
                  alt="User profile and emergency contact management interface"
                  className="w-full h-100 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Peace of Mind with Centralized Information
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Securely store all important information—from personal details and medical history 
                to emergency contacts for relatives and doctors—all in one easily accessible place.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Secure personal information storage
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Emergency contact management
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#92d7e7] rounded-full flex-shrink-0"></div>
                  Family access controls
                </li>
              </ul>
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

            {/* Step 3 */}
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
