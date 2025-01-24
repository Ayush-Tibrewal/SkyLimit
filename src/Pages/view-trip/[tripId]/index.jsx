import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc ,getDoc  } from "firebase/firestore";
import { db } from '@/services/firebaseconfig';
import Information from './components/information';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';
import { toast } from 'sonner';



function Viewtrip() {
  const { tripId } = useParams();
  const [trip , setTrip] = useState([])


useEffect(()=>{
  getdata();
},[tripId])

  const getdata = async () => {
    const data = doc(db, "AITrips", tripId);
    const response = await getDoc(data);
    if(response.exists()){
      console.log(response.data());
      setTrip(response.data());
    }else{
      toast("your data not exist")
    }}

  return (
    <div className='p-10 md:px-20 lg:pd-44 xl:pd-55'>
      {/* information */}
      <Information trip={trip}></Information>

      {/* recommended hote */}
      <Hotels trip={trip}></Hotels>

      {/* daily plan */}
      <PlacesToVisit trip={trip}></PlacesToVisit>
      {/* footer */}
      <Footer trip={trip}></Footer>
    </div>
  )
}

export default Viewtrip
