import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ForecastListProps } from "./ForecastSlice";

interface CurrentHourlyForecastProps {
    currentHourlyForecastData: ForecastListProps[]
}

const initialState: CurrentHourlyForecastProps = {
    currentHourlyForecastData: [{
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
    }]
}

const CurrentHourlyForecast = createSlice({
    name: "CurrentHourlyForecast",
    initialState,
    reducers: {

        addCurrentHourlyForecast: (state, action: PayloadAction<{ data: ForecastListProps[] }>) => {
            state.currentHourlyForecastData = action.payload.data
        }
    }
});

export const { addCurrentHourlyForecast } = CurrentHourlyForecast.actions;

export default CurrentHourlyForecast.reducer;
