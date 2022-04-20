import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

interface ICategories {
  categoryId: number;
  name: string;
  altName: string;
  priceFrom: string;
  imgPath:string
}

interface CategoriesState {
  categories: ICategories[]
  isLoading: boolean
  error: string
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: '',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<ICategories[]>('/categories');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить категории');
    }
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchCategories.fulfilled.type]: (state, action: PayloadAction<ICategories[]>) => {
      state.isLoading = false;
      state.error = '';
      state.categories = action.payload;
    },
    [fetchCategories.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
