import React, { useEffect } from "react";
import { fetchOrders } from "../../app/Store/ordersSlice";
import { useAppDispatch, useAppSelector } from '../../app/Hooks/hooks.ts';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.items);


  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      <table className="table table-striped">
        <thead>
        <tr>
          <th>Order ID</th>
          <th>Items</th>
          <th>Total</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>
              {order.items.map((item) => (
                <div key={item.id}>
                  {item.id} x {item.quantity}
                </div>
              ))}
            </td>
            <td>{order.total} KGS</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
