import React from 'react'
import { Boxes } from './Background-boxes'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Firebase/firebase';
import { useDispatch } from 'react-redux';
import { signInUser } from '../features/auth/authSlice';

const Hero = () => {

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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 flex justify-center">
      <Boxes />

      <div className="mt-24 md:mt-32 relative z-10 flex flex-col items-center justify-center h-full w-full md:w-1/2 px-4 sm:px-6 md:px-0 lg:px-0 xl:px-0 text-white">
        <div className="w-full max-w-6xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Money in. Money out.
            <span className="block bg-gradient-to-r from-[#0081A7] via-[#00B4D8] to-[#0077B6] bg-clip-text text-transparent">
              We sort it out
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track every expense, visualize your spending patterns, and unlock the power of smart financial decisions with EXPENSO.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 text-gray-600">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-[#0081A7] rounded-full"></div>
              <span className="text-sm sm:text-base">Real-time Expense Tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-[#00B4D8] rounded-full"></div>
              <span className="text-sm sm:text-base">Smart Savings Insights</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-[#0077B6] rounded-full"></div>
              <span className="text-sm sm:text-base">Detailed Financial Reports</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={handleGoogleLogin} className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#0081A7] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#006B8A] hover:scale-105 hover:shadow-2xl hover:shadow-[#0081A7]/20 border border-[#0081A7]/20">
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                Sign In & Start Tracking
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0081A7] to-[#00B4D8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-[#0081A7]/30 text-[#0081A7] font-semibold rounded-xl transition-all duration-300 hover:bg-[#0081A7] hover:text-white hover:scale-105 hover:shadow-lg hover:border-[#0081A7] shadow-sm text-sm sm:text-base">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
