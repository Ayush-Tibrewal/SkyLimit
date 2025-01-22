import React, { useState, useEffect } from 'react';
// https://www.npmjs.com/package/react-google-places-autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectNoOfPersons, PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { chatSession } from '@/services/Aimodel';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/services/firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
    const [place, setPlace] = useState();
    const [form, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (name, value) => {
        setFormData({
            ...form,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(form);
    }, [form]);

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
        checkPeople();
    }

    // main function

    const checkPeople = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpen(true);
        }
        // if (!form?.budget || !form?.traveler || !form?.location || !form?.noofdays) {
        //     toast("Please fill all the details");
        // } else if (form?.noofdays > 8) {
        //     toast("Please fill lesser number of days");
        // } if  {
        setLoading(true)
        const FINAL_PROMPT = PROMPT
            .replace('{location}', form?.location.label)
            .replace('{noOfDays}', form?.noofdays)
            .replace('{Budget}', form?.budget)
            .replace('{traveler}', form?.Travler);
        console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(JSON.parse(result?.response?.text()));
        setLoading(false);
        SaveAitrip(result?.response?.text())
        // }

    };

    const SaveAitrip = async (Tripdata) => {
        setLoading(true);
        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem('user'))
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: form,
            Tripdata: JSON.parse(Tripdata),
            userEmail: user?.email,
            id: docId
        });
        console.log("datset is added")
        setLoading(false);
        // redirect to the new screen
        navigate(`/view-trip/${docId}`)


    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='text-bold text-3xl'>Tell me your travel preference</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just tell me your basic information and travel preference</p>

            <div className="mt-20 flex flex-col gap-9">
                <div>
                    <h2 className='mt-10 text-xl font-medium'>What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (value) => {
                                setPlace(value);
                                handleChange('location', value);
                            }
                        }}
                    />
                </div>
                <div>
                    <h2 className='mt-10 text-xl font-medium'>Number of days you want to travel?</h2>
                    <Input
                        onChange={(e) => handleChange('noofdays', e.target.value)}
                        type="number"
                        placeholder="Enter number of days"
                    />
                </div>
                <div>
                    <h2 className='mt-10 text-xl font-medium'>What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleChange('budget', item.title)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${form?.budget === item.title ? 'shadow-lg border-black' : ''}`}>
                                <h2 className='text-3xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='mt-10 text-xl font-medium'>Number of travelers?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectNoOfPersons.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleChange('traveler', item.title)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${form?.traveler === item.title ? 'shadow-lg border-black' : ''}`}>
                                <h2 className='text-3xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-10 flex justify-center items-center'>
                    <Button disabled={loading} onClick={checkPeople}>
                        {loading ? <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />
                            : 'Generate My Trip'}</Button>
                </div>
            </div>

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
    );
}

export default CreateTrip;
