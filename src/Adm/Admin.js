import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import UserList from "./UserList"
import axios from "axios"
import {Button} from 'react-bootstrap'
import {BsFillPlusCircleFill} from 'react-icons/bs'

const Admin = ({ wideContent, axiosJWT, user }) => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await axios.get('https://web-production-883e.up.railway.app/api/user/')
      setUsers(data)
      // console.log(data)
    }
    fetchUsers()
  }, [])
  
  return (
    <div className='list-user'>
      <h2>Users List</h2>
      <div className="add-user">
        <Button className='add-user-btn' onClick={() => navigate('/add-new-user')}>
          <BsFillPlusCircleFill className="add-user-icon" /> Add User
        </Button>
      </div>
      <UserList users={users} wideContent={wideContent} axiosJWT={axiosJWT} user={user} />
    </div>
  )
}

export default Admin