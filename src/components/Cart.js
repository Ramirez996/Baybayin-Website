export default function Cart({ cartItems, onRemoveFromCart, onCheckout, calculateTotal }) {
  return (
    <div className="card">
      <h3>🛒 Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.cartItemID}>
                {item.productName} - ₱{item.price}
                <button onClick={() => onRemoveFromCart(item)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h4>Total: ₱{calculateTotal()}</h4>
            <button onClick={onCheckout} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}