// Utility functions to get all admin data from localStorage

export function getAllBookings() {
  return JSON.parse(localStorage.getItem('myBookings') || '[]');
}

export function getAllCertifications() {
  return JSON.parse(localStorage.getItem('myCertifications') || '[]');
}

export function getAllPendingAdventures() {
  return JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
}

export function getAllPublishedAdventures() {
  return JSON.parse(localStorage.getItem('publishedAdventures') || '[]');
}

export function getAllUsers() {
  const bookings = getAllBookings();
  const certifications = getAllCertifications();
  return Array.from(new Set([
    ...bookings.map(b => b.userId),
    ...certifications.map(c => c.userId),
  ])).filter(Boolean);
}

export function getAllPartners() {
  const pending = getAllPendingAdventures();
  const published = getAllPublishedAdventures();
  return Array.from(new Set([
    ...pending.map(a => a.partnerEmail),
    ...published.map(a => a.partnerEmail),
  ])).filter(Boolean);
}

export function getTotalBookingAmount() {
  return getAllBookings().reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
}

export function getTotalCertificationAmount() {
  return getAllCertifications().reduce((sum, c) => sum + (Number(c.price) || 0), 0);
}

export function getTotalAmount() {
  return getTotalBookingAmount() + getTotalCertificationAmount();
} 