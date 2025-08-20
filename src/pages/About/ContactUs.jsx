import React from 'react';
import Header from '../../components/layout/Header';
import AdventureContactForm from '../About/ContactUs.jsx';
import Footer from '../../components/layout/Footer';
// Add for icons and carousel
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Alex Johnson',
    text: 'Booking with Adventure Triangle was seamless and the experience was unforgettable! Highly recommend to all adventure lovers.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Singh',
    text: 'The team was super helpful and the guides were professional. I felt safe and had so much fun!',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Carlos Martinez',
    text: 'Amazing adventures, great support, and beautiful locations. Will book again!',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);
  const t = testimonials[index];
  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-in-out">
      <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full shadow-lg mb-4 border-4 border-blue-200" />
      <p className="text-lg italic text-gray-700 mb-2 max-w-xl text-center">"{t.text}"</p>
      <span className="font-semibold text-blue-700">- {t.name}</span>
      <div className="flex mt-2 space-x-2">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-blue-600' : 'bg-blue-200'}`}></button>
        ))}
      </div>
    </div>
  );
}

function ContactUs() {
  // For FAQ open/close
  const [openFAQ, setOpenFAQ] = useState(0);
  const faqs = [
    {
      q: 'What are your operating hours?',
      a: 'Our office is open Monday to Friday from 9:00 AM to 6:00 PM, and weekends from 10:00 AM to 4:00 PM. Adventure activities operate 7 days a week from sunrise to sunset.'
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 2 weeks in advance for standard packages. For custom or large group adventures, please contact us at least 4 weeks in advance.'
    },
    {
      q: 'What safety measures do you have?',
      a: 'All our activities follow strict safety protocols with certified guides, top-quality equipment, and regular safety audits. We maintain small group sizes for personalized attention.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-teal-50 to-white animate-fadein">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden">
          <img src="/public/dashboardbag.webp" alt="Adventure" className="absolute w-full h-full object-cover object-center scale-105 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/70 via-teal-500/60 to-transparent"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto animate-slidein">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight animate-gradient">Get In Touch With Us</h1>
            <p className="text-xl text-white/90 mb-6">Have questions about our adventures? Want to book a custom package? Our team is ready to help you plan your perfect adventure experience.</p>
            <a href="#contact-form" className="inline-block px-8 py-3 bg-white/90 text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-100 transition">Contact Now</a>
          </div>
        </div>

        {/* Contact Form & Info Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form Card */}
          <div id="contact-form" className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col justify-center animate-fadein-up">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Send Us a Message</h2>
            <AdventureContactForm />
            <div className="flex justify-center mt-6 space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition" /></a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition" /></a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-blue-400 text-2xl hover:scale-110 transition" /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-blue-800 text-2xl hover:scale-110 transition" /></a>
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8 animate-fadein-up delay-200">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start group hover:bg-blue-50 rounded-lg p-2 transition">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg"><FaPhoneAlt className="text-blue-600 text-xl" /></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <a href="tel:+15551234567" className="text-blue-700 hover:underline block">+1 (555) 123-4567</a>
                    <a href="tel:+15559876543" className="text-blue-700 hover:underline block">+1 (555) 987-6543 (24/7 Support)</a>
                  </div>
                </div>
                <div className="flex items-start group hover:bg-blue-50 rounded-lg p-2 transition">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg"><FaEnvelope className="text-blue-600 text-xl" /></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <a href="mailto:info@adventuretriangle.com" className="text-blue-700 hover:underline block">info@adventuretriangle.com</a>
                    <a href="mailto:bookings@adventuretriangle.com" className="text-blue-700 hover:underline block">bookings@adventuretriangle.com</a>
                  </div>
                </div>
                <div className="flex items-start group hover:bg-blue-50 rounded-lg p-2 transition">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg"><FaMapMarkerAlt className="text-blue-600 text-xl" /></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Adventure Way</p>
                    <p className="text-gray-600">Mountain View, CA 94040</p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b last:border-b-0 pb-3">
                    <button
                      className="flex justify-between items-center w-full font-medium cursor-pointer text-blue-600 text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-expanded={openFAQ === i}
                      onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                    >
                      <span>{faq.q}</span>
                      <span className={`transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`}>
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${openFAQ === i ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-600 mt-2">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-gradient-to-r from-blue-100 via-teal-100 to-white py-12 px-4 animate-fadein-up">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Adventurers Say</h2>
          <TestimonialCarousel />
        </div>

        {/* Map Section */}
        <div className="bg-gray-200 py-12 px-4 animate-fadein-up">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Find Us On The Map</h2>
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291533!2d-73.9878449242239!3d40.75798597138938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1623251234567!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Adventure Triangle Location"
              ></iframe>
              <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 shadow-lg flex items-center space-x-2 animate-bounce">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <span className="font-semibold text-gray-700">We are here!</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* Animations */}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 1s ease; }
        .animate-fadein-up { animation: fadein 1.2s cubic-bezier(.4,0,.2,1); }
        @keyframes slidein {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slidein { animation: slidein 1.2s cubic-bezier(.4,0,.2,1); }
        @keyframes gradient {
          0% { color: #fff; }
          50% { color: #38bdf8; }
          100% { color: #fff; }
        }
        .animate-gradient { animation: gradient 3s infinite alternate; }
      `}</style>
    </div>
  );
}

export default ContactUs;