import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import Modal from '../components/Modal';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Logo from '../assets/ace.png';

import {
  Brain,
  Target,
  Trophy,
  Users,
  Mic,
  BarChart3,
  BookOpen,
  Star,
  ChevronDown,
  TrendingUp,
  Award,
  ArrowRight,
  Shield,
} from 'lucide-react';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [confidence, setConfidence] = useState(75);

  // Scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const newVisibleSections = new Set();

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          newVisibleSections.add(section.getAttribute('data-section'));
        }
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      const interval = setInterval(() => {
        setConfidence(prev => Math.min(prev + Math.random() * 5, 95));
      }, 500);
      setTimeout(() => {
        clearInterval(interval);
        setIsRecording(false);
      }, 3000);
    }
  };

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  const themeClasses = {
    bg: 'bg-white',
    text: 'text-black',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    cardBg: 'from-black/5 to-black/10',
    border: 'border-black/10',
    navBg: 'bg-white/80',
    buttonPrimary: 'bg-black text-white hover:bg-gray-800',
    buttonSecondary: 'border-black/30 text-black hover:bg-black/10',
  };

  const steps = [
    { title: "Initialize Profile", description: "Configure your professional trajectory with precision", icon: Users, color: "from-gray-800 to-gray-900" },
    { title: "Select Mission Type", description: "Choose from behavioral, technical, or executive scenarios", icon: Target, color: "from-gray-700 to-gray-800" },
    { title: "Engage AI System", description: "Interface with advanced interview simulation protocols", icon: Brain, color: "from-gray-600 to-gray-700" },
    { title: "Analyze Performance", description: "Receive comprehensive evaluation and strategic insights", icon: BarChart3, color: "from-gray-500 to-gray-600" },
    { title: "Achieve Mastery", description: "Attain interview excellence through systematic practice", icon: Trophy, color: "from-gray-400 to-gray-500" },
  ];

  const features = [
    { icon: Brain, title: "Neural Interview Engine", description: "Advanced AI that evolves with your responses, providing hyper-personalized feedback loops" },
    { icon: BarChart3, title: "Performance Metrics", description: "Comprehensive analytics dashboard with predictive insights and improvement trajectories" },
    { icon: BookOpen, title: "Knowledge Repository", description: "Curated question database spanning industries, roles, and complexity levels" },
    { icon: Target, title: "Precision Training", description: "Laser-focused practice sessions targeting your specific career objectives" },
    { icon: Award, title: "Progress Intelligence", description: "Real-time tracking with milestone recognition and achievement unlocking" },
    { icon: Shield, title: "Confidence Architecture", description: "Systematic confidence building through progressive challenge escalation" },
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  ];

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} relative overflow-x-hidden`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 ${themeClasses.navBg} backdrop-blur-xl ${themeClasses.border} border-b`}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/">
              <img src={Logo} height={50} width={50} alt="" />
            </a>
            {/* <div className={`w-12 h-12 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center`}>
              <Brain className={`w-7 h-7 text-white`} />
            </div> */}
            <a href="/">
              <span className="text-3xl font-extralight tracking-wider">ACE Interview</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            <a href="#demo" className={`${themeClasses.textSecondary} hover:${themeClasses.text.split(' ')[1]} transition-all`}>Experience</a>
            <a href="#process" className={`${themeClasses.textSecondary} hover:${themeClasses.text.split(' ')[1]} transition-all`}>Process</a>
            <a href="#features" className={`${themeClasses.textSecondary} hover:${themeClasses.text.split(' ')[1]} transition-all`}>Features</a>
          </div>

          {user ? (
            <div className="relative">
              <div onClick={toggleProfileDropdown} className="cursor-pointer">
                <ProfileInfoCard themeClasses={themeClasses} />
              </div>

              {isProfileDropdownOpen && (
                <div className={`absolute cursor-pointer right-0 mt-3 w-48 rounded-xl shadow-lg border ${themeClasses.border} ${themeClasses.bg} backdrop-blur-xl`}>
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => navigate("/dashboard")}
                        className={`block w-full text-left px-4 py-2 cursor-pointer ${themeClasses.textSecondary} hover:${themeClasses.text.split(' ')[1]} transition-colors`}
                      >
                        Dashboard
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className={`px-8 py-3 ${themeClasses.buttonPrimary} rounded-xl transition-all`}
            >
              Start Mission
            </button>
          )}
        </div>
      </nav >

      {/* Hero Section */}
      <section data-section="hero" className="min-h-screen flex items-center justify-center px-8 relative" >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-extralight mb-12 leading-none tracking-tighter">
            Master Your
            <span className={`block font-thin bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent`}>
              Interview Destiny
            </span>
          </h1>
          <p className={`text-2xl md:text-3xl ${themeClasses.textSecondary} mb-16 leading-relaxed`}>
            Transcend conventional preparation with AI-powered interview mastery,
            precision feedback, and systematic excellence protocols.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button
              onClick={() => (user ? navigate("/dashboard") : setOpenAuthModal(true))}
              className={`px-8 py-3 ${themeClasses.buttonPrimary} rounded-xl`}
            >
              {user ? 'Go to Dashboard' : 'Initialize Training'}
            </button>
            <button className={`px-12 py-5 border ${themeClasses.buttonSecondary} rounded-xl`}>
              Explore System
            </button>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-8 h-8 ${themeClasses.textMuted}`} />
        </div>
      </section>

      {/* Interactive Demo */}
      <section
        data-section="demo"
        id="demo"
        className={`py-32 px-8 bg-gradient-to-b from-white to-gray-100 transition-all duration-1000 delay-200 ${visibleSections.has('demo') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`
        }
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-6xl font-extralight mb-8 ${themeClasses.text} tracking-tight`}>Experience Excellence</h2>
            <p className={`text-2xl ${themeClasses.textSecondary} font-light tracking-wide`}>Interface with our advanced AI interviewer</p>
          </div>

          <div className={`bg-gradient-to-br ${themeClasses.cardBg} rounded-3xl shadow-2xl p-12 max-w-5xl mx-auto backdrop-blur-xl border ${themeClasses.border}`}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className={`text-4xl font-light ${themeClasses.text} tracking-tight`}>Neural Interview Protocol</h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed text-lg font-light`}>
                  Engage with our sophisticated AI interviewer that provides real-time analysis
                  and adapts to your responses for maximum learning efficiency.
                </p>

                <div className="space-y-6">
                  <div className="flex justify-between text-lg">
                    <span className={`${themeClasses.textMuted} font-light`}>Confidence Metric</span>
                    <span className={`${themeClasses.text} font-medium`}>{confidence}%</span>
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full h-3`}>
                    <div
                      className={`bg-gradient-to-r from-black to-gray-700 h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={`bg-white/30 rounded-2xl p-8 backdrop-blur-sm border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-8">
                  <span className={`${themeClasses.textMuted} font-light tracking-wide`}>Active Session</span>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                    <span className={`${themeClasses.textMuted} font-light`}>{isRecording ? 'Recording' : 'Standby'}</span>
                  </div>
                </div>

                <div className={`bg-black/5 rounded-xl p-6 mb-8 border ${themeClasses.border}`}>
                  <p className={`${themeClasses.text} leading-relaxed font-light`}>
                    "Describe a complex technical challenge you've encountered and your systematic approach to resolution."
                  </p>
                </div>

                <button
                  onClick={handleRecord}
                  className={`w-full py-4 rounded-xl transition-all duration-500 flex items-center justify-center space-x-3 font-medium tracking-wide ${isRecording
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
                    : 'bg-black/10 border border-black/20 text-black hover:bg-black/20'
                    }`}
                >
                  <Mic className="w-6 h-6" />
                  <span>{isRecording ? 'Terminate Session' : 'Begin Protocol'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section section
        data-section="process"
        id="process"
        className={`py-32 px-8 bg-gradient-to-b from-gray-100 to-white transition-all duration-1000 delay-300 ${visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-6xl font-extralight mb-8 ${themeClasses.text} tracking-tight`}>Systematic Excellence</h2>
            <p className={`text-2xl ${themeClasses.textSecondary} font-light tracking-wide`}>Your pathway to interview mastery in five precise phases</p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSections.has('process');

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-8 transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-2xl`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-6 mb-3">
                      <span className={`text-lg font-light ${themeClasses.textMuted} tracking-wider`}>Phase {index + 1}</span>
                      <div className={`flex-1 h-px bg-gradient-to-r from-black/20 to-transparent`} />
                    </div>
                    <h3 className={`text-3xl font-light ${themeClasses.text} mb-3 tracking-tight`}>{step.title}</h3>
                    <p className={`${themeClasses.textSecondary} text-lg font-light leading-relaxed`}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        data-section="features"
        id="features"
        className={`py-32 px-8 bg-gradient-to-b from-white to-gray-100 transition-all duration-1000 delay-400 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-6xl font-extralight mb-8 ${themeClasses.text} tracking-tight`}>Advanced Capabilities</h2>
            <p className={`text-2xl ${themeClasses.textSecondary} font-light tracking-wide`}>Precision-engineered features for interview excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isVisible = visibleSections.has('features');

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${themeClasses.cardBg} rounded-2xl p-8 backdrop-blur-xl border ${themeClasses.border} hover:border-opacity-40 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 text-white`} />
                  </div>
                  <h3 className={`text-2xl font-light ${themeClasses.text} mb-4 tracking-tight`}>{feature.title}</h3>
                  <p className={`${themeClasses.textSecondary} leading-relaxed font-light`}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section section
        data-section="companies"
        id="companies"
        className={`py-32 px-8 bg-gradient-to-b from-gray-100 to-white transition-all duration-1000 delay-500 ${visibleSections.has('companies')
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-7xl mx-auto text-center overflow-hidden relative">
          <h2 className={`text-6xl font-extralight mb-8 ${themeClasses.text} tracking-tight`}>
            Elite Destinations
          </h2>
          <p className={`text-2xl ${themeClasses.textSecondary} mb-16 font-light tracking-wide`}>
            Prepare for interviews at the world's most prestigious organizations
          </p>

          {/* Scrolling wrapper */}
          <div className="relative w-full overflow-hidden">
            <div className="flex space-x-16 animate-marquee">
              {companies.concat(companies).map((company, index) => (
                <img
                  key={index}
                  src={company.logo}
                  alt={company.name}
                  className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section section
        data-section="testimonials"
        className={`py-32 px-8 bg-gradient-to-b from-white to-gray-100 transition-all duration-1000 delay-600 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className={`bg-gradient-to-br ${themeClasses.cardBg} rounded-3xl shadow-2xl p-16 backdrop-blur-xl border ${themeClasses.border}`}>
            <div className="flex justify-center mb-12">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-8 h-8 ${themeClasses.text} fill-current`} />
              ))}
            </div>
            <blockquote className={`text-3xl font-extralight mb-12 ${themeClasses.text} leading-relaxed tracking-wide`}>
              "InterviewAI revolutionized my preparation methodology. The precision feedback
              and systematic approach enabled me to secure my position at Google."
            </blockquote>
            <div>
              <p className={`font-light text-2xl ${themeClasses.text} mb-2 tracking-wide`}>Sarah Chen</p>
              <p className={`${themeClasses.textMuted} text-lg font-light`}>Principal Engineer, Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section section
        data-section="cta"
        className={`py-32 px-8 bg-gradient-to-br from-black/10 to-black/5 transition-all duration-1000 delay-700 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-6xl font-extralight mb-8 ${themeClasses.text} tracking-tight`}>Begin Your Ascension</h2>
          <p className={`text-2xl mb-12 ${themeClasses.textSecondary} font-light tracking-wide`}>
            Join the elite cohort of professionals who have mastered their interview destiny
          </p>
          <button className={`px-16 py-6 ${themeClasses.buttonPrimary} rounded-2xl transition-all duration-500 font-medium text-xl tracking-wide flex items-center space-x-4 mx-auto hover:scale-105`}>
            <span>Launch Mission</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 px-8 ${themeClasses.bg} border-t ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <img src={Logo} height={50} width={50} alt="" />
                {/* <div className={`w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center`}>
                  <Brain className={`w-6 h-6 text-white`} />
                </div> */}
                <span className={`text-2xl font-extralight tracking-wider ${themeClasses.text}`}>ACE Interview</span>
              </div>
              <p className={`${themeClasses.textMuted} leading-relaxed font-light`}>
                Master your interview skills with precision AI-powered practice and systematic feedback protocols.
              </p>
            </div>
            <div>
              <h4 className={`font-light mb-6 ${themeClasses.text} text-lg tracking-wide`}>System</h4>
              <ul className={`space-y-3 ${themeClasses.textMuted} font-light`}>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Features</a></li>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Pricing</a></li>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-light mb-6 ${themeClasses.text} text-lg tracking-wide`}>Organization</h4>
              <ul className={`space-y-3 ${themeClasses.textMuted} font-light`}>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>About</a></li>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Careers</a></li>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-light mb-6 ${themeClasses.text} text-lg tracking-wide`}>Support</h4>
              <ul className={`space-y-3 ${themeClasses.textMuted} font-light`}>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Documentation</a></li>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Privacy</a></li>
                <li><a href="#" className={`hover:${themeClasses.text.split(' ')[1]} transition-colors`}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${themeClasses.border} pt-8 text-center`}>
            <p className={`${themeClasses.textMuted} font-light tracking-wide`}>
              © 2025 ACE Interview. All systems operational.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      < Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </ Modal>
    </div >
  );
};

export default LandingPage;









// import React, { useState } from 'react'
// import { useContext } from 'react'
// import HERO_IMG from "../assets/hero.png"
// import { APP_FEATURES } from "../utils/data"
// import { useNavigate } from "react-router-dom"
// import { LuSparkles } from 'react-icons/lu'
// import Modal from '../components/Modal'
// import Login from '../pages/Auth/Login'
// import SignUp from '../pages/Auth/SignUp'
// import { UserContext } from '../context/userContext'
// import ProfileInfoCard from '../components/Cards/ProfileInfoCard'

// const LandingPage = () => {
//   const { user } = useContext(UserContext)
//   const navigate = useNavigate()

//   const [openAuthModal, setOpenAuthModal] = useState(false)
//   const [currentPage, setCurrentPage] = useState("login")

//   const handleCTA = () => {
//     if (!user) {
//       setOpenAuthModal(true)
//     } else {
//       navigate("/dashboard")
//     }
//   }
//   return (
//     <>
//       <div className='w-full min-h-full bg-[#FFFCEF]'>
//         <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0' />
//         <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
//           {/* Header */}
//           <header className='flex justify-between items-center mb-16'>
//             <div className='text-xl text-black font-bold'>
//               Interview Prep AI
//             </div>
//             {user ? (<ProfileInfoCard />) :
//               (
//                 <button className='bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer' onClick={() => setOpenAuthModal(true)}>
//                   Login / SignUp
//                 </button>
//               )}
//           </header>
//           {/* Her Content */}
//           <div className='flex flex-col md:flex-row items-center'>
//             <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
//               <div className='flex items-center justify-left mb-2'>
//                 <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 '>
//                   <LuSparkles /> AI Powered
//                 </div>
//               </div>
//               <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
//                 Ace Interview with <br />
//                 <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#ff9324_0%,_#FCD760_100%)] bg-[lenght:200%_200%] animate-text-shine font-semibold'>Powered by AI</span> {""} Learning
//               </h1>
//             </div>
//             <div className='w-full md:w-1/2'>
//               <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
//                 Get role specific questions, expands answers when you need them,
//                 dive deeper into concepts, and organize everything yout way.
//                 From preparation to mastery - your ultimate interview tookit is here
//               </p>
//               <button className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer ' onClick={handleCTA}>Get Started</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='w-full min-h-full z-10'>
//         <div>
//           <section className='flex items-center justify-center -mt-36'>
//             <img src={HERO_IMG} alt="" className='w-[80vw] rounded-lg' />
//           </section>
//         </div>
//       </div>

//       <div className='w-full min-h-full bg-[#FFFCEF] mt-10'>
//         <div className='container mx-auto px-4 pt-10 pb-20'>
//           <section className='mt-5'>
//             <h2 className='text-2xl font-medium text-center mb-12'>
//               Features That Makes You Shine
//             </h2>
//             <div className='flex flex-col items-center gap-8'>
//               {/* First 3 cards */}
//               <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
//                 {APP_FEATURES.slice(0, 3).map((feature) => (
//                   <div key={feature.id} className='bg-[#FFFEFB] p-6 rounded-xl shadow-xl hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
//                     <h3 className='text-base font-semibold mb-3'>
//                       {feature.title}
//                     </h3>
//                     <p className='text-gray-600'>
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               {/* Remaining 2 card */}
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
//                 {APP_FEATURES.slice(3).map((feature) => (
//                   <div key={feature.id} className='bg-[#FFFEFB] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
//                     <h3 className='text-base font-semibold mb-3'>
//                       {feature.title}
//                     </h3>
//                     <p className='text-gray-600'>
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>

//       <Modal
//         isOpen={openAuthModal}
//         onClose={() => {
//           setOpenAuthModal(false)
//           setCurrentPage("login")
//         }}
//         hideHeader
//       >
//         <div>
//           {currentPage === "login" && (
//             <Login setCurrentPage={setCurrentPage} />
//           )}
//           {currentPage === "signup" && (
//             <SignUp setCurrentPage={setCurrentPage} />
//           )}
//         </div>

//       </Modal>
//     </>

//   )
// }

// export default LandingPage
