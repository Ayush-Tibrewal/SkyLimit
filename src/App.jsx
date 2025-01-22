import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Bluetooth } from 'lucide-react'
import Landing from './components/custom/landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Landing></Landing>
    </>
  )
}

export default App
