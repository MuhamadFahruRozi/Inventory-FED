import { useState } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import { AiOutlineSetting, AiTwotoneSetting } from 'react-icons/ai'
import NavbarWide from './NavbarWide'
import Setting from './Setting'
import KS from '../img/ks.jpg'

const Sidebar = ({ setWideContent, isAdmin }) => {
  const [wideness, setWideness] = useState(true)
  const [setting, setSetting] = useState(false)
  
  const handleWideness = (data) => {
    setWideness(data)
    if (data === false) {
      setWideContent(true)
    } else {
      setWideContent(false)
    }
  }

  return (
    <div className={wideness === true ? 'sidebar' : 'sidebar small'}>
      <div xs={3} className='profile'>
        <div className='picture-div'>
          {
            wideness === true ?
            <div className='photo'>
              <img src={KS} alt="" />
            </div>
            :
            ''
          }
          <div className='hide-button'>
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
            <div className='username'>
              Muhamad Fahru Rozi
            </div>
            :
            ''
          }
          <div className='hide-button name'>
          </div>
        </div>
      </div>
      <div xs={3} className='side-nav'>
        {
          wideness === true ? <NavbarWide isAdmin={isAdmin} /> : ''
        }
        <div className='hide-button side'>
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
        <div className='hide-button social'>
        { setting ? 
            <AiTwotoneSetting className='setting-button' onClick={() => setSetting(false)} />
            :
            <AiOutlineSetting className='setting-button' onClick={() => setSetting(true)} /> 
          }
        </div>
        { setting &&
          <div className='setting-menu'>
            <Setting />
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar