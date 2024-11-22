import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/Hooks/hooks';
import { fetchOrders } from '../../app/Store/ordersSlice';
import { fetchDishes } from '../../app/Store/dishesSlice';
interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

const AdminOrders: React.FC = () => {
  const dispatch = useAppDispatch(); // Переместите выше

  const orders = useAppSelector((state) => state.orders.items);
  const dishes: Dish[] = useAppSelector((state) => state.dishes.items);
  const loading: boolean = useAppSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchDishes());
  }, [dispatch]);

  useEffect(() => {
    console.log('Orders:', orders);
    console.log('Dishes:', dishes);
  }, [orders, dishes]);


  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {orders.length === 0 ? (
            <p>No orders available</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="col-12 mb-3">
                <div className="card p-3">
                  <h5>Order ID: {order.id}</h5>
                  <ul className="list-group mb-3">
                    {order.items.map((item: { id: string; quantity: number }) => {
                      const dish = dishes.find((dish) => dish.id === item.id);
                      return (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                        <span>
                          {dish ? `${dish.title} x ${item.quantity}` : 'Dish not found'}
                        </span>
                          <span>{dish ? dish.price * item.quantity : 0} KGS</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p>Delivery: 150 KGS</p>
                  <h6>Total: {order.total} KGS</h6>
                  <button className="btn btn-primary">Complete order</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

};

export default AdminOrders;
