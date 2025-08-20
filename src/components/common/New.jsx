import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WhatsNew() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const items = [
    {
      title: 'Mountain Trek 2025',
      subtitle: 'Registration is open for our thrilling Himalayan trek!',
      details: 'June 10-15, 2025 | Manali to Leh',
      action: 'Register now',
      icon: '🏔️',
      gradient: 'from-blue-500 to-teal-500'
    },
    {
      title: 'Get Certified',
      subtitle: 'Become a certified Himrahi trek leader',
      details: 'Free certification, all year round',
      action: 'Learn more',
      icon: '📜',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Adventure Trends',
      subtitle: 'Top destinations & outdoor trends for 2025',
      details: 'Download our free adventure eBook',
      action: 'Download eBook',
      icon: '📘',
      gradient: 'from-emerald-500 to-green-500'
    },
  ];

  // Animation variants
  const container = {
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
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const hoverVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
      y: -10
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 py-24 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-gradient-to-r from-blue-400 to-teal-300 rounded-full mix-blend-soft-light opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-gradient-to-r from-amber-400 to-orange-300 rounded-full mix-blend-soft-light opacity-20 blur-3xl animate-float animation-delay-2000"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Latest Updates
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            What's New at <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Himrahi Adventure</span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {items.map((item, index) => (
            <motion.div 
              key={index}
              className="relative"
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient overlay */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 0.1 : 0 
                }}
                transition={{ duration: 0.4 }}
              />
              
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative"
                variants={hoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <div className="p-6">
                  {/* Icon with animated gradient background */}
                  <motion.div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${index === 0 ? '#3b82f6, #14b8a6' : index === 1 ? '#f59e0b, #f97316' : '#10b981, #22c55e'})`
                    }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 mb-5">{item.subtitle}</p>
                  
                  <div className="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{item.details}</span>
                  </div>
                  
                  <motion.button 
                    className="group relative inline-flex items-center font-semibold text-blue-600"
                    whileHover={{ color: "#1d4ed8" }}
                  >
                    {item.action}
                    <motion.span 
                      className="ml-2"
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 10 
                      }}
                    >
                      &rarr;
                    </motion.span>
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredIndex === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Animated footer */}
        <motion.div 
          className="text-center mt-16 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            More exciting updates coming soon. Stay tuned!
          </p>
        </motion.div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}