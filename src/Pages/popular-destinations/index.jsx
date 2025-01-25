// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight } from 'lucide-react';

import {
    Card
} from "@/components/ui/card"

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';



function Popular() {
    const navigate = useNavigate();
    const destinations = [
        {
            title: "Santorini, Greece",
            image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
            description: "Iconic white-washed buildings and stunning sunsets",
            rating: 4.9,
            price: "From $299/night",
            attractions: ["Caldera Views", "Wine Tours", "Beach"],
            route: "/view-trip/1737812719355"

        },
        {
            title: "Kyoto, Japan",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
            description: "Ancient temples and serene bamboo forests",
            rating: 4.8,
            price: "From $199/night",
            attractions: ["Temples", "Gardens", "Tea Ceremony"],
            route: "/view-trip/1737667674712"

        },
        {
            title: "Maldives",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
            description: "Crystal clear waters and overwater bungalows",
            rating: 4.9,
            price: "From $599/night",
            attractions: ["Snorkeling", "Spa", "Water Villas"],
            route: "/view-trip/1737727532749"

        },
        {
            title: "Amalfi Coast, Italy",
            image: "https://images.unsplash.com/photo-1533165955937-d6d207c15f95?auto=format&fit=crop&w=800&q=80",
            description: "Dramatic coastline and charming villages",
            rating: 4.7,
            price: "From $249/night",
            attractions: ["Coastal Drive", "Beaches", "Cuisine"],
            route: "/view-trip/1737727532749"

        },
        {
            title: "Machu Picchu, Peru",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
            description: "Ancient Incan citadel in the clouds",
            rating: 4.9,
            price: "From $179/night",
            attractions: ["Ruins", "Hiking", "History"],
            route: "/view-trip/1737727532749"

        },
        {
            title: "Dubai, UAE",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
            description: "Futuristic architecture and luxury experiences",
            rating: 4.8,
            price: "From $399/night",
            attractions: ["Shopping", "Desert Safari", "Burj Khalifa"],
            route: "/view-trip/1737727532749"

        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the world's most enchanting locations, from pristine beaches to historic landmarks
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <Card onClick={() => navigate(destination.route)} key={index} className="group overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
                            <div className="relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                                <img
                                    src={destination.image}
                                    alt={destination.title}
                                    className="h-64 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium">{destination.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.title}</h3>
                                        <div className="flex items-center text-gray-500">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{destination.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">{destination.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {destination.attractions.map((attraction, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                                        >
                                            {attraction}
                                        </span>
                                    ))}
                                </div>

                                <Button className="w-full group">
                                    Explore Destination
                                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Popular;