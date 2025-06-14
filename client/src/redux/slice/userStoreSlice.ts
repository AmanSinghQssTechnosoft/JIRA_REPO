import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface userType {
    id: number,
    email: string,
    name:string,
    role: string,
}


const initialState: userType[] = []

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        userData: (state, action: PayloadAction<userType[]>) => {
            state.push(...action.payload)
        }
    }
})


export const { userData } = userDataSlice.actions;

export default userDataSlice.reducer;