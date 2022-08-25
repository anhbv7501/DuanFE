import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { fun } from 'src/data/FilterDataPage'

const ProductOptionVariantModalUpdate = (props) => {
  const { visible, setVisible, variant, option, updateVariant } = props
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(variant.name)
  const updateProductOptionValue = async () => {
    setLoading(true)
    await fun()
    updateVariant(name, option.id, variant.id)
    setLoading(false)
    setVisible(false)
  }
  useEffect(() => {
    setName(variant.name)
  }, [variant])
  return (
    <CModal visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          Sửa thuộc tính {variant.name} của option: {option.name}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h3>Tên thuộc tính</h3>
        <CFormInput
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          placeholder="Ect...XL"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Đóng
        </CButton>
        <CButton color="primary" onClick={updateProductOptionValue} disabled={loading}>
          {loading && <CSpinner size="sm" />} Lưu thay đổi
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ProductOptionVariantModalUpdate
