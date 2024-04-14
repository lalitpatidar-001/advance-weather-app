import { FC } from "react";
import sunset_svg from "@/assets/sunset-svg.svg"
import sunrise_svg from "@/assets/sunrise-svg.svg"
import Image from "next/image";
import formateTime from "@/utils/formateTime";
import tempratureConvert from "@/utils/tempratureConveret";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface DayMainDetailsProps {
    data: {
        temp: number | null,
        feels_like: number | null,
    },
    sunrise:number|null,
    sunset:number|null
}

const DayMainDetails: FC<DayMainDetailsProps> = ({ data,sunrise,sunset }) => {
    const {type,postfix} = useSelector((state:RootState)=>state.Unit.unit)
    return (
        <>
            <div className="flex-1 flex flex-col sm:flex-row md:flex-col  justify-between w-full  h-full">
                <div className="flex  sm:block">
                    <div className="flex">
                        <h1 className="font-bold md:text-7xl text-5xl">{tempratureConvert(type,data?.temp)}</h1>
                        <span className=" text-2xl -mt-1 font-bold">o</span>
                        <span className="font-bold text-5xl md:text-7xl">{postfix}</span>
                    </div>
                    <div className="sm:flex hidden items-center  gap-1 ml-4 sm:ml-0">
                        <span className="text-xl">Feels like:</span>
                        <div className="flex items-center">
                            <h1 className="font-bold text-2xl">{tempratureConvert(type,data?.feels_like)}</h1>
                            <span className="self-start -mt-1 text-sm font-bold">o</span>
                            <span className="font-bold text-2xl">{postfix}</span>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-col justify-center  flex-row  gap-2">
                    <div className="flex gap-2 items-center">
                        <Image src={sunrise_svg} height={45} width={40} alt="sunrise-svg" />
                        <div className="flex flex-col">
                            <span className="font-medium">Sunrise</span>
                            <span className="font-medium">{formateTime(sunrise)}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Image src={sunset_svg} height={40} width={40} alt="sunrise-svg" />
                        <div className="flex flex-col">
                            <span className="font-medium">Sunset</span>
                            <span className="font-medium">{formateTime(sunset)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DayMainDetails;