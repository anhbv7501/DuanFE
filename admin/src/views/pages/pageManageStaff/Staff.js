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
  
  const Product = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const products = useSelector(getProduct)
  
    const handleChangeSearch = ({ target }) => {
      dispatch(actionSearchProduct(target.value))
    }
    const handleSort = ({ target }) => {
      const { name, value } = target
      dispatch(actionSortProduct({ by: name, order: value }))
    }
    const handleClickAdd = () => {
      history.push('/staff/add')
    }
    useEffect(() => {
      dispatch(actionGetAllProduct())
    }, [dispatch])
    return (
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Quản lý sản phẩm</strong>
          <CButton color="primary" onClick={handleClickAdd} style={{ padding: '4px 8px' }}>
            <CIcon icon={cilPlus} className="me-2" style={{ height: '15px', width: '15px' }} />
            Thêm
          </CButton>
        </CCardHeader>
        <CCardHeader>
          <CRow className="my-2">
            <CCol xs={12} sm={4}>
              <CForm className="row g-0 position-relative">
                <CCol xs="12">
                  <CFormInput
                    type="text"
                    className="input__search"
                    placeholder="Nhập để tìm kiếm"
                    onChange={(e) => {
                      handleChangeSearch(e)
                    }}
                  />
                </CCol>
                <div className=".flex-{grow|shrink}-1 search__box">
                  <i className="bx bx-search-alt-2" />
                </div>
              </CForm>
            </CCol>
            <CCol xs={12} sm={8} className="text-end">
              <CForm className="row justify-content-sm-end mt-sm-0 mt-2">
                <CCol xs={6} sm="auto">
                  <CFormSelect name="created_at" onChange={(e) => handleSort(e)}>
                    <option value="">Thời gian</option>
                    <option value="ASC">Cũ nhất</option>
                    <option value="DESC">Mới nhất</option>
                  </CFormSelect>
                </CCol>
                {/* <CCol xs={6} sm="auto">
                  <CFormSelect name="price" onChange={(e) => handleSort(e)}>
                    <option value="">Giá</option>
                    <option value="0">Thấp nhất</option>
                    <option value="1">Cao nhất</option>
                  </CFormSelect>
                </CCol> */}
              </CForm>
            </CCol>
          </CRow>
        </CCardHeader>
        <ProductTable products={products} />
      </CCard>
    )
  }
  
  export default Product
  