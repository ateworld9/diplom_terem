import { AppDispatch } from '..';
import $api from '../../axios';
import { userSlice } from './UserSlice';

import AuthResponse from '../../models/response/AuthResponse';

export const fetchRegistration = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.registrationFetching());
    const response = await $api.post<AuthResponse>('/registration', { email, password });
    localStorage.setItem('token', response.data.accessToken);
    dispatch(userSlice.actions.registrationFetchingSuccess(response.data.user));
  } catch (error:any) {
    dispatch(userSlice.actions.registrationFetchingError(error.message));
  }
};

export const fetchLogin = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.loginFetching());
    const response = await $api.post<AuthResponse>('/login', { email, password });
    localStorage.setItem('token', response.data.accessToken);

    dispatch(userSlice.actions.loginFetchingSuccess(response.data.user));
  } catch (error: any) {
    dispatch(userSlice.actions.loginFetchingError(error.message));
  }
};

export const fetchLogout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.logoutFetching());
    await $api.get<AuthResponse>('/logout');
    localStorage.removeItem('token');

    dispatch(userSlice.actions.logoutFetchingSuccess());
  } catch (error: any) {
    dispatch(userSlice.actions.logoutFetchingError(error.message));
  }
};
