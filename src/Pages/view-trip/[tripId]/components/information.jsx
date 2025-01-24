
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/services/GlobalApi';
import { PHOTO_REF_URL } from '@/services/GlobalApi';

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

//information page
  return (
    <div >
        <img src={photoUrl?photoUrl:'/placeholder.jpg'}  className='h-[340px] w-full object-cover rounded ' />

        <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'> 
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.noofdays} Days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xs md:text-md'>Budget {trip?.userSelection?.budget} </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xs md:text-md'> No of traveler{trip?.userSelection?.traveler} </h2>
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
