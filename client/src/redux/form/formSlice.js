import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userIdToView: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUserToView(state, action) {
      state.userIdToView = action.payload;
    },
    clearUserToView(state) {
      state.userIdToView = null;
    },
  },
});

export const { setUserToView, clearUserToView } = formSlice.actions;
export const selectUserIdToView = (state) => state.form.userIdToView;

export default formSlice.reducer;
