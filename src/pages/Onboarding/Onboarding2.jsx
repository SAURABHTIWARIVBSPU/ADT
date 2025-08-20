import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import Footer from '../../components/layout/Footer';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Onboarding2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinue = () => {
    setIsLoggedIn(true);
  };

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate('/step-1');
    }
  }, [isSignedIn, navigate]);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Replace with your SignupForm if needed */}
        <div>SignupForm</div>
      </div>
    );
  }

  return (
    <header className="relative bg-white min-h-screen">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
        {/* Left: Back + Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
            aria-label="Go back"
          >
            ← Back
          </button>

        {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo1.svg" alt="Adventure Triangle" className="h-8" />
            <span className="text-xl font-bold text-rose-500">Adventure</span>
            <span className="text-xl font-bold">Triangle</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium text-pink-500">Become a Partner</button>

          {/* Language Selector (stubbed) */}
          <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100">
            <Globe size={20} />
          </button>

          {/* Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-100">
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-6 mt-2 w-64 bg-white shadow-lg border rounded-lg py-2 z-50">
          <div className="px-4 py-2 border-b text-sm font-semibold">Help Centre</div>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 flex justify-between items-start">
            <div>
              <div className="font-semibold">Become a host</div>
              <div className="text-xs text-gray-600 max-w-[160px]">
                It’s easy to start hosting and earn extra income.
              </div>
            </div>
            <img src="/adventure-icon.png" alt="Adventure Icon" className="h-10 w-10 object-contain" />
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Refer a Partner</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Find a co-Partner</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Log in or sign up</button>
        </div>
      )}

      {/* Login/Signup Card */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Log in or sign up</h2>
            {/* Also show back here on mobile if you want */}
            <button
              onClick={handleBack}
              className="sm:hidden rounded-full border border-slate-200 px-3 py-1 text-sm hover:bg-slate-50"
            >
              ← Back
            </button>
          </div>
          <h3 className="text-2xl font-bold">Welcome to Adventure Triangle</h3>

          {/* Clerk Authentication */}
          <SignIn routing="path" path="/onboarding2" signUpUrl="/onboarding2/sign-up" />
        </div>

        <Footer />
      </div>
    </header>
  );
}

export default Onboarding2;
