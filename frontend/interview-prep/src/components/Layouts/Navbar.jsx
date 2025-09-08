import React, { useContext, useState } from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'
import Logo from '../../assets/ace.png'
import { UserContext } from '../../context/userContext'
const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
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
        {/* <ProfileInfoCard /> */}
      </div>
    </nav >
  )
}

export default Navbar
