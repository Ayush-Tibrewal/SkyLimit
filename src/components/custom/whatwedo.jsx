import React from 'react';
import { Globe2, Clock, Map } from 'lucide-react';
import { useRef } from 'react';

const Whatwedo = () => {
    // const whatWeDo = useRef();
    const features = [
        {
            icon: <Globe2 className="h-8 w-8 text-[#2A9D8F]" />,
            title: "Personalized Itineraries",
            description: "AI-powered recommendations tailored to your preferences and travel style"
        },
        {
            icon: <Clock className="h-8 w-8 text-[#2A9D8F]" />,
            title: "Time-Saving Planning",
            description: "Create detailed travel plans in minutes instead of hours"
        },
        {
            icon: <Map className="h-8 w-8 text-[#2A9D8F]" />,
            title: "Smart Recommendations",
            description: "Discover hidden gems and local favorites along your route"
        }
    ];

    return (
        <div id='whatWeDo' className=" bg-white">
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        Why Choose Our AI Travel Planner?
                    </h2>

                    <div  className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-[#2A9D8F]/10 rounded-full mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Whatwedo;
// export const whatWeDo = useRef({});