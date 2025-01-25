import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';

import React, { useState,useRef } from 'react'
import { Plane, Menu, X } from 'lucide-react';
import { Toaster,toast } from "sonner"
import { Link } from 'react-router-dom';

// import { whatWeDo } from './whatwedo';





function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const scrollToSection = (ref) => {
  //   setIsMenuOpen(false);
  // };

  const scrollToSection = (ref) => {
    const element = document.querySelector(ref); // Find the target section by its ID or class
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
    }
  };
  
  // Create a ref for the target section

  // const scrollToSection = (ref) => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section
  //   }
  // };

  //sign in logic 
  const [open, setOpen] = useState(false);
  // google auth , will be used in get started
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse);
    }
  });

  const GetUserProfile = async (tokenInfo) => {
    const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    });
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.data));
    setOpen(false);
    window.location.reload();
  }
    const user = JSON.parse(localStorage.getItem('user'));


  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <Plane className="h-8 w-8 text-[#2A9D8F]" />
            <span  onClick={() => { window.location.href = "/" }} className="ml-2 text-xl font-bold text-gray-800 cursor-pointer">TravelAI</span>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('#whatWeDo')}
              className="text-gray-600 hover:text-[#2A9D8F] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => toast("We are building Bloging-Community very soon!!!")}
              className="text-gray-600 hover:text-[#2A9D8F] transition-colors"
            >
              Community
            </button>
            <a href='/popular-destinations' className='ml-0 flex items-center'>
              <button
                  className="text-gray-600 hover:text-[#2A9D8F] transition-colors"
                  >
                  Popular-Destinations
                </button>
            </a>
            {/* <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-600 hover:text-[#2A9D8F] transition-colors"
            >
              Testimonials
            </button> */}
            {/* code starts */}
            <div>
        {user ? <div className='flex items-center space-x-8'>
          {/* saved trips */} 
          <a href='/my-trip'>
          <button
                onClick={() => scrollToSection('destinations')}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-[#2A9D8F] transition-colors"
              >
                My-Trips
              </button>
              </a>
              
          {/* button hai ye creat trip wala  */}
          <a href='/create-trip'>
          <button className="bg-[#2A9D8F] text-white px-4 py-2 rounded-full hover:bg-[#248277] transition-colors hover:scale-105">
            + Create Trips
            </button>
          </a>
         
          {/* log out button + image */}
          <Popover>
            <PopoverTrigger><img className='h-[35px] w-[35px] rounded-full' src={user.picture} /></PopoverTrigger>
            <PopoverContent><h2 onClick={() => {
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }} className='cursor-pointer'>LogOut</h2></PopoverContent>
          </Popover>
        </div>
          : <div>
            <button onClick={() => { setOpen(true) }} className="bg-[#2A9D8F] text-white px-4 py-2 rounded-full hover:bg-[#248277] transition-colors">
              Sign In
            </button>
            <Dialog open={open}>
              {/* <DialogTrigger>Open</DialogTrigger> */}
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    
                    <div className='flex'>
                  <Plane className="h-8 w-8 text-[#2A9D8F]" />
                  <span className="ml-2 text-xl font-bold text-gray-800 cursor-pointer">TravelAI</span>
                  </div>

                    <h2 className='font-bold mt-7'>Sign in with Google</h2>
                    <p>Sign in with google Authentication</p>
                    <Button
                      onClick={login} className=' w-full mt-3 flex gap-6 item-center' varient="outline">
                      <FcGoogle className='w-7 h-7' /> Sign in with Google
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          }
      </div>
    </div>
            {/* code end */}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#2A9D8F] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-[#2A9D8F] transition-colors"
              >
                Features
              </button>
             
             
              <button className="block w-full text-left px-3 py-2 text-white bg-[#2A9D8F] rounded-md">
                Get Started
              </button>
            </div>
          </div>
        )}
          </nav>
  );

}

export default Header



// const [open, setOpen] = useState(false);
//   // google auth , will be used in get started
//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       GetUserProfile(tokenResponse);
//     }
//   });

  // const GetUserProfile = async (tokenInfo) => {
  //   const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
  //     headers: {
  //       Authorization: `Bearer ${tokenInfo?.access_token}`,
  //       Accept: 'application/json'
  //     }
  //   });
  //   console.log(response);
  //   localStorage.setItem('user', JSON.stringify(response.data));
  //   setOpen(false);
  //   window.location.reload();
  // }

  // const user = JSON.parse(localStorage.getItem('user'));
//     <div className='w-full p-3 shadow-md flex justify-between items-center  px-2'>
//       <img className='cursor-pointer' onClick={() => { window.location.href = "/" }} src="/logo2.svg" />
    //   <div>
    //     {user ? <div className='flex items-center  '>
    //       {/* saved trips */} 
    //       <a href='/my-trip'>
    //         <Button varient="outline" className='rounded-full'> My-Trips </Button>
    //       </a>
    //       {/* button hai ye creat trip wala  */}
    //       <a href='/create-trip'>
    //         <Button varient="outline" className='mx-2 rounded-full'> + Create-Trips </Button>
    //       </a>
    //       {/* what we do header */}
    //       <a href="#support-system" >
    //         <Button varient="outline" className='rounded-full'> What we do </Button>
    //       </a>
    //       {/* log out button + image */}
    //       <Popover>
    //         <PopoverTrigger><img className='h-[35px] w-[35px] rounded-full' src={user.picture} /></PopoverTrigger>
    //         <PopoverContent><h2 onClick={() => {
    //           googleLogout();
    //           localStorage.clear();
    //           window.location.reload();
    //         }} className='cursor-pointer'>LogOut</h2></PopoverContent>
    //       </Popover>
    //     </div>
    //       : <div>
    //         <Button onClick={() => { setOpen(true) }} >Sign in</Button>
    //         <Dialog open={open}>
    //           {/* <DialogTrigger>Open</DialogTrigger> */}
    //           <DialogContent>
    //             <DialogHeader>
    //               <DialogDescription>
    //                 <img src="/logo2.svg" />
    //                 <h2 className='font-bold mt-7'>Sign in with Google</h2>
    //                 <p>Sign in with google Authentication</p>
    //                 <Button
    //                   onClick={login} className=' w-full mt-3 flex gap-6 item-center' varient="outline">
    //                   <FcGoogle className='w-7 h-7' /> Sign in with Google
    //                 </Button>
    //               </DialogDescription>
    //             </DialogHeader>
    //           </DialogContent>
    //         </Dialog>
    //       </div>
    //     }
    //   </div>
    // </div>
//   )
// }




