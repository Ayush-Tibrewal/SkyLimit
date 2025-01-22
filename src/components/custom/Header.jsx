import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
      <div className='w-full p-3 shadow-md flex justify-between items-center  px-2'>
        <img src="/logo2.svg" />
        <div><Button>Sign in</Button></div>
        </div>
  )
}

export default Header
