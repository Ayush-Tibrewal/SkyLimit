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
          <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[200px] w-full object-cover' alt="" />
            <div className='my-2 flex flex-col gap-2'>
              <h2 className='font-medium'>{hotel?.name}</h2>
              <h2 className='text-xs text-gray-500'>{hotel?.address}</h2>
              <h2 className='text-sm'>{hotel?.price}</h2>
              <h2 className='text-sm'>{hotel?.rating}</h2>
            </div>
          </div>
          </Link>
  )
}

export default HotelCardItem