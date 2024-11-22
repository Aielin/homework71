import { Route, Routes } from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';
import ClientMenu from './containers/ClientMenu/ClientMenu.tsx';
import AdminOrders from './containers/AdminOrders/AdminOrders.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClientMenu />} />
        <Route path="/admin/dishes" element={<Dishes />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>
    </div>
  );
};

export default App;