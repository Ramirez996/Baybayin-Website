import tshirt from '../images/1.jpeg';
import backpack from '../images/2.jpeg';
import wallet from '../images/3.jpeg';
import slingbag1 from '../images/4.png';
import slingbag2 from '../images/5.png';
import slingbag3 from '../images/6.png';

const products = [
  { productID: 1, productName: "Baybayin T-shirt", productDescription: "A stylish t-shirt with Baybayin script.", img: tshirt, price: 500 },
  { productID: 2, productName: "Backpack", productDescription: "Durable backpack with a Baybayin design.", img: backpack, price: 1200 },
  { productID: 3, productName: "Wallet", productDescription: "Compact wallet featuring a Baybayin.", img: wallet, price: 400 },
  { productID: 4, productName: "Sling Bag 1", productDescription: "A modern sling bag with a Baybayin pattern.", img: slingbag1, price: 800 },
  { productID: 5, productName: "Sling Bag 2", productDescription: "A stylish sling bag with a Baybayin design.", img: slingbag2, price: 850 },
  { productID: 6, name: "Sling Bag 3", productDescription: "A trendy sling bag featuring Baybayin.", img: slingbag3, price: 900 },
];

export default function Shop({ onAddToCart }) {
  return (
    <div className="shop-container">
      <h3>🛍️ Our Products</h3>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.productID} className="product-card">
            <img src={product.img} alt={product.productName} className="product-image" />
            <h4>{product.productName}</h4>
            <p className="description">{product.productDescription}</p>
            <p className="price">₱{product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}