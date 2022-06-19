import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

export interface ISpecificationItem {
  productId: number;
  productName: string;
  productCount: number;
  unitShort: string;
}

export interface ISpecification {
  specificationId: number;
  projectId: number;
  projectName: string;
  specificationItems: ISpecificationItem[];
}

interface SpecificationsState {
  specifications: ISpecification[];
  isLoading: boolean;
  error: string;
}

const initialState: SpecificationsState = {
  specifications: [],
  isLoading: false,
  error: '',
};

export const fetchSpecifications = createAsyncThunk(
  'specifications/fetchSpecifications',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<ISpecification[]>('/specifications');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить категории');
    }
  },
);

export const specificationsSlice = createSlice({
  name: 'specifications',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchSpecifications.fulfilled.type]: (state, action: PayloadAction<ISpecification[]>) => {
      state.isLoading = false;
      state.error = '';
      state.specifications = action.payload;
    },
    [fetchSpecifications.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSpecifications.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export default specificationsSlice.reducer;
