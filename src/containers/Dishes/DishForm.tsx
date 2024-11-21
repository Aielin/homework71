import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store/store";
import { addDish } from "../../app/Store/dishesSlice";
import { updateDish } from "../../app/Store/dishesSlice";

interface DishFormProps {
  dish?: {
    id: string;
    title: string;
    price: number;
    image: string;
  } | null;
  onClose: () => void;
}


const DishForm: React.FC<DishFormProps> = ({ dish, onClose }) => {
  const [title, setTitle] = useState(dish ? dish.title : '');
  const [price, setPrice] = useState(dish ? dish.price : 0);
  const [image, setImage] = useState(dish ? dish.image : '');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (dish) {
      setTitle(dish.title);
      setPrice(dish.price);
      setImage(dish.image);
    }
  }, [dish]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dish) {
      dispatch(updateDish({ id: dish.id, title, price, image }));
    } else {
      dispatch(addDish({ title, price, image }));
    }
    setTitle('');
    setPrice(0);
    setImage('');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          id="price"
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image URL
        </label>
        <input
          id="image"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Dish
      </button>
    </form>
  );
};

export default DishForm;
