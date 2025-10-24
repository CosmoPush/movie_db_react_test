import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PageState {
    page: number;
}
const initState:PageState = {page: 1}
export const pageStoreSlice = createSlice({
    name:"pageStoreSlice",
    initialState:initState,
    reducers:{
        changePage:(state,action:PayloadAction<number>)=>{
            state.page = action.payload
        }
    }
})

export const pageActions ={...pageStoreSlice.actions}