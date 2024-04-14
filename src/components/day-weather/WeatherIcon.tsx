import Image from "next/image";
import { FC } from "react";
import sun_clear_png from "@/assets/sun-clear.png"
import temprature_png from "@/assets/thermometer.png"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import tempratureConvert from "@/utils/tempratureConveret";

interface WeatherTypeProps {
    main: {
        temp_min: number | null,
        temp_max: number | null,

    },
    weather: {
        main: string,
        description: string,
        icon: string
    }
}

const WeatherType: FC<WeatherTypeProps> = ({ main, weather }) => {
    const {type,postfix} = useSelector((state:RootState)=>state.Unit.unit)
    const OPEN__WEATHER_URL = "https://openweathermap.org/img/wn/"
    return (
        <>
            <div className="flex-1 flex md:flex-col justify-between items-center h-full w-full">
                <Image src={OPEN__WEATHER_URL + weather.icon + "@2x.png"} alt="sun_clear_png" width={150} height={150} />
                <div className="flex md:flex-col items-center gap-1 ">
                    <div className="flex flex-col">
                        <span className="font-bold text-2xl">{weather?.main}</span>
                        <span>{weather?.description}</span>
                    </div>
                    <div className="sm:flex hidden ">
                        <Image height={10} width={40} alt="thermometer_png" src={temprature_png} />
                        <div className="flex flex-col text-sm ">
                            <div className="flex justify-between gap-1 font-medium">
                                <span>High:</span>
                                <div className="flex  ">
                                    <span>{tempratureConvert(type,main?.temp_max)}</span>
                                    <span className="-mt-1 text-xs">o</span>
                                    <span>{postfix}</span>
                                </div>
                            </div>
                            <div className="flex gap-1 font-medium justify-between">
                                <span>Low:</span>
                                <div className="flex">
                                    <span className="text-sm">{tempratureConvert(type,main?.temp_min)}</span>
                                    <span className="text-xs -mt-1">o</span>
                                    <span>{postfix}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default WeatherType;