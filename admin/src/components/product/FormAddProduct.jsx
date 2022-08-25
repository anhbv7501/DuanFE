import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useEffect, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getLoading } from 'src/redux/slice/productSlice'
import { toast } from 'react-toastify'
import productApi from 'src/config/productApi'
import { getAllOption } from 'src/config/productOptionAPI'
import { fun } from 'src/data/FilterDataPage'
import { validateDe, validateName, validatePrice } from 'src/helper/CheckData'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import uploadApi from 'src/config/upload.api'

const createSchema = () =>
  yup.object().shape({
    departure_date: yup
      .string()
      .nullable()
      .transform((current, origin) => {
        return current === '' ? null : moment(current).format('YYYY-MM-DD')
      }),
  })

export default function FormAddProduct({ type, initialValue }) {
  const schema = createSchema()
  const [images, setImages] = useState([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    onDrop: (acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach((file) => {
        const data = new FormData()
        data.append('file', file)

        const isUpload = uploadApi.uploadFile(data)
        console.log(isUpload)
      })
      // var Files = Object.assign(acceptFile)
      // var Accept = acceptedFiles.map((item) => {
      //   return Object.assign(item, {
      //     preview: URL.createObjectURL(item),
      //   })
      // })
      // setAcceptFile([...Files, ...Accept])
    },
  })

  const handleRemoveImage = (image) => {
    const newArrImage = acceptFile.filter((item) => item.preview !== image.preview)
    setAcceptFile(newArrImage)
  }

  const callApi = useCallback(async (formdata) => {
    const data = await productApi.createProduct(formdata)

    if (data?.status === 200) {
      toast.success('Thêm sản phẩm thành công')
      history.push('/product')
    } else {
      toast.error('Thêm sản phẩm thất bại')
    }
  }, [])

  return (
    <CForm>
      <CRow className="mb-3">
        <CFormLabel htmlFor="name" className="col-sm-2 col-form-label flex-grow-1">
          Tên
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Vui lòng nhập tên sản phẩm"
            className={!!errors?.name ? 'input__err' : ''}
            {...register('name')}
            onMouseDown={() => clearErrors('name')}
          />
          <span className={'text__err'}>{errors.name?.message}</span>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="price" className="col-sm-2 col-form-label flex-grow-1">
          Giá
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="price"
            placeholder="Vui lòng nhập giá sản phẩm"
            className={!!errors.price ? 'input__err' : ''}
            {...register('price')}
            onMouseDown={() => clearErrors('price')}
          />
          <span className={'text__err'}>{errors.price?.message}</span>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="description" className="col-sm-2 col-form-label flex-grow-1">
          Miêu tả
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="description"
            placeholder="Vui lòng nhập miêu tả sản phẩm"
            className={!!errors.description ? 'input__err' : ''}
            {...register('description')}
            onMouseDown={() => clearErrors('description')}
            multiple
            onChange={(e) => handleChange(e)}
          />
          <span className={'text__err'}>{errors.description?.message}</span>
        </CCol>
      </CRow>
      {/* <CRow className="mb-3">
        <CFormLabel
          htmlFor="image"
          className="col-sm-2 col-form-label flex-grow-1"
          style={{ cursor: 'pointer' }}
        >
          Thêm thuộc tính
        </CFormLabel>
        <CCol sm={9} className="d-flex flex-wrap align-item-center">
          {selectData.length > 0 && (
            <CFormSelect
              size="sm"
              className="mb-12"
              aria-label="Small select example"
              value={selectForm}
              onChange={(e) => {
                setSelectForm(e.target.value)
                if (e.target.value === 'default') return
                var data = selectData.find((item) => item.id === parseInt(e.target.value))
                if (data) {
                  const checkDataExist = variantTemp.find((item) => item.id === data.id)
                  if (checkDataExist) {
                    toast.info('Đã Thêm Thuộc tính này')
                    return
                  }
                  data = {
                    ...data,
                    optionValue: data.optionValue.map((item) => {
                      return { ...item, use: false }
                    }),
                  }
                  const newPush = [data, ...variantTemp]
                  setVariantTemp(newPush)
                }
              }}
            >
              <option value="default">Ấn vào đây để chọn loại sản phẩm</option>
              {selectData?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </CFormSelect>
          )}
          {selectData.length === 0 && <CSpinner size="sm" />}
        </CCol>
      </CRow>
      {variantTemp.length > 0 &&
        variantTemp.map((item, index) => (
          <CRow className="mb-3" key={index}>
            <CFormLabel htmlFor="description" className="col-sm-2 col-form-label flex-grow-1">
              {item.name}
            </CFormLabel>
            <CCol sm={9} className={'flex_type_1'}>
              {item.optionValue &&
                item.optionValue.map((data, index) => (
                  <span key={index}>
                    <input
                      type="checkbox"
                      name={item.id}
                      value={data.id}
                      checked={data.use}
                      onChange={handleChangeOptionVariant}
                    />{' '}
                    {data.name}
                  </span>
                ))}
            </CCol>
          </CRow>
        ))} */}
      <CRow className="mb-3">
        <CFormLabel
          htmlFor="image"
          className="col-sm-2 col-form-label flex-grow-1"
          style={{ cursor: 'pointer' }}
        >
          Ảnh
        </CFormLabel>
        <CCol sm={9} className="d-flex flex-wrap align-item-center">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className="upload">
              <i className="bx bx-cloud-upload"></i> Tải lên
            </div>
          </div>
          <div className="preview">
            {images.map((item, index) => (
              <div key={index} className="preview__img__flex">
                <div>
                  <i className="bx bx-x preview__icon" onClick={() => handleRemoveImage(item)} />
                </div>
                <img
                  src={`http://localhost:8080/${item}`}
                  alt={index}
                  className="preview__img"
                />
                {/* <div className={'preview__title'}>{item.name}</div> */}
              </div>
            ))}
          </div>
        </CCol>
      </CRow>
      <CRow className="text-center justify-content-center ">
        <CButton className="w-auto" onClick={handleSubmit}>
          {/* {isLoading && <CSpinner component="span" size="sm" />} */}
          Lưu
        </CButton>
        <CButton
          className="w-auto ms-3"
          color="secondary"
          onClick={() => {
            history.push('/product')
          }}
        >
          Hủy bỏ
        </CButton>
      </CRow>
    </CForm>
  )
}
