import { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { AiTwotoneEyeInvisible, AiTwotoneEye } from 'react-icons/ai'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const Login = ({ user, setUser, auth}) => {
  const [visibility, setVisibility] = useState(false)
  const [buttonLogin, setbuttonLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [dataLoginAttemp, setDataLoginAttemp] = useState([])
  const [passing, setPassing] = useState([])

  useEffect (() => {
    const fetchLogin = async () => {
      const { data } = await axios.get('https://portofolio-api-mfr.herokuapp.com/api/user/tryLogin');
        setDataLoginAttemp(data)
    }
    fetchLogin()
  }, [])

  useEffect(() => {
    const inputLogin = () => {
      setPassing(null)
      dataLoginAttemp.forEach(e => {
        const blue = jwt_decode(e)
        if(username === blue.username && password === blue.password) {
          setPassing({username: blue.username, password: blue.password})
        }
      });
    }
    inputLogin()
  },[username, password, dataLoginAttemp])

  useEffect(() => {
    const buttonLogin = () => {
      if(passing) {
        setbuttonLogin(true)
      } else {
        setbuttonLogin(false)
      }
    }
    buttonLogin()
  }, [passing])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(username && password) {
      const login = async () => {
        let loginFormData = new FormData();
        loginFormData.append('username', username);
        loginFormData.append('password', password);
  
        const loginUrl ='https://portofolio-api-mfr.herokuapp.com/api/user/login/';
  
        const res = await axios.post(loginUrl, loginFormData)
        // console.log(res.data)
        setUser(res.data)
      }
      login()
      auth()
    } else {
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
      </div>
    </div>
  )
}

export default Login