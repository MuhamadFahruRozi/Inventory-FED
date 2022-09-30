import { useState } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import { AiOutlineSetting, AiTwotoneSetting } from 'react-icons/ai'
import NavbarWide from './NavbarWide'
import Setting from './Setting'
import KS from '../img/user.png'
import {useNavigate} from 'react-router-dom'

const Sidebar = ({ setWideContent, isAdmin, user, bahasaApp, sbTheme, sbTagTheme, sbLinkTheme }) => {
  const [wideness, setWideness] = useState(true)
  const [setting, setSetting] = useState(false)
  const [tab, setTab] = useState('')
  
  let navigate = useNavigate();

  const handleWideness = (data) => {
    setWideness(data)
    if (data === false) {
      setWideContent(true)
    } else {
      setWideContent(false)
    }
  }

  return (
    <>
    <div className={wideness === true ? 'sidebar' : 'sidebar small'}>
      <div xs={3} className='profile'>
        <div className='picture-div'>
          {
            wideness === true ?
            <div className='photo' onClick={() => navigate('/profile')}>
              <img src={user.pic_url !== "" ? user.pic_url : KS} alt="" />
            </div>
            :
            ''
          }
          <div className={`hide-button ${sbTheme}`}>
            {
              wideness === true ? 
              <BsChevronDoubleLeft className='sidebar-hide' onClick={() => handleWideness(false)} /> 
                : 
              <BsChevronDoubleRight className='sidebar-show' onClick={() => handleWideness(true)}  />
            }
          </div>
        </div>
        <div className='name-div'>
          {
            wideness === true ? 
            <div className={`username ${sbTagTheme}`}>
              {user.username}
            </div>
            :
            ''
          }
          <div className={`hide-button name ${sbTheme}`}>
          </div>
        </div>
      </div>
      <div xs={3} className='side-nav'>
        {
          wideness === true ? <NavbarWide isAdmin={isAdmin} bahasaApp={bahasaApp} tab={tab} setTab={setTab} 
          sbTagTheme={sbTagTheme} sbLinkTheme={sbLinkTheme} /> : ''
        }
        <div className={`hide-button side ${sbTheme}`}>
        </div>
      </div>
      <div className='made-by'>
        {/* {
          wideness === true ? 
          <div className='social-div'>
            <h6>Made by Muhamad Fahru Rozi</h6>
            <SocialMedia />
          </div>
          :
          ''
        } */}
        <div className={`hide-button social ${sbTheme}`}>
          { setting ? 
            <AiTwotoneSetting className='setting-button' onClick={() => setSetting(false)} />
            :
            <AiOutlineSetting className='setting-button' onClick={() => setSetting(true)} /> 
          }
        </div>
        
      </div>
    </div>
    { setting &&
      <div className={`setting-menu ${sbTagTheme} ${wideness === true ?
        'st-wide' : 'st-fold'
      } `} onMouseLeave={() => setSetting(false)} >
        <Setting />
      </div>
    }
    </>
  )
}

export default Sidebar