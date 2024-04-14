/**
 * SearchInput Component
 * 
 * This component represents an input field for searching locations and displaying search results.
 * 
 * Hooks:
 *   - useState: Used to manage local state.
 *   - useEffect: Used for side effects such as fetching data.
 *   - useDispatch: Redux hook to dispatch actions.
 *   - useSelector: Redux hook to access state.
 * 
 * External Dependencies:
 *   - Link: Next.js component for client-side navigation.
 *   - axios: Promise-based HTTP client for making requests.
 *   - addCity Action Creator: Redux action creator to add a city to the store.
 *   - RootState: Interface representing the root state of the Redux store.
 *   - City: Interface representing the structure of a city object.
 *   - CityState: Interface representing the state slice for city-related data in the Redux store.
 *   - AppDispatch: Type representing the dispatch function in Redux.
 * 
 * Props:
 *   None
 * 
 * @returns {JSX.Element} SearchInput component
 */
"use client"
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addCity, City } from "@/redux/slices/CityWeather";
import { RootState } from "@/redux/store";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [searchedCity, setSearchedCity] = useState<string>("");
    const dispatch = useDispatch();

    /**
     * handleClickCity
     * 
     * Function to handle click event for selecting a city from search results.
     * 
     * @param {City} city - The selected city object.
     * @returns {void}
     */
    const handleClickCity = (city: City) => {
        dispatch(addCity({ data: city }));
        setSearchedCity("");
    }

    useEffect(() => {
        async function getCities() {
            try {
                const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name,'${searchedCity}')&order_by=name&limit=100`);
                setCities(response?.data.results);
            } catch (error) {
                console.log(error);
            }
        }
        getCities();
    }, [searchedCity]);

    /** 
     * Function to handle input change event in the search input field.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedCity(e.target.value);
    }

    return (
        <div className="w-full relative">
            <input
                onChange={handleInputChange}
                value={searchedCity}
                name="searchedCity"
                placeholder="Search location"
                className="bg-[#373636] max-w-[400px] w-full placeholder:text-gray-400 text-white p-2 outline-none rounded-xl shadow-lg"
            />
            {cities.length > 0 && (
                <div className="w-full">
                    <div className="flex scroll-container flex-col gap-2 text-white z-[100] absolute max-h-[40vh] overflow-y-auto bg-[#444444]">
                        {cities?.map((city: City, index: number) => (
                            <Link key={index} href={`/weather`}>
                                <span onClick={() => handleClickCity({ name: city?.name, coordinates: city.coordinates })} className="cursor-pointer hover:bg-gray-500 px-2 py-1">{city.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchInput;
