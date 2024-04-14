"use client"
import { FC, useState } from "react"
import logo from "@/assets/logo-weather.png"
import Image from "next/image";
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import SearchInput from "./SearchInput";
import getCurrentLocation from "@/utils/currentLocation";
import { City, addCity, coordinatesProps } from "@/redux/slices/CityWeather";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";

interface Props {

}



const Navbar: FC<Props> = () => {
    const dispatch: AppDispatch = useDispatch();
    const handleClickCurrentLocation = async () => {
        const location: City = await getCurrentLocation();
        dispatch(addCity({ data: location }))
    }
    return (
        <nav className="flex  justify-between items-center bg-[#444444] h-[50px] px-2 mx-3 rounded-3xl shadow-sm drop-shadow-md shadow-black mt-1">
            <Link href="/">
                <div className="flex gap-1 items-center cursor-pointer ">
                    <Image src={logo} width={50} height={50} alt="logo-image" />
                    <span className="text-xl text-white font-medium hidden sm:inline">Weather Forecast</span>
                </div>
            </Link>
            <div className="flex justify-center">
                <SearchInput />
            </div>
            <Link href={`/weather`}>
                <div onClick={handleClickCurrentLocation}>
                    <button className="bg-[#45cb06]  border-none rounded-2xl p-1"><MyLocationOutlinedIcon style={{ color: "black" }} /> <span className="text-white font-medium hidden md:inline">Current Location</span>
                    </button>
                </div>
            </Link>
        </nav>
    );
}

export default Navbar;