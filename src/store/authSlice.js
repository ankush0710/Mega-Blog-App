// this is slice to track the user authentication -> it asked the user whether the user is authenticated or not
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
}

const authSlice = createSlice({
  name: authSlice,
  initialState,
  reducers:{
    login: (state, action) => {
      state.status = true,
      state.userData = action.payload.userData
    },
    logout: (state, action) => {
      state.status = false,
      state.userData = action.payload.userData
    }
  }
})
export const {login, logout} = authSlice.actions
export default authSlice.reducer