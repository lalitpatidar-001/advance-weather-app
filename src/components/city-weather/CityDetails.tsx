import { RootState } from "@/redux/store";
import formatDate from "@/utils/formateDate";
import formateTime from "@/utils/formateTime";
import getTimeFromDateAndTimeString from "@/utils/getTime";
import {FC} from "react"
import { useSelector } from "react-redux";

interface CityDetailsProps {
    
}
 
const CityDetails: FC<CityDetailsProps> = () => {
    const {city:cityDtails} = useSelector((state:RootState)=>state.Forecast.forecastData)
    return (
    <div className="h-[250px] py-2 lg:py-0 flex-[3] bg-[#444444] rounded-2xl shadow-sm drop-shadow-md shadow-black text-white
    flex flex-col  items-center gap-5 justify-center
    ">
        <h1 className="text-3xl font-medium ">{cityDtails?.name}</h1>
        <div className="flex flex-col  items-center">
        <span className="text-7xl font-medium font-sans">{}</span>
        <span className="text-4xl font-medium font-sans">{formatDate(Date.now())}</span>
        </div>

    </div> );
}
 
export default CityDetails;