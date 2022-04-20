import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Modals {
  Close,
  Registration,
  Login,
  BuyForm
}

interface ProjectsState {
  modalState: Modals;
}

const initialState: ProjectsState = {
  modalState: Modals.Close,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleModalOpen(state, action: PayloadAction<Modals>) {
      state.modalState = action.payload;
    },
    handleModalClose(state) {
      state.modalState = Modals.Close;
    },
  },

});

export default modalSlice.reducer;
