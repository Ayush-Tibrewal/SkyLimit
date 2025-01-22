import React, { useState, useEffect } from 'react';
// https://www.npmjs.com/package/react-google-places-autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectNoOfPersons, PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { chatSession } from '@/services/Aimodel';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [form, setFormData] = useState({});

    const handleChange = (name, value) => {
        setFormData({
            ...form,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(form);
    }, [form]);

    const checkPeople = async () => {
        if (!form?.budget || !form?.traveler || !form?.location|| !form?.noofdays) {
            toast("Please fill all the details");
        } else if (form?.noofdays > 8) {
            toast("Please fill lesser number of days");
        } else {
            const FINAL_PROMPT = PROMPT
                .replace('{location}', form?.location.label)
                .replace('{noOfDays}', form?.noofdays)
                .replace('{Budget}', form?.budget)
                .replace('{traveler}', form?.traveler);
            console.log(FINAL_PROMPT);
            try {
                const result = await chatSession.sendMessage(FINAL_PROMPT);
                console.log(JSON.parse(result.response.text()));
            } catch (error) {
                console.error("Error in fetching data:", error);
            }
        }
    };

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
                    <Button onClick={checkPeople}>Generate My Trip</Button>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;
