import { useState } from 'react';
import '../css/Checkout.css';

// --- SUCCESS MODAL COMPONENT (UPDATED to use item.productName) ---
const SuccessModal = ({ orderDetails, cart, onContinueShopping }) => (
    <div className="modal-backdrop">
        <div className="card success-modal">
            <span className="close-btn" onClick={onContinueShopping}>&times;</span>
            <h3>Order Confirmed!</h3>
            <p className="confirmation-message">
                Thank you for your purchase! Your order has been placed successfully.
            </p>

            {/* Item List Summary for the Receipt */}
            <div className="cart-summary-section modal-cart">
                <h4>Your Items</h4>
                <ul className="cart-list">
                    {cart.map((item, index) => (
                        <li key={index} className="cart-item">
                            {/* FIX: Use item.productName */}
                            <span className="item-name">{item.productName}</span> 
                            <span className="item-price">₱{item.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <p className="total-summary">Final Total: ₱{orderDetails.total}</p>
            </div>
            
            {/* Delivery and Payment Summary */}
            <div className="order-summary">
                <h4>Delivery & Payment</h4>
                <div className="summary-item">
                    <strong>Delivery Address:</strong> <span>{orderDetails.address}</span>
                </div>
                <div className="summary-item">
                    <strong>Payment Method:</strong> <span>{orderDetails.payment}</span>
                </div>
                {orderDetails.extraDetails && (
                    <div className="summary-item">
                        <strong>Details:</strong> <span>{orderDetails.extraDetails}</span>
                    </div>
                )}
            </div>

            <button className="continue-shopping-btn" onClick={onContinueShopping}>
                Continue Shopping
            </button>
        </div>
    </div>
);
// ------------------------------------------------------------------

// --- CHECKOUT COMPONENT (UPDATED to use item.productName and onOrderComplete) ---
export default function Checkout({ cart, onOrderComplete }) {
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [gcashNumber, setGcashNumber] = useState("");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        expiry: "",
        cvv: ""
    });
    const [paypalEmail, setPaypalEmail] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    const confirmOrder = () => {
        // --- Input Validation ---
        if (!address || !payment) {
            alert("Please fill in your Delivery Address and select a Payment Method!");
            return;
        }
        if (payment === "GCash" && !gcashNumber) {
            alert("Please enter your GCash number!");
            return;
        }
        if (payment === "Card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
            alert("Please enter your complete card details!");
            return;
        }
        if (payment === "PayPal" && !paypalEmail) {
            alert("Please enter your PayPal email!");
            return;
        }
        
        // Prepare extra details
        let extraDetails = "";
        if (payment === "GCash") {
            extraDetails = `Number ending in: ${gcashNumber.slice(-4)}`;
        } else if (payment === "Card") {
            extraDetails = `Card ending in: ${cardDetails.number.replace(/\s/g, "").slice(-4)}`;
        } else if (payment === "PayPal") {
            extraDetails = `Email: ${paypalEmail}`;
        }

        const finalOrderDetails = {
            address: address,
            payment: payment === 'COD' ? 'Cash on Delivery' : payment,
            extraDetails: extraDetails,
            total: total.toFixed(2)
        };

        setOrderDetails(finalOrderDetails);
        setShowSuccessModal(true);
    };

    const handleContinueShopping = () => {
        setShowSuccessModal(false); 
        console.log("Redirecting user to the Shop/Homepage...");

        // Clear local form state
        setAddress("");
        setPayment("");
        setGcashNumber("");
        setCardDetails({ number: "", expiry: "", cvv: "" });
        setPaypalEmail("");

        // Call the parent function to redirect/hide the checkout view 
        // and clear the cart state in the parent component.
        if (onOrderComplete) {
            onOrderComplete();
        }
    };

    return (
        <div className="card checkout-container">
            <h3>Checkout</h3>
            
            {/* --- Cart Summary Section (Pre-Checkout View) --- */}
            <div className="cart-summary-section">
                <h4>Items in your Order</h4>
                {cart.length === 0 ? (
                    <p className="empty-cart">Your cart is empty.</p>
                ) : (
                    <ul className="cart-list">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                {/* FIX: Use item.productName */}
                                <span className="item-name">{item.productName}</span> 
                                <span className="item-price">₱{item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="total-summary">Total: ₱{total.toFixed(2)}</p>
            </div>
            {/* ------------------------------------------------ */}


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
                <option value="PayPal">PayPal</option>
            </select>

            {/* Conditional Payment Details */}
            {payment === "GCash" && (
                <div className="payment-details">
                    <label>GCash Number:</label><br />
                    <input type="text" placeholder="09xxxxxxxxx" value={gcashNumber} onChange={(e) => setGcashNumber(e.target.value)} maxLength="11" />
                </div>
            )}
            {payment === "Card" && (
                <div className="payment-details">
                    <label>Card Number:</label><br />
                    <input type="text" placeholder="xxxx xxxx xxxx xxxx" maxLength="19" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} /><br />
                    <label>Expiry Date:</label><br />
                    <input type="text" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} /><br />
                    <label>CVV:</label><br />
                    <input type="text" placeholder="123" maxLength="3" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                </div>
            )}
            {payment === "PayPal" && (
                <div className="payment-details">
                    <label>PayPal Email:</label><br />
                    <input type="email" placeholder="example@paypal.com" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
                </div>
            )}
            
            <br />
            <button onClick={confirmOrder} className="confirm-btn">Confirm Payment</button>

            {/* Render the modal, passing the cart data */}
            {showSuccessModal && orderDetails && (
                <SuccessModal 
                    orderDetails={orderDetails} 
                    cart={cart} 
                    onContinueShopping={handleContinueShopping} 
                />
            )}
        </div>
    );
}