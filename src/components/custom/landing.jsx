import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Slider from './slider';
import Whatwedo from './whatwedo';
import Fotter from './footer';
import { Sparkles } from 'lucide-react';
import NewsletterSection from './newsletter';

function Landing() {
  return (
    <div className="flex flex-col">
      {/* Content Area */}
      <div className="flex-grow">
      <div className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#2A9D8F]">Discover Your Perfect Journey </span>
            <span className="inline-flex items-center">
              with AI Magic <Sparkles className="ml-2 h-8 w-8 text-yellow-400 animate-pulse" />
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-600">
            Experience travel planning reimagined through the power of artificial intelligence
          </p>
          <Link to={'/create-trip'}>
          <button className="bg-[#2A9D8F] hover:bg-[#248277] text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg">
            Begin Your Adventure
          </button>
          </Link>
        </div>
      </div>
        {/* <div className="flex flex-col items-center mx-56 gap-9 text-center">
          <h1 className="font-bold text-[50px] mt-16">
            <span className="text-[#f56551]">
              Plan your perfect journey with AI-powered:
            </span>{' '}
            travel itinerary markers for seamless exploration
          </h1>
          <p className="text-xl text-gray-500 text-center">
            Let AI craft your travel itinerary, ensuring every moment of your
            journey is as unique and memorable as your destination.
          </p>
          <Link to={'/create-trip'}>
            <Button>Let's start your journey</Button>
          </Link>
        </div> */}
        <div className="mt-10">
        <Whatwedo />
        </div>
          <Slider />
          <NewsletterSection/>
      </div>
      <Fotter />

    </div>
  );
}

export default Landing;
