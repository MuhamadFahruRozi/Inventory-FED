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
import { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function App() {
  const [wideContent, setWideContent] = useState(true)
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if(user.status === 'admin') {
      setIsAdmin(true)
    }
  },[user])

  console.log(isAdmin)
  
  const refreshToken = () => {
    let refreshTokenFormData = new FormData();
    refreshTokenFormData.append('token', user.refreshToken);

    const refreshUrl = 'https://inventory-bd-mfr.herokuapp.com/api/user/tokenRefresh';

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
            : <Sidebar setWideContent={setWideContent} isAdmin={isAdmin} />
          }  
          {
            login === false ? 
            <Routes>
              <Route path='*' element={ <Navigate to='/'/> } />  
              <Route path="/" element={ <Login user={user} setUser={setUser} auth={() => setLogin(true)}/> } />
            </Routes>
            : 
            <div className={wideContent === true ? 'content wide' : 'content'}>
              <div className='content-fill'>
                <Routes>
                  <Route path='*' element={ <Navigate to='/'/> } />  
                  <Route path="/" element={ <Stok /> } />
                  <Route path="/penjualan" element={ <Penjualan /> } />
                  <Route path="/pembelian" element={ <Pembelian /> } />
                  <Route path="/data-barang" element={ <DataBarang /> } />
                  <Route path="/input-data-barang" element={ <InputDataBarang /> } />
                  <Route path="/input-penjualan" element={ <InputPenjualan /> } />
                  <Route path="/input-pembelian" element={ <InputPembelian /> } />
                  <Route path="/profile" element={ <Profile axiosJWT={axiosJWT} user={user} /> } />
                  <Route path="/about" element={ <SocialMedia /> } />
                  <Route path="/adm" element={ <Adm /> } />
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
