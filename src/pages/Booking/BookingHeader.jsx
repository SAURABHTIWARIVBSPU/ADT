import React, { useState } from 'react';
import { User, Menu, Heart, Briefcase, MessageCircle, Bell, Globe, HelpCircle, Handshake } from 'lucide-react';

function BookingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Mock data - replace with your actual context and auth
  const setActiveFilter = (filter) => console.log('Filter:', filter);
  const isSignedIn = true; // Replace with actual auth state
  const user = { primaryEmailAddress: { emailAddress: 'user@example.com' } };

  const tabToType = {
    Air: 'Air Tour',
    Water: 'Water Sports',
    Land: 'Land Adventure',
  };

  return (
    <header className="w-full bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="logo.png?height=40&width=120&text=Adventure+Triangle" 
              alt="Adventure Triangle Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Center: Navigation Tabs */}
          <nav className="hidden md:flex space-x-8">
            {['Air', 'Water', 'Land'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(tabToType[category])}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border-2 border-transparent hover:border-blue-200"
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Right: Profile + Menu */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
            
            <div className="relative">
              <button 
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    {isSignedIn && user && (
                      <p className="text-sm text-gray-600">
                        Signed in as <span className="font-semibold text-gray-900">{user.primaryEmailAddress?.emailAddress}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="py-2">
                    {[
                      { icon: Handshake, label: 'Become a Partner', href: '/partner' },
                      { icon: Heart, label: 'Wishlist', href: '/wishlist' },
                      { icon: Briefcase, label: 'Trips', href: '/trips/history' },
                      { icon: MessageCircle, label: 'Messages', href: '#' },
                      { icon: User, label: 'Profile', href: '#' },
                      { icon: Bell, label: 'Notifications', href: '#' },
                      { icon: Globe, label: 'Language', href: '#' },
                      { icon: HelpCircle, label: 'Help', href: '#' },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 text-gray-500" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                    
                    {isSignedIn && (
                      <button
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-gray-100 pt-4"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ❌ Mobile Navigation (blue strip) removed */}
      </div>
    </header>
  );
}

export default BookingHeader;
