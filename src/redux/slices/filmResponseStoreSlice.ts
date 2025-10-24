import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type filmResponseStoreSliceType ={
    result:string
}

const initState:filmResponseStoreSliceType ={result:''}

export const filmResponseStoreSlice =createSlice({
    name:'filmResponseStoreSlice',
    initialState:initState,
    reducers: {addResponse:(state,action:PayloadAction<string>)=>{
    state.result = action.payload}
    }})

export const filmResponseActions={...filmResponseStoreSlice.actions}