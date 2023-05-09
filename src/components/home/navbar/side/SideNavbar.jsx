import React from 'react'
import SideLink from './SideLink'
import { FaHome } from "react-icons/fa"
import { RiLeafFill } from "react-icons/ri"
import { RiNotification3Fill } from "react-icons/ri"
import { RiUserFill } from "react-icons/ri"

const SideNavbar = () => {
  return (
    <div className='w-44 transition ease-in-out duration-500 fixed top-24'>
      <SideLink title="Home" icon={<FaHome/>}/>
      <SideLink title="Profile" icon={<RiUserFill/>}/>
      <SideLink title="Plants" icon={<RiLeafFill/>}/>
      <SideLink title="Notifications" icon={<RiNotification3Fill/>}/>
      
    </div>
  )
}

export default SideNavbar