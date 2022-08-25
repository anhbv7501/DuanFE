import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import OptionsModalAdd from './OptionsModalAdd'
import OptionsModalDelete from './OptionsModalDelete'
import OptionsModalUpdate from './OptionsModalUpdate'
import {
  createProductOption,
  deleteProductOption,
  getProductOption,
  updateProductOption,
} from 'src/config/productOptionAPI'
import Pagination from 'src/components/pagination/Pagination'
import { toast } from 'react-toastify'
import ProductOptionTable from './ProductOptionTable'
import ProductOptionHeader from './ProductOptionHeader'
import ProductOptionVariant from './ProductOptionVariant'

const ProductOption = () => {
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [options, setOptions] = useState({})
  const [fakeOption, setfakeOption] = useState({})
  const [viewOption, setViewOption] = useState()
  const getOptionApi = async (page = 1) => {
    try {
      const response = await getProductOption(page)
      setOptions(response.data?.payload)
    } catch (err) {
      toast.error(`Lấy dữ liệu thất bại`)
    }
  }

  const updateOptionApi = async (data) => {
    try {
      await updateProductOption(data.name, data.meta, data.id)
      getOptionApi()
      toast.info(`Update dữ liệu thành công!`)
    } catch (err) {
      toast.error(`Update thất bại`)
    }
  }

  const deleteOptionApi = async (id) => {
    try {
      await deleteProductOption(id)
      getOptionApi()
      toast.success(`Xóa dữ liệu thành công`)
    } catch (err) {
      toast.error(`Xóa dữ liệu thất bại`)
    }
  }

  const createOptionApi = async ({ name, meta }) => {
    try {
      await createProductOption({ name, meta })
      getOptionApi()
      toast.success(`Thêm giá trị thuộc tính thành công`)

    } catch (err) {
      toast.error(`Thêm giá trị thuộc tính thất bại`)

    }
  }

  useEffect(() => {
    getOptionApi()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="flex_option">
              <ProductOptionHeader setVisibleAdd={setVisibleAdd} />
            </CCardHeader>
            <CCardBody>
              <ProductOptionTable
                options={options}
                setVisibleUpdate={setVisibleUpdate}
                setfakeOption={setfakeOption}
                setVisible={setVisible}
                visible={visible}
                setViewOption={setViewOption}
                page={options?.page}
                perPage={options?.limit}
              />
            </CCardBody>
            <CCardHeader className="flex_option">
              {options?.total > 1 && (
                <Pagination
                  currentPage={options.page?.currentPage}
                  totalPage={options.page?.totalPage}
                  changeData={getOptionApi}
                />
              )}
            </CCardHeader>
            {viewOption && (
              <CCardHeader>
                <ProductOptionVariant
                  option={viewOption}
                  options={options}
                  setOptions={setOptions}
                  setOption={setViewOption}
                />
              </CCardHeader>
            )}
          </CCard>
        </CCol>
      </CRow>
      <OptionsModalDelete
        setVisible={setVisible}
        visible={visible}
        fakeOption={fakeOption}
        deleteOptionApi={deleteOptionApi}
      />
      <OptionsModalAdd
        setVisibleAdd={setVisibleAdd}
        createOptionApi={createOptionApi}
        visibleAdd={visibleAdd}
      />
      <OptionsModalUpdate
        setVisibleUpdate={setVisibleUpdate}
        visibleUpdate={visibleUpdate}
        fakeOption={fakeOption}
        setfakeOption={setfakeOption}
        updateOptionApi={updateOptionApi}
      />
    </>
  )
}

export default ProductOption
