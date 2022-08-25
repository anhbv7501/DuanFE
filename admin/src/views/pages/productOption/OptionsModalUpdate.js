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
import { fun } from 'src/data/FilterDataPage'

const OptionsModalUpdate = (props) => {
  const [loading, setLoading] = useState(false)
  const { visibleUpdate, setVisibleUpdate, fakeOption, setfakeOption, updateOptionApi } = props
  const onChange = (e) => {
    setfakeOption({ ...fakeOption, name: e.target.value })
  }

  const onChangeMeta = (e) => {
    setfakeOption({ ...fakeOption, meta: e.target.value })
  }
  const updateOptions = async () => {
    setLoading(true)
    await fun() //side effect
    await updateOptionApi(fakeOption)
    setVisibleUpdate(false)
    setLoading(false)
  }

  return (
    <CModal visible={visibleUpdate} onDismiss={() => setVisibleUpdate(false)}>
      <CModalHeader>
        <CModalTitle>Sửa Options</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h4>Tên Options</h4>
        <CFormInput
          value={fakeOption.name}
          type="text"
          placeholder="Ect... Kích Thước"
          onChange={onChange}
        />
        <h4>Loại Options</h4>
        <CFormSelect
          aria-label="Default select example"
          value={fakeOption.meta}
          onChange={onChangeMeta}
        >
          <option value="default">Chọn Loại thuộc tính</option>
          <option value="text">Kiểu chữ</option>
          <option value="color">Mã Màu</option>
        </CFormSelect>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleUpdate(false)}>
          Đóng
        </CButton>
        <CButton color="primary" onClick={updateOptions} disabled={loading}>
          {loading && <CSpinner size="sm" />} Lưu thay đổi
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsModalUpdate
