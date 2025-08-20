import { FaStar, FaMapMarkerAlt, FaClock, FaUserFriends, FaCheck, FaCalendarAlt } from "react-icons/fa";
import BookingHeader from '../Booking/BookingHeader'; // adjust path if needed
import { useState } from 'react';
import ReviewForm from './ReviewForm';
import { useUser } from '@clerk/clerk-react';

export default function AdventureDetailPage({ adventure }) {
  if (!adventure) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <p className="text-xl text-slate-600 font-medium">Loading adventure details...</p>
        </div>
      </div>
    );
  }

  const { user } = useUser();

  // --- keep existing review + pricing logic identical ---
  const reviews = [
    { id: 1, name: "Sarah Johnson", rating: 5, comment: "An unforgettable experience! The guides were amazing.", date: "2024-03-15" },
    { id: 2, name: "Mike Thompson", rating: 4, comment: "Great adventure, would recommend to everyone.", date: "2024-03-10" },
    { id: 3, name: "Emma Davis", rating: 5, comment: "The views were breathtaking. Perfect organization.", date: "2024-03-05" }
  ];

  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleGuestChange = (type, delta) => {
    setGuests((prev) => {
      const newValue = Math.max(0, prev[type] + delta);
      if (type === 'adults' && newValue === 0) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  const guestSummary = `${guests.adults} Adult${guests.adults > 1 ? 's' : ''}` +
    (guests.children ? `, ${guests.children} Child${guests.children > 1 ? 'ren' : ''}` : '') +
    (guests.infants ? `, ${guests.infants} Infant${guests.infants > 1 ? 's' : ''}` : '');

  // Price breakdown logic (unchanged)
  const basePrice = Number(adventure.price?.replace(/[^\d.]/g, '')) || 0;
  const daysMatch = adventure.duration?.match(/(\d+)/);
  const numDays = daysMatch ? parseInt(daysMatch[1], 10) : 1;
  const numGuests = guests.adults + guests.children + guests.infants;
  const certificationFee = 50;
  const subtotal = basePrice * numDays * numGuests;
  const totalBeforeTax = subtotal + certificationFee;
  const estimatedTax = Math.round(totalBeforeTax * 0.12);
  const total = totalBeforeTax + estimatedTax;

  // Reviews storage (unchanged)
  const allReviews = JSON.parse(localStorage.getItem('adventureReviews') || '[]');
  const adventureReviews = allReviews.filter(r => r.adventureId === adventure.id);

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_0%_0%,#e0f2fe_0%,transparent_40%),radial-gradient(900px_400px_at_100%_10%,#ede9fe_0%,transparent_35%)] from-white">
      <BookingHeader />

      {/* Decorative top ribbon */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"></div>

      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Soft pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.16'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Image Gallery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
                <img 
                  src={adventure.image} 
                  alt={adventure.title}
                  className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-slate-800 shadow">
                      <FaMapMarkerAlt className="text-blue-500" /> {adventure.location}, {adventure.continent}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
                      <FaStar className="text-amber-500" /> {adventure.rating}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {adventure.type}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {adventure.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/60">
                <img 
                  src={adventure.image} 
                  alt="Gallery 1"
                  className="w-full h-44 lg:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200/60">
                  <img 
                    src={adventure.image} 
                    alt="Gallery 2"
                    className="w-full h-28 lg:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                </div>
                <div className="relative group overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200/60">
                  <img 
                    src={adventure.image} 
                    alt="Gallery 3"
                    className="w-full h-28 lg:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Title and Rating */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight tracking-tight">
                  {adventure.title}
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                  Explore an unforgettable experience crafted for curious explorers and thrill-seekers. Expert guides, safe equipment, and stunning landscapes—designed to make every moment count.
                </p>
              </div>

              {/* About Section */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 transition hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full mr-4"></span>
                  About this adventure
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">{adventure.description}</p>
              </div>

              {/* Adventure Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/60 shadow-lg transition hover:shadow-xl">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                    <FaClock className="text-blue-500 mr-3" />
                    Duration
                  </h3>
                  <p className="text-slate-700 font-semibold">{adventure.duration}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100/60 shadow-lg transition hover:shadow-xl">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                    <FaStar className="text-emerald-500 mr-3" />
                    Difficulty
                  </h3>
                  <p className="text-slate-700 font-semibold">{adventure.difficulty}</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full mr-4"></span>
                  What's Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Professional guide",
                    "All necessary equipment", 
                    "Lunch and snacks",
                    "Transportation to/from meeting point",
                    "Photos of your adventure"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100/60">
                      <FaCheck className="text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></span>
                  Additional Details
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: FaUserFriends, text: "Group size: 2-8 people", color: "text-blue-500" },
                    { icon: FaClock, text: "Start time: 8:00 AM", color: "text-emerald-500" },
                    { icon: FaCalendarAlt, text: "Available: Year-round", color: "text-purple-500" }
                  ].map((detail, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-100/60">
                      <detail.icon className={`${detail.color} text-xl flex-shrink-0`} />
                      <span className="text-slate-700 font-medium">{detail.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Price Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 transition hover:shadow-[0_20px_60px_rgba(2,6,23,.15)]">
                  <div className="text-center mb-8">
                    <h3 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      {adventure.price}
                    </h3>
                    <p className="text-slate-600 font-medium">per person</p>
                  </div>

                  {/* Guest Selection */}
                  <div className="mb-6 relative">
                    <label className="block text-sm font-bold text-slate-700 mb-3">Guests</label>
                    <input
                      type="text"
                      value={guestSummary}
                      readOnly
                      aria-label="Select number of guests"
                      onClick={() => setShowGuestModal(true)}
                      className="w-full p-4 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors duration-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {showGuestModal && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-20">
                        {[
                          { key: 'adults', label: 'Adults', min: 1 },
                          { key: 'children', label: 'Children', min: 0 },
                          { key: 'infants', label: 'Infants', min: 0 }
                        ].map(({ key, label, min }) => (
                          <div key={key} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                            <span className="font-medium text-slate-700">{label}</span>
                            <div className="flex items-center space-x-3">
                              <button 
                                onClick={() => handleGuestChange(key, -1)} 
                                disabled={guests[key] === min}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-slate-600 transition-colors"
                                aria-label={`Decrease ${label}`}
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold text-slate-800">{guests[key]}</span>
                              <button 
                                onClick={() => handleGuestChange(key, 1)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 transition-colors"
                                aria-label={`Increase ${label}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setShowGuestModal(false)}
                          className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-200"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 text-white font-extrabold text-lg rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-300">
                    Book Now
                  </button>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full mr-3"></span>
                    Price Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Base Price</span>
                      <span className="font-semibold text-slate-800">${basePrice} × {numDays} × {numGuests}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Certification</span>
                      <span className="font-semibold text-slate-800">${certificationFee}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Estimated Tax (12%)</span>
                      <span className="font-semibold text-slate-800">${estimatedTax}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">${total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <ReviewForm adventureId={adventure.id} userId={user?.id} />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full mr-4"></span>
                Reviews
              </h3>
              {adventureReviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                    <FaStar className="text-slate-400 text-2xl" />
                  </div>
                  <p className="text-slate-500 text-lg">No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {adventureReviews.map((review, index) => (
                    <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-100/60 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < review.rating ? "text-amber-400" : "text-slate-300"} 
                            />
                          ))}
                          <span className="font-bold text-slate-800 ml-2">{review.rating}/5</span>
                        </div>
                        <span className="text-sm text-slate-500">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-700 mb-3 leading-relaxed">{review.comment}</p>
                      <p className="text-sm font-medium text-slate-600">— {review.userId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Flush footer spacing */}
      <div className="h-8"></div>
    </div>
  );
}
