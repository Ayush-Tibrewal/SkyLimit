
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/services/GlobalApi';
import { PHOTO_REF_URL } from '@/services/GlobalApi';
import { SkeletonCard } from './skeleton';

function Information({trip}) {

  const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const data={
    textQuery:trip?.userSelection?.location?.label
  }

  // photo api
  const GetPlacePhoto= async ()=>{
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[0].name)

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name)
      setPhotoUrl(PhotoUrl)
    })
  }

  return (
    <div>
    {photoUrl ? (
      <img 
        src={photoUrl} 
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Trip" 
      />
    ) : (
      <SkeletonCard />
    )}


        <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-3xl font-semibold text-gray-900'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'> 
                <h2 className='p-1 px-3 rounded-full bg-[#2A9D8F] text-white text-s md:text-md flex items-center'>{trip?.userSelection?.noofdays} Days</h2>
                <h2 className='p-1 px-3 rounded-full bg-[#2A9D8F] text-white  text-s md:text-md flex items-center'>Budget : {trip?.userSelection?.budget} </h2>
                <h2 className='p-1 px-3 rounded-full bg-[#2A9D8F] text-white  text-s md:text-md flex items-center'> Travel With : {trip?.userSelection?.traveler} </h2>
            <div>
          </div>
            <Button> <IoIosSend /> </Button>
            </div>
            </div>

        </div> 
      
    </div>
  )
}

export default Information
