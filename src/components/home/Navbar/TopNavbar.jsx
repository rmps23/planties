import React from 'react'
import { RiLeafFill } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";


const TopNavbar = () => {
  return (
    <nav className='w-full h-16 bg-green-500 flex items-center justify-between'>
      <div className='max-w-7xl mx-auto'>
        <p className='fancy text-2xl text-neutral-800 flex'>Planties <RiLeafFill className="flex text-2xl text-neutral-800" /></p>
      </div>
      <div className='max-w-7xl mx-auto'>
        <RiUser3Fill className='text-2xl text-neutral-50 bg-neutral-800 w-9 h-9 p-2 rounded-full cursor-pointer hover:opacity-90 transition ease-in-out duration-300'/>
      </div>
    </nav>
  )
}

export default TopNavbar