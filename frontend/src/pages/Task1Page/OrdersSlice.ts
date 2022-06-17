import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

interface ISpecificationItems {
  id: number
  productId: number;
  productName: string;
  productCount: number;
  unitShort: string;
}
interface ISpecification {
  specificationId: number
  specificationItems?: ISpecificationItems[]
}

interface IProject {
  projectId: number;
  projectName: string;
  projectSpecification: ISpecification;
}

export interface IOrder {
  orderId: number;
  customerFio: string;
  orderDate: string;
  price: number;
  address: string
  project: IProject

}

interface OrdersState {
  orders: IOrder[];
  order?: IOrder;
  isLoading: boolean;
  error: string;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: '',
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<IOrder[]>('/orders');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить заказы');
    }
  },
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchOrders.fulfilled.type]: (state, action: PayloadAction<IOrder[]>) => {
      state.isLoading = false;
      state.error = '';
      state.orders = action.payload;
    },
    [fetchOrders.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchOrders.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export default ordersSlice.reducer;
