import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div className='mt-8'>
        <h2 className='text-2xl font-semibold text-gray-900'>Places To Visit</h2>

        <div>
            {trip.Tripdata?.itinerary.map((item,index)=>(
                <div className='mt-5'>
                    <h2 className='font-semibold text-lg'>{`Day ${item.day}`}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.places.map((place,index)=>(
                        <div>
                            <h2 className='font-medium text-sm text-gray-900'>Timings: {place.timings}</h2>
                            <PlaceCardItem place={place}></PlaceCardItem>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit