import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

export interface IManufactoryPlan {
orderId: number;
productId: number
productName: string
productCount: number
timeToProduce: number
}
export interface IManufactoryP {
  manufactoryId: number ;
  powers: number;
  manufactoryPlan:IManufactoryPlan[]
}
interface ManufactoriesState {
  manufactories: IManufactoryP[]
  isLoading: boolean
  error: string
}

const initialState: ManufactoriesState = {
  manufactories: [],
  isLoading: false,
  error: '',
};

export const fetchManufactoriesPlans = createAsyncThunk(
  'manufactoriesPlans/fetchManufactoriesPlans',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<IManufactoryP[]>('/manufactoriesPlans');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить категории');
    }
  },
);

export const manufactoriesPlansSlice = createSlice({
  name: 'manufactoriesPlans',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchManufactoriesPlans.fulfilled.type]: (state, action: PayloadAction<IManufactoryP[]>) => {
      state.isLoading = false;
      state.error = '';
      state.manufactories = action.payload;
    },
    [fetchManufactoriesPlans.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchManufactoriesPlans.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export default manufactoriesPlansSlice.reducer;
