import './App.css';
import { useState } from 'react';
import LoginSignup from './components/LoginSignup';
import AlphabetChart from './components/AlphabetChart';
import Shop from './components/Shop';
import GovernmentBills from './components/GovernmentBills';
import Cart from './components/Cart';
import Order from './components/Order';
import Payment from './components/Payment';

export default function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  // Cart class methods
  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, { ...product, cartItemID: Date.now() + Math.random() }]);
  };

  const removeFromCart = (productToRemove) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemID !== productToRemove.cartItemID));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  // Order class method: checkout()
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      const newOrder = {
        orderID: `ORD-${Date.now()}`,
        orderDate: new Date(),
        totalAmount: calculateTotal(),
        status: 'Pending',
        deliveryAddress: '', // This will be set in the Payment component
      };
      setCurrentOrder(newOrder);
      setIsPaymentConfirmed(false);
    }
  };

  // Payment class method: confirmPayment()
  const handleConfirmPayment = (paymentDetails) => {
    setIsPaymentConfirmed(true);
    setCurrentOrder(prevOrder => ({ 
      ...prevOrder, 
      status: 'Processing',
      deliveryAddress: paymentDetails.address
    }));
    alert(`Payment of ₱${currentOrder.totalAmount.toFixed(2)} confirmed! Order ID: ${currentOrder.orderID}`);
    setCartItems([]);
  };

  if (!user) {
    return <LoginSignup onLogin={(user) => setUser(user)} />;
  }

  return (
    <div className="app">
      {/* Homepage: displayMenu() */}
      <section className="hero">
        <h1 className="baybayin">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</h1>
        <h2>Adhikaing Angaw: Baybaying, Kasaysayan, at Kalakalan</h2>
        <p>Welcome, {user.name}! This is a website preserving Baybayin heritage through education, fashion, and governance.</p>
      </section>

      <main>
        <section className="section">
          <h2>📚 Education</h2>
          <AlphabetChart />
        </section>

        <section className="section alt">
          <h2>🎨 Design & Fashion</h2>
          <div className="shop-grid">
            <Shop onAddToCart={addToCart} />
            <Cart
              cartItems={cartItems}
              onRemoveFromCart={removeFromCart}
              onCheckout={handleCheckout}
              calculateTotal={calculateTotal}
            />
          </div>
        </section>
        
        {currentOrder && !isPaymentConfirmed && (
          <section className="section">
            <h2>📦 Your Order</h2>
            <Order order={currentOrder} />
            <Payment 
              totalAmount={currentOrder.totalAmount}
              onConfirmPayment={handleConfirmPayment}
            />
          </section>
        )}
        
        {isPaymentConfirmed && (
          <section className="section">
            <h2>✅ Order Confirmed!</h2>
            <p>Thank you for your purchase, {user.name}. Your order is now being processed.</p>
          </section>
        )}

        <section className="section">
          <h2>🏛️ Government Efforts</h2>
          <GovernmentBills />
        </section>
      </main>

      <footer className="footer">
        <p>CSA5 | © 2025 Reviving Baybayin Project | Preserving Heritage Through Technology</p>
      </footer>
    </div>
  );
}