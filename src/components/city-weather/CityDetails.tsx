/**
 * CityDetails Component
 * 
 * This component displays detailed information about the selected city, including its name and current date.
 * It fetches the city details from the forecast data stored in the Redux store.
 * 
 * Props:
 *   - None
 * 
 * State:
 *   - None
 * 
 * Hooks:
 *   - useSelector: Used to access the city details from the forecast data in the Redux store.
 * 
 * Functions/Utils:
 *   - formatDate: Utility function to format a date string.
 * 
 * @returns {JSX.Element} CityDetails component
 */

import { RootState } from "@/redux/store";
import formatDate from "@/utils/formateDate";
import { FC } from "react";
import { useSelector } from "react-redux";

interface CityDetailsProps {}

const CityDetails: FC<CityDetailsProps> = () => {
    // Selecting city details from the forecast data in the Redux store
    const { city: cityDetails } = useSelector((state: RootState) => state.Forecast.forecastData);

    return (
        <div className="h-[250px] py-2 lg:py-0 flex-[3] bg-[#444444] z-0 rounded-2xl shadow-sm drop-shadow-md shadow-black text-white flex flex-col items-center gap-5 justify-center">
            {/* Displaying city name */}
            <h1 className="text-3xl font-medium">{cityDetails?.name}</h1>
            {/* Displaying current date */}
            <div className="flex flex-col items-center">
                <span className="text-7xl font-medium font-sans">{}</span>
                <span className="text-4xl font-medium font-sans">{formatDate(Date.now())}</span>
            </div>
        </div>
    );
}

export default CityDetails;
