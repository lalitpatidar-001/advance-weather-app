/**
 * Navbar Component
 * 
 * This component represents the navigation bar of the application.
 * 
 * Hooks:
 *   - useState: Used to manage local state.
 * 
 * External Dependencies:
 *   - MyLocationOutlinedIcon: Material-UI icon component for representing the current location button.
 *   - SearchInput Component: Custom input component for search functionality.
 *   - getCurrentLocation Function: Utility function to retrieve the current location.
 *   - addCity Action Creator: Redux action creator to add a city to the store.
 *   - useDispatch: Redux hook to dispatch actions.
 *   - Link: Next.js component for client-side navigation.
 * 
 * Props:
 *   None
 * 
 * @returns {JSX.Element} Navbar component
 */
"use client"

import { FC } from "react";
import logo from "@/assets/logo-weather.png";
import Image from "next/image";
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import SearchInput from "./SearchInput";
import getCurrentLocation from "@/utils/currentLocation";
import { City, addCity } from "@/redux/slices/CityWeather";
import { useDispatch } from "react-redux";
import Link from "next/link";

interface Props {}

const Navbar: FC<Props> = () => {
    const dispatch = useDispatch();

    /**
     * handleClickCurrentLocation
     * 
     * Function to handle click event for retrieving current location and adding it to the store.
     * 
     * @returns {void}
     */
    const handleClickCurrentLocation = async () => {
        const location: City = await getCurrentLocation();
        dispatch(addCity({ data: location }));
    }

    return (
        <nav className="flex justify-between items-center bg-[#444444] h-[50px] px-2 mx-3 rounded-3xl shadow-sm drop-shadow-md shadow-black mt-1">
            <Link href="/">
                <div className="flex gap-1 items-center cursor-pointer">
                    <Image src={logo} width={50} height={50} alt="logo-image" />
                    <span className="text-xl text-white font-medium hidden sm:inline">Weather Forecast</span>
                </div>
            </Link>
            <div className="flex justify-center relative">
                <SearchInput />
            </div>
            <Link href={`/weather`}>
                <div onClick={handleClickCurrentLocation}>
                    <button className="bg-[#45cb06] border-none rounded-2xl p-1">
                        <MyLocationOutlinedIcon style={{ color: "black" }} />
                        <span className="text-white font-medium hidden md:inline">Current Location</span>
                    </button>
                </div>
            </Link>
        </nav>
    );
}

export default Navbar;
