import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import getCoordinates from './components/getcordinate';
import Map from './components/map';

function Spot() {
    const [place, setPlace] = useState(null);
    const [coordinates, setCoordinates] = useState(null); // State to store coordinates

    const handlePlaceChange = async (selectedPlace) => {
        setPlace(selectedPlace);
        if (selectedPlace) {
            try {
                const response = await getCoordinates(selectedPlace.label); // Fetch coordinates using the selected place's label
                setCoordinates(response); // Save the coordinates in state
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        }
    };

    return (
        <div>
            <h2 className="mt-10 text-xl font-medium">What is your destination?</h2>
            <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    value: place,
                    onChange: handlePlaceChange,
                }}
            />
            {coordinates && <Map lat={coordinates.lat} lng={coordinates.lng} />}
        </div>
    );
}

export default Spot;
