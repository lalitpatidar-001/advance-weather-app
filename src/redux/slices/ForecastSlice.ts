import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ForecastProps {
    list: ForecastListProps[]; // Corrected
    city: {
        name: string;
        coord: {
            lat: number | null;
            lon: number | null;
        };
        sunrise: number | null;
        sunset: number | null;
    };
}

export interface ForecastState {
    forecastData: ForecastProps;
}

export interface ForecastListProps {
    main: {
        temp: number | null,
        feels_like: number | null,
        temp_min: number | null,
        temp_max: number | null,
        pressure: number | null,
        sea_level: number | null,
        grnd_level: number | null,
        humidity: number | null,
        temp_kf: number | null,
    };
    weather: {
        main: string,
        description: string,
        icon: string,
    }[];
    clouds: {
        all: number | null,
    };
    wind: {
        speed: number | null,
        deg: number | null,
    };
    visibility: number | null,
    dt_txt: string | null,
    pop:number|null
}

const initialState: ForecastState = {
    forecastData: {
        list: [{
            main: {
                temp: null,
                feels_like: null,
                temp_min: null,
                temp_max: null,
                pressure: null,
                sea_level: null,
                grnd_level: null,
                humidity: null,
                temp_kf: null,
            },
            weather: [
                {
                    main: "",
                    description: "",
                    icon: "",
                }
            ],
            clouds: {
                all: null
            },
            wind: {
                speed: null,
                deg: null
            },
            visibility: null,
            dt_txt: null,
            pop:null
        }],
        city: {
            name: "string",
            coord: {
                lat: null,
                lon: null
            },
            sunrise: null,
            sunset: null
        }

    }

};

const ForecastSlice = createSlice({
    name: "Forecast",
    initialState,
    reducers: {
        addForecastData: (state, action: PayloadAction<{ data: ForecastProps }>) => {
            state.forecastData = action.payload.data;
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

export const { addForecastData } = ForecastSlice.actions;

export default ForecastSlice.reducer;
