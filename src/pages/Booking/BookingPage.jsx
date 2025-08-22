// src/pages/Booking/BookingPage.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../Booking/BookingSearchBar';
import { FilterProvider, useFilter } from '../../context/FilterContext';
import { useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import '../../styles/components/BookingPage.css';
import { globalAdventureData } from "../../data/mock/data";

import AdventureCard from '../Booking/AdventureCard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// ---------------- Get User Location ----------------
function getUserLocation(setUserLocation) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        sessionStorage.setItem('userLocation', JSON.stringify(coords));
        setUserLocation(coords);
      },
      () => {
        setUserLocation(null);
      }
    );
  } else {
    setUserLocation(null);
  }
}

// ---------------- Location Mapping ----------------
const countryLatLng = {
  'Nepal': { lat: 28.3949, lng: 84.124 },
  'India': { lat: 20.5937, lng: 78.9629 },
  'Indonesia': { lat: -0.7893, lng: 113.9213 },
  'Turkey': { lat: 38.9637, lng: 35.2433 },
  'China': { lat: 35.8617, lng: 104.1954 },
  'Jordan': { lat: 30.5852, lng: 36.2384 },
  'Myanmar': { lat: 21.9162, lng: 95.956 },
  'Cambodia': { lat: 12.5657, lng: 104.991 },
  'Brazil': { lat: -14.235, lng: -51.9253 },
  'USA': { lat: 37.0902, lng: -95.7129 },
  'Morocco': { lat: 31.7917, lng: -7.0926 },
  'Australia': { lat: -25.2744, lng: 133.7751 },
  'Switzerland': { lat: 46.8182, lng: 8.2275 },
};

// ---------------- Distance Calculator ----------------
function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ---------------- Nearby Adventures Section ----------------
function NearbyAdventures({ userLocation, adventures }) {
  const adventuresWithDistance = adventures.map((adventure) => {
    const loc = countryLatLng[adventure.location];
    if (!loc) return { ...adventure, distance: Infinity };
    const distance = haversineDistance(
      userLocation.lat,
      userLocation.lng,
      loc.lat,
      loc.lng
    );
    return { ...adventure, distance };
  });

  const closest = adventuresWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  return (
    <div className="my-12 px-4 sm:px-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl">🌍</span>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Adventures Near You
          </h2>
          <span className="text-4xl">📍</span>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Based on your location, here are some amazing adventures you can experience nearby!
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {closest.map((adventure, index) => (
          <div
            key={adventure.id}
            className="animate-fade-in-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AdventureCard adventure={adventure} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Booking Page Core (Signed-in content) ----------------
function BookingPageContent() {
  const { setAddressSearch } = useFilter();
  const location = useLocation();
  const [userLocation, setUserLocation] = useState(null);
  const [allAdventures, setAllAdventures] = useState(globalAdventureData);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setAddressSearch(search);
  }, [location.search, setAddressSearch]);

  useEffect(() => {
    const stored = sessionStorage.getItem('userLocation');
    if (stored) {
      setUserLocation(JSON.parse(stored));
    } else {
      getUserLocation(setUserLocation);
    }
  }, []);

  useEffect(() => {
    const approvedAdventures = JSON.parse(localStorage.getItem('globalAdventureData') || '[]');
    const combinedAdventures = [...globalAdventureData, ...approvedAdventures];
    const uniqueAdventures = combinedAdventures.filter((adventure, index, self) =>
      index === self.findIndex((a) => a.id === adventure.id)
    );
    setAllAdventures(uniqueAdventures);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700">
      <SearchBar />
      {userLocation && (
        <NearbyAdventures userLocation={userLocation} adventures={allAdventures} />
      )}
    </div>
  );
}

// ---------------- Booking Page Wrapper ----------------
function BookingPage() {
  return (
    <div className="booking-page-container relative bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen">
      {/* Use single global header */}
      <Header />

      {/* Keep a little top padding so content doesn't hide behind sticky header */}
      <main className="pt-4">
        <SignedIn>
          <FilterProvider>
            <BookingPageContent />
          </FilterProvider>
        </SignedIn>

        <SignedOut>
          <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Please sign in to explore and book adventures
            </h2>
            <SignIn />
          </div>
        </SignedOut>
      </main>

      {/* Always show footer at the end */}
      <Footer className="mt-10" />
    </div>
  );
}

export default BookingPage;
