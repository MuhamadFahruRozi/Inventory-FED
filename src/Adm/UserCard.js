import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import KS from '../img/ks.jpg'
import { useState, useEffect } from 'react'

const UserCard = ({ us, axiosJWT, user, users, currentUsers }) => {
  const [newClientUsername, setNewClientUsername] = useState('')
  const [newClientEmail, setNewClientEmail] = useState('')
  const [newClientPassword, setNewClientPassword] = useState('')
  const [newClientStatus, setNewClientStatus] = useState('')
  const [newClientImage, setNewClientImage] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchUs = () => {
      setNewClientUsername(us.username)
      setNewClientEmail(us.email)
      setNewClientPassword(us.password)
      setNewClientStatus(us.status)
      setNewClientImage(us.pic_url)
    }
    fetchUs()
  },[us])

  const handleCancel = () => {
    setEditMode(false)
    setNewClientUsername(us.username)
    setNewClientEmail(us.email)
    setNewClientPassword(us.password)
    setNewClientStatus(us.status)
    setNewClientImage(us.pic_url)    
  }

  const handleEdit = (e) => {
    e.preventDefault()

    const url =`https://web-production-883e.up.railway.app/api/user/${us.slug}`;

    let formData = new FormData();
    formData.append('username', newClientUsername)
    formData.append('email', newClientEmail)
    formData.append('password', newClientPassword)
    formData.append('status', newClientStatus)
    axios.put(url, formData).then(res => {
        alert("User data successfuly changed!")
    }).catch(err =>{
        console.log(err)
    })
  }

  // console.log(user)

  const handleDelete = (id) => {

    const url =`https://web-production-883e.up.railway.app/api/user/delete/${id}`;

    axiosJWT.delete(url, {
      headers: {
        authorization: user.accessToken,
        // 'Content-Type': 'multipart/form-data'
       },
    }).then(res => {
        console.log('response', res.data)
        alert("User deleted!")
    }).catch(err =>{
        console.log(err)
    })

    currentUsers.filter((result) => result.user_id !== id)
  }
    
  return (
    <div className='adm-usercard' >
        <div className='photo-list'>
          <img src={newClientImage !== "" ? newClientImage : KS} alt="" />
        </div>
        <div className='adm-listbox'>
          <Form onSubmit={handleEdit} >
            <input type="text" className='user-input-list' placeholder='Username' disabled={!editMode}
              value={newClientUsername} onChange={(e) => setNewClientUsername(e.target.value)} />
            <input type="text" className='user-input-list' placeholder='Email' disabled={!editMode}
              value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} />
            <input type={editMode ? "text" : "password"} className='user-input-list' placeholder='Password' disabled={!editMode}
              value={newClientPassword} onChange={(e) => setNewClientPassword(e.target.value)} />
            <select name="user-input-list" id="user-input-list" className='user-input-list' 
            value={newClientStatus} disabled={!editMode} onChange={(e) => setNewClientStatus(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="client">User Client</option>
            </select>
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