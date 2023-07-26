import { createSlice } from "@reduxjs/toolkit";

export const callSlice=createSlice({
    name:"callData",
    initialState:{
        data:{}
    },reducers:{
        setData:(state,action)=>{
            state.data=action.payload
        }
    }
})


export const callActions=callSlice.actions