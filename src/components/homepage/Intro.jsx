import React from 'react'
import Wave from './wave.svg';
import { GiPalmTree } from 'react-icons/gi';



const Intro = () => {
  return (
    <div className='h-96 bg-neutral-900 relative'>
        <div className='max-w-7xl mx-auto py-40 text-neutral-50 px-6 relative'>
            <p className='text-7xl mb-4 fancy'>Planties</p>
            <p className='text-xl box-border my-6 text-green-500'>Welcome to the lush and verdant world of plant care!</p>
            <div className='flex flex-col space-y-4 text-xl'>
                <p>1. Join a global community of plant enthusiasts</p>
                <p className='pl-2'>2. Explore a world of unique and rare plants</p>
                <p className='pl-4'>3. Share your passion for greenery with like-minded individuals</p>
            </div>
            <GiPalmTree className='palm-tree'/>
        </div>
        
        <img src={Wave} className='text-green-700 absolute mx-0'/>
    </div>
  )
}

export default Intro