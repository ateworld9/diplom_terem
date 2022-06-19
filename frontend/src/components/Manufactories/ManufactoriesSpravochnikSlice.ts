import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

export interface IManufactory {
  manufactoryId: number ;
  manufactoryName: number ;
  manufactoryEquipment?: IEquipment[];
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

export interface IEquipment {
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

export const fetchManufactoriesSpravochnik = createAsyncThunk(
  'manufactoriesSpravochnik/fetchManufactoriesSpravochnik',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<IManufactory[]>('/manufactoriesSpravochnik');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить спарвочник цехов');
    }
  },
);

export const manufactoriesSpravochnikSlice = createSlice({
  name: 'manufactoriesSpravochnik',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchManufactoriesSpravochnik.fulfilled.type]: (state, action: PayloadAction<IManufactory[]>) => {
      state.isLoading = false;
      state.error = '';
      state.manufactories = action.payload;
    },
    [fetchManufactoriesSpravochnik.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchManufactoriesSpravochnik.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export default manufactoriesSpravochnikSlice.reducer;
