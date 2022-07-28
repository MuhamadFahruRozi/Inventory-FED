import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Profile from '../Profile/Profile'
import SocialMedia from '../SocialMedia/SocialMedia'

const Setting = () => {
  return (
    <>
        <Row>
            <Link to="/profile" 
            element={<Profile />}>
                Profile
            </Link>
        </Row>
        <Row>
            <Link to="/profile" 
            element={<Profile />}>
                Setting
            </Link>
        </Row>
        <Row>
            <Link to="/about" 
            element={<SocialMedia />}>
                About
            </Link>
        </Row>
        <Row>
            <Link to="/profile" 
            element={<Profile />}>
                Log Out
            </Link>
        </Row>
    </>
  )
}

export default Setting