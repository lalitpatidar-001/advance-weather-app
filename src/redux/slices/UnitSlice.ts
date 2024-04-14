import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface unitProps {
    type: string,
    postfix: string
}
export interface UnitSliceProps {
    unit:unitProps
}

const initialState: UnitSliceProps = {
    unit: {
        type: "Celsius",
        postfix: "C"
    }
}

const UnitSlice = createSlice({
    name: "UnitSlice",
    initialState,
    reducers: {
        changeUnit: (state, action: PayloadAction<{ data: unitProps }>) => {
            state.unit = action.payload.data;
        }
    }
});

export const {changeUnit} = UnitSlice.actions;
export default UnitSlice.reducer;