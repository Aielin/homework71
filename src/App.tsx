import { Route, Routes } from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';
import Orders from './containers/Orders/Orders.tsx';
import ClientMenu from './containers/ClientMenu/ClientMenu.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClientMenu />} />
        <Route path="/admin/dishes" element={<Dishes />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;