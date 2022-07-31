import { useState, useEffect } from "react"
import UserList from "./UserList"
import axios from "axios"

const Admin = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await axios.get('https://inventory-bd-mfr.herokuapp.com/api/user/profile')
      setUsers(data)
      // console.log(data)
    }
    fetchUsers()
  }, [])
  
  return (
    <div className='list-user'>
      <h2>Users List</h2>
      <UserList users={users}/>
    </div>
  )
}

export default Admin