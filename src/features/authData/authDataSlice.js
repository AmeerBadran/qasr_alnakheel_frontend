import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  allUserData: '',
  userRole: '',
};

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      console.log(action.payload.userData)
      state.userId = action.payload.userData.id || null;
      state.allUserData = action.payload.userData || null;
      state.userRole = action.payload.userData.role || '';
    },
    deleteAuthData: (state) => {
      state.userId = undefined;
      state.allUserData = undefined;
      state.userRole = undefined;
    },
  },
});

export const { saveAuthData, deleteAuthData } = authDataSlice.actions;

export default authDataSlice.reducer;