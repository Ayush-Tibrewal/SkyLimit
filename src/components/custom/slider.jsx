import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const destinations = [
        {
            image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80",
            title: "Maldives",
            description: "Crystal clear waters and overwater bungalows"
        },
        {
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80",
            title: "Italy",
            description: "Historic architecture and culinary delights"
        },
        {
            image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80",
            title: "Japan",
            description: "Blend of tradition and modern innovation"
        }
    ];

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % destinations.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [destinations.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % destinations.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="relative">
                    {/* Slider container */}
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {destinations.map((dest, index) => (
                                <div key={index} className="min-w-full relative">
                                    <img
                                        src={dest.image}
                                        alt={dest.title}
                                        className="w-full h-[500px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                                        <div className="p-8 text-white">
                                            <h3 className="text-3xl font-bold mb-2">{dest.title}</h3>
                                            <p className="text-xl">{dest.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
