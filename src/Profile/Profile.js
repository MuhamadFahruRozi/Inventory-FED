import React from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import KS from '../img/ks.jpg'

const Profile = ({ user }) => {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')

  useEffect(() => {
    const fillInput = () => {
      setNewUsername(user.username)
      setNewEmail(user.email)
      setNewPassword(user.username)
    }
    fillInput()
  },[user])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      username: newUsername,
      email: newEmail,
      password: newPassword
    })
  }

  return (
    <div className='profile-page'>
      <div className='photo'>
        <img src={KS} alt="" />
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
          </div>
          <div>
            <Button className='btn btn-primary' onClick={handleSubmit}>Save Change</Button>
          </div>
        </Form>
    </div>
  )
}

export default Profile