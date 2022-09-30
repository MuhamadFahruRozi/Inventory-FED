import { Button, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { MdFileUpload } from 'react-icons/md'
import axios from 'axios'
import KS from '../img/ks.jpg'

const NewUser = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [gambar, setGambar] = useState('')
  const [preview, setPreview] = useState('')

  const handleFile = (e) => {
    setGambar(e.target.files[0])
    
    const reader = new FileReader();
    reader.onload = () => {
        if(reader.readyState === 2) {
            setPreview(reader.result)
        }
    }
    reader.readAsDataURL(e.target.files[0])
}

  const handleSubmit = (e) => {
    e.preventDefault()
        
    const url ='https://inventory-bd-mfr.herokuapp.com/api/user/';

    if(gambar === ""){
        let formData = new FormData();
        formData.append('username', newUsername)
        formData.append('email', newEmail)
        formData.append('password', newPassword)
        formData.append('status', newStatus)
        formData.append('propic', gambar);
        axios.post(url, formData).then(res => {
            alert("New user successfuly added!")
        }).catch(err =>{
            console.log(err)
        })
    }else{
        let formData = new FormData();
        formData.append('username', newUsername)
        formData.append('email', newEmail)
        formData.append('password', newPassword)
        formData.append('status', newStatus)
        formData.append('propic', gambar);
        axios.post(url, formData).then(res => {
          alert("New user successfuly added!")
        }).catch(err =>{
            console.log(err)
        })
    }
  }

  return (
    <div className='profile-page'>
      
      <div className='photo-profile'>
        <img src={preview ? preview : KS} alt="" />
        <div className="overlay">
          <div className="backoverlay">
          </div>
          <label className="iconover" 
          htmlFor="image">
              <i><MdFileUpload /></i>
          </label>
          <input className="image" 
          id="image" type="file" 
          placeholder="Add Picture" 
          onChange={handleFile} />
        </div>
      </div>
      
      <Form onSubmit={handleSubmit} >
          <div className="input-card prof">
            <Row className='input-row'>
              <Col className='label-prof' >
                <label>Username</label>
              </Col>
              <Col className='col-9'>
                <input type="text" className='login-input' placeholder='Username'
                value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              </Col>
            </Row>
            <Row className='input-row'>
              <Col className='label-prof' >
                <label>Email</label>
              </Col>
              <Col className='col-9'>
                <input type="text" className='login-input' placeholder='Email'
                value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </Col>
            </Row>
            <Row className='input-row'>
              <Col className='label-prof' >
                <label>Password</label>
              </Col>
              <Col className='col-9'>
                <input type="text" className='login-input' placeholder='Password'
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Col>
            </Row>
            <Row className='input-row'>
              <Col className='label-prof' >
                <label>Status</label>
              </Col>
              <Col className='col-9'>
                <select name="status" id="status" className='login-input' value={newStatus} onChange={(e) => setNewStatus(e.target.value)} >
                  <option value="admin">Admin</option>
                  <option value="client">User Client</option>
                </select>
              </Col>
            </Row>
          </div>
          <div>
            <Button className='btn btn-primary' onClick={handleSubmit}>Save Change</Button>
          </div>
        </Form>
    </div>
  )
}

export default NewUser