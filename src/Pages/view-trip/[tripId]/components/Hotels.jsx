import { Link } from 'react-router-dom';
import React from 'react'
import HotelCardItem from './HotelCardItem';

function Hotels({trip}) {
  return (
    <div>
      <h2 className='text-2xl font-semibold text-gray-900 mt-5'>Hotel Recommendation</h2>
      <div className='mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {trip?.Tripdata?.hotels?.map((hotel,index)=>(
          <HotelCardItem hotel={hotel}></HotelCardItem>
        ))}
      </div>
    </div>
  )
}

export default Hotels
