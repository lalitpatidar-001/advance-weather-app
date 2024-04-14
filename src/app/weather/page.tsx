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

interface CityWeatherProps {
    
}

const CityWeather: FC<CityWeatherProps> = ({ }) => {
    const { city }: CityState = useSelector((state: RootState) => state.CityWeather);
    const { unit }:UnitSliceProps  = useSelector((state: RootState) => state.Unit);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        async function getCityForecast() {
            console.log("cityyyy", typeof city)
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city?.coordinates.lat}&lon=${city?.coordinates.lon}&appid=935e5b58051c5a1586837d206997c736`);
                console.log(response)
                dispatch(addForecastData({ data: response.data }))
            } catch (error) {
                console.log(error)
            }
        }
        getCityForecast();
    }, [city]);

    const handleChangeUnit= (e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value==="Fahrenheit"){
            dispatch(changeUnit({data:{type:"Fahrenheit",postfix:"F"}}));
        }else if(e.target.value==="Celsius"){
            dispatch(changeUnit({data:{type:"Celsius",postfix:"C"}}));
        }else if(e.target.value==="Kelvin"){
            dispatch(changeUnit({data:{type:"Kelvin",postfix:"K"}}));
        }
    }

    return (
        <div className="sm:p-3 mt-2">
            <div className="flex gap-4 bg[#444444] shadow-sm drop-shadow-sm shadow-black w-fit p-1 rounded-lg">
                <label  className="text-white flex gap-1 items-center">Fahrenheit 
                    <input checked={unit.type==="Fahrenheit"} value="Fahrenheit" onChange={handleChangeUnit} name="unit" type="radio" />
                </label>
                <label className="text-white flex gap-1 items-center">Celsius
                    <input checked={unit.type==="Celsius"}  value="Celsius" onChange={handleChangeUnit}   type="radio"name="unit"  />
                </label>
                <label className="text-white flex gap-1 items-center">Kelvin
                    <input checked={unit.type==="Kelvin"} value="Kelvin" onChange={handleChangeUnit}  type="radio"name="unit"  />
                </label>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 mt-2 ">
                <CityDetails />
                <DayWeather />
            </div>
            <div className="flex flex-col lg:flex-row gap-8 mt-4 items-center  justify-center">
                <Forecast />
                <HourlyForecast />
            </div>
        </div>);
}

export default CityWeather;