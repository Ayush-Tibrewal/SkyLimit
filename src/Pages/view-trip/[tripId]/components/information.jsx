
import React from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';


function Information({trip}) {
  return (
    <div >
        <img src='/placeholder.jpg'  className='h-[340px] w-full object-cover rounded ' />

        <div className='flex justify-between item-center'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'> 
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.noofdays} Days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xs md:text-md'>Budget {trip?.userSelection?.budget} </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xs md:text-md'> No of traveler{trip?.userSelection?.traveler} </h2>
               <div>
            <Button> <IoIosSend /> </Button>
            </div>
            </div>

        </div>
      
    </div>
  )
}

export default Information
