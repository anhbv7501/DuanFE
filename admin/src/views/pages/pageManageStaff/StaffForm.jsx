import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { imgLogo } from 'src/assets'
import productApi from 'src/config/productApi'
import uploadApi from 'src/config/upload.api'
import { validateName, validatePrice } from 'src/helper/CheckData'
import { actionGetOption, getOption, getOptionValue } from 'src/redux/slice/productSlice'

export default function ProductForm({ initialValue }) {
  const history = useHistory()
  const [values, setValues] = useState({ status: 'draft' })
  const [error, setError] = useState({})
  const [description, setDescription] = useState('')
  const [numberAttri, setNumberAttri] = useState(0)
  const [currentOption, setCurrentOption] = useState([])
  const [deleteFile, setDeleteFile] = useState([])
  const [optionDatas, setOptionDatas] = useState([])

  const [variant, setVariant] = useState({})
  const [label, setLabel] = useState('')
  const [acceptFile, setAcceptFile] = useState([])
  const dispatch = useDispatch()
  const options = useSelector(getOption)
  const optionValues = useSelector(getOptionValue)
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    onDrop: (acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach(async (file) => {
        const data = new FormData()
        data.append('file', file)

        const isUpload = await uploadApi.uploadFile(data)
        if (isUpload.data?.success) {
          setAcceptFile((prev) => {
            return [...prev, isUpload.data.payload?.path]
          })
        }
      })
      setError({ ...error, image: '' })

      // var Accept = acceptedFiles.map((item) => {
      //   return Object.assign(item, {
      //     preview: URL.createObjectURL(item),
      //   })
      // })
      // setAcceptFile([...acceptFile, ...Accept])
    },
  })
  const toCapitalize = useCallback(function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }, [])

  const handleChangeLabel = ({ target }) => {
    // const { id } = target
    // let isCheck = label.includes(id)
    // if (isCheck) {
    //   setLabel((prev) => prev.filter((e) => e !== id))
    // } else {
    //   setLabel((prev) => [...prev, id])
    // }
    setLabel(target.id)

  }
  const handleCheckbox = ({ target }) => {
    let { name, value } = target
    name = Number(name)
    value = Number(value)

    if (
      optionDatas.findIndex((option) => option.valueId === value && option.optionId === name) !== -1
    ) {
      const optionIndex = optionDatas.findIndex(
        (option) => option.valueId === value && option.optionId === name,
      )
      const data = [...optionDatas]
      setOptionDatas([...data.slice(0, optionIndex), data.slice(optionIndex + 1)])
    } else {
      setOptionDatas([...optionDatas, { valueId: value, optionId: name }])
    }
  }
  const handleClickAddAttribute = () => {
    setError({ ...error, variant: '' })
    if (numberAttri + 1 <= options.length) {
      setNumberAttri(numberAttri + 1)
      setCurrentOption(options?.slice(0, numberAttri + 1))
      // setOptionDatas(options?.slice(0, numberAttri + 1).map(option=>({optionId:option?.id})))
    }
  }
  const handleRemoveAttribute = (option) => {
    if (numberAttri - 1 >= 0) {
      setNumberAttri(numberAttri - 1)
      setCurrentOption(currentOption.filter((item) => item.id !== option.id))
      setVariant(delete variant[option.id])
      setOptionDatas(optionDatas.filter((e) => e.optionId !== option.id))
    }
  }
  const handleRemoveImage = (image) => {
    const newArrImage = acceptFile.filter((item) => item !== image)
    // if (image.id)
    // setDeleteFile([...deleteFile, { id: image.id.toString(), filePath: image.filePath }])
    setAcceptFile(newArrImage)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleChangeOptionInput = ({ target }, optionId) => {
    const data = optionDatas.map((option) => {
      if (option.optionId === optionId) {
        return { ...option, price: target.value }
      } else return option
    })
    setOptionDatas(data)
    // const optionIndex = optionDatas.findIndex(option.optionId === optionId)
    // setOptionDatas([
    //   ...optionDatas.slice(0, optionIndex),
    //   { ...optionDatas[optionIndex], price: target.value },
    //   optionDatas.slice(optionIndex + 1),
    // ])
  }

  const handleRemoveErr = ({ target }) => {
    const { name } = target
    setError({
      ...error,
      [name]: '',
    })
  }
  const handleSubmit = async () => {
    const checkName = validateName(values?.name)
    const checkPrice = validatePrice(values.price)

    if (!checkName) {
      setError((prev) => {
        return { ...prev, name: 'Bạn phải nhập tên sản phẩm' }
      })
    }
    if (Object.keys(optionDatas).length < 1) {
      setError((prev) => {
        return { ...prev, optionDatas: 'Bạn phải chọn ít nhất là 1 thuộc tính ' }
      })
    }
    if (acceptFile.length < 1) {
      setError((prev) => {
        return { ...prev, image: 'Bạn phải chọn ít nhất là 1 ảnh  ' }
      })
    }
    setError((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        const data = {
          ...values,
          description,
          number: Number(values.number),
          label: label || 'NEW',
          options: JSON.stringify(optionDatas),
          images: JSON.stringify(acceptFile),
        }
        if (initialValue) {
          callApi(data, initialValue?.id)
        } else {
          callApi(data)
        }
      }
      return prev
    })
  }
  const callApi = useCallback(async (formdata, id) => {
    let data = {}
    if (initialValue) {
      data = await productApi.updateProduct(id, formdata)
    } else {
      data = await productApi.createProduct(formdata)
    }

    if (data?.status === 200) {
      toast.success('Thao tác sản phẩm thành công')
      history.push('/product')
    } else {
      toast.error('Thao tác sản phẩm thất bại')
    }
  }, [])
  useEffect(() => {
    dispatch(actionGetOption())
  }, [dispatch])

  // useEffect(() => {
  //   if (initialValue && Object.keys(initialValue).length > 0) {
  //     console.log('zooodayne',initialValue)

  //     const { name, description, status, images, label, product_options } = initialValue
  //     if (label) {
  //       const _label = label.split(',')
  //       setLabel(label)
  //     }
  //     setValues({ name, description, status })
  //     if (images) {
  //       const dtTest = images.map((e) => ({
  //         id: e.id,
  //         path:e.path
  //       }))
  //       setAcceptFile(dtTest)
  //     }

  //     // if (productOption) {
  //     //   let iniVariant = {}
  //     //   productOption.forEach((e) => {
  //     //     if (!iniVariant.hasOwnProperty(e.option.id)) {
  //     //       iniVariant = { ...iniVariant, [e.option.id]: [] }
  //     //       iniVariant[e.option.id].push(String(e.optionValue.id))
  //     //     } else {
  //     //       iniVariant = {
  //     //         ...iniVariant,
  //     //         [e.option.id]: [...iniVariant[e.option.id], String(e.optionValue.id)],
  //     //       }
  //     //     }
  //     //   })
  //     //   setVariant(iniVariant)
  //     //   setNumberAttri(Object.keys(iniVariant).length)
  //     //   setCurrentOption(option?.slice(0, Object.keys(iniVariant).length))
  //     // }
  //   }
  // }, [initialValue])
  return (
    <div className="row">
      <div className="col-lg-9">
        <div className="main-form">
          <div className="form-body">
            <div className="form-group mb-3">
              <label htmlFor="name" className="text-title-field required" aria-required="true">
                Tên sản phẩm
              </label>
              <input
                placeholder="Nhập tên sản phẩm"
                name="name"
                type="text"
                value={values?.name}
                className={Boolean(error.name) ? 'input__err form-control' : 'form-control'}
                id="name"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              />
              <span className={'text__err'}>{error?.name}</span>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="name" className="text-title-field required" aria-required="true">
                Số lượng
              </label>
              <input
                placeholder="Số lượng"
                name="number"
                type="text"
                value={values?.number}
                className={Boolean(error.number) ? 'input__err form-control' : 'form-control'}
                id="number"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              />
              <span className={'text__err'}>{error?.number}</span>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description" className="control-label ">
                Miêu tả
              </label>
              <CKEditor
                className="test"
                editor={ClassicEditor}
                data={values?.description}
                onReady={(editor) => {
                  const data = editor.getData()
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setDescription(data)
                }}
              />
            </div>
          </div>
        </div>

        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <p className="required">Thuộc tính</p>
          </CCardHeader>
          <CCardBody className={error.optionDatas ? 'card-err' : ''}>
            {currentOption.length === 0 && (
              <p className="text-secondary">
                Ấn vào thêm thuộc tính để chọn thuộc tính cho sản phẩm
              </p>
            )}
            <div className="list-product-attribute-wrap">
              <div className="list-product-attribute-wrap-detail">
                {currentOption.length > 0 &&
                  currentOption.map((option) => {
                    return (
                      <div className="product-attribute-set-item" key={option.id}>
                        <div className="row align-items-center">
                          <div className="col-md-3 col-sm-6">
                            <div className="form-group mb-3">
                              {/* <label className="text-title-field">Tên thuộc tính</label> */}
                              <select className="next-input product-select-attribute-item" disabled>
                                <option value="">{toCapitalize(option?.name)}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="form-group mb-3">
                              {/* <label className="text-title-field">Giá trị</label> */}
                              <div className="product-select-attribute-item-value-wrap">
                                {optionValues[option.id].length > 0 &&
                                  optionValues[option.id].map((optValue) => {
                                    return (
                                      <span key={optValue.id} className="me-4">
                                        <input
                                          type="checkbox"
                                          name={option.id}
                                          value={optValue.id}
                                          checked={
                                            optionDatas.findIndex(
                                              (opt) =>
                                                opt.valueId === optValue.id &&
                                                opt.optionId === option.id,
                                            ) !== -1
                                          }
                                          onChange={handleCheckbox}
                                        />

                                        {toCapitalize(optValue.name)}
                                      </span>
                                    )
                                  })}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-6 product-set-item-delete-action">
                            <div className="form-group mb-3">
                              {/* <label
                                htmlFor="price"
                                className="text-title-field required"
                                aria-required="true"
                              >
                                Giá tiền
                              </label> */}
                              <input
                                className={
                                  Boolean(error.price) ? 'input__err form-control' : 'form-control'
                                }
                                placeholder="Giá tiền"
                                name="price"
                                type="number"
                                // value={values?.price}
                                value={optionDatas?.[option.id]?.price}
                                id="price"
                                onMouseDown={handleRemoveErr}
                                onChange={(e) => handleChangeOptionInput(e, option.id)}
                              />
                              <span className={'text__err'}>{error?.price}</span>
                            </div>
                          </div>

                          <div className="col-md-2 col-sm-6 product-set-item-delete-action text-end">
                            <div className="form-group mb-3">
                              <label className="text-title-field">&nbsp;</label>
                              <div className="icon__container">
                                <span
                                  className="btn btn-danger "
                                  onClick={() => {
                                    handleRemoveAttribute(option)
                                  }}
                                >
                                  <i className="bx bx-trash icon__delete-attribute"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <span
                className="btn btn-light text-primary btn-trigger-add-attribute-item hidden"
                onClick={handleClickAddAttribute}
              >
                Thêm thuộc tính
              </span>
            </div>
          </CCardBody>
          <CCardBody>
            {error.optionDatas && <span className="text__err">{error.optionDatas}</span>}
          </CCardBody>
        </CCard>

        <CCard className="mt-3">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <p className="required">Ảnh</p>
          </CCardHeader>
          <CCardBody className={error.image ? 'card-err' : ''}>
            <div className="gallery-images-wrapper list-images">
              <label htmlFor="input__add-img" className="w-100">
                {acceptFile.length < 1 && (
                  <div className="text-center text-secondary cursor-pointer js-btn-trigger-add-image default-placeholder-gallery-image ">
                    <img id="display__img" src={imgLogo.placeholder} alt="" />
                    <p>Ấn vào đây để thêm ảnh cho sản phẩm</p>
                  </div>
                )}
              </label>

              <div {...getRootProps()}>
                <input {...getInputProps()} id="input__add-img" />
              </div>

              {acceptFile.length > 0 && (
                <ul className="list-unstyled list-gallery-media-images ui-sortable">
                  {acceptFile.map((image, index) => {
                    return (
                      <li className="gallery-image-item-handler" key={index}>
                        <div className="list-photo-hover-overlay">
                          <ul className="photo-overlay-actions">
                            <li>
                              <span
                                className="mr10 btn-trigger-remove-gallery-image"
                                onClick={() => handleRemoveImage(image)}
                              >
                                <i className="bx bxs-trash-alt"></i>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="custom-image-box image-box">
                          <input type="hidden" className="image-data" />
                          <img
                            src={"http://localhost:8080/" + image}
                            className="preview_image"
                            alt=""
                          />
                          <div className="image-box-actions"></div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}

              {acceptFile.length > 0 && (
                <label htmlFor="input__add-img">
                  <p className="text-primary fs-7">Thêm ảnh</p>
                </label>
              )}
            </div>
          </CCardBody>
          <CCardBody>{error.image && <span className="text__err">{error.image}</span>}</CCardBody>
        </CCard>
      </div>
      <div className="col-lg-3 right-sidebar mt-4 mt-lg-0 d-flex flex-lg-column flex-column-reverse">
        <div className="widget meta-boxes form-actions form-actions-default action-horizontal">
          <div className="widget-title">
            <h5>
              <span>Hành động</span>
            </h5>
          </div>
          <div className="widget-body">
            <div className="btn-set">
              <button
                name="submit"
                value="save"
                className="btn btn-info text-light"
                onClick={handleSubmit}
              >
                <i className="bx bx-save"></i> Lưu
              </button>
              &nbsp;
              <button
                name="submit"
                className="btn btn-secondary text-light"
                onClick={() => {
                  history.push('/product')
                }}
              >
                <i className="bx bxs-x-circle"></i> Hủy bỏ
              </button>
            </div>
          </div>
        </div>

        <div className="widget meta-boxes">
          <div className="widget-title">
            <h5>
              <label htmlFor="status" className="control-label " aria-required="true">
                Trạng thái
              </label>
            </h5>
          </div>
          <div className="widget-body">
            <div className="ui-select-wrapper form-group">
              <select
                className="form-control ui-select ui-select is-valid"
                id="status"
                name="status"
                aria-invalid="false"
                value={values?.status}
                onChange={handleChange}
              >
                <option value="published">Công khai</option>
                <option value="draft">Bản thảo</option>
                <option value="pending">Riêng tư</option>
              </select>
              <span className="svg-next-icon svg-next-icon-size-16">
                <i className="bx bx-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="widget meta-boxes">
          <div className="widget-title">
            <h5>
              <label htmlFor="is_featured" className="control-label">
                Nhãn
              </label>
            </h5>
          </div>
          <div className="widget-body">
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="BESTSELLER"
                  checked={label === 'BESTSELLER'}
                  onChange={handleChangeLabel}
                />
                <label htmlFor="BESTSELLER">Bán chạy</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="POPULAR"
                  checked={label === 'POPULAR'}
                  onChange={handleChangeLabel}
                />
                <label htmlFor="POPULAR">Phổ biến</label>
              </li>
              <li>
                {console.log('labe', label)}
                <input
                  type="checkbox"
                  id="NEW"
                  checked={label === 'NEW'}
                  onChange={handleChangeLabel}
                />
                <label htmlFor="NEW">Mới nhất</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
