import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface coordinatesProps {
    lat: number | null;
    lon: number | null;
}

 export interface City {
    name?: string,
    coordinates:coordinatesProps ;
}

export interface CityState {
    city: City;
}

const initialState: CityState = {
    city: {
        name: "",
        coordinates:{
            lat:null,
            lon:null
        }
    }
};

const CityWeatherSlice = createSlice({
    name: "CityWeather",
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<{ data: City }>) => {
            state.city = action.payload.data;
        },

        // updatePets: (state, action: PayloadAction<{ data: Pet }>) => {
        //     state.pets.unshift(action.payload.data);
        // },
        // deletePet: (state, action: PayloadAction<{ data: string }>) => {
        //     const id = action.payload.data;
        //     state.pets = state.pets.filter((item) => item._id !== id);
        // }
    }
});

export const { addCity} = CityWeatherSlice.actions;

export default CityWeatherSlice.reducer;
