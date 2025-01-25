import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter ,RouterProvider } from 'react-router'
import CreateTrip from './Pages/create-trip'
import Header from './components/custom/Header'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './Pages/view-trip/[tripId]'
import Mytrip from './Pages/my-trips'
import Spot from './Pages/perfect-spot'
import Whatwedo from './components/custom/whatwedo'




const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },{
    path:'/create-trip',
    element:<CreateTrip/>
  },{
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },{
    path:'/my-trip',
    element:<Mytrip></Mytrip>
  },{
    path:'perfect-spot',
    element:<Spot></Spot>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster></Toaster>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>;
  </StrictMode>,
)
