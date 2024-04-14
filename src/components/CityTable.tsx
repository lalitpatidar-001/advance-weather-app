/**
 * CityTable Component
 * 
 * This component fetches and displays a table of city data from an external API.
 * 
 * Hooks:
 *   - useState: Used to manage loading state, fetched city data, current page number, and page offset.
 *   - useEffect: Used to fetch city data from the API and update state when the current page changes.
 * 
 * External Dependencies:
 *   - axios: Used for making HTTP requests to fetch city data.
 *   - react-hot-toast: Used for displaying error messages.
 *   - Loader Component: Used to indicate loading state.
 * 
 * Props:
 *   None
 * 
 * @returns {JSX.Element} CityTable component
 */
"use client"
import axios from "axios";
import { FC, useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { City, addCity } from "@/redux/slices/CityWeather";

interface Props {}
interface coordinatesProps{
    lat:number,
    lon:number
}
interface GeoDataProps {
    name: string,
    timezone: string,
    cou_name_en: string,
    coordinates:coordinatesProps
}

const CityTable: FC<Props> = () => {
    const dispatch:AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [geoData, setGeoData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageOffset, setPageOffset] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number | null>(null);
    const pageLimit = 100;

    useEffect(() => {
        setPageOffset(pageLimit * (currentPage - 1));
    }, [currentPage]);

    useEffect(() => {
        async function getGeoData() {
            try {
                setLoading(true);
                const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${pageLimit}&offset=${pageOffset}&lang=en`);
                setGeoData(response.data.results);
                setLastPage(Math.ceil(response.data.total_count / pageLimit));
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        getGeoData();
    }, [pageOffset]);

   const handleClickCity = (coordinates:coordinatesProps)=>{
    const CityObj:City = {
        coordinates
    }
    dispatch(addCity({data:CityObj}));
    }

    return (
        <>
            <div style={{ height: "calc(100vh - 150px)" }} className="bg-[#444444] px-2 rounded-xl mt-4 overflow-y-scroll">
                <table className="w-full border border-black text-white h-[calc(100vh-200px)] overflow-y-scroll scroll-container">
                    <tr className="border-2 border-black text-green-600 text-xl py-1 sticky bg-[#444444] top-0">
                        <th className="border-2 h-[40px] border-black">City</th>
                        <th className="border-2 h-[40px] border-black">Country</th>
                        <th className="border-2 h-[40px] border-black">Timezone</th>
                    </tr>
                    {loading ? (
                        <div className="flex w-full absolute top-[200px] items-center justify-center"><Loader /></div>
                    ) : (
                        geoData?.map((data: GeoDataProps, index: number) => (
                            <tr key={index}>
                                <td onClick={()=>handleClickCity(data.coordinates)} className="border-2 w-full border-black">
                                    <Link href="/weather"><span className="hover:text-blue-500">{data?.name}</span></Link></td>
                                <td className="border-2 border-black">{data?.cou_name_en}</td>
                                <td className="border-2 border-black">{data?.timezone}</td>
                            </tr>
                        ))
                    )}
                </table>
            </div>
            <div className="w-full flex gap-2 items-center justify-center mt-2">
                {currentPage !== 1 && <button onClick={() => setCurrentPage(currentPage - 1)} className="text-white bg-green-600 rounded-full border-none p-2 font-medium">Prev</button>}
                <div className="flex gap-2">
                    {[1, 2, 3].map((pageNumber) => (
                        <span key={pageNumber} onClick={() => setCurrentPage(currentPage + pageNumber)} className={`${currentPage === currentPage + pageNumber && "bg-blue-400"} border-2 text-white rounded-full h-8 w-8 text-center cursor-pointer`}>{currentPage + pageNumber}</span>
                    ))}
                </div>
                {currentPage !== lastPage && <button onClick={() => setCurrentPage(currentPage + 1)} className="text-white bg-green-600 rounded-full border-none p-2 font-medium">Next</button>}
            </div>
        </>
    );
};

export default CityTable;
