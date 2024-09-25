import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handlePayment = (e) => {
    e.preventDefault();
    // Payment processing logic (integrate your payment gateway here)
    alert('Payment processed successfully!');
  };

  return (
    <div className="payment-container">
      <h1>Make a Payment</h1>
      <form onSubmit={handlePayment} className="payment-form">
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label htmlFor="payment-method">Payment Method:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>

        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
