export default function Order({ order }) {
  return (
    <div className="card order-card">
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> {order.orderID}</p>
      <p><strong>Date:</strong> {order.orderDate.toLocaleDateString()}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ₱{order.totalAmount.toFixed(2)}</p>
      <p><strong>Delivery Address:</strong> {order.deliveryAddress || 'Not specified'}</p>
    </div>
  );
}