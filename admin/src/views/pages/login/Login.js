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
import { useHistory } from 'react-router'
import { validateEmail, validateName, validatePass } from '../../../helper/CheckData'
import adminApi from 'src/config/adminApi'
import { toast } from 'react-toastify'

const Login = () => {
  const history = useHistory()
  const [isShowPass, setIsShowPass] = useState(false)
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
    const checkPass = validatePass(values?.password)

    if (!checkEmail) {
      setErrors((prev) => {
        return { ...prev, username: 'Email không được để trống hoặc sai dữ liệu' }
      })
    }
    if (!checkPass) {
      setErrors((prev) => {
        return { ...prev, password: 'Mật khẩu không được để trống' }
      })
    }
    setErrors((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        callApi(values)
      }
      return prev
    })
  }
  const callApi = useCallback(
    async (value) => {
      try {
        const data = await adminApi.login(value)

        if (data?.status === 200) {
          localStorage.setItem('token', data?.data?.data)
          toast.success('Đăng nhập thành công')
          history.push('/')
        } else {
          toast.error('Đăng nhập thất bại')
        }
      } catch (error) {
        toast.error('Đăng nhập thất bại')
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
                    <h1>Đăng nhập</h1>
                    <p className="text-medium-emphasis">Đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Nhập tên người dùng"
                        autoComplete="username"
                        value={values.username}
                        onChange={handleChange}
                        onMouseDown={handleRemoveErr}
                        className={errors.username ? 'is-invalid' : ''}
                      />
                      {errors?.username && (
                        <p className="text-danger error__text">{errors.username}</p>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                        value={values.password}
                        onMouseDown={handleRemoveErr}
                        className={errors.password ? 'is-invalid' : ''}
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                      {errors?.password && (
                        <p className="text-danger error__text">{errors.password}</p>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => history.push('/forget-password')}
                        >
                          Quên mật khẩu?
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

export default Login
