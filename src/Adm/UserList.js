import UserCard from './UserCard'

const UserList = ({ users }) => {
    const handleDelete = (us) => {
        console.log(us)
        // console.log(users)
    }

  return (
    <div className='adm-userlist'>
        {
        users.map((us) => 
          <UserCard us={us} handleDelete={() => handleDelete(us)} /> 
        )
        }
    </div>
  )
}

export default UserList