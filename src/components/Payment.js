import { useState } from 'react';

export default function Payment({ totalAmount, onConfirmPayment }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const amount = totalAmount;

  const handlePaymentClick = () => {
    if (paymentMethod && address) {
      onConfirmPayment({
        paymentID: `PAY-${Date.now()}`,
        method: paymentMethod,
        amount: amount,
        address: address
      });
    } else {
      alert("Please select a payment method and enter your address.");
    }
  };

  return (
    <div className="card payment-card">
      <h3>Payment</h3>
      <p><strong>Amount Due:</strong> ₱{amount.toFixed(2)}</p>
      
      <label htmlFor="address">Delivery Address:</label>
      <input 
        type="text" 
        id="address" 
        placeholder="Enter delivery address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      />

      <label htmlFor="payment-method">Payment Method:</label>
      <select id="payment-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="Card">Credit/Debit Card</option>
        <option value="GCash">GCash</option>
        <option value="Paypal">PayPal</option>
      </select>
      
      <button onClick={handlePaymentClick}>Confirm Payment</button>
    </div>
  );
}