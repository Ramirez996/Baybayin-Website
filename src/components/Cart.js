export default function Cart({ cart, onCheckout }) {
  return (
    <div className="card">
      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} - ₱{item.price}</li>
          ))}
        </ul>
      )}
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
}
    