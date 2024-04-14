/**
 * HourlyForecast Component
 * 
 * This component displays the hourly weather forecast for the current day.
 * It fetches the hourly forecast data from the Redux store and renders each hour's forecast as a HourStatus component.
 * 
 * Hooks:
 *   - useSelector: Used to access current hourly forecast data from the Redux store.
 * 
 * Utils/Functions:
 *   - formatDate: Utility function to format date.
 * 
 * Props:
 *   - None
 * 
 * @returns {JSX.Element} HourlyForecast component
 */

import { FC } from "react";
import HourStatus from "./HourStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ForecastListProps } from "@/redux/slices/ForecastSlice";
import formatDate from "@/utils/formateDate";

interface HourlyForecastProps {}

const HourlyForecast: FC<HourlyForecastProps> = () => {
    const currentHourlyForecastData: ForecastListProps[] = useSelector(
        (state: RootState) => state.CurrentHourlyForecast.currentHourlyForecastData
    );

    return (
        <div className="flex-[1] w-fit lg:max-w-[500px] xl:max-w-[800px] flex flex-col justify-between shadow-sm p-4 h-fit drop-shadow-sm shadow-black rounded-2xl">
            <div className="flex gap-2 justify-center">
                <span className="text-white text-xl sm:text-2xl">{formatDate(currentHourlyForecastData[0]?.dt_txt)}</span>
                <h1 className="text-center text-white font-bold text-xl sm:text-2xl"> - Hourly Forecast</h1>
            </div>
            <div className="flex xl:flex-row flex-col gap-2 justify-between w-full">
                {currentHourlyForecastData?.map((forecast, index: number) => (
                    <HourStatus key={index} forecast={forecast} />
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
