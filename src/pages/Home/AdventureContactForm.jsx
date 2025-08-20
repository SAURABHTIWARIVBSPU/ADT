import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdventureContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    zone: '',
    preferredDate: '',
    message: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can send the formData to your backend or API
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1b2d] via-[#15273f] to-[#0c1b2d] py-16 px-4 sm:px-8 z-10 relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-[url('https://i.ibb.co/WFh2d3F/mountain-silhouette.png')] bg-cover bg-bottom opacity-10"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block px-6 py-2 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-full backdrop-blur-sm mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="font-bold text-white tracking-wider">ADVENTURE AWAITS</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Ready for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Next Thrill?</span>
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto text-sky-100/80 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Book your next adrenaline-packed adventure with us and experience the rush of a lifetime
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Adventure Info Section */}
          <motion.div 
            className="bg-gradient-to-br from-sky-900/50 to-cyan-800/30 backdrop-blur-xl rounded-2xl border border-sky-700/30 p-8 shadow-2xl"
            variants={cardVariants}
          >
            <div className="mb-8">
              <motion.h2 
                className="text-3xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                Why Choose Adventure Triangle?
              </motion.h2>
              <motion.p 
                className="text-lg text-sky-100/90 leading-relaxed"
                variants={itemVariants}
              >
                Whether you're flying through the air, conquering wild rapids, or exploring rugged terrains — we offer heart-pounding experiences with top-tier safety standards.
              </motion.p>
            </div>
            
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div className="flex items-start gap-4" variants={itemVariants}>
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-400/20 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">Three Zones of Adventure</h4>
                  <p className="text-sky-100/80">Choose your perfect adrenaline rush</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-3 gap-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-gradient-to-br from-sky-800/60 to-cyan-700/40 p-4 rounded-xl backdrop-blur-sm border border-sky-600/30 shadow-lg"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="bg-sky-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-sky-200">Air</h5>
                  <p className="text-sm text-sky-100/80 mt-1">Paragliding, Zip-lining</p>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-sky-800/60 to-cyan-700/40 p-4 rounded-xl backdrop-blur-sm border border-sky-600/30 shadow-lg"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4m-4-8l-4-4m0 0L8 7m4-4v12"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-cyan-200">Water</h5>
                  <p className="text-sm text-sky-100/80 mt-1">Rafting, Jet Ski</p>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-sky-800/60 to-cyan-700/40 p-4 rounded-xl backdrop-blur-sm border border-sky-600/30 shadow-lg"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="bg-emerald-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-emerald-200">Land</h5>
                  <p className="text-sm text-sky-100/80 mt-1">ATV Rides, Trekking</p>
                </motion.div>
              </motion.div>
              
              <motion.div className="mt-8 pt-6 border-t border-sky-700/30" variants={itemVariants}>
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-400/20 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">Safety First</h4>
                    <p className="text-sky-100/80">All equipment meets international safety standards</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-gradient-to-br from-sky-900/70 to-cyan-800/50 backdrop-blur-xl rounded-2xl border border-sky-700/30 shadow-2xl overflow-hidden"
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <div className="bg-gradient-to-r from-sky-700 to-cyan-600 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <svg className="w-8 h-8 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Adventure Booking Form</h3>
                  <p className="text-sky-100/90">Secure your spot for an unforgettable experience</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-sky-100">Full Name *</label>
                <div className="relative">
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-sky-900/40 backdrop-blur-sm border border-sky-700/50 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all duration-300 placeholder:text-sky-400/60"
                    placeholder="John Adventure"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label className="block text-sm font-medium text-sky-100">Email *</label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-sky-900/40 backdrop-blur-sm border border-sky-700/50 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all duration-300 placeholder:text-sky-400/60"
                      placeholder="john@example.com"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label className="block text-sm font-medium text-sky-100">Phone *</label>
                  <div className="relative">
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-sky-900/40 backdrop-blur-sm border border-sky-700/50 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all duration-300 placeholder:text-sky-400/60"
                      placeholder="(123) 456-7890"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-sky-100">Adventure Zone *</label>
                <div className="relative">
                  <select
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    className="w-full bg-sky-900/40 backdrop-blur-sm border border-sky-700/50 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all duration-300 appearance-none"
                    required
                  >
                    <option value="" className="bg-sky-900">Select your adventure</option>
                    <option value="Air" className="bg-sky-900">Air Adventures (Paragliding, Zip-lining)</option>
                    <option value="Water" className="bg-sky-900">Water Adventures (Rafting, Jet Ski)</option>
                    <option value="Land" className="bg-sky-900">Land Adventures (ATV Rides, Trekking)</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-sky-100">Preferred Date *</label>
                <div className="relative">
                  <input
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full bg-sky-900/40 backdrop-blur-sm border border-sky-700/50 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all duration-300"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-sky-100">Special Requests</label>
                <div className="relative">
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us about your adventure expectations..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-sky-900/40 backdrop-blur-sm border border-sky-700/50 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all duration-300 placeholder:text-sky-400/60"
                  ></textarea>
                  <div className="absolute right-3 top-4">
                    <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start" variants={itemVariants}>
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-5 h-5 text-cyan-500 bg-sky-900/40 border border-sky-700/50 rounded focus:ring-cyan-500/50"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-sky-100">
                    I agree to the <a href="#" className="text-cyan-400 hover:underline">terms, conditions</a> and 
                    <a href="#" className="text-cyan-400 hover:underline"> safety guidelines</a>
                  </label>
                </div>
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg relative overflow-hidden group mt-4"
                whileHover={{ 
                  scale: 1.02,
                  background: "linear-gradient(to right, #f59e0b, #fbbf24)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Book My Adventure Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      
     
    </div>
  );
};

export default AdventureContactForm;