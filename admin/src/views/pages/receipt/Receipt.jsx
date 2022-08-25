import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ProductTable from 'src/components/product/ProductTable'
import {
  actionGetAllProduct,
  actionSearchProduct,
  actionSortProduct,
  getProduct,
} from 'src/redux/slice/productSlice'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import ReceiptTable from './ReceiptTable'
import { actionGetAllReceipt, getListReceipts } from 'src/redux/slice/receiptSlice'

export default function Receipt() {
  const dispatch = useDispatch()
  const listReceipt = useSelector(getListReceipts)
  useEffect(() => {
    dispatch(actionGetAllReceipt())
  }, [dispatch])
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Danh sách đơn đặt hàng</strong>
      </CCardHeader>
      <ReceiptTable data={listReceipt} />
    </CCard>
  )
}
