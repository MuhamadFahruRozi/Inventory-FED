import axios from 'axios';
import { useState } from 'react';
import UserCard from './UserCard'
import UserPagination from '../Pagination/UserPagination';

const UserList = ({ users, wideContent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(4)

  const indexLastUsers = currentPage * userPerPage;
  const indexFirstUsers = indexLastUsers - userPerPage;
  const currentUsers = users.slice(indexFirstUsers, indexLastUsers);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }

  const handleDelete = (us) => {
    // console.log(`https://inventory-bd-mfr.herokuapp.com/api/user/${us.user_id}`)

    const url =`https://inventory-bd-mfr.herokuapp.com/api/user/delete/${us.user_id}`;

    axios.delete(url).then(res => {
        alert("User deleted!")
    }).catch(err =>{
        console.log(err)
    })

  }

  return (
    <div className='adm-userlist'>
        {
        currentUsers.map((us) => 
          <UserCard us={us} handleDelete={() => handleDelete(us)} /> 
        )
        }
      <UserPagination userPerPage={userPerPage} totaluser={users.length} 
      paginate={paginate} currentPage={currentPage}
      setCurrentPage={setCurrentPage} wideContent={wideContent} />
    </div>
  )
}

export default UserList