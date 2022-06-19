import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import categoriesReducer from '../pages/CategoriesCatalogue/CategoriesSlice';
import projectsReducer from '../pages/ProjectsCatalogue/ProjectsSlice';
import manufactoriesReducer from '../pages/ProduceProductsSpravochnik/ManufactoriesSlice';
import manufactoriesPlansReducer from '../pages/Task1Page/ManufactoriesPlansSlice';
import manufactoriesSpravochnikSlice from '../components/Manufactories/ManufactoriesSpravochnikSlice';
import specificationsSlice from '../pages/SpecificationsSpravochnik/SpecificationsSlice';
import ordersReducer from '../pages/OrdersIndoc/OrdersSlice';
import modalReducer from '../components/CustomModal/ModalSlice';

const rootReducer = combineReducers({
  userReducer, categoriesReducer, projectsReducer, modalReducer, manufactoriesReducer, manufactoriesPlansReducer, ordersReducer, manufactoriesSpravochnikSlice, specificationsSlice,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
