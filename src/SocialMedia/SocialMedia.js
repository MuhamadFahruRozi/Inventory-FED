import { useState } from "react"

const SocialMedia = () => {
  const [status, setStatus] = useState(0)
  const [clipboard, setClipboard] = useState(false)

  const handleSocial = (e) => {
    if(e === status) {
      setStatus(0)
      console.log(0)
    } else {
      setStatus(e)
      console.log(e)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText('muh.fahrurozi.13618@gmail.com')
    setClipboard(true)
  }

  return (
    <div className="som">
      <div className='social-tab' onMouseEnter={() => handleSocial(1)} onMouseLeave={() => handleSocial(0)} >
        <div className={ status === 1 ? 'social-label' : 'social-label off'} >
          {status === 1 ? '' : 'FB'}
        </div>
        {
          status === 1 ?
          <div className='social-link' ><a href="https://web.facebook.com/people/Muhamad-Fahru-Rozi/100080110477430/" 
          target="_blank" className="shref" rel="noreferrer" >
            Muhamad Fahru Rozi</a></div>
          :
          <></>
        }
      </div>
      <div className='social-tab' onMouseEnter={() => handleSocial(2)} onMouseLeave={() => handleSocial(0)} >
        <div className={ status === 2 ? 'social-label' : 'social-label off'} >
          {status === 2 ? '' : 'E-Mail'}
        </div>
        {
          status === 2 ?
          <div className='social-link' onClick={handleCopy}>
            muh.fahrurozi.13618@gmail.com
            <div className={clipboard === false ? 'tool' : 'tool on'}>
              {
                clipboard === false ? 'click to copy into Clipboard!' : 'Copied!'
              }
            </div>
          </div>
          :
          <></>
        }
      </div>
      <div className='social-tab' onMouseEnter={() => handleSocial(3)} onMouseLeave={() => handleSocial(0)} >
        <div className={ status === 3 ? 'social-label' : 'social-label off'} >
          {status === 3 ? '' : 'Linkedin'}
        </div>
        {
          status === 3 ?
          <div className='social-link' ><a href="https://www.linkedin.com/in/muhamad-fahru-rozi-603466224/" 
          target="_blank" className="shref" rel="noreferrer" >
            Muhamad Fahru Rozi</a></div>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default SocialMedia