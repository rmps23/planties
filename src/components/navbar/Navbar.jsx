import React from 'react'
import { RiLeafFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className='h-16'>
        <div className='max-w-7xl flex mx-auto h-full justify-between px-6'>
          <div className='my-auto'>
            <h1 className='text-green-500 text-xl flex title fancy'>Planties<RiLeafFill className='flex'/></h1>
          </div>
          <div className='my-auto flex flex-row-reverse space-x-4 space-x-reverse'>
            <FaUser 
            className='text-green-500 rounded-full border border-green-500 p-2 text-3xl transition ease-in-out duration-300 cursor-pointer
            hover:bg-green-500 hover:text-neutral-900
            '></FaUser>
          </div>
        </div>
    </div>
  )
}

export default Navbar