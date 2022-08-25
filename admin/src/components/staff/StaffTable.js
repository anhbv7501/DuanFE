import { cilDelete, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import productApi from 'src/config/productApi'
import { actionGetAllProduct, getCurrentPage, getTotalPage } from 'src/redux/slice/productSlice'
import Pagination from '../pagination/Pagination'

export default function ProductTable(props) {
  const { products } = props
  const history = useHistory()
  const dispatch = useDispatch()
  const totalPage = useSelector(getTotalPage)
  const currentPage = useSelector(getCurrentPage)

  const [visible, setVisible] = useState({ status: false, id: '' })
  const handleDelete = async (id) => {
    await productApi.deleteProduct(id)
    toast.success('Xóa sản phẩm thành công')
    dispatch(actionGetAllProduct())
    setVisible({ ...visible, status: false })
  }
  const changePage = (value) => {
    dispatch(actionGetAllProduct(value))
  }
  const formatDate = (time) => {
    const day = `0${new Date(time).getDate()}`.slice(0, 2)
    const month = `0${new Date(time).getMonth()}`.slice(0, 2)
    const year = new Date(time).getFullYear()
    const value = `${day} / ${month} / ${year}`
    return value
  }
  return (
    <CCard>
      <CCardBody>
        <CTable width="100%" color="light" hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ảnh</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
              <CTableHeaderCell scope="col">Giá Tiền</CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ minWidth: '120px' }}>
                Ngày Tạo
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Hành động</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {products &&
              products.map((e, index) => {
                return (
                  <CTableRow align="middle" key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>
                      <img
                        style={{ height: '80px', width: '100px', objectFit: 'cover' }}
                        className="hei"
                        src={"http://localhost:8080/"+ e?.images[0]?.path}
                        alt=""
                      />
                    </CTableDataCell>
                    <CTableDataCell>{e.name}</CTableDataCell>
                    <CTableDataCell className="row__table">
                      {e.product_options[0]?.price?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      }) || 0}
                    </CTableDataCell>
                    <CTableDataCell>{formatDate(e?.created_at)}</CTableDataCell>
                    <CTableDataCell>
                      <CIcon
                        icon={cilPencil}
                        className="me-2 icon-hover"
                        style={{ height: '15px', width: '15px', color: 'green' }}
                        onClick={() => history.push('/product/' + e.id)}
                      />
                      <CIcon
                        icon={cilDelete}
                        onClick={() =>
                          setVisible({ ...visible, status: true, name: e.name, id: e.id })
                        }
                        className="me-2 icon-hover"
                        style={{ height: '15px', width: '15px', color: 'red' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      </CCardBody>
      {totalPage > 1 && (
        <Pagination currentPage={currentPage} totalPage={totalPage} changeData={changePage} />
      )}
      <CModal visible={visible.status} onDismiss={() => setVisible({ ...visible, status: false })}>
        <CModalHeader onDismiss={() => setVisible({ ...visible, status: false })}>
          <CModalTitle>Xác nhận</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xóa sản phẩm `{visible.name}` không?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible({ ...visible, status: false })}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={() => handleDelete(visible.id)}>
            Xác nhận
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}
