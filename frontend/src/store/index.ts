import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import categoriesReducer from '../pages/CategoriesCatalogue/CategoriesSlice';
import projectsReducer from '../pages/ProjectsCatalogue/ProjectsSlice';
import manufactoriesReducer from '../pages/Task1Page/ManufactoriesSlice';
import manufactoriesPlansReducer from '../pages/Task1Page/ManufactoriesPlansSlice';
import ordersReducer from '../pages/Task1Page/OrdersSlice';
import modalReducer from '../components/CustomModal/ModalSlice';

const rootReducer = combineReducers({
  userReducer, categoriesReducer, projectsReducer, modalReducer, manufactoriesReducer, manufactoriesPlansReducer, ordersReducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
