import {
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { fun } from 'src/data/FilterDataPage'

const OptionsModalAdd = (props) => {
  const { visibleAdd, setVisibleAdd, createOptionApi } = props
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [meta, setMeta] = useState('default')
  const addOption = async () => {
    setLoading(true)
    await fun()
    if (name === '') {
      toast.error('Trường dữ liệu không được để trống')
      setLoading(false)
      return
    }
    if (meta === 'default') {
      toast.error('Phải chọn kiểu dữ liệu của Option')
      setLoading(false)
      return
    }
    createOptionApi({ name: name, meta: meta })
    setName('')
    setMeta('default')
    setLoading(false)
    setVisibleAdd(false)
  }
  return (
    <CModal visible={visibleAdd} onDismiss={() => setVisibleAdd(false)}>
      <CModalHeader>
        <CModalTitle>Thêm sản phẩm</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h4>Tên thuộc tính</h4>
        <CFormInput
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          type="text"
          placeholder="Ect... Kích Thước"
        />
        <h4>Loại thuộc tính</h4>
        <CFormSelect
          aria-label="Default select example"
          value={meta}
          onChange={(e) => {
            setMeta(e.target.value)
          }}
        >
          <option value="default">Chọn Loại thuộc tính</option>
          <option value="text">Text</option>
          <option value="color">Mã Màu</option>
        </CFormSelect>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
          Đóng
        </CButton>
        <CButton color="primary" onClick={addOption} disabled={loading}>
          {loading && <CSpinner size="sm" />} Lưu thay đổi
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsModalAdd
