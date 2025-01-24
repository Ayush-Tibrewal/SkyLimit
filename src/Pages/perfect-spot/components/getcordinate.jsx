import axios from 'axios';

 const getCoordinates = async (location) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    address: location,
                    key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
                },
            }
        );
        if (response.data && response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            return { lat, lng };
        } else {
            console.error('No results found for the given location.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
};

export default getCoordinates