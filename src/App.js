import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import {BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';
import Stok from './Stok/Stok';
import Pembelian from './Pembelian/Pembelian';
import Penjualan from './Penjualan/Penjualan';
import InputPembelian from './Pembelian/Input_Pembelian';
import InputPenjualan from './Penjualan/Input_Penjualan';
import DataBarang from './DataBarang/DataBarang';
import InputDataBarang from './DataBarang/Input_DataBarang';
import Profile from './Profile/Profile';
import Login from './Profile/Login';
import SocialMedia from './SocialMedia/SocialMedia';
import Adm from './Adm/Admin'
import NewUser from './Adm/NewUser';
import SettingApp from './SettingApp/SettingApp';
import { bahasa } from './Bahasa/Bahasa';
import { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function App() {
  const [wideContent, setWideContent] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBhs, setIsBhs] = useState(true)
  const [bahasaApp, setBahasaApp] = useState(bahasa[0])
  const [sbTheme, setSbTheme] = useState('black')
  const [sbTagTheme, setSbTagTheme] = useState('tagblack')
  const [sbLinkTheme, setSbLinkTheme] = useState('linkblack')
  const [tbTheme, setTbTheme] = useState('black')

  useEffect(() => {
    setSbTagTheme(`tag${sbTheme}`)
    setSbLinkTheme(`link${sbTheme}`)
  }, [sbTheme])

  useEffect(() => {
    if(localStorage.getItem('prsu') !== null) {
      setUsername(localStorage.getItem('punm'))
      setPassword(localStorage.getItem('pswd'))
      fetchLoginPersist()
      setLogin(true)
    } else {
      setLogin(false)
    }
  },[])

  const fetchLoginPersist = async () => {
    let loginFormData = new FormData();
    loginFormData.append('username', localStorage.getItem('punm'));
    loginFormData.append('password', localStorage.getItem('pswd'));

    const loginUrl ='https://web-production-883e.up.railway.app/api/user/login/';

    const res = await axios.post(loginUrl, loginFormData)
    setUser(res.data)
  }


  const fetchLogin = async () => {
    let loginFormData = new FormData();
    loginFormData.append('username', username);
    loginFormData.append('password', password);

    const loginUrl ='https://web-production-883e.up.railway.app/api/user/login/';

    const res = await axios.post(loginUrl, loginFormData)
    setUser(res.data)
    // setPersist(res.data.accessToken)
    localStorage.setItem('prsu', res.data.accessToken)
    localStorage.setItem('punm', username)
    localStorage.setItem('pswd', password)
  }

  useEffect(() => {
    const bhschng = () => {
      if (isBhs === true) {
        setBahasaApp(bahasa[0])
      } else {
        setBahasaApp(bahasa[1])
      }
    }
    bhschng()
  }, [isBhs])

  useEffect(() => {
    if(user.status === 'admin') {
      setIsAdmin(true)
    }
  },[user])
  
  const refreshToken = () => {
    let refreshTokenFormData = new FormData();
    refreshTokenFormData.append('token', user.refreshToken);

    const refreshUrl = 'https://web-production-883e.up.railway.app/api/user/tokenRefresh';

    const res = axios.post(refreshUrl, refreshTokenFormData)
    // console.log(res.data)
    setUser({
      ...user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken
    })
    return res.data
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use( async (config) => {
    let currentDate = new Date();
    const decToken = jwt_decode(user.accessToken);
    if (decToken.exp * 1000 < currentDate.getTime()){
      const data = await refreshToken();
      config.headers['authorization'] = data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  })

  return (
    <div className="App">
      <Container fluid style={{ paddingLeft:0, paddingRight:0 }} >
        <Router>
        <div className='row-container'>
          {
            login === false ? '' 
            : <Sidebar setWideContent={setWideContent} isAdmin={isAdmin} user={user}
            bahasaApp={bahasaApp} sbTheme={sbTheme} sbTagTheme={sbTagTheme} sbLinkTheme={sbLinkTheme} />
          }  
          {
            login === false ? 
            <Routes>
              <Route path='*' element={ <Navigate to='/'/> } />  
              <Route path="/" element={ <Login setUser={setUser} fetchLogin={fetchLogin} auth={() => setLogin(true)}
              username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> } />
            </Routes>
            : 
            <div className={wideContent === true ? 'content wide' : 'content'}>
              <div className='content-fill'>
                <Routes>
                  <Route path='*' element={ <Navigate to='/'/> } />  
                  <Route path="/" element={ <Stok wideContent={wideContent} bahasaApp={bahasaApp} tbTheme={tbTheme} /> } />
                  <Route path="/penjualan" element={ <Penjualan wideContent={wideContent} bahasaApp={bahasaApp} tbTheme={tbTheme} /> } />
                  <Route path="/pembelian" element={ <Pembelian wideContent={wideContent} bahasaApp={bahasaApp} tbTheme={tbTheme} /> } />
                  <Route path="/data-barang" element={ <DataBarang wideContent={wideContent} bahasaApp={bahasaApp} tbTheme={tbTheme} /> } />
                  <Route path="/input-data-barang" element={ <InputDataBarang bahasaApp={bahasaApp} tbTheme={tbTheme} />  } />
                  <Route path="/input-penjualan" element={ <InputPenjualan bahasaApp={bahasaApp} tbTheme={tbTheme} /> } />
                  <Route path="/input-pembelian" element={ <InputPembelian bahasaApp={bahasaApp} tbTheme={tbTheme} /> } />
                  <Route path="/profile" element={ <Profile axiosJWT={axiosJWT} user={user} setUser={setUser} fetchLoginPersist={fetchLoginPersist} bahasaApp={bahasaApp} /> } />
                  <Route path="/add-new-user" element={ <NewUser axiosJWT={axiosJWT} bahasaApp={bahasaApp} /> } />
                  <Route path="/about" element={ <SocialMedia bahasaApp={bahasaApp} wideContent={wideContent} /> } />
                  <Route path="/adm" element={ <Adm bahasaApp={bahasaApp} wideContent={wideContent} axiosJWT={axiosJWT} user={user} /> } />1
                  <Route path="/setting" element={ <SettingApp isBhs={isBhs} setIsBhs={setIsBhs} bahasaApp={bahasaApp} logout={() => setLogin(false)}
                  sbTheme={sbTheme} handleSbTheme={(e) => setSbTheme(e.target.value)} tbTheme={tbTheme} handleTbTheme={(e) => setTbTheme(e.target.value)}  /> } />
                </Routes>
              </div>
            </div>
          }
        </div>
        </Router>
        {/* <Row className='row-container'>
          <Col style={{ paddingLeft:"0", paddingRight:"0" }} 
          xs={4} md={3} lg={2}  className='sidebar'>
            <Sidebar />
          </Col>
          <Col className='content'>
            Content
          </Col>
        </Row> */}
      </Container>
    </div> 
  )
}

export default App;
