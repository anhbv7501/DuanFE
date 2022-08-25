import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import React, { useState } from 'react'
import { fun } from 'src/data/FilterDataPage'

const ProductOptionVariantModalDelete = (props) => {
  const { visible, setVisible, variant, option, deleteVariant } = props
  const [loading, setLoading] = useState(false)
  const DeleteVariant = async () => {
    setLoading(true)
    await fun()
    deleteVariant(variant.id)
    setLoading(false)
    setVisible(false)
  }
  return (
    <CModal visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Xác nhận xóa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Xác nhận xóa thuộc tính: {variant.name} của Option: {option.name}{' '}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Đóng
        </CButton>
        <CButton color="primary" onClick={DeleteVariant} disabled={loading}>
          {loading && <CSpinner size="sm" />} Xóa
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ProductOptionVariantModalDelete
