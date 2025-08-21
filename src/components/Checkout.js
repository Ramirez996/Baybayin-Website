import { useState } from 'react';

export default function Checkout({ cart }) {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const confirmOrder = () => {
    if (!address || !payment) {
      alert("Please fill in all details!");
      return;
    }
    alert(`Order confirmed!\nDelivery: ${address}\nPayment: ${payment}\nTotal: ₱${total}`);
  };

  return (
    <div className="card">
      <h3>Checkout</h3>
      <p>Total: ₱{total}</p>

      <label>Delivery Address:</label><br />
      <input
        type="text"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      /><br />

      <label>Payment Method:</label><br />
      <select value={payment} onChange={(e) => setPayment(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="COD">Cash on Delivery</option>
        <option value="GCash">GCash</option>
        <option value="Card">Credit/Debit Card</option>
      </select><br /><br />

      <button onClick={confirmOrder}>Confirm Payment</button>
    </div>
  );
}
