import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { PHOTO_REF_URL } from '@/services/GlobalApi';
import { GetPlaceDetails } from '@/services/GlobalApi';

function HotelCardItem({hotel}) {
    const [photoUrl,setPhotoUrl] = useState();
      useEffect(()=>{
        hotel&&GetPlacePhoto();
      },[hotel])
    
      const data={
        textQuery:hotel?.name
      }
    
      const GetPlacePhoto= async ()=>{
        const result = await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[0].name)
    
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name)
          setPhotoUrl(PhotoUrl)
        })
      }
  return (
        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+','+hotel?.address} target='_blank'>
          <div className='hover:scale-105 transition-all cursor-pointer border shadow-md rounded-xl h-[380px]'>
          {photoUrl ? (
        <img 
          src={photoUrl} 
          className="rounded-xl h-[200px] w-full object-cover" 
          alt="" 
        />
      ) : (
        <div className=" h-[200px] w-full bg-gray-300 animate-pulse"></div> 
      )}            <div className='my-2 flex flex-col gap-2'>
              <h2 className='mx-3 font-medium text-xl text-[#2A9D8F]'>{hotel?.name}</h2>
              <h2 className='mx-3 text-md text-gray-500'>{hotel?.address}</h2>
              <h2 className='mx-3 text-md text-gray-500'>Price: {hotel?.price}</h2>
              <h2 className='mx-3 text-md text-gray-500'>⭐ {hotel?.rating}</h2>
            </div>
          </div>
          </Link>
  )
}

export default HotelCardItem


