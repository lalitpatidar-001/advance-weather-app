"use client"
import Image from "next/image";
import { FC, useEffect, useState } from "react"
import logo from "@/assets/logo-weather.png"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ForecastListProps, ForecastState } from "@/redux/slices/ForecastSlice";
import formatDate from "@/utils/formateDate";
import { addCurrentHourlyForecast } from "@/redux/slices/CurrentHourlyForecast";
import tempratureConvert from "@/utils/tempratureConveret";
import Loader from "../Loader";

interface ForecastProps {

}

interface currentForecastArrayProps extends ForecastListProps {

}
const Forecast: FC<ForecastProps> = () => {
    const [loading ,setLoading] = useState<boolean>(false)
    const { type, postfix } = useSelector((state: RootState) => state.Unit.unit)
    const { list: forecastData } = useSelector((state: RootState) => state.Forecast.forecastData);
    const [fiveDayForecast, setFiveDayForeCast] = useState<ForecastListProps[] | []>([]);
    const [AllHourlyForecast, setAllHourlyForecast] = useState<currentForecastArrayProps[][] | []>([])
    const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
    const dispatch: AppDispatch = useDispatch()

    const OPEN__WEATHER_URL = "https://openweathermap.org/img/wn/"

    const getDateFromDateAndTime = (dateAndTime: string | null) => {
        return dateAndTime?.split(" ")[0];
    }
    const getFiveDayForecastData = () => {
        let lastDate = getDateFromDateAndTime(forecastData[0].dt_txt);
        let FiveDayForecasts = [];
        FiveDayForecasts = forecastData.filter((forecast: ForecastListProps) => {
            // five day forecast
            if (getDateFromDateAndTime(forecast.dt_txt) !== lastDate) {
                lastDate = getDateFromDateAndTime(forecast.dt_txt);
                return forecast
            }
        });
        console.log("FiveDayForecasts", FiveDayForecasts);
        FiveDayForecasts.unshift(forecastData[0])
        setFiveDayForeCast(FiveDayForecasts)
    }

    const createHourlyForecastArray = () => {
        const HourlyForecastArray: currentForecastArrayProps[][] = [];
        let currentDate = getDateFromDateAndTime(forecastData[0].dt_txt);
        let currentForecastArray: currentForecastArrayProps[] = [];
        forecastData.map((forecast: ForecastListProps) => {
            console.log("currentDate", currentDate, forecast.dt_txt)
            if (getDateFromDateAndTime(forecast.dt_txt) === currentDate) {
                currentForecastArray.push(forecast);
            } else {
                HourlyForecastArray.push(currentForecastArray);
                currentForecastArray = [];
                currentForecastArray.push(forecast);
                currentDate = getDateFromDateAndTime(forecast.dt_txt);
            }
        });
        HourlyForecastArray.push(currentForecastArray);
        setAllHourlyForecast(HourlyForecastArray);
        dispatch(addCurrentHourlyForecast({data:HourlyForecastArray[0]}));
        console.log("HourlyForecastArray", HourlyForecastArray)
    }
    useEffect(() => {
        setLoading(true);
        getFiveDayForecastData();
        createHourlyForecastArray();
        setLoading(false);
    }, []);

    const handleClickDayForecast = (index: number,) => {
        setSelectedDayIndex(index);
        dispatch(addCurrentHourlyForecast({ data: AllHourlyForecast[index] }));
    }
    return (
        <div className="flex-[1]   w-full max-w-[300px] h-fit  shadow-sm drop-shadow-md shadow-black  rounded-2xl  p-2">
            <h1 className="text-white font-bold text-xl text-center">5 Days Forecast:</h1>
                {loading?<Loader/>:
            <div className="flex flex-col gap-1 w-full">
               ( {
                    fiveDayForecast?.map((day, index) => (
                        <div onClick={() => handleClickDayForecast(index)} key={index} className={`${selectedDayIndex === index ? "bg-blue-400" : "hover:bg-gray-600"} flex h-[60px] gap-2 items-center cursor-pointer  rounded-lg`}>
                            {day.weather[0].icon && <Image src={OPEN__WEATHER_URL + day.weather[0].icon + "@2x.png"} width={60} height={60} alt="forecast_image" />}
                            <div className="flex text-white font-medium">
                                <span >{tempratureConvert(type, day.main.temp)}</span>
                                <span className="self-start -mt-2 text-sm">o</span>
                                <span>{postfix}</span>
                            </div>
                            <span className="text-white">{formatDate(day.dt_txt)}</span>
                        </div>
                    ))
                })
            </div>
            }
        </div>
    );
}

export default Forecast;