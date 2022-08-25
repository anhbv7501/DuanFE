import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import adminApi from 'src/config/adminApi'
import { validateEmail } from 'src/helper/CheckData'

export default function ForgetPassword() {
  const history = useHistory()
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = ({ target }) => {
    const { name, value } = target
    setValues({
      ...values,
      [name]: value,
    })
  }
  const handleRemoveErr = ({ target }) => {
    const { name } = target
    setErrors({
      ...errors,
      [name]: '',
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const checkEmail = validateEmail(values?.username)

    if (!checkEmail) {
      setErrors((prev) => {
        return { ...prev, username: 'Email không được để trống hoặc sai dữ liệu' }
      })
    }

    setErrors((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        callApi(values)
      }
      return prev
    })
  }
  const callApi = useCallback(async (value) => {
    try {
      const data = await adminApi.forget(value)

      if (data?.status === 200) {
        localStorage.setItem('token_forget', data?.data?.data)
        toast.success('Vui lòng kiểm tra lại email để thay đổi mật khẩu')
      } else {
        toast.error('Tên người dùng của bạn không tồn tại')
      }
    } catch (error) {
      toast.error('Tên người dùng của bạn không tồn tại')
    }
  }, [])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Quên mật khẩu</h1>
                  <p className="text-medium-emphasis">
                    Vui lòng nhập tên người dùng của bạn để lấy lại mật khẩu
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      placeholder="Nhập tên người dùng"
                      autoComplete="username"
                      value={values.username}
                      onMouseDown={handleRemoveErr}
                      onChange={handleChange}
                      className={errors.username ? 'is-invalid' : ''}
                    />
                  </CInputGroup>

                  <div className="text-center">
                    <CButton color="success" type="submit">
                      Xác nhận
                    </CButton>
                    <CButton color="secondary ms-5" onClick={() => history.push('/login')}>
                      Quay lại
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
