"use client"
import {  City, CityState, addCity } from "@/redux/slices/CityWeather";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

interface SearchInputProps {
}

interface CityProps {
    name: string,
    lat:null,
    long:null
}

const SearchInput: FC<SearchInputProps> = () => {
    const [cities, setCities] = useState([]);
    const [searchedCity, setSearchedCity] = useState<string>("");
    const dispatch:AppDispatch = useDispatch();

    const handleClickCity = (city:City)=>{
        console.log("city:,",city)
        dispatch(addCity({data:city}))
        setSearchedCity("");
    }

    useEffect(() => {
        async function getCities() {
            try {
                const respones = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name,'${searchedCity}')&order_by=name&limit=100
                `);

                setCities(respones?.data.results);
                console.log("cities", respones)
                console.log("respones?.data.results", respones?.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        getCities();
    }, [searchedCity]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedCity(e.target.value);
    }

    return (
        <div className="w-full relative">
            <input
                onChange={handleInputChange}
                value={searchedCity}
                name="searchedCity"
                placeholder="search location" className="bg-[#373636] max-w-[400px] w-full placeholder:text-gray-400 text-white p-2 outline-none rounded-xl shadow-lg" />
            {cities.length > 0 &&
                <div className="flex flex-col gap-2  absolute right-10 z-50 max-h-[40vh] overflow-y-auto bg-[#444444] ">
                    {
                        cities?.map((city:City) => (
                            <Link href={`/weather`}>
                            <span onClick={()=>handleClickCity({
                                name:city?.name,
                                coordinates:city.coordinates,
                            })} className="cursor-pointer hover:bg-gray-500 px-2 py-1">{city.name}</span>
                            </Link>
                        ))
                    }
                </div>}
        </div>
    );
}

export default SearchInput;