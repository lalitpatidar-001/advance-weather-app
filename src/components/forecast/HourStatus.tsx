/**
 * HourStatus Component
 * 
 * This component displays the weather status for a specific hour in the hourly forecast.
 * It receives the forecast data as props and renders the hour, weather icon, precipitation probability, temperature, wind direction, and wind speed.
 * 
 * Hooks:
 *   - useSelector: Used to access unit type and postfix from the Redux store.
 * 
 * Utils/Functions:
 *   - getTimeFromDateAndTimeString: Utility function to extract time from a date and time string.
 *   - tempratureConvert: Utility function to convert temperature units.
 * 
 * Props:
 *   - forecast: ForecastListProps - The forecast data for the specific hour.
 * 
 * @param {ForecastListProps} forecast - The forecast data for the specific hour.
 * @returns {JSX.Element} HourStatus component
 */

import Image from "next/image";
import { FC } from "react";
import wind_arrow from "@/assets/wind-arrow.png";
import rain from "@/assets/rain-cloud.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import tempratureConvert from "@/utils/tempratureConveret";
import getTimeFromDateAndTimeString from "@/utils/getTime";
import { ForecastListProps } from "@/redux/slices/ForecastSlice";

interface HourStatusProps {
    forecast: ForecastListProps;
}

const HourStatus: FC<HourStatusProps> = ({ forecast }) => {
    const OPEN__WEATHER_URL = "https://openweathermap.org/img/wn/";
    const { type, postfix } = useSelector((state: RootState) => state.Unit.unit);

    return (
        <div className="bg-[#373636] w-full sm:px-2 py-2 h-full flex xl:flex-col gap-4 items-center p-1 rounded-2xl text-white font-medium">
            <span className="font-semibold">{getTimeFromDateAndTimeString(forecast.dt_txt)}</span>
            <Image src={OPEN__WEATHER_URL + forecast.weather[0].icon + "@2x.png"} alt="hourly_forecast_image" height={70} width={70} />
            <div className="sm:flex hidden gap-1 items-center">
                <Image src={rain} alt="hourly_forecast_image" height={30} width={40} />
                {forecast.pop !== null && <span>{(forecast.pop * 100).toFixed(0)}%</span>}
            </div>
            <div className="flex items-center text-sm">
                <span>{tempratureConvert(type, forecast.main.temp)}</span>
                <span className="self-start -mt-1">o</span>
                <span>{postfix}</span>
            </div>
            <Image className="hidden sm:inline" style={{ transform: `rotate(${forecast.wind.deg}deg)` }} src={wind_arrow} height={30} width={30} alt="wind_direction" />
            <span className="text-sm">{forecast.wind.speed}km/h</span>
        </div>
    );
};

export default HourStatus;
