import React from "react";
import { Modal, Button } from "react-bootstrap";

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: OrderItem[];
  onRemove: (id: string) => void;
  onConfirm: () => void
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, cart, onRemove, onConfirm }) => {
  const deliveryFee = 150;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = total + deliveryFee;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>{item.price * item.quantity} KGS</span>
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <p>Delivery: {deliveryFee} KGS</p>
          <p>Total: {grandTotal} KGS</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={onConfirm} disabled={cart.length === 0}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
