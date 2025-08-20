import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { globalAdventureData } from "../../Data/data";
import { useUser, SignIn } from '@clerk/clerk-react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../styles/components/AdventureDetail.css';
import Header from '../Booking/BookingHeader'; // Adjust the import path as necessary
import Footer from '../../components/layout/Footer';

// Helper to extract numeric price from string
const getNumericPrice = (priceStr: string | undefined) => {
  if (!priceStr) return 0;
  // Extract first number (handles $1,200 for 12 days, etc.)
  const match = priceStr.replace(/,/g, '').match(/([0-9]+(\.[0-9]+)?)/);
  return match ? Number(match[1]) : 0;
};

export default function AdventureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const adventure: any = globalAdventureData.find(item => item.id.toString() === id);
  if (!adventure) {
    return <div className="ad-page"><Header /><div className="not-found">Adventure not found!</div><Footer /></div>;
  }

  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(getNumericPrice(adventure.price));
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    persons: 1,
    startDate: '',
    endDate: '',
    days: 1,
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const certificationOptions = [
    { id: 1, name: "Basic Completion Certificate", difficulty: ["Easy"], price: 20 },
    { id: 2, name: "Adventure Achievement Certificate", difficulty: ["Easy", "Medium"], price: 40 },
    { id: 3, name: "Advanced Explorer Certification", difficulty: ["Medium", "Hard"], price: 60 },
    { id: 4, name: "Universal Adventurer Diploma", difficulty: ["Hard", "Extreme"], price: 100 },
  ];

  const handleCertificationSelect = (cert: any) => {
    setSelectedCertification(cert);
    setTotalPrice(getNumericPrice(adventure.price) + cert.price);
  };

  const calculateTotalPrice = () => {
    if (!adventure) return 0;
    const basePrice = getNumericPrice(adventure.price) * bookingDetails.persons * bookingDetails.days;
    const certificationPrice = selectedCertification ? selectedCertification.price : 0;
    return basePrice + certificationPrice;
  };

  const handleBookingFormSubmit = (e: any) => {
    e.preventDefault();
    const finalPrice = calculateTotalPrice();
    setTotalPrice(finalPrice);
    setShowBookingForm(false);
    navigate('/review-payment', {
      state: {
        adventure,
        certification: selectedCertification,
        totalPrice: finalPrice,
        bookingDetails
      }
    });
  };

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const days = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    setDateRange([ranges.selection]);
    setBookingDetails(prev => ({
      ...prev,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      days,
    }));
  };

  const handleBookNow = () => {
    if (!isSignedIn) {
      navigate('/booking');
      return;
    }
    setShowBookingForm((s) => !s);
  };

  // Enhanced recommendations
  const relatedAdventures: any[] = globalAdventureData
    .filter((item: any) =>
      item.id !== adventure.id &&
      item.continent === adventure.continent &&
      item.type === adventure.type
    )
    .slice(0, 3);

  const sameDifficultyAdventures: any[] = globalAdventureData
    .filter((item: any) =>
      item.id !== adventure.id &&
      item.difficulty === adventure.difficulty
    )
    .slice(0, 3);

  const popularNearbyAdventures: any[] = globalAdventureData
    .filter((item: any) =>
      item.id !== adventure.id &&
      item.continent === adventure.continent &&
      item.rating >= 4.8
    )
    .slice(0, 3);

  return (
    <>
      <Header />

      {/* Page Wrapper */}
      <div className="ad-page">
        {/* HERO */}
        <section className="ad-hero">
          <div className="ad-hero-media">
            <img className="ad-hero-img" src={adventure.image} alt={adventure.title} />
            <div className="ad-hero-overlay" />
            <div className="ad-hero-content">
              <div className="ad-hero-topline">
                <span className="chip">{adventure.type}</span>
                <span className="chip">Difficulty: {adventure.difficulty}</span>
                <span className="chip">Group: {adventure.groupSize}</span>
                <span className="chip">⏱ {adventure.duration}</span>
              </div>
              <h1 className="ad-hero-title">{adventure.title}</h1>
              <div className="ad-hero-sub">
                <span className="loc">📍 {adventure.location} · {adventure.continent}</span>
                <span className="rating">⭐ {adventure.rating}</span>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="ad-grid">
          {/* LEFT: details */}
          <div className="ad-left">
            {/* About */}
            <div className="card">
              <h2 className="card-title">About this adventure</h2>
              <p className="card-desc">{adventure.description}</p>
              <div className="ad-specs">
                <div className="spec"><span>Languages</span><b>{adventure.languages}</b></div>
                <div className="spec"><span>Duration</span><b>{adventure.duration}</b></div>
                <div className="spec"><span>Type</span><b>{adventure.type}</b></div>
                <div className="spec"><span>Difficulty</span><b>{adventure.difficulty}</b></div>
              </div>
            </div>

            {/* Included */}
            <div className="card">
              <h3 className="card-title">What’s included</h3>
              <ul className="included">
                {(adventure.included && adventure.included.map((item: any, i: number) => (
                  <li key={i}><span className="tick">✓</span>{item}</li>
                ))) || (
                  <>
                    <li><span className="tick">✓</span>Professional guides with universal training</li>
                    <li><span className="tick">✓</span>All necessary equipment</li>
                    <li><span className="tick">✓</span>Safety briefing and orientation</li>
                    <li><span className="tick">✓</span>Cultural immersion activities</li>
                  </>
                )}
              </ul>
            </div>

            {/* Certifications */}
            <div className="card">
              <h3 className="card-title">Add Certification (optional)</h3>
              <div className="cert-list">
                {certificationOptions
                  .filter(cert => cert.difficulty.includes(adventure.difficulty))
                  .map(cert => (
                    <label key={cert.id} className={`cert ${selectedCertification?.id === cert.id ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="certification"
                        checked={selectedCertification?.id === cert.id}
                        onChange={() => handleCertificationSelect(cert)}
                      />
                      <div className="cert-meta">
                        <b>{cert.name}</b>
                        <span className="cert-price">+${cert.price}</span>
                      </div>
                    </label>
                  ))}
              </div>
            </div>

            {/* Related Sections */}
            <div className="card">
              <h3 className="card-title">Related Adventures (Same Continent & Type)</h3>
              <div className="rel-grid">
                {relatedAdventures.length === 0 && <div className="empty">No related adventures found.</div>}
                {relatedAdventures.map(item => (
                  <div key={item.id} className="rel-card" onClick={() => navigate(`/adventures/${item.id}`)}>
                    <div className="rel-thumb-wrap">
                      <img src={item.image} alt={item.title} className="rel-thumb" />
                    </div>
                    <div className="rel-info">
                      <h4 className="rel-title">{item.title}</h4>
                      <div className="rel-meta">
                        <span>{item.location}</span>
                        <span className="rel-price">{item.price}</span>
                      </div>
                      <button
                        className="btn ghost"
                        onClick={e => { e.stopPropagation(); navigate(`/adventures/${item.id}`); }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Same Difficulty Picks</h3>
              <div className="rel-grid">
                {sameDifficultyAdventures.length === 0 && <div className="empty">No adventures with the same difficulty found.</div>}
                {sameDifficultyAdventures.map(item => (
                  <div key={item.id} className="rel-card" onClick={() => navigate(`/adventures/${item.id}`)}>
                    <div className="rel-thumb-wrap">
                      <img src={item.image} alt={item.title} className="rel-thumb" />
                    </div>
                    <div className="rel-info">
                      <h4 className="rel-title">{item.title}</h4>
                      <div className="rel-meta">
                        <span>{item.location}</span>
                        <span className="rel-price">{item.price}</span>
                      </div>
                      <button
                        className="btn ghost"
                        onClick={e => { e.stopPropagation(); navigate(`/adventures/${item.id}`); }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Popular Nearby (Rating ≥ 4.8)</h3>
              <div className="rel-grid">
                {popularNearbyAdventures.length === 0 && <div className="empty">No popular picks nearby found.</div>}
                {popularNearbyAdventures.map(item => (
                  <div key={item.id} className="rel-card" onClick={() => navigate(`/adventures/${item.id}`)}>
                    <div className="rel-thumb-wrap">
                      <img src={item.image} alt={item.title} className="rel-thumb" />
                    </div>
                    <div className="rel-info">
                      <h4 className="rel-title">{item.title}</h4>
                      <div className="rel-meta">
                        <span>{item.location}</span>
                        <span className="rel-price">{item.price}</span>
                      </div>
                      <div className="rel-tags"><span>⭐ {item.rating}</span></div>
                      <button
                        className="btn ghost"
                        onClick={e => { e.stopPropagation(); navigate(`/adventures/${item.id}`); }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: sticky booking card */}
          <aside className="ad-right">
            <div className="book-card">
              <div className="book-head">
                <div className="book-price">
                  <span className="curr">From</span>
                  <div className="amt">${getNumericPrice(adventure.price)}</div>
                  <span className="per">per day</span>
                </div>
                <div className="book-rating">⭐ {adventure.rating}</div>
              </div>

              <div className="book-body">
                <div className="inputs">
                  <div className="input">
                    <label>Guests</label>
                    <div className="stepper">
                      <button
                        type="button"
                        className="step"
                        onClick={() => setBookingDetails(p => ({ ...p, persons: Math.max(1, p.persons - 1) }))}>−</button>
                      <input
                        type="number"
                        value={bookingDetails.persons}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, persons: Math.max(1, parseInt(e.target.value || '1')) })}
                        required
                      />
                      <button
                        type="button"
                        className="step"
                        onClick={() => setBookingDetails(p => ({ ...p, persons: p.persons + 1 }))}>+</button>
                    </div>
                  </div>

                  <div className="input">
                    <label>Dates</label>
                    <div className="date-summary">
                      <span>{bookingDetails.startDate || '—'} → {bookingDetails.endDate || '—'}</span>
                      <span className="days">{bookingDetails.days} day(s)</span>
                    </div>
                    <button className="btn tiny" onClick={(e) => { e.preventDefault(); setShowBookingForm(s => !s); }}>
                      {showBookingForm ? 'Hide Calendar' : 'Select Dates'}
                    </button>
                  </div>
                </div>

                {showBookingForm && (
                  <form className="ad-date-form" onSubmit={handleBookingFormSubmit}>
                    <DateRange
                      editableDateInputs={true}
                      onChange={handleDateRangeChange}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                    />
                    <div className="calc">
                      <div className="row"><span>Base</span><b>${getNumericPrice(adventure.price) * bookingDetails.persons * bookingDetails.days}</b></div>
                      {selectedCertification && (
                        <div className="row"><span>Certification</span><b>+${selectedCertification.price}</b></div>
                      )}
                      <div className="row total"><span>Total</span><b>${calculateTotalPrice()}</b></div>
                    </div>
                    <button className="btn primary" type="submit">
                      Continue to Review & Payment
                    </button>
                  </form>
                )}

                {!showBookingForm && (
                  <div className="cta">
                    <div className="calc mini">
                      <div className="row"><span>Selected</span><b>${totalPrice}</b></div>
                    </div>
                    <button className="btn primary" onClick={handleBookNow}>
                      {selectedCertification ? "Book with Certification" : "Book Now"}
                    </button>
                    {!isSignedIn && <div className="hint">Sign in required at next step.</div>}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>

      <Footer />
    </>
  );
}
