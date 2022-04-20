import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../models/IUser';

interface UserState {
  users: IUser[]
  user: IUser
  isAuth: boolean
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  users: [],
  user: {
    userId: '',
    email: '',
    isActivated: false,
  },
  isAuth: false,
  isLoading: false,
  error: '',
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registrationFetching(state) {
      state.isLoading = true;
    },
    registrationFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
    },
    registrationFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    loginFetching(state) {
      state.isLoading = true;
    },
    loginFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
    },
    loginFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logoutFetching(state) {
      state.isLoading = true;
    },
    logoutFetchingSuccess(state) {
      state.isLoading = false;
      state.error = '';
      state.user = {
        userId: '',
        email: '',
        isActivated: false,
      };
      state.isAuth = false;
    },
    logoutFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
