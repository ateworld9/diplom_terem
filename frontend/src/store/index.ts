import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import categoriesReducer from '../components/CategoriesCatalogue/CategoriesSlice';
import projectsReducer from '../components/ProjectsCatalogue/ProjectsSlice';
import modalReducer from '../components/CustomModal/ModalSlice';

const rootReducer = combineReducers({
  userReducer, categoriesReducer, projectsReducer, modalReducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
