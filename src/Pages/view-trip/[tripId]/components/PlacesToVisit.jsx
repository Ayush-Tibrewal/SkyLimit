import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places To Visit</h2>

        <div>
            {trip.Tripdata?.itinerary.map((item,index)=>(
                <div className='mt-5'>
                    <h2 className='font-medium text-lg'>{`Day ${item.day}`}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.places.map((place,index)=>(
                        <div>
                            <h2 className='font-medium text-sm text-orange-500'>{place.timings}</h2>
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