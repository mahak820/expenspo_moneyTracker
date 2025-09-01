import { WalletMinimal, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../Firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { signInUser } from '../features/auth/authSlice';

const NavbarPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch()

  const handleGoogleLogin = async() => {
    const response = await signInWithPopup(auth , provider)
    const user = response.user
    const formData = {
      name : user.displayName ,
      email : user.email
    }
   
    dispatch(signInUser(formData))
    
  }

  return (
    <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-md shadow-sm z-50 sticky top-0">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 group">
          <WalletMinimal className="text-[#0081A7] font-extrabold w-8 h-8 transition-transform group-hover:scale-110" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-[#0081A7] transition-colors group-hover:text-[#00B4D8]">
            Expenso
          </span>
        </a>

        {/* Hamburger icon (mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Sign In Button */}
        <div className="hidden md:flex space-x-3">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="group relative text-white bg-gradient-to-r from-[#0081A7] to-[#00B4D8] hover:from-[#006B8A] hover:to-[#0096C7] focus:ring-4 focus:outline-none focus:ring-[#0081A7]/30 font-medium rounded-xl text-sm px-6 py-3 text-center inline-flex items-center shadow-lg hover:shadow-xl hover:shadow-[#0081A7]/20 transition-all duration-300 hover:scale-105 border border-[#0081A7]/20"
          >
            <svg
              className="w-4 h-4 me-2 transition-transform group-hover:rotate-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="relative">Sign in with Google</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <button
          onClick={handleGoogleLogin}
            type="button"
            className="group w-full text-white bg-gradient-to-r from-[#0081A7] to-[#00B4D8] hover:from-[#006B8A] hover:to-[#0096C7] focus:ring-4 focus:outline-none focus:ring-[#0081A7]/30 font-medium rounded-xl text-sm px-6 py-3 text-center inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-[#0081A7]/20 transition-all duration-300 hover:scale-105 border border-[#0081A7]/20"
          >
            <svg
              className="w-4 h-4 me-2 transition-transform group-hover:rotate-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="relative">Sign in with Google</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarPage;
