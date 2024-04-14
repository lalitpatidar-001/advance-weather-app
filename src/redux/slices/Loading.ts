import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface LoadingSliceProps {
    isLoading:boolean
}

const initialState:LoadingSliceProps = {
    isLoading:false
}

const LoadingSlice = createSlice({
    name:"Loading",
    initialState,
    reducers:{
        changeLoadingState:(state,action:PayloadAction<{data:boolean}>)=>{
            state.isLoading = action.payload.data
        }
    }
})