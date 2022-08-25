import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useHistory, useParams } from 'react-router'
import {
  validateConfirm,
  validateEmail,
  validateName,
  validatePass,
} from '../../../helper/CheckData'
import adminApi from 'src/config/adminApi'
import { toast } from 'react-toastify'

const ChangePass = () => {
  const history = useHistory()
  const { token } = useParams()
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const tokenStore = localStorage.getItem('token_forget')
  if (!token || token !== tokenStore) {
    history.push('/login')
  }
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
    const checkPass = validatePass(values?.password)
    const checConfirm = validateConfirm(values?.confirm, values?.password)
    console.log('chec', checkPass, checConfirm)

    if (!checkPass) {
      setErrors((prev) => {
        return { ...prev, password: 'Mật khẩu không được để trống' }
      })
    }
    if (!checConfirm) {
      setErrors((prev) => {
        return { ...prev, confirm: 'Xác nhận mật khẩu không chính xác' }
      })
    }
    setErrors((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        callApi(values, token)
      }
      return prev
    })
  }
  const callApi = useCallback(
    async (value, token) => {
      try {
        const data = await adminApi.changePass(value, token)

        if (data?.status === 200) {
          history.push('/login')
          toast.success('Đổi mật khẩu thành công')
        } else {
          toast.error('Đổi mật khẩu thất bại')
        }
      } catch (error) {
        toast.error('Đổi mật khẩu thất bại')
      }
    },
    [history],
  )
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h3>Thay đổi mật khẩu</h3>
                    <p className="text-medium-emphasis">Nhập mật khẩu mới của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText
                        onClick={() => setIsShowPass(!isShowPass)}
                        className="cursor-pointer"
                      >
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type={isShowPass ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu"
                        value={values?.password}
                        onMouseDown={handleRemoveErr}
                        className={errors.password ? 'is-invalid' : ''}
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                      {errors?.password && (
                        <p className="text-danger error__text">{errors.password}</p>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText
                        onClick={() => setIsShowConfirm(!isShowConfirm)}
                        className="cursor-pointer"
                      >
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="confirm"
                        type={isShowConfirm ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu"
                        value={values?.confirm}
                        onMouseDown={handleRemoveErr}
                        className={errors.confirm ? 'is-invalid' : ''}
                        autoComplete="current-confirm"
                        onChange={handleChange}
                      />
                      {errors?.confirm && (
                        <p className="text-danger error__text">{errors.confirm}</p>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Xác nhận
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="secondary text-light"
                          className="px-4"
                          onClick={() => history.push('/login')}
                        >
                          Hủy bỏ
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng nhập</h2>
                    <p>Vui lòng đăng nhập để tiếp tục</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangePass
