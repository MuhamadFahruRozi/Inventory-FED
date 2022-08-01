import React from 'react'

const Pagination = ({ transaksiPerPage, totalTransaksi, paginate, currentPage, wideContent }) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalTransaksi / transaksiPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={ wideContent ? "pagination wide" : "pagination small"}>        
            {pageNumbers.map(number => (
                <li className="page-number">
                    <ul key={number} onClick={() => paginate(number)}
                        className={currentPage === number ? "page-link active" : "page-link"}>
                        {number}
                    </ul>
                </li>
            ))}
        </div>
    )
}

export default Pagination