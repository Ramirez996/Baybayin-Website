import tshirt from '../images/1.jpeg';
import backpack from '../images/2.jpeg';
import wallet from '../images/3.jpeg';
import slingbag1 from '../images/4.png';
import slingbag2 from '../images/5.png';
import slingbag3 from '../images/6.png';

export default function ProductList({ addToCart }) {
  const products = [
    { id: 1, name: "Baybayin T-shirt", img: tshirt, price: 500 },
    { id: 2, name: "Backpack", img: backpack, price: 1200 },
    { id: 3, name: "Wallet", img: wallet, price: 400 },
    { id: 4, name: "Sling Bag 1", img: slingbag1, price: 800 },
    { id: 5, name: "Sling Bag 2", img: slingbag2, price: 850 },
    { id: 6, name: "Sling Bag 3", img: slingbag3, price: 900 },
  ];

  return (
    <div className="gallery">
      {products.map((p) => (
        <div key={p.id}>
          <img src={p.img} alt={p.name} />
          <p>{p.name} - ₱{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
