import './App.css';
import { useState } from 'react';
import LoginSignup from './components/LoginSignup';
import AlphabetChart from './components/AlphabetChart';
import Shop from './components/Shop';
import GovernmentBills from './components/GovernmentBills';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Order from './components/Order';
import Payment from './components/Payment';
import facebookIcon from './images/facebook.png';
import instagramIcon from './images/instagram.png';
import twitterIcon from './images/X.png';


export default function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [appMessage, setAppMessage] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false); 
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showModal, setShowModal] = useState(false);  

  // === Message Component ===
  const Message = ({ text, onClose, type }) => (
    <div className={`custom-message-box ${type || 'success'}`}>
      <div className="message-content">
        <p>{text}</p>
        <button onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );

  // === Modal Component ===
  const Modal = ({ title, children, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );

  // === Logout ===
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      setCartItems([]);
      setCurrentOrder(null);
      setIsPaymentConfirmed(false);
      setAppMessage("You have been logged out successfully.");
      setIsLoggingOut(false);
    }, 800);
  };

  // === Cart Methods ===
  const addToCart = (product) => {
    setCartItems(prevItems => [
      ...prevItems,
      { ...product, cartItemID: Date.now() + Math.random() }
    ]);
  };

  const removeFromCart = (productToRemove) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.cartItemID !== productToRemove.cartItemID)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

const handleCheckout = () => {
    if (cartItems.length > 0) {
        // Show the Checkout form (Shipping/Payment details)
        setShowCheckoutForm(true); 
        setIsCartVisible(true); // Ensure cart view is still active
        setCurrentOrder(null); // Reset order data while collecting details
    }
};

// 🆕 New Handler to process data from the Checkout Form and initiate the Order/Payment flow
const handleProceedToPayment = ({ address, paymentMethod }) => {
    const newOrder = {
        orderID: `ORD-${Date.now()}`,
        orderDate: new Date(),
        totalAmount: calculateTotal(),
        status: 'Pending',
        deliveryAddress: address, // Use the address from the form
        paymentMethod: paymentMethod // Store payment method
    };
    setCurrentOrder(newOrder);
    setIsPaymentConfirmed(false);
    setShowCheckoutForm(false); // Hide the checkout form
};

  const handleConfirmPayment = (paymentDetails) => {
    setIsPaymentConfirmed(true);
    setCurrentOrder(prevOrder => ({
      ...prevOrder,
      status: 'Processing',
      deliveryAddress: paymentDetails.address
    }));
    setCartItems([]);
    setIsCartVisible(false);
    setShowModal(true); // ✅ show modal after payment confirmed
  };

  // === Login Page ===
  if (!user) {
    return (
      <div className="app">
        {appMessage && <Message text={appMessage} onClose={() => setAppMessage(null)} />}
        <LoginSignup onLogin={(userData) => setUser(userData)} />
      </div>
    );
  }

  // === Main App Layout ===
  return (
    <div className="app">
      {appMessage && <Message text={appMessage} onClose={() => setAppMessage(null)} />}

      {/* === Dropdown Menu === */}
      <div className="dropdown-container">
  <button
    className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    {isMenuOpen ? '✕ Close' : '☰ Menu'}
  </button>

  {/* Overlay for closing when clicking outside */}
  <div
    className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
    onClick={() => setIsMenuOpen(false)}
  ></div>

  <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
    <button onClick={() => { setActiveSection(null); setIsMenuOpen(false); }}>🏠 Home</button>
    <button onClick={() => { setActiveSection('education'); setIsMenuOpen(false); }}>📖 Education</button>
    <button onClick={() => { setActiveSection('fashion'); setIsMenuOpen(false); }}>🛍️ Design & Fashion</button>
    <button onClick={() => { setActiveSection('government'); setIsMenuOpen(false); }}>🏛️ Government</button>
  </div>
</div>

      {/* === Logout Button === */}
      <button
        className="logout-btn"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut && <div className="loading-spinner"></div>}
        <span className="button-text">
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </span>
      </button>

      {/* === Hero Section === */}
      <section className="hero">
        <h1 className="baybayin">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</h1>
        <h2>An Integrated Online System for Baybayin: Merchandising and Educational Initiatives</h2>
        <div className="user-info-container">
          <p className="welcome-message">
            Welcome, {user.name}! This website preserves Baybayin heritage through education, fashion, and governance.
          </p>
        </div>
      </section>

      {/* === Conditional Sections === */}
      <main>
        {activeSection === 'education' && (
          <section className="section">
            <h2>Education</h2>
            <AlphabetChart />
          </section>
        )}

        {activeSection === 'fashion' && (
          <section className="section alt">
            <h2>Design & Fashion</h2>

            {/* 🛒 View Cart Button */}
            <button
              className="view-cart-btn"
              onClick={() => setIsCartVisible(!isCartVisible)}
            >
              🛒 {isCartVisible ? 'Back to Products' : `View Cart (${cartItems.length})`}
            </button>

{/* ✅ Toggle between products and cart/checkout/payment */}
    {!isCartVisible ? (
      <div className="shop-grid">
        <Shop onAddToCart={addToCart} />
      </div>
    ) : (
      <>
        {/* 1. Cart View */}
        {!currentOrder && !showCheckoutForm && (
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            // When "Checkout" is clicked in Cart, it sets showCheckoutForm to true
            onCheckout={handleCheckout} 
            calculateTotal={calculateTotal}
          />
        )}

        {/* 2. Checkout Form (Shipping/Payment Details) */}
        {showCheckoutForm && (
          <Checkout 
            cart={cartItems} 
            onProceed={handleProceedToPayment} 
          />
        )}

        {/* 3. Order & Payment Handling (after checkout form is submitted) */}
        {currentOrder && !isPaymentConfirmed && (
          <div>
            <Order order={currentOrder} />
            <Payment
              totalAmount={currentOrder.totalAmount}
              onConfirmPayment={handleConfirmPayment}
            />
          </div>
        )}
      </>
    )}
          </section>
        )}

        {activeSection === 'government' && (
          <section className="section">
            <h2>Government Efforts</h2>
            <GovernmentBills />
          </section>
        )}
      </main>

      {/* ✅ Modal for Order Confirmation */}
      {showModal && (
        <Modal
          title="Order Confirmed!"
          onClose={() => setShowModal(false)}
        >
          <p>Thank you for your purchase, {user.name}. Your order is now being processed.</p>
          <p><strong>Order ID:</strong> {currentOrder?.orderID}</p>
          <p><strong>Total Paid:</strong> ₱{currentOrder?.totalAmount.toFixed(2)}</p>
        </Modal>
      )}

      <footer className="footer">
        <p>CSA5 | © 2025 Reviving Baybayin Project | Preserving Heritage Through Technology</p>
      </footer>
      
{/* === Floating Social Links === */}
<div className="floating-socials">
  <a
    href="https://www.facebook.com/profile.php?id=61582273744716"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    title="Follow us on Facebook"
  >
    <img src={facebookIcon} alt="Facebook" className="social-icon" />
  </a>

  <a
    href="https://www.instagram.com/YourPageHere"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    title="Follow us on Instagram"
  >
    <img src={instagramIcon} alt="Instagram" className="social-icon" />
  </a>

  <a
    href="https://x.com/YourPageHere"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
    title="Follow us on X"
  >
    <img src={twitterIcon} alt="X" className="social-icon" />
  </a>
</div>
    </div>
  );
}
