import React from 'react';

function AdventureStats() {
  return (
    <div className="relative">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 z-0 animate-gradient"
        style={{
          background: 'linear-gradient(270deg, #ef4444, #3b82f6, #10b981, #8b5cf6, #ec4899)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      ></div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center p-10 gap-10">
        
        {/* Left Section */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <div className="relative">
            {/* Combined Image with animation */}
            <img 
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" 
              alt="Mountain adventure" 
              className="rounded-xl shadow-xl w-full max-w-md border-4 border-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            />

            {/* Users Love Us Badge with animation */}
            <div className="absolute top-4 right-4 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold animate-pulse">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-red-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Users Love Us</span>
            </div>

            {/* Floating Agenda Card with animation */}
            <div className="absolute -bottom-8 left-4 bg-white rounded-xl shadow-lg p-4 w-64 text-sm space-y-1 border border-gray-100 transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span role="img" aria-label="clap">👏</span> 
                <span>Agenda at a Glance</span>
              </div>
              <div className="text-gray-800">
                <p>Day 1 — ✔️ Check-in</p>
                <p>Day 2 — 🎤 Keynote</p>
                <p>Day 3 — 🤝 Networking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-8 leading-snug text-white animate-fadeIn">
            Your all-in-one solution <br />for every adventure
          </h1>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "7M+", color: "indigo-600", label: "adventures booked" },
              { value: "315M+", color: "teal-600", label: "happy customers" },
              { value: "1K+", color: "amber-600", label: "5-star ratings" },
              { value: "24/7", color: "green-600", label: "support available" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/90 p-4 rounded-lg shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default AdventureStats;