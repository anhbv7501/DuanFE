import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetAllProduct, getCurrentPage, getTotalPage } from 'src/redux/slice/productSlice'

export default function Pagination() {
  const dispatch = useDispatch()
  const _totalPage = []
  const totalPage = useSelector(getTotalPage)
  const currentPage = useSelector(getCurrentPage)
  for (let i = 0; i < totalPage; i++) {
    _totalPage.push(i)
  }
  const handleChangePage = (page) => {
    const _page = page < 1 || page > totalPage ? 1 : page
    dispatch(actionGetAllProduct(_page))
  }
  return (
      <div className="text-center">
        <CPagination>
          <CPaginationItem
            aria-label="Previous"
            disabled={currentPage === 1}
            onClick={() => {
              handleChangePage(currentPage - 1)
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {_totalPage?.map((e, index) => (
            <CPaginationItem
              key={e}
              active={e + 1 === currentPage}
              onClick={() => {
                handleChangePage(e + 1)
              }}
            >
              {e + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            aria-label="Next"
            disabled={currentPage === totalPage}
            onClick={() => {
              handleChangePage(currentPage + 1)
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </div>
  )
}
