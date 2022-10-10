import { useState } from 'react';
import UserCard from './UserCard'
import UserPagination from '../Pagination/UserPagination';

const UserList = ({ users, wideContent, axiosJWT, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(4)

  const indexLastUsers = currentPage * userPerPage;
  const indexFirstUsers = indexLastUsers - userPerPage;
  const currentUsers = users.slice(indexFirstUsers, indexLastUsers);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }

  return (
    <div className='adm-userlist'>
        {
        currentUsers.map((us) => 
          <UserCard us={us} axiosJWT={axiosJWT}  user={user} /> 
        )
        }
      <UserPagination userPerPage={userPerPage} totaluser={users.length} 
      paginate={paginate} currentPage={currentPage}
      setCurrentPage={setCurrentPage} wideContent={wideContent}/>
    </div>
  )
}

export default UserList