import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.ts";

interface Order {
  id: string;
  items: { id: string; quantity: number }[];
  total: number;
}

interface OrdersState {
  items: Order[];
  loading: boolean;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await axiosApi.get('/orders.json');
    const data = response.data;
    return Object.keys(data).map((id) => ({
      id,
      items: data[id].items,
      total: data[id].total,
    }));
  }
);

export const completeOrder = createAsyncThunk(
  'orders/completeOrder',
  async (orderId: string) => {
    await axiosApi.delete(`/orders/${orderId}.json`);
    return orderId;
  }
);


const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;
