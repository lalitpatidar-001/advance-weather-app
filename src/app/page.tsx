import CityTable from '@/components/CityTable'
import React from 'react'

/*
Home Component -> 
 * This is home page of application
 * This is responsible to render CityTable Component.
*/
const Home = () => {
  return (
    <div className='p-2 z-30 '>
        <CityTable/>
    </div>
  )
}

export default Home