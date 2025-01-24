import React from 'react'
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/services/GlobalApi';
import { GetPlaceDetails } from '@/services/GlobalApi'
import { Link } from 'react-router-dom';




function UserTripCard({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const data = {
        textQuery: trip?.userSelection?.location?.label
    }

    const GetPlacePhoto = async () => {
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[0].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
            setPhotoUrl(PhotoUrl)
        })
    }

    return (
        <Link to={'/view-trip/'+trip.id}>
        <div className='hover:scale-105 transition-all  '>
            <img src={photoUrl?photoUrl: '/placeholder.jpg'} />
            <div>
                <h2 className='font-bold text-lg'>{trip.userSelection.location.label}</h2>
                <h2 className='text-gray-500 text-sm'>{trip.userSelection.noofdays} Days {trip.userSelection.budget}</h2>
            </div>
        </div>
        </Link>
    )
}

export default UserTripCard
