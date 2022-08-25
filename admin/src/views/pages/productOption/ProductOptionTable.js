import { cilAperture, cilDelete, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { resetDateTime } from 'src/config/dateTime'

const ProductOptionTable = (props) => {
  const {
    options,
    setVisibleUpdate,
    setfakeOption,
    setVisible,
    visible,
    setViewOption,
    page,
    perPage,
  } = props

  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
          <CTableHeaderCell scope="col">Loại</CTableHeaderCell>
          <CTableHeaderCell scope="col" style={{ minWidth: '120px' }}>
            Ngày tạo
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" style={{ minWidth: '220px' }}>
            Ngày sửa
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">Hành động</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {options.data &&
          options.data.map((item, index) => (
            <CTableRow align="middle" key={index}>
              <CTableHeaderCell scope="row">{(page - 1) * perPage + index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.type}</CTableDataCell>
              <CTableDataCell>{resetDateTime(item.createDate)}</CTableDataCell>
              <CTableDataCell>{resetDateTime(item.updateDate)}</CTableDataCell>
              <CTableDataCell>
                <div>
                  <CIcon
                    icon={cilPencil}
                    className="me-2 icon-hover"
                    style={{ height: '15px', width: '15px', color: 'green' }}
                    onClick={() => {
                      setVisibleUpdate(true)
                      setfakeOption(item)
                    }}
                  />
                  <CIcon
                    icon={cilDelete}
                    onClick={() => {
                      setVisible(!visible)
                      setfakeOption(item)
                    }}
                    className="me-2 icon-hover"
                    style={{ height: '15px', width: '15px', color: 'red' }}
                  />
                  <CIcon
                    icon={cilAperture}
                    onClick={() => {
                      setViewOption(item)

                    }}
                    className="me-2 icon-hover"
                    style={{ height: '15px', width: '15px' }}
                  />
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

export default ProductOptionTable
