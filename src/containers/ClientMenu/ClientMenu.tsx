import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/Hooks/hooks';
import { fetchDishes } from '../../app/Store/dishesSlice';
import CheckoutModal from "../OrderModal/OrderModal.tsx";

const ClientMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(state => state.dishes.items);
  const [cart, setCart] = useState<{ id: string; title: string; price: number; quantity: number }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const addToCart = (dish: { id: string; title: string; price: number }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const confirmOrder = () => {
    alert('Order placed!');
    setCart([]);
    closeModal();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Turtle Pizza</h2>
      <div className="row">
        {dishes.map(dish => (
          <div key={dish.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={dish.image} className="card-img-top" alt={dish.title} />
              <div className="card-body">
                <h5 className="card-title">{dish.title}</h5>
                <p className="card-text">{dish.price} KGS</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(dish)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4>Order total: {total} KGS</h4>
        <button
          className="btn btn-success mt-3"
          onClick={openModal}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cart={cart}
        onRemove={removeFromCart}
        onConfirm={confirmOrder}
      />
    </div>
  );
};

export default ClientMenu;
