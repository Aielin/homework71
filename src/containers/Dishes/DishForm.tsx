import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store/store";
import { addDish } from "../../app/Store/dishesSlice";

const DishForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addDish({ title, price, image }));
    setTitle('');
    setPrice(0);
    setImage('');
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
