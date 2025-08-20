"use client"

import { useState, useEffect } from "react"
import AdventurePopup from "./AdventurePopup"
import EasyToJoinAdventure from "./EasyToJoinAdventure"
import AdventureProtection from "./AdventureProtection"
import AdventureTools from "./AdventureTools"
import AdventureFAQ from "./AdventureFAQ"
import Footer from "../../components/layout/Footer"
import { useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import { useOnboarding } from "../../context/OnboardingContext"

function Onboarding1() {
  const { user } = useUser()
  const { onboardingData } = useOnboarding()
  const [services, setServices] = useState(1)
  const [showPopup, setShowPopup] = useState(false)
  const [partnerData, setPartnerData] = useState(null)
  const [publishMsg, setPublishMsg] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress === "Adarshbalmukundshukla@gmail.com") {
      navigate("/superadmin/onboarding")
    }
  }, [user, navigate])

  const totalEarning = partnerData ? partnerData.pricePerService * services : 6500 * services

  // Check if all required fields are present
  const mainImage = onboardingData.step5?.mainImage
  const title = onboardingData.step2?.title
  const description = onboardingData.step2?.description
  const location = onboardingData.step1?.location
  const type = onboardingData.step3?.category
  const price = onboardingData.step8?.price
  const partnerEmail = user?.primaryEmailAddress?.emailAddress

  const canPublish = mainImage && title && description && location && type && price && partnerEmail

  const handlePublish = () => {
    if (!canPublish) return
    // Build adventure object
    const adventure = {
      id: Date.now(),
      title,
      description,
      location,
      type,
      price,
      mainImage: typeof mainImage === "string" ? mainImage : URL.createObjectURL(mainImage),
      status: "pending",
      partnerEmail,
      createdAt: new Date().toISOString(),
    }

    const pending = JSON.parse(localStorage.getItem("pendingAdventures") || "[]")
    pending.push(adventure)
    localStorage.setItem("pendingAdventures", JSON.stringify(pending))
    setPublishMsg("Adventure submitted for approval! Superadmin will review it soon.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-teal-600/15 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-40 w-32 h-32 border border-cyan-400/30 rotate-45 animate-spin-very-slow"></div>
        <div className="absolute bottom-40 left-40 w-24 h-24 border border-pink-400/30 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Enhanced Header with Better Text Visibility */}
      <header className="relative z-50 bg-black/20 backdrop-blur-2xl border-b border-white/20 shadow-2xl">
        <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-14 w-14 mr-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white drop-shadow-lg">
                Adventure Triangle
              </h1>
              <p className="text-xs text-cyan-300 font-medium tracking-wider">PARTNER PROGRAM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/partner/dashboard")}
              className="px-6 py-3 bg-black/40 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              Dashboard
            </button>
            
            <button
              onClick={() => navigate("/onboarding2")}
              className="group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <svg className="w-5 h-5 group-hover:animate-bounce relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="relative z-10">Start Adventure Setup</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Better Text Contrast */}
      <section className="relative px-8 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-sm border border-emerald-400/50 rounded-full animate-fade-in">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-emerald-300 font-semibold text-sm tracking-wide">LIVE EARNING CALCULATOR</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-6xl lg:text-7xl font-black text-white leading-none tracking-tight drop-shadow-2xl">
                Transform
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-shift drop-shadow-lg">
                    Adventures
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transform scale-x-0 animate-scale-in"></div>
                </span>
                <br />
                Into Revenue
              </h2>
              
              <div className="relative">
                <div className="text-5xl lg:text-6xl font-black text-white drop-shadow-2xl animate-number-glow">
                  ${totalEarning.toLocaleString()}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-400/20 blur-2xl rounded-2xl animate-pulse-glow"></div>
              </div>
              
              <p className="text-xl text-gray-200 font-medium leading-relaxed max-w-lg drop-shadow-lg">
                Join thousands of adventure partners earning substantial income through our revolutionary platform.
              </p>
            </div>

            {/* Enhanced Calculator with Better Visibility */}
            <div className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Revenue Calculator</h3>
                  <div className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full border border-emerald-400/30">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-300 font-semibold text-sm">{services} Adventures</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-medium">Per Adventure</span>
                    <span className="text-2xl font-bold text-cyan-400 drop-shadow-lg">${partnerData?.pricePerService || 6500}</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={services}
                      onChange={(e) => setServices(Number(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full appearance-none cursor-pointer slider-glow"
                    />
                    <div className="flex justify-between text-sm text-gray-300 mt-2">
                      <span>1</span>
                      <span>20+ Adventures</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPopup(true)}
                  className="w-full group/btn flex items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/20"
                >
                  <div className="p-3 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl group-hover/btn:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg group-hover/btn:text-cyan-300 transition-colors duration-300 drop-shadow-lg">
                      {partnerData?.location || "Choose Your Location"} • {partnerData?.adventureType || "Adventure Type"}
                    </div>
                    <div className="text-gray-300 text-sm">{partnerData?.zones || "Select your adventure zones and start earning"}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover/btn:text-cyan-400 ml-auto transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive 3D Globe */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-96 h-96 group perspective-1000">
              <div className="absolute inset-0 border-4 border-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-full animate-spin-slow"></div>
              
              <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl border-8 border-white/30 group-hover:border-cyan-400/60 transition-all duration-500 hover:shadow-cyan-400/50 transform group-hover:scale-105">
                <iframe
                  className="w-full h-full rounded-full filter brightness-90 contrast-125 group-hover:brightness-110 transition-all duration-500"
                  src={`https://maps.google.com/maps?q=${partnerData?.location || "Mumbai"}&z=13&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-cyan-900/30 pointer-events-none"></div>
              </div>

              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce-slow">
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full shadow-lg animate-pulse">
                <div className="flex items-center justify-center w-full h-full">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>

              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-2xl border border-white/30 px-6 py-3 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-cyan-400 font-bold text-sm">Adventure Hub</div>
                  <div className="text-white/90 text-xs">Live Locations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <AdventurePopup
            onClose={() => setShowPopup(false)}
            onSave={(data) => {
              setPartnerData(data)
              setShowPopup(false)
            }}
          />
        )}
      </section>

      {/* Feature Sections with Unique Designs */}
      <section className="space-y-32 py-20 px-8 max-w-7xl mx-auto">
        {/* Section 1: Easy To Join - Card Grid Design */}
        <div className="animate-slide-up-delay-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-3xl rounded-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-blue-300 font-semibold">QUICK START</span>
                </div>
                <h3 className="text-5xl font-black text-white mb-6 drop-shadow-xl">Easy To Join Adventure</h3>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">Transform your passion into profit with our streamlined onboarding process</p>
              </div>
              <EasyToJoinAdventure />
            </div>
          </div>
        </div>

        {/* Section 2: Protection - Shield Design */}
        <div className="animate-slide-up-delay-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 blur-3xl rounded-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
              <div className="p-12">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center px-6 py-3 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
                    <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-emerald-300 font-semibold">SECURE & PROTECTED</span>
                  </div>
                  <h3 className="text-5xl font-black text-white mb-6 drop-shadow-xl">Adventure Protection</h3>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">Your safety and success are our top priorities with comprehensive protection</p>
                </div>
                <AdventureProtection />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Tools - Tech Dashboard Design */}
        <div className="animate-slide-up-delay-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-fuchsia-600/10 blur-3xl rounded-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              {/* Tech-style header */}
              <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white drop-shadow-lg">Adventure Tools</h3>
                      <p className="text-purple-300">Professional Management Suite</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-300"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse animation-delay-600"></div>
                  </div>
                </div>
              </div>
              <div className="p-12">
                <AdventureTools />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: FAQ - Modern Accordion Design */}
        <div className="animate-slide-up-delay-4 ">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-red-300/20 to-pink-600/10 blur-3xl rounded-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-orange-500/20 rounded-full border border-orange-400/30 mb-6">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-orange-300 font-semibold">HELP CENTER</span>
                </div>
                <h3 className="text-5xl font-black text-white mb-6 drop-shadow-xl">Adventure FAQ</h3>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">Get answers to your most common questions about becoming an adventure partner</p>
              </div>
              <AdventureFAQ />
            </div>
          </div>
        </div>

        {/* Enhanced Publish Section */}
        <div className="animate-slide-up-delay-5">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl"></div>
            
            <div className="relative bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
              <div className="space-y-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl animate-bounce-slow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-white mb-4 drop-shadow-xl">Ready to Launch?</h3>
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    Your adventure is ready for review. Our expert team will approve your submission within 24 hours.
                  </p>
                </div>

                <button
                  className={`group w-full max-w-md mx-auto px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden ${
                    canPublish
                      ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white shadow-2xl hover:shadow-cyan-500/50'
                      : 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/30'
                  }`}
                  disabled={!canPublish}
                  onClick={handlePublish}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Adventure
                  </span>
                  {canPublish && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  )}
                </button>

                {publishMsg && (
                  <div className="animate-fade-in bg-emerald-500/20 border border-emerald-400/40 px-8 py-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 text-emerald-200 font-semibold">
                      <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {publishMsg}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scale-in {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes number-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                         0 0 30px rgba(34, 211, 238, 0.6),
                         0 0 40px rgba(168, 85, 247, 0.4);
          }
          50% { 
            text-shadow: 0 0 30px rgba(255, 255, 255, 1),
                         0 0 40px rgba(34, 211, 238, 0.8), 
                         0 0 50px rgba(168, 85, 247, 0.6);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-very-slow {
          animation: spin-very-slow 60s linear infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 2s ease-out 0.5s both;
        }
        
        .animate-number-glow {
          animation: number-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up-delay-1 {
          animation: slide-up 1s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 1s ease-out 0.4s both;
        }
        
        .animate-slide-up-delay-3 {
          animation: slide-up 1s ease-out 0.6s both;
        }
        
        .animate-slide-up-delay-4 {
          animation: slide-up 1s ease-out 0.8s both;
        }
        
        .animate-slide-up-delay-5 {
          animation: slide-up 1s ease-out 1s both;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .slider-glow {
          filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.5));
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
          border: 4px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(34, 211, 238, 1);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
          border: 4px solid rgba(255, 255, 255, 0.3);
          border: none;
        }
        
        /* Enhanced text shadows for better visibility */
        .drop-shadow-xl {
          filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.8));
        }
        
        .drop-shadow-2xl {
          filter: drop-shadow(0 0 50px rgba(0, 0, 0, 0.9));
        }
        
        .drop-shadow-lg {
          filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.7));
        }
      `}</style>
    </div>
  )
}

export default Onboarding1