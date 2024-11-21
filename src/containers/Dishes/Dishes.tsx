import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { fetchDishes, deleteDish } from "../../app/Store/dishesSlice.ts";
import { RootState } from "../../app/Store/store.ts";
import { useAppDispatch } from '../../app/Hooks/hooks.ts';
import DishForm from "./DishForm";


const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useSelector((state: RootState) => state.dishes.items);

  const [selectedDish, setSelectedDish] = useState<{
    id: string;
    title: string;
    price: number;
    image: string;
  } | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDish(id));
  };

  const handleEdit = (dish: typeof selectedDish) => {
    setSelectedDish(dish);
    setIsFormOpen(true);
  };

  const handleAddDish = () => {
    setSelectedDish(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="container mt-4">
      <h2>Dishes</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddDish}>
        Add New Dish
      </button>

      {isFormOpen && (
        <DishForm dish={selectedDish} onClose={handleCloseForm} />
      )}

      <table className="table table-striped">
        <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {dishes.map((dish) => (
          <tr key={dish.id}>
            <td>{dish.title}</td>
            <td>{dish.price} KGS</td>
            <td>
              <img
                src={dish.image}
                alt={dish.title}
                style={{ width: "50px", height: "50px" }}
              />
            </td>
            <td>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEdit(dish)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(dish.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dishes;

