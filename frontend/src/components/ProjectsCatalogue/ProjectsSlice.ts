import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../axios';

interface IProject {
  id: number ;
  projectName: string;
  altName: string;
  price: string;
  imgPath:string
}

interface ProjectsState {
  projects: IProject[]
  project: IProject
  isLoading: boolean
  error: string
}

const initialState: ProjectsState = {
  projects: [],
  project: {
    id: 0,
    projectName: '',
    altName: '',
    price: '',
    imgPath: '',
  },
  isLoading: false,
  error: '',
};

export const fetchAllProjects = createAsyncThunk(
  'projects/fetchAllProjects',
  async (_, thunkApi) => {
    try {
      const response = await $api.get<IProject[]>('/projects');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить категории');
    }
  },
);
export const fetchProjectsByName = createAsyncThunk(
  'projects/fetchProjectsByName',
  async (name:string, thunkApi) => {
    try {
      const response = await $api.get<IProject[]>(`/projects/${name}`);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('не удалось загрузить категории');
    }
  },
);

export const fetchProjectByAltName = createAsyncThunk(
  'projects/fetchProjectByAltName',
  async (name:string, thunkApi) => {
    try {
      const response = await $api.get<IProject>(`/project/${name}`);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('Не удалось загрузить Проект');
    }
  },
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchAllProjects.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
      state.isLoading = false;
      state.error = '';
      state.projects = action.payload;
    },
    [fetchAllProjects.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAllProjects.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchProjectsByName.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
      state.isLoading = false;
      state.error = '';
      state.projects = action.payload;
    },
    [fetchProjectsByName.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProjectsByName.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchProjectByAltName.fulfilled.type]: (state, action: PayloadAction<IProject>) => {
      state.isLoading = false;
      state.error = '';
      state.project = action.payload;
    },
    [fetchProjectByAltName.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProjectByAltName.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.project = {
        id: 0,
        projectName: '',
        altName: '',
        price: '',
        imgPath: '',
      };
      state.error = action.payload;
    },
  },
});

export default projectsSlice.reducer;
