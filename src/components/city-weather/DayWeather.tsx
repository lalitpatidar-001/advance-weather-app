import { FC } from "react";

import Image from "next/image";
import DayMainDetails from "../day-weather/DayMainDetails";
import WeatherType from "../day-weather/WeatherIcon";
import ExtraDetails from "../day-weather/ExtraDetails";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
interface DayWeatherProps {

}

const DayWeather: FC<DayWeatherProps> = () => {
    const {list:forecastData} = useSelector((state:RootState)=>state.Forecast.forecastData);
    const {city:city} = useSelector((state:RootState)=>state.Forecast.forecastData);
    return (
        <div className="h-[280px]  flex md:flex-row flex-col flex-[5] items-center justify-center bg-[#444444] rounded-xl shadow-sm drop-shadow-md shadow-black text-white p-2
        
        ">
            <DayMainDetails data={forecastData[0]?.main} sunrise={city.sunrise} sunset={city.sunset} />
            <WeatherType main={forecastData[0]?.main} weather={forecastData[0]?.weather[0]} />
            <ExtraDetails pressure={forecastData[0].main.pressure} visibility={forecastData[0].visibility} humidity={forecastData[0].main.humidity} wind={forecastData[0].wind}  />
        </div>);
}

export default DayWeather;