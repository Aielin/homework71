import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.ts";

export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface DishesState {
  items: Dish[];
  loading: boolean;
}

const initialState: DishesState = {
  items: [],
  loading: false,
};

export const fetchDishes = createAsyncThunk("dishes/fetchDishes", async () => {
  const response = await axiosApi.get("/dishes.json");
  console.log("Response:", response.data);
  const data = response.data;
  return Object.keys(data).map((id: string) => ({
    id,
    ...data[id],
  }));
});

export const deleteDish = createAsyncThunk(
  "dishes/deleteDish",
  async (id: string) => {
    await axiosApi.delete(`/dishes/${id}.json`);
    return id;
  }
);

export const addDish = createAsyncThunk(
  "dishes/addDish",
  async (dish: Omit<Dish, "id">) => {
    const response = await axiosApi.post("/dishes.json", dish);
    return { id: response.data.name, ...dish };
  }
);

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.items = state.items.filter((dish) => dish.id !== action.payload);
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default dishesSlice.reducer;
