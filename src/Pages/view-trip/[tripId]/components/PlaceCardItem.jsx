import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/services/GlobalApi';
import { GetPlaceDetails } from '@/services/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place])

  const data = {
    textQuery: place.name
  }

  const GetPlacePhoto = async () => {
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[0].name)

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
      setPhotoUrl(PhotoUrl)
    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.name} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

        {photoUrl ? (
          <img
            src={photoUrl}
            className="w-[150px] h-[150px] rounded-xl object-cover"
            alt=""
          />
        ) : (
          <div className="w-[150px] h-[150px] rounded-xl object-cover bg-gray-300 animate-pulse"></div> // Skeleton for image
        )}            <div>
          <h2 className='font-bold text-lg'>{place.name}</h2>
          <p className='text-sm text-gray-400'>{place.details}</p>
          <h2 className='mt-2'>{place.pricing}</h2>
          {/* <FaLocationDot /> */}
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem


