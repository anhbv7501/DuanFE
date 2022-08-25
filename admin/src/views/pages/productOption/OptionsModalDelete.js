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

const OptionsModalDelete = (props) => {
  const { visible, setVisible, deleteOptionApi, fakeOption } = props
  const [loading, setLoading] = useState(false)
  const deleteOption = async () => {
    setLoading(true)
    await fun()
    await deleteOptionApi(fakeOption.id)
    setLoading(false)
    setVisible(false)
  }
  return (
    <CModal visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Xác nhận xóa</CModalTitle>
      </CModalHeader>
      <CModalBody>Xác nhận xóa Option: &quot;{fakeOption.name}&quot; </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Đóng
        </CButton>
        <CButton color="primary" disabled={loading} onClick={deleteOption}>
          {loading && <CSpinner size="sm" />} Xóa
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsModalDelete
