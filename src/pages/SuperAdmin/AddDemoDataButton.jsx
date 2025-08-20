import React from 'react';

export default function AddDemoDataButton({ onAdd }) {
  const handleAddDemoData = () => {
    // Demo bookings
    const demoBookings = [
      {
        userId: 'user_1',
        adventureId: 101,
        status: 'confirmed',
        persons: 2,
        dates: '2024-07-21',
        totalPrice: 500,
        certification: 'Basic Completion Certificate',
      },
      {
        userId: 'user_2',
        adventureId: 102,
        status: 'pending',
        persons: 1,
        dates: '2024-07-22',
        totalPrice: 300,
        certification: null,
      },
    ];
    localStorage.setItem('myBookings', JSON.stringify(demoBookings));

    // Demo certifications
    const demoCerts = [
      {
        userId: 'user_1',
        name: 'Alice',
        email: 'alice@example.com',
        certificationTitle: 'Paragliding Instructor Certification',
        date: new Date().toISOString(),
        status: 'Registered',
        price: 350,
      },
      {
        userId: 'user_3',
        name: 'Bob',
        email: 'bob@example.com',
        certificationTitle: 'Mountain Trek Leader',
        date: new Date().toISOString(),
        status: 'Registered',
        price: 400,
      },
    ];
    localStorage.setItem('myCertifications', JSON.stringify(demoCerts));

    // Demo pending adventures (partners)
    const demoPending = [
      {
        id: 201,
        title: 'Jungle Safari',
        description: 'Explore the wild jungle!',
        location: 'India',
        type: 'Wildlife',
        price: 200,
        mainImage: '/public/a11.webp',
        status: 'pending',
        partnerEmail: 'partner1@example.com',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('pendingAdventures', JSON.stringify(demoPending));

    // Demo published adventures (partners)
    const demoPublished = [
      {
        id: 202,
        title: 'Desert Adventure',
        description: 'Ride camels in the desert!',
        location: 'Morocco',
        type: 'Desert',
        price: 350,
        mainImage: '/public/a12.webp',
        status: 'approved',
        partnerEmail: 'partner2@example.com',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('publishedAdventures', JSON.stringify(demoPublished));

    if (onAdd) onAdd();
    alert('Demo data added! Refresh the dashboard to see it.');
  };

  return (
    <button
      style={{
        background: '#22c55e',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 32px',
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 24,
        cursor: 'pointer',
        boxShadow: '0 2px 8px #22c55e33',
      }}
      onClick={handleAddDemoData}
    >
      Add Demo Data
    </button>
  );
} 