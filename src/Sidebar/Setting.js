import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Profile from '../Profile/Profile'
import Login from '../Profile/Login'
import SettingApp from '../SettingApp/SettingApp'
import SocialMedia from '../SocialMedia/SocialMedia'

const Setting = ({ logout }) => {
    const trylogout = () => {
        localStorage.removeItem('prsu')
        localStorage.removeItem('punm')
        localStorage.removeItem('pswd')
        logout()
    }

  return (
    <>
        <Row className='setting-row' >
            <Link to="/profile"  className='set-link'
            element={<Profile />}>
                Profile
            </Link>
        </Row>
        <Row className='setting-row' >
            <Link to="/setting" className='set-link'
            element={<SettingApp />}>
                Setting
            </Link>
        </Row>
        <Row className='setting-row' >
            <Link to="/about" className='set-link'
            element={<SocialMedia />}>
                About
            </Link>
        </Row>
        <Row className='setting-row' >
            <Link to="/login" className='set-link'
            element={<Login />} onClick={trylogout} >
                Log Out
            </Link>
        </Row>
    </>
  )
}

export default Setting