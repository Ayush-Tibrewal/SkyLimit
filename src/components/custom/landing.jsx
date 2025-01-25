import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Slider from './slider';
import Whatwedo from './whatwedo';
import Fotter from './footer';

function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content Area */}
      <div className="flex-grow">
        <div className="flex flex-col items-center mx-56 gap-9 text-center">
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
        </div>
        <div className="mt-20">
          <Slider />
        </div>
        <Whatwedo />
      </div>
      <Fotter />
    </div>
  );
}

export default Landing;
