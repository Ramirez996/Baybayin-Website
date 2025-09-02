import { useState } from 'react';
import tshirt from '../images/1.jpeg';
import backpack from '../images/2.jpeg';
import wallet from '../images/3.jpeg';
import slingbag1 from '../images/4.png';
import slingbag2 from '../images/5.png';
import slingbag3 from '../images/6.png';
import '../css/Shop.css';

const products = [
  { productID: 1, productName: "Baybayin T-shirt", productDescription: "A stylish t-shirt with Baybayin script.", img: tshirt, price: 500 },
  { productID: 2, productName: "Backpack", productDescription: "Durable backpack with a Baybayin design.", img: backpack, price: 1200 },
  { productID: 3, productName: "Wallet", productDescription: "Compact wallet featuring a Baybayin.", img: wallet, price: 400 },
  { productID: 4, productName: "Sling Bag 1", productDescription: "A modern sling bag with a Baybayin pattern.", img: slingbag1, price: 800 },
  { productID: 5, productName: "Sling Bag 2", productDescription: "A stylish sling bag with a Baybayin design.", img: slingbag2, price: 850 },
  { productID: 6, productName: "Sling Bag 3", productDescription: "A trendy sling bag featuring Baybayin.", img: slingbag3, price: 900 },
];

// This function opens the image in a new browser tab/window
const handleZoom = (imageSrc) => {
  window.open(imageSrc, '_blank');
};

export default function Shop({ onAddToCart }) {
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setConfirmationMessage(`${product.productName} added to cart!`);
    setTimeout(() => {
      setConfirmationMessage(null);
    }, 3000); // The message will disappear after 3 seconds
  };

  return (
    <div className="shop-container">
      <h3>🛍️ Our Products</h3>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.productID} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.productName} className="product-image" />
              <button className="zoom-button" onClick={() => handleZoom(product.img)}>
                🔍
              </button>
            </div>
            <h4>{product.productName}</h4>
            <p className="description">{product.productDescription}</p>
            <p className="price">₱{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {confirmationMessage && (
        <div className="confirmation-toast">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
}