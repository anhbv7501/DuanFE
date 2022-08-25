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
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getLoading } from 'src/redux/slice/productSlice'
import { toast } from 'react-toastify'
import productApi from 'src/config/productApi'
import { getAllOption } from 'src/config/productOptionAPI'
import { validateDe, validateName, validatePrice } from 'src/helper/CheckData'
// import { fun } from 'src/data/FilterDataPage'

export default function FormEditProduct({ initialValue }) {
  const [values, setValues] = useState({})
  const [error, setError] = useState({})

  const [acceptFile, setAcceptFile] = useState([])
  const [deleteFile, setDeleteFile] = useState([])
  const history = useHistory()
  const isLoading = useSelector(getLoading)
  const [selectData, setSelectData] = useState([])
  /** select Form Data value */
  const [selectForm, setSelectForm] = useState('default')
  /**
   * [
   *  id: '',
   *  meta: '',
   *  name: '',
   *  optionValue: [
   *    {
   *       id: '',
   *       name: '',
   *       use: bool
   *    }
   *  ]
   * ]
   */
  const [variantTemp, setVariantTemp] = useState([])
  const [variantSend, setVariantSend] = useState({})

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    onDrop: (acceptedFiles, rejectedFiles) => {
      var Files = Object.assign(acceptFile)
      var Accept = acceptedFiles.map((item) => {
        return Object.assign(item, {
          preview: URL.createObjectURL(item),
        })
      })
      setAcceptFile([...Files, ...Accept])
    },
  })

  const handleRemoveImage = (image) => {
    const newArrImage = acceptFile.filter((item) => item.preview !== image.preview)
    if (image.id)
      setDeleteFile([...deleteFile, { id: image.id.toString(), filePath: image.filePath }])
    setAcceptFile(newArrImage)
  }

  useEffect(() => {
    setValues({ ...initialValue })
    if (initialValue?.productImg) {
      const dtTest = initialValue?.productImg.map((e) => ({
        id: e.id,
        preview: process.env.REACT_APP_API_URL + e?.imgPath,
        name: e?.name,
        filePath: e?.imgPath,
      }))
      setAcceptFile(dtTest)
    }

    let resValue = []
    initialValue?.productOption?.forEach((item) => {
      let check = resValue.find((temp) => item.option.id === temp.id)
      if (!check) {
        resValue.push({ ...item.option, optionValue: [item.optionValue] })
        return
      }
      resValue = resValue.map((temp) =>
        temp.id === item.option.id
          ? { ...temp, optionValue: [...temp['optionValue'], item.optionValue] }
          : temp,
      )
    })
    let temp = [...selectData]
    temp = temp.map((item) => {
      const dataPre = resValue.find((data) => data.id === item.id)
      if (dataPre) {
        let templateDataPre = dataPre.optionValue?.map((item) => item.id)
        let optionValue = item.optionValue?.map((temp1) => {
          const check = templateDataPre.find((item) => item === temp1.id)
          if (check) {
            setVariantSend((pre) => {
              if (pre[dataPre.id])
                return { ...pre, [dataPre.id]: [...pre[dataPre.id], check.toString()] }
              return { ...pre, [dataPre.id]: [check.toString()] }
            })
          }
          return check ? { ...temp1, use: true } : { ...temp1, use: false }
        })
        return { ...item, optionValue: optionValue }
      }
      return undefined
    })
    temp = temp.filter((item) => item !== undefined)
    setVariantTemp(temp)
    // eslint-disable-next-line
  }, [initialValue])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleChangeOptionVariant = (e) => {
    const data = variantTemp.find((item) => item.id === parseInt(e.target.name))
    const temp = data.optionValue.find((item) => item.id === parseInt(e.target.value))
    const newTemp = { ...temp, use: !temp.use }
    const newData = {
      ...data,
      optionValue: data.optionValue.map((item) => (item.id === newTemp.id ? newTemp : item)),
    }
    setVariantTemp(variantTemp.map((item) => (newData.id === item.id ? newData : item)))
    if (variantSend[e.target.name]) {
      const data = variantSend[e.target.name].find((item) => item === e.target.value)
      if (data) {
        setVariantSend({
          ...variantSend,
          [e.target.name]: [
            ...variantSend[e.target.name].filter((item) => item !== e.target.value),
          ],
        })
        return
      }
      setVariantSend({
        ...variantSend,
        [e.target.name]: [...variantSend[e.target.name], e.target.value],
      })
      return
    }
    setVariantSend({
      ...variantSend,
      [e.target.name]: [e.target.value],
    })
  }

  const LoadOptions = async () => {
    try {
      const { data } = await getAllOption()
      // await fun() //side effect
      setSelectData(data.data)
    } catch (error) {
      toast.error(`System error`)
    }
  }

  useEffect(() => {
    LoadOptions()
  }, [])
  const handleRemoveErr = ({ target }) => {
    const { name } = target
    setError({
      ...error,
      [name]: '',
    })
  }
  const handleSubmit = async () => {
    try {
      const checkName = validateName(values?.name)
      const checkDe = validateDe(values?.description)
      const checkPrice = validatePrice(values.price)

      if (!checkName) {
        setError((prev) => {
          return { ...prev, name: 'Bạn phải nhập tên sản phẩm' }
        })
      }
      if (!checkDe) {
        setError((prev) => {
          return { ...prev, description: 'Bạn phải nhập miêu tả sản phẩm' }
        })
      }
      if (!checkPrice) {
        setError((prev) => {
          return { ...prev, price: 'Bạn phải nhập giá là kiểu số ' }
        })
      } else {
        setError((prev) => {
          if (Object.values(prev).every((e) => e === '')) {
            const formdata = new FormData()
            acceptFile.forEach((item) => {
              formdata.append('allImg', item)
            })
            formdata.append('name', values.name || '')
            formdata.append('price', values.price || '')
            formdata.append('description', values.description || '')
            formdata.append('imageDelete', JSON.stringify(deleteFile))
            formdata.append('option', JSON.stringify(variantSend))
            callApi(initialValue?.id, formdata)
          }
          return prev
        })
      }
    } catch (error) {
      toast.error('System Error')
    }
  }
  const callApi = useCallback(async (id, formdata) => {
    const data = await productApi.updateProduct(id, formdata)

    if (data?.status === 200) {
      toast.success('Sửa sản phẩm thành công')
      history.push('/product')
    } else {
      toast.error('Sửa sản phẩm thất bại')
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
            placeholder="Vui lòng nhập tên sản phẩm"
            name="name"
            className={Boolean(error.name) ? 'input__err' : ''}
            onMouseDown={handleRemoveErr}
            defaultValue={values?.name}
            onChange={(e) => handleChange(e)}
          />
          <span className={'text__err'}>{error?.name}</span>
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
            onMouseDown={handleRemoveErr}
            className={Boolean(error.price) ? 'input__err' : ''}
            name="price"
            defaultValue={values?.price}
            onChange={(e) => handleChange(e)}
          />
          <span className={'text__err'}>{error?.price}</span>
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
            name="description"
            multiple
            onMouseDown={handleRemoveErr}
            className={Boolean(error.description) ? 'input__err' : ''}
            defaultValue={values?.description}
            onChange={(e) => handleChange(e)}
          />
          <span className={'text__err'}>{error?.description}</span>
        </CCol>
      </CRow>
      <CRow className="mb-3">
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
              {item?.name}
            </CFormLabel>
            <CCol sm={9} className={'flex_type_1'}>
              {item?.optionValue &&
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
        ))}
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
            {acceptFile.map((item, index) => (
              <div key={index} className="preview__img__flex">
                <div>
                  <i className="bx bx-x preview__icon" onClick={() => handleRemoveImage(item)} />
                </div>
                <img src={item.preview} alt={index} className="preview__img" />
                <div className={'preview__title'}>{item.name}</div>
              </div>
            ))}
          </div>
        </CCol>
      </CRow>
      <CRow className="text-center justify-content-center">
        <CButton className="w-auto" onClick={handleSubmit}>
          {isLoading && <CSpinner component="span" size="sm" />}
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
