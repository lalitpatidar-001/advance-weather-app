"use client"
import axios from "axios";
import { FC, useEffect, useState } from "react"
interface Props {

}

interface GeoDataProps {
    name: string,
    timezone: string,
    cou_name_en: string
}

const CityTable: FC<Props> = () => {

    const [geoData, setGeoData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageOffset , setPageOffset] = useState<number>(1);
    const [lastPage,setLastPage] = useState<number|null>(null);
    const pageLimit = 100;

    useEffect(()=>{
        setPageOffset(pageLimit*(currentPage-1));
    },[currentPage]);

    useEffect(() => {
        async function getGeoData() {
            try {
                const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${100}&offset=${pageOffset}&lang=en`);
                console.log(response);
                setGeoData(response.data.results);
                setLastPage(response.data.total_count);
            } catch (error) {
                console.log(error)
            }
        }
        getGeoData();
    }, [pageOffset]);

    return (
        <>
        <div className="bg-[#444444] px-2 rounded-xl mt-4 h-[calc(100vh-150px)] overflow-y-scroll ">

            <table className="w-full border border-black text-white h-[calc(100vh-200px)] overflow-y-scroll  ">
                <tr className="border-2 border-black text-green-600 text-xl py-1 sticky bg-[#444444] top-0">
                    <th className="border-2 border-black">City</th>
                    <th className="border-2 border-black">Country</th>
                    <th className="border-2 border-black">Timezone</th>
                </tr>
                {
                    geoData?.map((data: GeoDataProps) => (
                        <tr>
                            <td className="border-2 border-black">{data?.name}</td>
                            <td className="border-2 border-black">{data?.cou_name_en}</td>
                            <td className="border-2 border-black">{data?.timezone}</td>
                        </tr>
                    ))
                }

            </table>
        </div>
            <div className="w-full flex gap-2 items-center justify-center mt-2">
                {currentPage!==1 && <button onClick={()=>setCurrentPage(currentPage-1)} className="text-white bg-green-600 rounded-full border-none p-2 font-medium ">prev</button>}
                <div className="flex gap-2">
                    <span onClick={()=>setCurrentPage(currentPage+1)}  className={`${currentPage===currentPage+1 && "bg-blue-400"} border-2 text-white rounded-full h-8 w-8 text-center cursor-pointer`}>{currentPage+1}</span>
                    <span onClick={()=>setCurrentPage(currentPage+2)} className="border-2 text-white rounded-full h-8 w-8 text-center cursor-pointer">{currentPage+2}</span>
                    <span onClick={()=>setCurrentPage(currentPage+3)} className="border-2 text-white rounded-full h-8 w-8 text-center cursor-pointer">{currentPage+3}</span>
                </div>
                {currentPage!==lastPage && <button onClick={()=>setCurrentPage(currentPage+1)} className="text-white bg-green-600 rounded-full border-none p-2 font-medium ">next</button>}
            </div>
        </>
    );
}

export default CityTable;