import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import FormAddProduct from 'src/components/product/FormAddProduct'

export default function AddFormProduct() {
  return (
    <CContainer>
      <CRow>
        <CCol xs={12} className="mx-auto shadow bg-body rounded py-3">
          <h4 className="text-center mb-3">Thêm sản phẩm</h4>
          <FormAddProduct initialValue={{ name: '', price: '', size: {}, color: {} }} />
        </CCol>
      </CRow>
    </CContainer>
  )
}
