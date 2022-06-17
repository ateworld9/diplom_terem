import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

export interface IManufactory {
  id: number ;
  workersCount: number;
  powers: number;
  manufactoryProduceProducts: IManufactoryProduceProdoctItem[];
}

export interface IManufactoryProduceProdoctItem {
  id: number
  manufactoryId: number
  productId: number
  unitName: string
  unitShort: string
  timeToProduce: number
  productName: string
}

interface ManufactoriesState {
  manufactories: IManufactory[]
  isLoading: boolean
  error: string
}

const initialState: ManufactoriesState = {
  manufactories: [],
  isLoading: false,
  error: '',
};

export const fetchAllManufactories = createAsyncThunk(
  'manufactories/fetchAllManufactories',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<IManufactory[]>('/manufactories');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить категории');
    }
  },
);

export const manufactoriesSlice = createSlice({
  name: 'manufactories',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchAllManufactories.fulfilled.type]: (state, action: PayloadAction<IManufactory[]>) => {
      state.isLoading = false;
      state.error = '';
      state.manufactories = action.payload;
    },
    [fetchAllManufactories.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAllManufactories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export default manufactoriesSlice.reducer;
