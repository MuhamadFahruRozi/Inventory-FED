import { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { AiTwotoneEyeInvisible, AiTwotoneEye } from 'react-icons/ai'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const Login = ({ setUser, auth, fetchLogin, username, password, setUsername, setPassword}) => {
  const [visibility, setVisibility] = useState(false)
  const [buttonLogin, setbuttonLogin] = useState(false)
  const [dataLoginAttemp, setDataLoginAttemp] = useState([])
  // const [passing, setPassing] = useState()
  const [loginMessage, setLoginMessage] = useState('')

  useEffect (() => {
    const fetchLogin = async () => {
      const { data } = await axios.get('https://inventory-bd-mfr.herokuapp.com/api/user/tryLogin');
        setDataLoginAttemp(data)
    }
    fetchLogin()
  }, [])

  useEffect(() => {
    const inputLogin = () => {
      if(dataLoginAttemp) {
        dataLoginAttemp.forEach((e) => {
          const blue = jwt_decode(e)
          if(username === blue.username && password === blue.password) {
            setbuttonLogin(true)
          }
        }
      );
      }
    }
    inputLogin()
  },[username, password, dataLoginAttemp])

  // useEffect(() => {
  //   const buttonLogin = () => {
  //     if(passing) {
  //       setbuttonLogin(true)
  //     } else {
  //       setbuttonLogin(false)
  //     }
  //   }
  //   buttonLogin()
  // }, [passing])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(username && password) {
      fetchLogin()
      auth()
    } else {
      setLoginMessage('Please enter a correct username or password')
      console.log('login failed')
    }
  }

return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="login-title">
          Login To Program
        </h3>
        <Form onSubmit={handleSubmit} >
          <div className="input-card">
            <Row className='input-row'>
              <Col>
                <input type="text" className='login-input' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
              </Col>
            </Row>
            <Row className='input-row'>
              <Col>
                <input type={ visibility === false ? "password" : "text" } className='login-input' placeholder='Password'
                onChange={(e) => setPassword(e.target.value)} />
                {
                  visibility === true ?
                  <AiTwotoneEyeInvisible className='see' onClick={() => setVisibility(false) } />
                  :
                  <AiTwotoneEye className='see' onClick={() => setVisibility(true) } />
                }
              </Col>
            </Row>
            <Row className='input-row'>
              <Col>
                {
                  buttonLogin ? <input type="submit" className='login-btn on' value='Log In' />
                  :
                  <input type="submit" className='login-btn off' value='Log In' disabled/>
                }
              </Col>
            </Row>
          </div>
        </Form>
        { loginMessage &&
          <div className='login-message'>
            {loginMessage}
          </div>}
      </div>
    </div>
  )
}

export default Login