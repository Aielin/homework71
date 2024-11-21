import { Route, Routes } from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/dishes" element={<Dishes />} />
        <Route path="/" element={<div>Client Part</div>} />
      </Routes>

    </div>
  );
};

export default App;