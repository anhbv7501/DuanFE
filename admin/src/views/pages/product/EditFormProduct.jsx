import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { actionGeOneProduct, getCurrentProduct } from 'src/redux/slice/productSlice'
import ProductFormUpdate from './ProductFormUpdate'

export default function EditFormProduct() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const productCurrent = useSelector(getCurrentProduct)

  useEffect(() => {
    dispatch(actionGeOneProduct(slug))
  }, [dispatch, slug])
  return <ProductFormUpdate initialValue={productCurrent} />
}
