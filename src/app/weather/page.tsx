"use client"
import Forecast from "@/components/forecast/Forecast";
import CityDetails from "@/components/city-weather/CityDetails";
import DayWeather from "@/components/city-weather/DayWeather";
import axios from "axios";
import { ChangeEvent, FC, useEffect, useState } from "react";
import HourlyForecast from "@/components/forecast/HourlyForecast";
import { CityState } from "@/redux/slices/CityWeather";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addForecastData } from "@/redux/slices/ForecastSlice";
import { UnitSliceProps, changeUnit } from "@/redux/slices/UnitSlice";
import toast from "react-hot-toast";
/**
 * CityWeather Component
 * 
 * This component is responsible for displaying weather information for a selected city.
 * It fetches forecast data from the OpenWeatherMap API based on the coordinates of the selected city.
 * The component also allows users to toggle between different temperature units (Fahrenheit, Celsius, Kelvin).
 * 
 * Props:
 *   - None
 * 
 * State:
 *   - None
 * 
 * Hooks:
 *   - useSelector: Used to access the selected city and temperature unit from the Redux store.
 *   - useDispatch: Used to dispatch actions to the Redux store.
 *   - useEffect: Used to fetch forecast data when the selected city changes.
 *   - useState: Used to manage the state of temperature unit selection.
 * 
 * Functions:
 *   - getCityForecast: Fetches forecast data for the selected city from the OpenWeatherMap API.
 *   - handleChangeUnit: Handles the change in temperature unit selection and dispatches corresponding actions.
 */
interface CityWeatherProps{}
const CityWeather: FC<CityWeatherProps> = ({ }) => {
    const { city }: CityState = useSelector((state: RootState) => state.CityWeather);
    const { unit }: UnitSliceProps = useSelector((state: RootState) => state.Unit);
    const dispatch: AppDispatch = useDispatch();

    // Fetch forecast data when the selected city changes
    useEffect(() => {
        async function getCityForecast() {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city?.coordinates.lat}&lon=${city?.coordinates.lon}&appid=935e5b58051c5a1586837d206997c736`);
                dispatch(addForecastData({ data: response.data }));
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong, try again");
            }
        }
        if (city) {
            getCityForecast();
        }
    }, [city, dispatch]);

    // Handle change in temperature unit selection
    const handleChangeUnit = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedUnit = e.target.value;
        let type = "", postfix = "";
        if (selectedUnit === "Fahrenheit") {
            type = "Fahrenheit";
            postfix = "F";
        } else if (selectedUnit === "Celsius") {
            type = "Celsius";
            postfix = "C";
        } else if (selectedUnit === "Kelvin") {
            type = "Kelvin";
            postfix = "K";
        }
        dispatch(changeUnit({ data: { type, postfix } }));
    }

    return (
        <div className="sm:p-3 mt-2">
            {/* Temperature unit selection */}
            <div className="flex gap-4 bg[#444444] shadow-sm drop-shadow-sm shadow-black w-fit p-1 rounded-lg">
                <label className="text-white flex gap-1 items-center">Fahrenheit
                    <input checked={unit.type === "Fahrenheit"} value="Fahrenheit" onChange={handleChangeUnit} name="unit" type="radio" />
                </label>
                <label className="text-white flex gap-1 items-center">Celsius
                    <input checked={unit.type === "Celsius"} value="Celsius" onChange={handleChangeUnit} type="radio" name="unit" />
                </label>
                <label className="text-white flex gap-1 items-center">Kelvin
                    <input checked={unit.type === "Kelvin"} value="Kelvin" onChange={handleChangeUnit} type="radio" name="unit" />
                </label>
            </div>
            {/* City details and current weather */}
            <div className="flex flex-col lg:flex-row gap-2 mt-2">
                <CityDetails />
                <DayWeather />
            </div>
            {/* Weather forecast and hourly forecast */}
            <div className="flex flex-col lg:flex-row gap-8 mt-4 items-center justify-center">
                <Forecast />
                <HourlyForecast />
            </div>
        </div>
    );
}

export default CityWeather;
