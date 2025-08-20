import React from "react";

const mockBookings = [
  {
    id: "BK001",
    date: "2024-06-01",
    adventure: "River Rafting",
    amount: 5000,
    commission: 500,
    net: 4500,
    status: "Paid",
  },
  {
    id: "BK002",
    date: "2024-06-03",
    adventure: "Mountain Trek",
    amount: 8000,
    commission: 800,
    net: 7200,
    status: "Pending",
  },
  {
    id: "BK003",
    date: "2024-06-05",
    adventure: "Jungle Safari",
    amount: 6000,
    commission: 600,
    net: 5400,
    status: "Paid",
  },
];

const EarningsDashboard = () => {
  const totalEarnings = mockBookings.reduce((sum, b) => sum + b.net, 0);
  const pending = mockBookings.filter((b) => b.status === "Pending").reduce((sum, b) => sum + b.net, 0);
  const paid = mockBookings.filter((b) => b.status === "Paid").reduce((sum, b) => sum + b.net, 0);

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2>Earnings & Bookings</h2>
      <div style={{ display: "flex", gap: 32, marginBottom: 24 }}>
        <div>
          <strong>Total Earnings:</strong> ₹{totalEarnings}
        </div>
        <div>
          <strong>Paid:</strong> ₹{paid}
        </div>
        <div>
          <strong>Pending:</strong> ₹{pending}
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Adventure</th>
            <th>Amount</th>
            <th>Commission</th>
            <th>Net Earnings</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.date}</td>
              <td>{b.adventure}</td>
              <td>₹{b.amount}</td>
              <td>₹{b.commission}</td>
              <td>₹{b.net}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsDashboard; 