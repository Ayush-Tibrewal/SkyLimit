import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/services/firebaseconfig';
import UserTripCard from "./component/UserTrip";

function MyTrip() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        GetUser();
    }, []);

    const GetUser = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }
        try {
            setTrips([]); // Clear trips before fetching
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                console.warn("No documents found for this user.");
            } else {
                const fetchedTrips = snapshot.docs.map(doc => doc.data());
                setTrips(fetchedTrips);
            }
        } catch (error) {
            console.error("Error fetching documents from Firestore:", error);
        }
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10">
            <h2 className="font-bold text-3xl">Trips</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 object-cover rounded-xl gap-5 mt-3" >
             
                {trips.length > 0 ? (
                    trips.map((tripData, index) => (
                        <UserTripCard key={index} trip={tripData} />
                    ))
                ) : (
                    <p>No trips found.</p>
                )}
            </div>
        </div>
    );
}

export default MyTrip;
