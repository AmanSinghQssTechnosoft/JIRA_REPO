import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Results{
    srNo: number;
    subject: string;
    subjectId: string;
    result: string;
}

interface ResultState{
    results:Results[];
}

const initialState: ResultState = {
  results: Array.from({ length: 30 }, (_, i) => ({
    srNo: i + 1,
    subject: `Subject ${i + 1}`,
    subjectId: `SUB-${100 + i}`,
    result: i % 2 === 0 ? "Pass" : "Fail",
  })),
};

const resultSlice=createSlice({
    name:"results",
    initialState,
     reducers:{
        addResult:(state,action:PayloadAction<Results>)=>{
           state.results.push(action.payload)
        }
     }
})

export const {addResult}=resultSlice.actions;
export default resultSlice.reducer;