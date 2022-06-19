import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

export interface IManufactory {
  manufactoryId: number ;
  manufactoryName: number ;
  manufactoryProduceProducts?: IProduceProducts[];
}

export interface IProduceProducts {
  productId: number
  productName: string
  unitShort: string
  timeToProduce: number
  equipmentId: number
  equipmentName: string
  serialCode: string
  powers: number
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

export const fetchManufactoriesProduceProducts = createAsyncThunk(
  'manufactories/fetchManufactoriesProduceProducts',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<IManufactory[]>('/manufactoriesProduceProducts');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить ведомости производимых ресурсов');
    }
  },
);

export const manufactoriesSlice = createSlice({
  name: 'manufactories',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchManufactoriesProduceProducts.fulfilled.type]: (state, action: PayloadAction<IManufactory[]>) => {
      state.isLoading = false;
      state.error = '';
      state.manufactories = action.payload;
    },
    [fetchManufactoriesProduceProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchManufactoriesProduceProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default manufactoriesSlice.reducer;
