const UserPagination = ({ userPerPage, totaluser, paginate, currentPage, wideContent }) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totaluser / userPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={ wideContent ? "user-pagination wide" : "user-pagination small"}>        
            {pageNumbers.map(number => (
                <li className="user-page-number">
                    <ul key={number} onClick={() => paginate(number)}
                        className={currentPage === number ? "page-link active" : "page-link"}>
                        {number}
                    </ul>
                </li>
            ))}
        </div>
    )
}

export default UserPagination