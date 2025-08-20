import React, { useState } from "react";

const PayoutSetup = () => {
  const [form, setForm] = useState({
    accountType: "bank",
    accountNumber: "",
    ifsc: "",
    upi: "",
    paytm: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    setForm((prev) => ({ ...prev, accountType: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2>Payout Account Setup</h2>
      {submitted ? (
        <div style={{ color: "green" }}>Account details saved (mock)!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Account Type:
            <select name="accountType" value={form.accountType} onChange={handleTypeChange}>
              <option value="bank">Bank Account</option>
              <option value="upi">UPI</option>
              <option value="paytm">Paytm</option>
            </select>
          </label>
          <br /><br />
          {form.accountType === "bank" && (
            <>
              <label>
                Account Number:
                <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} required />
              </label>
              <br /><br />
              <label>
                IFSC Code:
                <input type="text" name="ifsc" value={form.ifsc} onChange={handleChange} required />
              </label>
              <br /><br />
            </>
          )}
          {form.accountType === "upi" && (
            <label>
              UPI ID:
              <input type="text" name="upi" value={form.upi} onChange={handleChange} required />
            </label>
          )}
          {form.accountType === "paytm" && (
            <label>
              Paytm Number:
              <input type="text" name="paytm" value={form.paytm} onChange={handleChange} required />
            </label>
          )}
          <br /><br />
          <button type="submit">Save Details</button>
        </form>
      )}
    </div>
  );
};

export default PayoutSetup;