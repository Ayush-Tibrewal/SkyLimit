import React, { useState } from 'react'
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





function Header() {
  
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

  const [open, setOpen] = useState(false);
  
  


  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='w-full p-3 shadow-md flex justify-between items-center  px-2'>
      <img className='cursor-pointer' onClick={()=>{window.location.href = "/"}} src="/logo2.svg" />
      <div>
        {user ? <div className='flex items-center  '>
          <a href='/my-trip'>
          <Button varient="outline" className='rounded-full'> My-Trips </Button>
          </a>
          <a href='/create-trip'>
          <Button varient="outline" className='mx-2 rounded-full'> + Create-Trips </Button>
          </a>

          <Popover>
            <PopoverTrigger><img className='h-[35px] w-[35px] rounded-full' src={user.picture} /></PopoverTrigger>
            <PopoverContent><h2  onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }} className='cursor-pointer'>LogOut</h2></PopoverContent>
          </Popover>
        </div>
          :<div>
          <Button onClick={()=>{setOpen(true)}} >Sign in</Button>

          <Dialog open={open}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo2.svg" />
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
  )
}

export default Header
