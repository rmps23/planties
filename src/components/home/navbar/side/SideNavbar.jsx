import SideLink from './SideLink'
import { FaHome } from "react-icons/fa"
import { RiLeafFill, RiUserFill, RiQuestionAnswerFill } from "react-icons/ri"
import { useAuth } from '../../../../context/AuthContext'

const SideNavbar = () => {
  const { profile } = useAuth()
  return (
    <nav aria-label="Main" className='w-14 md:w-44 transition ease-in-out duration-500 fixed top-24'>
      <SideLink to="/feed" title="Home" icon={<FaHome/>}/>
      <SideLink to={profile ? `/u/${profile.username}` : "/feed"} title="Profile" icon={<RiUserFill/>}/>
      <SideLink to="/plants" title="Plants" icon={<RiLeafFill/>}/>
      <SideLink to="/questions" title="Q&A" icon={<RiQuestionAnswerFill/>}/>
    </nav>
  )
}

export default SideNavbar
