import React from 'react'

const Pagination = (props) => {
  const { totalPage, currentPage, changeData } = props
  const onClick = (value) => {
    changeData(value)
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {1 < currentPage && (
          <>
            <li className={`page-item`}>
              <div
                className="page-link"
                onClick={() => {
                  onClick(1)
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </div>
            </li>
            <li className="page-item">
              <div
                className="page-link"
                value={currentPage - 1}
                onClick={() => {
                  onClick(currentPage - 1)
                }}
              >
                <span aria-hidden="true">&lt;</span>
              </div>
            </li>
            <li className="page-item">
              <div
                className="page-link"
                value={currentPage - 1}
                onClick={() => {
                  onClick(currentPage - 1)
                }}
              >
                {currentPage - 1}
              </div>
            </li>
          </>
        )}
        <li className="page-item">
          <div className="page-link current">{currentPage}</div>
        </li>
        {totalPage > currentPage && (
          <>
            <li className="page-item">
              <div
                className="page-link"
                value={currentPage + 1}
                onClick={() => {
                  onClick(currentPage + 1)
                }}
              >
                {currentPage + 1}
              </div>
            </li>
            <li className="page-item">
              <div
                className="page-link"
                value={currentPage + 1}
                onClick={() => {
                  onClick(currentPage + 1)
                }}
              >
                <span aria-hidden="true">&gt;</span>
              </div>
            </li>
            <li className="page-item">
              <div
                className="page-link"
                value={totalPage}
                onClick={() => {
                  onClick(totalPage)
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
