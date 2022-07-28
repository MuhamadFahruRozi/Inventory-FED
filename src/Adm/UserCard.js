import { Button, Form } from 'react-bootstrap'
import KS from '../img/ks.jpg'
import { useState, useEffect } from 'react'

const UserCard = ({ us, handleDelete }) => {
  const [newClientUsername, setNewClientUsername] = useState('')
  const [newClientEmail, setNewClientEmail] = useState('')
  const [newClientPassword, setNewClientPassword] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchUs = () => {
      setNewClientUsername(us.username)
      setNewClientEmail(us.email)
      setNewClientPassword(us.username)
    }
    fetchUs()
  },[us])

  const handleCancel = () => {
    setEditMode(false)
    setNewClientUsername(us.username)
    setNewClientEmail(us.email)
    setNewClientPassword(us.username)
  }

  const handleEdit = () => {
    console.log(us.username)
  }
    
  return (
    <div className='adm-usercard' >
        <div className='photo-list'>
          <img src={KS} alt="" />
        </div>
        <div className='adm-listbox'>
          <Form onSubmit={handleEdit} >
            <input type="text" className='user-input-list' placeholder='Username'
              value={newClientUsername} onChange={(e) => setNewClientUsername(e.target.value)} />
            <input type="text" className='user-input-list' placeholder='Email'
              value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} />
            <input type="text" className='user-input-list' placeholder='Password'
              value={newClientPassword} onChange={(e) => setNewClientPassword(e.target.value)} />
          </Form>
        </div>
        <div className='adm-editbutton'>
          {
            !editMode ?
            <Button className='btn btn-primary btn-userlist' onClick={() => setEditMode(true)}>Edit</Button>
            :
            <Button className='btn btn-primary btn-userlist' onClick={handleCancel}>Cancel</Button>
          }
          {
            editMode && 
            <Button className='btn btn-success btn-userlist' onClick={handleEdit}>Save</Button>
          }  
            <Button className='btn btn-danger btn-userlist' onClick={() => handleDelete(us.user_id)}>Delete</Button>
        </div>
    </div>
  )
}

export default UserCard