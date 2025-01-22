// problems right now 
// margin dena hai side se jis se max perfect square lage
// abhi days sahi nhi karenge 
import React, { useState ,useEffect} from 'react'
// https://www.npmjs.com/package/react-google-places-autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectNoOfPersons  , PROMPT} from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { chatSession } from '@/services/Aimodel';






function CreateTrip() {
    const [place, setPlace] = useState();
    const [form , setformData] = useState();

    const handlechnage =(name , value)=>{
       
        setformData({
            ...form,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(form)
    },[form])

    const checkpeople = async ()=>{
        // !form?.noofdays ||
        if(!form?.budget || !form.Travler || !form.location){
            toast("please fill all the details")
        }else if(form?.noofdays>8){
            toast("please fill lesser number of days")
        }
        const FINAL_PROMPT=PROMPT
        // .replace('{location}' ,form?.location.label)
        .replace('{noOfDays}' ,form?.noofdays)
        .replace('{Budget}' ,form?.budget)
        .replace('{traveler}' ,form?.Travler)
        console.log(FINAL_PROMPT)
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(JSON.parse(result.response.text()));

    }
        
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 '>
            <h2 className='text-bold text-3xl'>Tell me your travel prefrence</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just tell me your basics information and travel prefrence</p>

            <div className="mt-20 flex flex-col gap-9">
                <div>
                    <h2 className='mt-10 text-xl margin0=3 font-medium '>What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey="****"
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v)
                                handlechnage('location',v);
                            }
                        }}
                    />
                </div>
            </div>
            <div >
                <h2 className='mt-10 text-xl margin0=3 font-medium '>Number of days you wnat to travel?</h2>
                <Input  onChange={(e)=>{handlechnage('noofdays' , e.target.value)}} type="number" placeholder="Enter number of day "></Input>
            </div>

            <div >
                <h2 className='mt-10 text-xl margin0=3 font-medium '>What is your budget?</h2>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((items, index) => (

                    <div key={index} onClick={()=>handlechnage('budget',items.title)}
                    className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${form?.budget == items.title ? 'shadow-lg border-black' : ''}`}>
                        <h2 className='text-3xl'>{items.icon}</h2>
                        <h2 className='font-bold text-lg'>{items.title}</h2>
                        <h2 className='text-sm text-gray-500'>{items.desc}</h2>
                    </div>
                ))}
            </div>
            <div >
                <h2 className='mt-10 text-xl margin0=3 font-medium '>What is your budget?</h2>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectNoOfPersons.map((items, index) => (
                    <div key={index} onClick={()=>handlechnage('Travler',items.title)}
                    className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${form?.Travler == items.title ? 'shadow-lg border-black' : ''}`}>
                        <h2 className='text-3xl'>{items.icon}</h2>
                        <h2 className='font-bold text-lg'>{items.title}</h2>
                        <h2 className='text-sm text-gray-500'>{items.desc}</h2>

                    </div>
                ))}
            </div>
            <div className='mt-10 flex justify-center item-center' >

                <Button onClick={checkpeople}> Generate My Trip</Button>
            </div>
        </div>


    )
}

export default CreateTrip
