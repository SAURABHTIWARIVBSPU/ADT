import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const teamMembers = [
  {
    name: 'Himanshu  Baliyan',
    role: 'Founder & CEO',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Adventure enthusiast and visionary leader.'
  },
  {
    name: 'Adarsh Shukla',
    role: 'Chief Experience Officer',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Curates unforgettable journeys for all.'
  },
  {
    name: 'Rohan Mehta',
    role: 'Head of Operations',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Ensures every adventure is safe and smooth.'
  },
];

const testimonials = [
  {
    name: 'Sana Verma',
    text: 'Himrahi made my first paragliding experience unforgettable! Highly recommended.',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Vikram Patel',
    text: 'Professional team and breathtaking adventures. Will book again!',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
  },
  {
    name: 'Meera Joshi',
    text: 'Loved the attention to safety and detail. 10/10!',
    img: 'https://randomuser.me/api/portraits/women/52.jpg',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <Header />
      <section className="text-gray-800 overflow-hidden">
        {/* Hero Section */}
        <div className="relative py-20 px-4 md:px-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn text-center">
            About <span className="text-yellow-300">Himrahi</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fadeIn delay-100 text-center">
            Where <span className="font-bold">adventure</span> meets <span className="font-bold">passion</span> across <span className="underline decoration-yellow-300">sky, land, and sea</span>
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#story" className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold shadow hover:bg-yellow-300 transition">Our Story</a>
            <a href="#team" className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-100 transition">Meet the Team</a>
          </div>
          <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
        </div>

        {/* Adventure Triangle Cards */}
        <div className="max-w-6xl mx-auto px-4 md:px-20 py-16 relative -mt-10 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l4-8 4 8m-4-8h4m5 0h4m-9 8h4m5 0h4m-9-8h4m5 0h4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Air Adventures</h3>
            <p className="text-gray-600 leading-relaxed">
              Soar through the skies with paragliding, zip-lining, and hot air ballooning experiences that will take your breath away.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l4-8 4 8m-4-8h4m5 0h4m-9 8h4m5 0h4m-9-8h4m5 0h4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Water Adventures</h3>
            <p className="text-gray-600 leading-relaxed">
              Dive into crystal-clear waters for rafting, kayaking, and snorkeling adventures that will make a splash in your memories.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l4-8 4 8m-4-8h4m5 0h4m-9 8h4m5 0h4m-9-8h4m5 0h4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Land Adventures</h3>
            <p className="text-gray-600 leading-relaxed">
              Conquer mountain trails, explore scenic routes, and experience the thrill of outdoor adventures on solid ground.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div id="story" className="max-w-5xl mx-auto px-4 md:px-20 py-12 md:py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <img src="/public/A4.webp" alt="Our Story" className="rounded-2xl shadow-lg w-full object-cover max-h-80" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              Founded by passionate adventurers, Himrahi was born from a desire to make the world’s most thrilling experiences accessible to everyone. From humble beginnings, we’ve grown into a trusted platform connecting thousands of explorers with unforgettable journeys.
            </p>
            <p className="text-gray-600">
              Our commitment to safety, sustainability, and community drives everything we do. Join us as we continue to push boundaries and inspire the spirit of adventure in all.
            </p>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div id="team" className="bg-gradient-to-r from-blue-100 to-blue-200 py-16 px-4 md:px-20">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg p-6 w-72 flex flex-col items-center hover:scale-105 transition-transform">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-200" />
                <h3 className="text-xl font-bold text-blue-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-center text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 text-white mb-20 relative overflow-hidden max-w-6xl mx-auto mt-16">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504609773096-104ff2c73ca4?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-yellow-300 mr-4"></span>
              Our Mission
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl">
              At Himrahi, we believe that adventure is not just an activity, but a transformative experience. Our mission is to connect people with nature's most exhilarating moments while maintaining the highest standards of safety and environmental responsibility. We curate experiences that challenge, inspire, and create lifelong memories.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto px-4 md:px-20">
          <div className="bg-white p-6 rounded-xl text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Happy Adventurers</div>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Unique Locations</div>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
            <div className="text-gray-600">Adventure Types</div>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Safety Record</div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 py-16 px-4 md:px-20">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-10">What Adventurers Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col items-center hover:scale-105 transition-transform">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-yellow-200" />
                <p className="text-gray-700 italic mb-2">"{t.text}"</p>
                <h4 className="text-yellow-700 font-bold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready for Your Next Adventure?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of adventurers who've trusted Himrahi for unforgettable experiences in the most breathtaking locations.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full hover:shadow-lg transition-all font-semibold hover:scale-105 transform"
          >
            Start Your Journey Today
          </a>
        </div>
      </section>
      <Footer />
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;