import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Profile from '../Profile/Profile'
import SettingApp from '../SettingApp/SettingApp'
import SocialMedia from '../SocialMedia/SocialMedia'

const Setting = () => {
  return (
    <>
        <Row className='setting-row' >
            <Link to="/profile" 
            element={<Profile />}>
                Profile
            </Link>
        </Row>
        <Row className='setting-row' >
            <Link to="/setting" 
            element={<SettingApp />}>
                Setting
            </Link>
        </Row>
        <Row className='setting-row' >
            <Link to="/about" 
            element={<SocialMedia />}>
                About
            </Link>
        </Row>
        <Row className='setting-row' >
            <Link to="/profile" 
            element={<Profile />}>
                Log Out
            </Link>
        </Row>
    </>
  )
}

export default Setting