import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import FormatNumber from "../number/FormatNumber";
import { API } from "../constants/api.constants";
import * as _ from "lodash";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { actionAddCart, getCart } from "../redux/reducers/product.reducer";
import { toast } from "react-toastify";

function DetailProduct({ datas }) {
  const { addItem } = useCart();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const carts = useAppSelector(getCart);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("0");
  const [priceInit, setPriceInit] = useState("0");
  const [optionSearch, setOptionSearch] = useState([]); //[valueId]
  const [productOptionId, setProductOptionId] = useState([]); //[valueId]
  const [options, setOptions] = useState({});
  const [statusDescription, setStatusDescription] = useState(true);
  const [quantity, setquantity] = useState();
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [target, setTarget] = useState();
  useEffect(() => {
    setImage(datas.images?.[0]?.path);
    setPrice(datas?.product_options?.[0]?.price);
    setPriceInit(datas?.product_options?.[0]?.price);
    setquantity(1);
    const data = _.groupBy(datas?.product_options, ({ option }) => option.id);
    setOptions(data);
  }, [datas]);

  const handleSelect = (valueId, optionId, price, productOptId) => {
    const indexExist = optionSearch.findIndex((e) => {
      return options[optionId].map((opt) => opt.value.id).includes(e);
    });
    if (optionSearch.indexOf(valueId) === -1 && indexExist === -1) {
      setOptionSearch([...optionSearch, valueId]);
      setPrice(price);
      setPriceInit(price);
      setProductOptionId([...productOptionId, productOptId]);
    } else if (indexExist !== -1) {
      setOptionSearch([...optionSearch.slice(0, indexExist), ...optionSearch.slice(indexExist + 1), valueId]);
    } else {
      const index = optionSearch.indexOf(valueId);
      setOptionSearch([...optionSearch.slice(0, index), ...optionSearch.slice(index + 1)]);
      const indexProduct = productOptionId.indexOf(productOptId);
      setProductOptionId([...productOptionId.slice(0, indexProduct), ...productOptionId.slice(indexProduct + 1)]);
    }
  };

  const checkDataToCart = {
    id: datas.id,
    title: datas.title,
    image: datas.image01,
    color: color,
    size: size,
    quantity: quantity,
    price: datas.price,
  };
  const handlequantityP = () => {
    setquantity((e) => e + 1);
    setPrice(priceInit * (quantity + 1));
  };
  const handlequantityM = () => {
    if (quantity > 1) {
      setquantity((e) => e - 1);
      setPrice(price - priceInit);
    }
  };
  const handleStatusDescription = () => {
    setStatusDescription((p) => !p);
  };

  const handleAddToCart = () => {
    if (optionSearch.length > 0) {
      if (Number(quantity) <= Number(datas.product_options[0]?.number)) {
        console.log('te', carts, datas)
        const index = carts.findIndex(e => e.item.id === datas.id)
        addItem(checkDataToCart);
        if (index === -1) {
          dispatch(
            actionAddCart([...carts, { item: datas, options: optionSearch, quantity, number: datas.product_options[0]?.number, price, priceInit, productOptionId }])
          );
        } else {
          dispatch(
            actionAddCart([...carts.slice(0, index), { ...carts[index], quantity: carts[index]?.quantity + quantity }, ...carts.slice(index + 1)])
          );
        }
        toast.success("Sản phẩm được thêm vào giỏ hàng thành công");
      }
      else {
        toast.error("Số lượng sản phẩm trong kho không đủ để đặt hàng");

      }

    } else {
      toast.error("Bạn vui lòng chọn tùy chọn sản phẩm");
    }
  };

  return (
    <div className="detail-product">
      <div className="detail-product__wrap">
        <div className="detail-product__wrap__slide-1">
          <img
            src={`${API.BASE_URL_IMAGE}${datas.images?.[0]?.path}`}
            alt=""
            className="detail-product__wrap__slide-1__img"
            onClick={() => {
              setImage(datas.images?.[0]?.path);
            }}
          />
          <img
            src={`${API.BASE_URL_IMAGE}${datas.images?.[1]?.path}`}
            alt=""
            className="detail-product__wrap__slide-1__img"
            onClick={() => {
              setImage(datas.images?.[1]?.path);
            }}
          />
        </div>
        <div className="detail-product__wrap__slide-2">
          <img src={`${API.BASE_URL_IMAGE}${image}`} alt="" className="detail-product__wrap__slide-2__img" />
        </div>
        <div className="detail-product__wrap__slide-3">
          <h2 className="detail-product__wrap__slide-3__title">{datas?.name}</h2>
          <p className="detail-product__wrap__slide-3__price">
            {priceInit?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </p>
          {Object.keys(options).length > 0 &&
            Object.values(options)?.map((option) => (
              <>
                <p className="detail-product__wrap__slide-3__labe">{option?.[0]?.option?.name}</p>
                {option?.[0]?.option?.type === "color" ? (
                  <div className="detail-product__wrap__slide-3-list__color">
                    {option.length > 0 &&
                      option.map((e) => (
                        <>
                          <span
                            onClick={() => {
                              handleSelect(e.value?.id, e.option?.id, e?.price, e?.id);
                            }}
                            style={{ backgroundColor: e.value?.name }}
                            className={optionSearch.includes(e.value?.id) ? "active" : ""}
                          // key={i}
                          />
                        </>
                      ))}
                  </div>
                ) : (
                  <div className="detail-product__wrap__slide-3-list__color">
                    {option.length > 0 &&
                      option.map((e) => (
                        <>
                          <span
                            onClick={() => {
                              handleSelect(e.value?.id, e.option?.id, e?.price, e?.id);
                            }}
                            style={{ backgroundColor: e.value?.name }}
                            className={optionSearch.includes(e.value?.id) ? "active" : ""}
                          >
                            {e.value?.name}
                          </span>
                        </>
                      ))}
                  </div>
                )}
              </>
            ))}
          <p className="detail-product__wrap__slide-3__labe">số lượng</p>
          <div className="detail-product__wrap__slide-3__quantity">
            <span onClick={handlequantityM}>-</span>
            <span>{quantity}</span>
            <span onClick={handlequantityP}>+</span>
          </div>
          <div className="detail-product__wrap__slide-3-list__btn">
            <div onClick={handleAddToCart} className="button">
              <span> thêm giỏ hàng</span>
            </div>
            <div
              className="button" onClick={() => { handleAddToCart(); navigate('/cart') }}
            >
              <span>mua ngay</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`detail-product__description ${statusDescription ? " active" : ""}`}>
        <h1 className="detail-product__description__title">chi tiết sản phẩm</h1>
        <p className="detail-product__description__item" dangerouslySetInnerHTML={{ __html: datas.description }}></p>
        {/* <span
          className={`detail-product__description__btn-hs ${statusDescription ? " active" : ""}`}
          onClick={handleStatusDescription}
        >
          {statusDescription ? "thu gọn" : "xem thêm "}
        </span> */}
      </div>
    </div>
  );
}

export default DetailProduct;

