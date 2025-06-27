import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserLogin {
  id:number,
  email: string;
  isLoggin?: boolean;
}

interface UserRegister extends UserLogin {
  role?: string;
  token?: string;
  name?: string;
}

const initialState: UserRegister = {
  id:0,
  email: "",
  role: "",
  token: "",
  isLoggin: false
};

const userLoginSlice = createSlice({
  name: "userlogin",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<UserRegister>) => {
      console.log("login-payload", action.payload)
      state.id=action.payload.id,
      state.email = action.payload.email;
      state.name=action.payload.name;
      state.token = action.payload.token;
      state.isLoggin = true;
    },
    authRegister: (state, action: PayloadAction<UserRegister>) => {
      state.id=action.payload.id,
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggin = true;
    }
  }
});

export const { authLogin, authRegister } = userLoginSlice.actions;
export default userLoginSlice.reducer;
