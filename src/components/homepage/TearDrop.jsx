import React from 'react'
import { GiWaterDrop } from 'react-icons/gi';
import { RiLeafFill } from 'react-icons/ri';


const TearDrop = () => {

    function handleTearDrop() {

        let teardrop = document.getElementById('teardrop')
        let plant = document.getElementById('teardrop-plant')
        teardrop.style.top = "700px"   
        
        
        plant.style.fontSize = "200px"
        plant.style.top = "480px"
        plant.style.right = "0"
    }

      
  return (
    <>
        <GiWaterDrop id="teardrop" onClick={handleTearDrop} className='teardrop'/>
        <RiLeafFill id="teardrop-plant" className='teardrop-plant'></RiLeafFill>
    </>
  )
}

export default TearDrop